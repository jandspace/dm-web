---
paths:
  - "styles/scss/**/*.scss"
  - "components/**/*.html"
  - "modules/**/*.html"
  - "foundation/**/*.html"
  - "experiments/**/*.html"
  - "projects/**/*.html"
---

# Typography (Web)

Values below are a reference. If they disagree with `tokens/dm_typography_web_tokens.css`, the token file wins. Flag the mismatch.

## Use the utility classes

`.h1`–`.h6`, `.display-*`, text and label classes in `styles/scss/foundation/_typography.scss` bundle size, weight and line height. They are the code version of Figma Semantic Styles (e.g. `dmw_sans/h2/Semibold`). Use them instead of assembling `--typography-*` tokens by hand.

Token naming: `--typography-{property}-{role}-{level}` (e.g. `--typography-font-size-h1`, `--typography-font-weight-bold`).

## Typefaces

Inter and Lora are the DM Web typefaces, plus DM Slab for one brand use (below). No other typeface without the user's confirmation first.

| Family | Use |
|---|---|
| Inter (sans, default) | All UI, body, labels, metadata, and article headlines on Web |
| Lora (serif) | Editorial emphasis: Web headlines where Figma calls for it, quotes |
| DM Slab (`--typography-font-family-slab`) | Section Header Branded text name only. DM Slab Beton SH Extra Bold Condensed (800), self-hosted (`assets/fonts/`, `@font-face` in `foundation/_typography.scss`). Fixed 30px, line height 1, letter spacing 0 — no type token |

### Mixing — hard rule

- **One text element = one typeface.** Never two typefaces inside one heading, label or paragraph.
- **One component = one typeface**, except these cases:
  1. Article Card headline with `.serif` (`<h3 class="h4 serif article-headline">`). Size, weight and line height stay as the level sets them; the rest of the card stays Inter.
  2. Columnist quote headline (always `.serif`, with the columnist photo).
  3. Section Header Branded: the text name in DM Slab (30 / 1 / 0, weight 800), the rest Inter.
- Any other mix is flagged to the user, **even if Figma shows it**. Don't build it until confirmed.
- Demo chrome in `styles/scss/scaffolding/` (side panel, labels, monospace code) is not product UI and is out of scope.

### Third-party typeface exception

- **Literata** — the font of the external games module design system. Allowed only for game titles in the homepage experiment (`styles/scss/experiments/_homepage.scss`, Sport Games), loaded from Google Fonts in the page `<head>`, no token.
- It never goes into `components/`, `modules/` or the type tokens.
- Any new use of Literata, or any other third-party typeface, needs the user's confirmation first; once confirmed, add it to this list.

## Heading tags — tag for the outline, class for the size

- `h1`: one per page (page title). `h2`: section headers, modal titles. `h3`: every article headline in a card (Article Card, Image Only, Banner Story and its related links), whatever the size class (`.h2`–`.h6`).
- Never pick a tag for its size. Cards above the first section header stay `h3` too.
- Source: Foundation › Typography 3-G (decided 2026-11-25).

## Roles

- Heading: H1–H6
- Text: body copy, long-form editorial
- Label: buttons, badges, navigation, metadata
- Display: hero and splash only. Use sparingly

## Weights

| Weight | Value | Use |
|---|---|---|
| Regular | 400 | Body, secondary metadata |
| Semibold | 600 | Default emphasis: headings, buttons, labels |
| Bold | 700 | Display, or H1–H2 when extra impact is needed |

Italic: editorial inline use only. `--typography-font-weight-*-italic` sets weight only, so add `font-style: italic` too. Never italic on buttons or functional UI. Exception (per Figma): the commercial labels in Article Card Metadata (Ad Feature, Sponsored, Affiliate).

## Sizes

`:root` holds the SM-XS value. Sizes switch at 768 and 1024 only.

| Style | SM-XS <768 | MD ≥768 | LG ≥1024 |
|---|---|---|---|
| display-lg | 42 | 54 | 64 |
| display-md | 38 | 48 | 56 |
| display-sm | 34 | 42 | 48 |
| h1 | 26 | 30 | 36 |
| h2 | 22 | 24 | 28 |
| h3 | 20 | 21 | 22 |
| h4 | 18 | 18 | 18 |
| h5 | 16 | 16 | 16 |
| h6 | 14 | 14 | 14 |

Text and Label are fixed at all breakpoints, except label-xl: 19px (SM-XS, MD), 20px (LG).

## Line height — unitless, never px, same at every breakpoint

| Token | Value | Applied to |
|---|---|---|
| `--typography-line-height-narrower` | 1.12 | Display |
| `--typography-line-height-narrow` | 1.20 | H1–H6, Label |
| `--typography-line-height-compact` | 1.32 | Not for headings |
| `--typography-line-height-normal` | 1.50 | Text / body |
| `--typography-line-height-wide` | 1.75 | Special editorial only |

## Letter spacing — none on Web

No letter-spacing tokens and no `letter-spacing` in product CSS: text uses the browser default (the font's own spacing). Removed 2026-11-25 (tokens 1.0.5); Figma styles are all 0 and the Figma variables are deleted. Don't add one back without the user's confirmation.

Every heading, `.h1`–`.h6` or hand-built at a heading size (card titles, section titles, toast/popover titles), uses line height narrow.
