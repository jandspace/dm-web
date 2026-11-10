---
paths:
  - "styles/scss/**/*.scss"
---

# SCSS rules

## Structure

| Folder | Ships? | Holds |
|---|---|---|
| `foundation/` | Yes | Reset, breakpoints, typography utilities, spacing, border radius, elevation, icon, layout |
| `components/` | Yes | One file per component (`_button.scss`). Demo in `components/<name>/` |
| `modules/` | Yes | One file per module or module part (`_article-card.scss`, `_editorial-badge.scss`). Demo in `modules/<name>/` |
| `scaffolding/` | No | Demo-page styling: grid, section headers, side panel, token tooltips, notes index, drag-swipe |
| `experiments/` | No | Whole-page experiment styles (`_homepage.scss` for `202611-exp-homepage/`) |
| `projects/` | No | Project page styles (`_<name>.scss`) |
| `main.scss` | — | Entry point. `@use` only, no styles |

Product files must hand off cleanly to developers. Demo or page-only styling never goes into `components/` or `modules/`.

## Tokens in CSS

- Colour: `var(--color-{category}-{context}-{variant})`. Categories: `background`, `text`, `border`, `icon`. Never `--primitive-colors-*`, never hex.
- Spacing: `var(--spacing-N)` (alias of `--number-spacing-N`, `foundation/_spacing.scss`).
- Radius: `var(--border-radius-N)` (alias of `--number-border-radius-N`, `foundation/_border-radius.scss`).
- Shadow: `var(--elevation-1)` … `var(--elevation-5)` (`foundation/_elevation.scss`, from Figma effect styles Elevation Lv-1…5). Never a raw `rgba()` shadow.
- Typography: `var(--typography-…)`, or better, the `.h1`–`.h6` etc. utility classes (see typography rules).
- Light mode: `:root, [data-theme="light"]`. Dark mode: `[data-theme="dark"]`.

### Editorial section colours

Variants per section: `base`, `base-darker`, `subtle`, `subtlest`, `deep`. Example: `--color-text-showbiz-red-base`.

| Section | Colour | Section | Colour |
|---|---|---|---|
| Home | Blue | Travel | Navy |
| News | Cyan | Shopping | Indigo |
| Showbiz | Red | Crime | Petrol |
| Sport | Green | Property | Fuchsia |
| Royals | Violet | Podcasts | Yellow |
| Money | Purple | Games | Ultramarine |
| Lifestyle | Azure | Science | Orange |
| Health | Turquoise | TV | Magenta |

Game colours (Quiz green, Sudoku blue, Word orange, Number pink, Brain purple) are not editorial sections.

### Elevation — pick by role, not by eye

| Level | Role | Examples |
|---|---|---|
| 0 | Page: scrolls with it, split by keylines | Page, Article Card |
| 1 | Sticky: stuck to an edge | Sticky Navbar |
| 2 | Floating control | Carousel arrows, back-to-top |
| 3 | Floating panel: stays while reading | Mini video player |
| 4 | Temporary: closes on outside click or by itself | Dropdown Menu, Nav Panel, Tooltip, Toast |
| 5 | Modal: blocks the page, over a scrim | Modal |

Source: Elevation doc § 2 (`docs/3_Foundation__06_Elevation.md`).

### Border radius — everyday steps are 0, 4, 8, 16, Full

| Token | Use |
|---|---|
| `--border-radius-0` | Sharp corners, full-bleed modules |
| `--border-radius-4` | Thumbnails |
| `--border-radius-8` | Image-based cards (Image Only, image carousel items) |
| `--border-radius-16` | Modals |
| `--border-radius-full` | Pill buttons, avatars (999px) |

Other steps exist but are rare. Reach for these first.

## Keylines, backgrounds, strokes

- **Keylines** are drawn by the block itself as a pseudo-element with the Divider mixin: `@include divider.divider` (`components/_divider.scss`; args `vertical`, `$inset: false`). Never an `<hr>`.
- Keyline colour: `--color-border-translucent-dark-pale`. It is translucent, so it reads on tinted surfaces too. Not `effect/translucent-dark/pale` (that is for fills and shadows). On dark surfaces only, use a light keyline.
- Figma `border/neutral/light` keylines in Web frames are copied App values. Treat as a mistake.
- **Backgrounds:** use background tokens directly. Figma Surface layers (and Surface to darker) map 1:1 to tokens, so there is no Surface component in code. Stack backgrounds with one `background` declaration or a pseudo-element. Map: Colour doc § 8 (`docs/3_Foundation__02_Colour.md`).
- **Figma strokes in auto-layout:** check *Strokes* under Advanced layout settings (`strokesIncludedInLayout`).
  - Included in layout (preferred): plain `border` + the Figma padding.
  - Excluded (Figma default): draw as `box-shadow: inset …` and keep the padding. Or ask the designer to switch to Included.

## Writing CSS

- Use existing tokens, components and mixins first (Button, Divider, Scroll Row, `.icon`…).
- Short selectors, low specificity. One class where one class does it. No deep descendant chains.
- One layout method per element (flex or grid). `gap` between siblings, not margins.
- Variant values as custom properties (e.g. `--toggle-width`) so a variant overrides one value instead of repeating rules.
- No `!important`. Example fix: put a `prefers-reduced-motion` block at the end of the file repeating the same selectors.
- Mobile-first: XS is the base with no media query; scale up with `@include bp.respond-to(sm|md|lg|xl)`.
- Mobile landscape: `@include bp.phone-landscape`. Layout and padding only, never typography.
