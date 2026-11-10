#!/usr/bin/env python3
"""DM Design System hooks for Claude Code (wired in .claude/settings.json).

  guard     PreToolUse  Edit|Write|MultiEdit  block edits to generated files
  check     PostToolUse Edit|Write|MultiEdit  check the lines just added (+ Sass build)
  snapshot  UserPromptSubmit                  hash every dirty file at the start of a turn
  stop      Stop                              check every file this turn changed, by content hash

Exit 2 = blocked / report to Claude (stderr). Exit 0 = clean.
Rules are checked on ADDED lines only (git diff against HEAD), so older code never blocks a new edit.
"""
import json, os, re, subprocess, sys, tempfile

ROOT = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()

# Generated files: edit the source and rebuild. TODO: switch to a GENERATED marker written by the generators.
GENERATED = {
    "styles/css/main.css": "compiled output. Edit the SCSS in styles/scss/ and run npm run build.",
    "styles/css/main.css.map": "compiled output. Edit the SCSS in styles/scss/ and run npm run build.",
    "tokens/dm_tokens.css": "generated. Change tokens/dm_tokens.json, then run: python3 tools/token-build/build_dm_tokens.py > tokens/dm_tokens.css",
    "styles/scss/foundation/_icon-list.scss": "generated. Add the icon to assets/icons/, then run: python3 tools/icon-build/build_icon_list.py > styles/scss/foundation/_icon-list.scss",
}
# Generated demo page -> its generator folder (tools/demo-generators/README.md).
GENERATED_PAGES = {
    "modules/article-card/index.html": "tools/demo-generators/article-card/",
    "modules/article-card-metadata/index.html": "tools/demo-generators/article-card-metadata/",
    "modules/columnist-profile-photo/index.html": "tools/demo-generators/columnist-profile-photo/",
}

HEX = re.compile(r"#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-zA-Z_-])")


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True).stdout


def rel(path):
    path = os.path.abspath(os.path.join(ROOT, path))
    return os.path.relpath(path, ROOT)


def read_input():
    try:
        return json.load(sys.stdin)
    except Exception:
        return {}


def added_lines(r):
    """[(line_no, text)] added vs HEAD; the whole file if untracked."""
    path = os.path.join(ROOT, r)
    if not os.path.isfile(path):
        return []
    if not git("ls-files", "--", r).strip():
        with open(path, encoding="utf-8", errors="replace") as f:
            return [(i, l.rstrip("\n")) for i, l in enumerate(f, 1)]
    out, n = [], 0
    for line in git("diff", "-U0", "HEAD", "--", r).splitlines():
        m = re.match(r"@@ -\S+ \+(\d+)", line)
        if m:
            n = int(m.group(1))
        elif line.startswith("+") and not line.startswith("+++"):
            out.append((n, line[1:]))
            n += 1
    return out


def strip_comment(text):
    text = re.sub(r"/\*.*?\*/", "", text)
    return re.sub(r"(^|[^:])//.*$", r"\1", text)


def fmt(hits):
    return "\n".join(f"    {n}: {t.strip()[:160]}" for n, t in hits[:5])


def check_scss(r):
    errs = []
    lines = added_lines(r)
    code = [(n, strip_comment(t)) for n, t in lines]
    foundation = r.startswith("styles/scss/foundation/")
    tests = [
        (not foundation, lambda t: HEX.search(t) and "#{" not in t, "Raw hex colour. Use var(--color-…)"),
        (not foundation, lambda t: re.search(r"box-shadow:[^;]*rgba?\(", t), "Raw rgba() shadow. Use var(--elevation-N)"),
        (not foundation, lambda t: "--primitive-colors-" in t, "Primitive token. Use a semantic --color-* token"),
        (True, lambda t: re.search(r"line-height:[^;]*\d+(\.\d+)?px", t), "px line-height. Use a --typography-line-height-* token"),
        (r != "styles/scss/foundation/_breakpoints.scss",
         lambda t: re.search(r"@media[^{]*(min|max)-width:[^{]*\d+px", t), "Hand-written media query. Use @include bp.respond-to(…) or bp.phone-landscape"),
    ]
    for on, test, msg in tests:
        hits = [(n, t) for n, t in code if on and test(t)]
        if hits:
            errs.append(f"{msg}:\n{fmt(hits)}")
    hits = [(n, t) for n, t in lines if "!important" in t and not re.search(r"/\*|//", t)]
    if hits:
        errs.append("!important without a reason. Fix with specificity / source order, or add a same-line comment saying why:\n" + fmt(hits))
    # Partial wired into main.scss?
    name = os.path.basename(r)[:-5].lstrip("_")
    folder = os.path.dirname(r)[len("styles/scss/"):]
    if name != "main" and folder:
        main = open(os.path.join(ROOT, "styles/scss/main.scss")).read()
        if not re.search(rf"@use ['\"]{re.escape(folder)}/_?{re.escape(name)}['\"]", main):
            errs.append(f"{r} is not @use'd in styles/scss/main.scss.")
    return errs


def check_html(r):
    errs = []
    lines = added_lines(r)
    tests = [
        (not r.startswith("experiments/"), lambda t: re.search(r"<style[ >]", t), "<style> block outside experiments/. Move styles to SCSS"),
        (True, lambda t: len(t) > 1000, "Very long line. One block element per line, children indented two spaces"),
        (True, lambda t: re.search(r"&#x?[0-9a-fA-F]+;|&(rsquo|lsquo|rdquo|ldquo|pound);", t), "Character reference. Write plain characters (escape only & < >)"),
        (True, lambda t: re.search(r'style="[^"]*--icon:[^"]*url\(', t), "Icon passed via inline style. Use class icon--{name}"),
        (True, lambda t: HEX.search(t) and re.search(r"style=|color|background", t, re.I), "Raw hex in HTML. Use tokens via classes or var(--color-…)"),
    ]
    for on, test, msg in tests:
        hits = [(n, t[:200]) for n, t in lines if on and test(t)]
        if hits:
            errs.append(f"{msg}:\n{fmt(hits)}")
    return errs


def build():
    cmd = '. "$HOME/.nvm/nvm.sh" >/dev/null 2>&1; nvm use 20 >/dev/null 2>&1; npm run build --silent'
    p = subprocess.run(["bash", "-c", cmd], cwd=ROOT, capture_output=True, text=True, timeout=55)
    if p.returncode != 0:
        return ["Sass build failed:\n" + "\n".join((p.stdout + p.stderr).strip().splitlines()[-15:])]
    return []


def check_file(r):
    if r.startswith("styles/scss/") and r.endswith(".scss"):
        return check_scss(r)
    if r.endswith(".html"):
        return check_html(r)
    return []


def fail(title, errs):
    print(title + "\n" + "\n".join(f"- {e}" for e in errs), file=sys.stderr)
    sys.exit(2)


# ---------- turn snapshot (content hashes) ----------

def snap_path(data):
    sid = re.sub(r"[^A-Za-z0-9_-]", "", str(data.get("session_id") or "default"))
    d = os.path.join(tempfile.gettempdir(), "dm-web-hooks")
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, sid + ".json")


def dirty_hashes():
    """{path: content hash or 'deleted'} for every changed or untracked file."""
    paths, tokens = [], iter(git("status", "--porcelain", "--untracked-files=all", "-z").split("\0"))
    for entry in tokens:
        if len(entry) > 3:
            paths.append(entry[3:])
            if entry[0] in "RC":
                next(tokens, None)  # skip the rename / copy source path
    existing = [p for p in paths if os.path.isfile(os.path.join(ROOT, p))]
    hashes = {}
    if existing:
        out = subprocess.run(["git", "hash-object", "--stdin-paths"], cwd=ROOT, input="\n".join(existing),
                             capture_output=True, text=True).stdout.split()
        hashes = dict(zip(existing, out))
    for p in paths:
        hashes.setdefault(p, "deleted")
    return hashes


def changed_this_turn(data):
    now = dirty_hashes()
    try:
        before = json.load(open(snap_path(data)))
    except Exception:
        # No snapshot (hooks loaded mid-session): this turn's changes can't be told apart
        # from older uncommitted work, so save one now and check from the next turn.
        json.dump(now, open(snap_path(data), "w"))
        return []
    return sorted(p for p, h in now.items() if before.get(p) != h)


# ---------- entry points ----------

def cmd_guard(data):
    r = rel(data.get("tool_input", {}).get("file_path", ""))
    if r in GENERATED:
        fail(f"BLOCKED: {r} is", [GENERATED[r]])
    if r in GENERATED_PAGES:
        fail(f"BLOCKED: {r} is a generated demo page.",
             [f"Edit the generator in {GENERATED_PAGES[r]} and regenerate (tools/demo-generators/README.md)."])


def cmd_check(data):
    r = rel(data.get("tool_input", {}).get("file_path", ""))
    errs = check_file(r)
    if not errs and r.endswith(".scss"):
        errs = build()
    if errs:
        fail(f"DM rule check failed for {r}:", errs)


def cmd_snapshot(data):
    json.dump(dirty_hashes(), open(snap_path(data), "w"))


def cmd_stop(data):
    if data.get("stop_hook_active"):
        return
    changed = changed_this_turn(data)
    if not changed:
        return
    errs = []
    status = {line[3:]: line[:2] for line in git("status", "--porcelain", "--untracked-files=all").splitlines()}
    # 1. experiments / projects notes
    for kind in ("experiments", "projects"):
        folders = sorted({p.split("/")[1] for p in changed if p.startswith(kind + "/") and p.count("/") >= 2})
        if not folders:
            continue
        index = f"{kind}/index.html"
        if index not in changed:
            errs.append(f"Files changed in {kind}/ ({', '.join(folders)}) but {index} notes were not updated this turn.")
        else:
            text = open(os.path.join(ROOT, index)).read()
            errs += [f"{kind}/{f} has no entry in {index}." for f in folders if f not in text]
    # 2. new demo pages in the side panel
    nav = open(os.path.join(ROOT, "scripts/scaffolding/demo-nav.js")).read()
    for p in changed:
        m = re.match(r"(components|modules)/([^/]+)/index\.html$", p)
        if m and status.get(p) == "??" and m.group(2) not in nav:
            errs.append(f"New demo {p} is not listed in scripts/scaffolding/demo-nav.js.")
    # 3. generated files edited by hand (Bash edits skip the guard)
    for page, gen in GENERATED_PAGES.items():
        if page in changed and not any(p.startswith(gen) for p in changed):
            errs.append(f"{page} changed but its generator ({gen}) did not. Edit the generator and regenerate.")
    for f in GENERATED:
        if f in changed and f.startswith("tokens/") and "tokens/dm_tokens.json" not in changed:
            errs.append(f"{f} changed but tokens/dm_tokens.json did not. Regenerate it from the JSON.")
    # 4. rule checks on every file this turn touched (catches Bash edits too)
    scss = False
    for p in changed:
        if p in GENERATED or p in GENERATED_PAGES:
            continue
        for e in check_file(p):
            errs.append(f"{p}: {e}")
        scss = scss or (p.startswith("styles/scss/") and p.endswith(".scss"))
    if scss and not errs:
        errs += build()
    if errs:
        fail("Before finishing, fix:", errs)


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    data = read_input()
    {"guard": cmd_guard, "check": cmd_check, "snapshot": cmd_snapshot, "stop": cmd_stop}[cmd](data)
    sys.exit(0)
