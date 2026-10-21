"""Builds tokens/dm_tokens.css from tokens/dm_tokens.json (the Figma variable export).

Colour and number tokens only — typography (font family / weight / sizes) lives
in tokens/dm_typography_web_tokens.css.

Grouping follows the token path, not the export order:
  primitive   Primitive Colors/{Scale}/{Step}       → one group per scale
  semantic    color/{category}/{context}/{variant}  → category › context › variant,
              contexts in the order of docs/2_Token__02_Colour-Tokens.md
  numbers     Primitive Numbers/* · number/spacing/* · number/border-radius/*

Run from the repo root after every token export:
    python3 tools/token-build/build_dm_tokens.py > tokens/dm_tokens.css
"""

import json
import os
import re

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
data = json.load(open(os.path.join(ROOT, 'tokens', 'dm_tokens.json')))
collections = {c['name']: c for c in data['collections']}


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def title(s):
    t = ' '.join(w.capitalize() for w in s.split('-'))
    return re.sub(r'\bTv\b', 'TV', t)


def hex_value(v):
    v = v.lower()
    return v[:7] if len(v) == 9 and v.endswith('ff') else v  # drop opaque alpha


# ── Design order (docs/2_Token__02_Colour-Tokens.md) ─────────────────────────
SECTIONS = ['home-blue', 'news-cyan', 'showbiz-red', 'sport-green', 'royals-violet', 'money-purple',
            'lifestyle-azure', 'health-turquoise', 'tv-magenta', 'travel-navy', 'shopping-indigo',
            'crime-petrol', 'property-fuchsia', 'podcasts-yellow', 'games-ultramarine', 'science-orange']
CONTEXT_ORDER = (['neutral'] + SECTIONS
                 + ['interaction-primary', 'interaction-positive', 'interaction-negative',
                    'semantic-info', 'semantic-success', 'semantic-warning', 'semantic-error',
                    'editorial-highlight', 'editorial-feature', 'editorial-analysis',
                    'shade', 'translucent-dark', 'translucent-light'])
CATEGORY_ORDER = ['background', 'text', 'icon', 'border', 'effect', 'miscellaneous']
VARIANT_ORDER = ['white', 'lightest', 'lighter', 'light', 'grey-light', 'grey-dark', 'dark', 'darker', 'black',
                 'base', 'base-darker', 'clear', 'pale', 'subtle', 'subtlest', 'moderate', 'deep', 'thick', 'solid',
                 'default', 'hover', 'pressed']


def rank(order, value, fallback):
    return (order.index(value), 0) if value in order else (len(order), fallback)


def banner(text):
    return f'/* ============================================\n   {text}\n   ============================================ */'


# ── Primitives ───────────────────────────────────────────────────────────────
primitive_var = {}  # 'Primitive Colors/Blue/500' → '--primitive-colors-blue-500'


def primitive_block(collection_name, heading):
    scales = {}
    for v in collections[collection_name]['modes'][0]['variables']:
        if v['type'] != 'color' or not v['name'].startswith('Primitive Colors/'):
            continue
        _, scale, step = v['name'].split('/')
        name = f'--primitive-colors-{slug(scale)}-{slug(step)}'
        primitive_var[v['name']] = name
        scales.setdefault(scale, []).append(f'  {name}: {hex_value(v["value"])};')
    body = '\n\n'.join(f'  /* {title(slug(scale))} Scale */\n' + '\n'.join(lines) for scale, lines in scales.items())
    return f'{banner(heading)}\n:root {{\n\n{body}\n\n}}'


# ── Semantic colours ─────────────────────────────────────────────────────────
def semantic_block(collection_name, mode_name, heading, selector):
    mode = next(m for m in collections[collection_name]['modes'] if m['name'] == mode_name)
    groups = {}
    for i, v in enumerate(mode['variables']):
        if v['type'] != 'color':
            continue
        _, category, context, *rest = v['name'].split('/')
        variant = '/'.join(rest)
        value = f'var({primitive_var[v["value"]["name"]]})' if v['isAlias'] else hex_value(v['value'])
        groups.setdefault((category, context), []).append((rank(VARIANT_ORDER, variant, i), f'  --{v["name"].replace("/", "-")}: {value};'))

    first_seen = {key: i for i, key in enumerate(groups)}
    keys = sorted(groups, key=lambda k: (rank(CATEGORY_ORDER, k[0], 0), rank(CONTEXT_ORDER, k[1], first_seen[k])))
    suffix = ' (Dark)' if mode_name == 'Dark' else ''
    parts = []
    for category, context in keys:
        label = f'{title(category)} - {title(context)}'
        lines = [line for _, line in sorted(groups[(category, context)], key=lambda x: x[0])]
        parts.append(f'  /* {label}{suffix} */\n' + '\n'.join(lines))
    return f'{banner(heading)}\n{selector} {{\n' + '\n\n'.join(parts) + '\n}'


# ── Numbers ──────────────────────────────────────────────────────────────────
def number_blocks():
    prim = {}
    lines = []
    for v in collections['Foundation']['modes'][0]['variables']:
        if v['name'].startswith('Primitive Numbers/'):
            key = v['name'].split('/')[1]
            prim[v['name']] = f'--primitive-numbers-{slug(key)}'
            lines.append(f'  {prim[v["name"]]}: {v["value"]}px;')
    out = [f'{banner("Foundation - Primitive Numbers")}\n:root {{\n\n' + '\n'.join(lines) + '\n\n}']
    light = next(m for m in collections['DM Token']['modes'] if m['name'] == 'Light')
    for kind, heading in [('spacing', 'Semantic Number Tokens — Spacing'), ('border-radius', 'Semantic Number Tokens — Border Radius')]:
        rows = [f'  --{v["name"].replace("/", "-")}: var({prim[v["value"]["name"]]});'
                for v in light['variables'] if v['name'].startswith(f'number/{kind}/')]
        out.append(f'{banner(heading)}\n:root {{\n\n' + '\n'.join(rows) + '\n\n}')
    return out


HEADER = f'''/* ============================================
   DM Design System — Colour & Number Tokens
   Version: {data["version"]}
   ============================================
   Generated from tokens/dm_tokens.json by
   tools/token-build/build_dm_tokens.py — do not edit by hand.

   Structure:
     1. Primitive colours (Foundation, Games Foundation)
     2. Semantic colours — Light (:root) and Dark ([data-theme="dark"]),
        grouped category › context › variant
     3. Primitive and semantic numbers (spacing, border radius)
   Typography tokens: dm_typography_web_tokens.css
   ============================================ */'''

USAGE = '''/* ============================================
   Usage
   ============================================ */

/*
  Light mode (default): nothing to set, or <html data-theme="light">.
  Dark mode: <html data-theme="dark">.

  Use semantic tokens in UI, never primitives:
    background-color: var(--color-background-home-blue-base);
    color: var(--color-text-neutral-white);

  Theme toggle:
    document.documentElement.setAttribute('data-theme', 'dark');
*/'''

blocks = [
    HEADER,
    primitive_block('Foundation', 'Foundation - Primitive Color Scales'),
    primitive_block('Games Foundation', 'Games Foundation - Primitive Color Scales'),
    semantic_block('DM Token', 'Light', 'DM Token - Light Theme (Default)', ':root,\n[data-theme="light"]'),
    semantic_block('DM Token', 'Dark', 'DM Token - Dark Theme', '[data-theme="dark"]'),
    semantic_block('DM Games Token', 'Light', 'DM Games Token - Light Theme (Default)', ':root,\n[data-theme="light"]'),
    semantic_block('DM Games Token', 'Dark', 'DM Games Token - Dark Theme', '[data-theme="dark"]'),
    *number_blocks(),
    USAGE,
]
print('\n\n\n'.join(blocks))
