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

`.h1`–`.h6`, `.display-*`, text and label classes in `styles/scss/foundation/_typography.scss` bundle size, weight, line height and letter spacing. They are the code version of Figma Semantic Styles (e.g. `dmw_sans/h2/Semibold`). Use them instead of assembling `--typography-*` tokens by hand.

Token naming: `--typography-{property}-{role}-{level}` (e.g. `--typography-font-size-h1`, `--typography-font-weight-bold`).

## Typefaces

Inter and Lora are the DM Web typefaces. No other typeface without the user's confirmation first.

| Family | Use |
|---|---|
| Inter (sans, default) | All UI, body, labels, metadata, and article headlines on Web |
| Lora (serif) | Editorial emphasis: Web headlines where Figma calls for it, quotes, branded names |

### Mixing — hard rule

- **One text element = one typeface.** Never two typefaces inside one heading, label or paragraph.
- **One component = one typeface**, except these cases:
  1. Article Card headline with `.serif` (`<h4 class="h4 serif article-headline">`). Size, weight and line height stay as the level sets them; the rest of the card stays Inter.
  2. Columnist quote headline (always `.serif`, with the columnist photo).
  3. Section Header Branded: the text name in Lora (`dmw_serif/h2/Semibold`), the rest Inter.
- Any other mix is flagged to the user, **even if Figma shows it**. Don't build it until confirmed.
- Demo chrome in `styles/scss/scaffolding/` (side panel, labels, monospace code) is not product UI and is out of scope.

### Third-party typeface exception

- **Literata** — the font of the external games module design system. Allowed only for game titles in the homepage experiment (`styles/scss/experiments/_homepage.scss`, Sport Games), loaded from Google Fonts in the page `<head>`, no token.
- It never goes into `components/`, `modules/` or the type tokens.
- Any new use of Literata, or any other third-party typeface, needs the user's confirmation first; once confirmed, add it to this list.

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
| `--typography-line-height-narrow` | 1.20 | H1–H4, Label |
| `--typography-line-height-compact` | 1.32 | H5–H6 |
| `--typography-line-height-normal` | 1.50 | Text / body |
| `--typography-line-height-wide` | 1.75 | Special editorial only |

## Letter spacing (% of font size)

| Token | Value | Applied to |
|---|---|---|
| narrow | -0.5% | Display, H1 |
| compact | -0.2% | H2–H3 |
| normal | 0 | H4–H5, text-lg–md, Label |
| wide | +0.25% | H6, text-sm–xxsm, small metadata |
