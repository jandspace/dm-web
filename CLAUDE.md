# DM Design System — prototyping workspace

Daily Mail Design System library for **Web**: Figma-exported tokens → CSS custom properties → SCSS components and modules, plus project prototypes and experiments.

Detailed rules load automatically from `.claude/rules/` when you touch matching files (SCSS, HTML, tokens, experiments, projects). This file holds only what applies to every task.

---

## Hard rules

1. **Colour:** semantic tokens only (`var(--color-…)`). Never raw hex, never `--primitive-colors-*`.
2. **Line height (web):** unitless token multipliers only. Never px.
3. **No `!important`.** Win by specificity and source order. If truly unavoidable, comment why.
4. **Breakpoints:** mobile-first `min-width` via `@include bp.respond-to(…)`. Never hand-written media queries.
5. **Never edit generated files:** `styles/css/main.css`, `tokens/dm_tokens.css`, `styles/scss/foundation/_icon-list.scss`, generated demo pages (`tools/demo-generators/README.md`). Edit the source and rebuild.
6. **No `<style>` in HTML.** Only exception: experiment pages (see experiments rules).
7. **Product vs prototype styles stay apart:** `components/` and `modules/` SCSS ship to production. Demo, experiment and project styling goes in `scaffolding/`, `experiments/` or `projects/` SCSS. Never mix.
8. **Every new SCSS file** is added to `styles/scss/main.scss` with `@use`.
9. **Minimal code:** fewest elements, fewest rules, least JS. Before adding anything, check whether an existing element, class, mixin, token or native feature already does it.
10. **Language:** British English for UI copy and docs (colour, grey). American English for tokens, variables, class names and code (color, gray, center).
11. **Same-turn bookkeeping:** changing files in `experiments/` or `projects/` means updating that folder's `index.html` notes in the same turn, unasked.
12. **Typefaces:** Inter and Lora only. Never two typefaces inside one text element. Inside one component, only the listed cases (see typography rules); anything else is flagged, even if Figma shows it.

Hooks in `.claude/settings.json` check rules 1–6, 8 and 11 automatically (rules 1–4 and 6 on the lines you add, so older code doesn't block you). If a hook blocks you, fix the cause. Do not work around it. Rules 7, 9, 10 and 12 are yours to check.

---

## Before you start

- **Component or module work → read its doc first** (`docs/4_Components__NN_<Name>.md`, `docs/5_Modules__NN_<Name>.md`). Glob by name (`docs/*Elevation*.md`), don't assume the number. Otherwise read only the docs the task needs, not all of `docs/`.
- **Precedence when sources disagree:** token files (`tokens/`) > `docs/` > `.claude/rules/` > Figma. Flag the conflict instead of picking silently.
- **Figma is not perfect.** Designers rarely touch the codebase. Layer names, stray widths and App values copied into Web frames (e.g. the `border/neutral/light` keyline) are often mistakes. Read Figma for intent, cross-check with docs, flag what looks wrong.
- **Figma layers are not HTML structure.** Auto-layout frames and wrappers exist to draw in Figma, not to be copied into markup.
- **New library element → find look-alikes first.** Search `projects/` and `experiments/` for something similar already built. Settle the differences, list the pages that should switch to the library version, and **ask before replacing**. Experiments marked Decided or Archived may need to stay as tested. After replacing, update the notes in the matching `index.html`.

---

## Where things go

| Path | What |
|---|---|
| `tokens/` | Figma variable exports (JSON) and token CSS |
| `styles/scss/` | SCSS source: `foundation/`, `components/`, `modules/` (product) · `scaffolding/`, `experiments/`, `projects/` (prototype only) · `main.scss` (`@use` only) |
| `styles/css/main.css` | Compiled output. Generated |
| `index.html` | Demo index (Components / Modules), same list as the side panel |
| `foundation/` | Reference pages: Colour, Typography, Spacing, Border Radius, Elevation, Layout & Grid, Iconography |
| `components/<name>/` | One demo folder per component |
| `modules/<name>/` | One demo folder per module or module part |
| `scripts/modules/` | Shared behaviour (Article Card Media, Carousel, Masthead, Scroll Row, Shorts Signpost, Toast, Tooltip). Never copy into a page |
| `scripts/scaffolding/` | Demo-only JS (side panel, index, footer, home button, drag-swipe) |
| `projects/YYYYMM-prj-<name>/` | Project prototypes. Main page `index.html` in the folder, no platform subfolders |
| `experiments/YYYYMM-exp-<name>/` | A/B tests and one-offs. Self-contained, never imported elsewhere |
| `assets/icons/` | Icon SVGs (Figma originals). The only icon source |
| `docs/` | Design system documentation |
| `tools/` | Generators: `demo-generators/`, `token-build/`, `icon-build/` |

**Component or module?** Follows the Figma UI Kit page.
- Component = listed under Figma "DM Web ::: Components" (Button, Divider, Dropdown Menu, Input, Loading, Modal, Pagination, Tabs, Toast, Toggle, Tooltip…). Carousel is also a component: its Figma page is under Modules, but it has no content of its own and modules are built with it.
- Module = listed under "DM Web ::: Modules" (Article Card, Article Editorial Badge, Breadcrumbs, Navigation, Video Player Controls…). Module parts (Article Card Metadata, Columnist Profile Photo) live in `modules/` too.
- Unsure → check which Figma page the frame sits on.

---

## Commands

| Task | Command |
|---|---|
| Build CSS | `npm run build` (Node 20: `nvm use 20`; older Node fails with `globalThis is not defined`) |
| Watch | `npm run watch` |
| Rebuild token CSS after a Figma export | `python3 tools/token-build/build_dm_tokens.py > tokens/dm_tokens.css` |
| Rebuild icon list after adding an icon | `python3 tools/icon-build/build_icon_list.py > styles/scss/foundation/_icon-list.scss` |
| Regenerate demo pages | See `tools/demo-generators/README.md` |

`node_modules/` is committed for now (Sass only, small). Untrack it and add it to `.gitignore` if it grows large.

**Local preview:** `http://localhost:3001/` (also `/components/<name>/`, `/modules/<name>/`). The user starts it with `dmon` and stops it with Ctrl+C or `dmoff`. If it is down while you work, run `dmon` in the Terminal panel (`run_in_terminal`, tab "dm-web server"); if that fails, `python3 -m http.server 3001` from the repo root. Not via `preview_start` (macOS blocks it from `~/Documents`), not via npm (python fails to spawn under npm). No cache headers: tell the user to hard-refresh (Cmd+Shift+R) after a build.

---

## Figma

- Web UI Kit (Dweb & Mweb): https://www.figma.com/design/vB97J7hRY6OcmcnKJOOlHj/
- Icon library (DailyMail Icons): file `171vKuCduz2EW3XrK12IQT`, frame `24:2253`
- File URLs are reference only. For component work, the user gives a frame URL.
- Desktop MCP server reads only the file open in the active Figma tab ("node not found" otherwise). Remote server works from the fileKey in the URL.

---

## Git

- Commit straight to `main`: `update: <Component> - <change>` (e.g. `update: Article Card - hover surface`).
- Ignored: `.DS_Store`, `.claude/settings.local.json`.

---

## TODO

- Demo generators: write a `GENERATED` comment at the top of each generated page, then let the hooks read that marker instead of the path lists in `.claude/hooks/dm_hooks.py`.
