# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository Purpose

This is the **DM (Daily Mail) Design System** prototyping workspace. It stores design tokens exported from Figma variables, converted to CSS custom properties, and serves as the base for component and project prototyping across Web, iOS, and Android.

No build system, test runner, or framework — files are maintained manually or via Figma export.
Design system documentation is stored in `docs/` and must be read before any component work begins.

---

## Directory Structure

```
tokens/           — Design token source files (JSON + CSS)
components/       — Reusable UI components (shared across projects)
projects/         — Project-specific prototypes, organised by project > platform
CLAUDE.md         — This file
```

### Project Folder Convention

```
projects/
├── daily-briefing/
│   ├── ios/
│   └── android/
├── daily-mail-shorts/
│   ├── ios/
│   └── android/
├── vertical-module/
│   ├── ios/
│   ├── android/
│   └── web/
└── ...
```

- `components/` → reusable modules shared across multiple projects
- `projects/` → project-specific screens and flows, split by platform

---

## Token Files

| File                            | Format | Purpose                                              |
| ------------------------------- | ------ | ---------------------------------------------------- |
| `dm_colour_tokens.json`         | JSON   | Figma variable export — all colour tokens            |
| `dm_colour_tokens.css`          | CSS    | CSS custom properties for colour tokens              |
| `dm_typography_web_tokens.json` | JSON   | Figma variable export — web typography               |
| `dm_typography_web_tokens.css`  | CSS    | CSS custom properties for web typography             |
| `dm_typography_app_tokens.json` | JSON   | Figma variable export — app typography (iOS/Android) |

---

## Token Architecture

### Two-Layer System

**Foundation (Primitive)** — raw values, not for direct use in UI:

- CSS naming: `--primitive-colors-{hue}-{scale}` (e.g. `--primitive-colors-blue-500`)
- JSON path: `Foundation > Primitive Colors/{Hue}/{Scale}`

**Semantic** — contextual aliases that reference primitive tokens:

- CSS naming: `--color-{category}-{context}-{variant}` (e.g. `--color-background-neutral-white`)
- JSON: `isAlias: true` with a reference to the Foundation collection

**Always use semantic tokens in UI code. Never reference primitive tokens directly. Never use raw hex values.**

### Colour Token Categories

```
color/background/*   — surface fills
color/text/*         — foreground/text colours
color/border/*       — stroke colours
color/icon/*         — icon colours
```

### Editorial Section → Colour Mapping

| Section   | Colour      |
| --------- | ----------- |
| Home      | Blue        |
| News      | Cyan        |
| Showbiz   | Red         |
| Sport     | Green       |
| Royals    | Violet      |
| Money     | Purple      |
| Lifestyle | Azure       |
| Health    | Turquoise   |
| TV        | Magenta     |
| Travel    | Navy        |
| Shopping  | Indigo      |
| Crime     | Petrol      |
| Property  | Fuchsia     |
| Podcasts  | Yellow      |
| Games     | Ultramarine |

Within each section, variants follow the pattern: `base`, `base-darker`, `subtle`, `subtlest`, `deep`.

### Light & Dark Modes

- Light mode: `:root`
- Dark mode: check `dm_colour_tokens.css` for the exact selector (class or data attribute)

---

## Figma Sources

- **App UI Kit (iOS/iPadOS):** https://www.figma.com/design/9GGfDhItlg4swrRaewmhlm/
- **Web UI Kit (Dweb & Mweb):** https://www.figma.com/design/vB97J7hRY6OcmcnKJOOlHj/

When working with a specific component, use the direct frame URL in the prompt. File-level URLs are for reference only.

---

## Breakpoints

DM is currently **adaptive**, not fully responsive. Desktop and mobile are served as separate sites.

### Desktop Web

| Token | Value   | Context         |
| ----- | ------- | --------------- |
| MD    | ≥768px  | Tablet portrait |
| LG    | ≥1024px | Desktop         |
| XL    | ≥1344px | Wide desktop    |

### Mobile Web

- **Base (Portrait):** default, no px breakpoint needed
- **Landscape:** `@media screen and (orientation: landscape)` — adjust layout columns and padding only. Do not change typography.

> A responsive (unified) build is not currently planned. Update this section if that changes.

---

## Typography

### Typefaces

| Role              | Family | Usage                                            |
| ----------------- | ------ | ------------------------------------------------ |
| Sans (default)    | Inter  | All UI, body copy, labels, metadata              |
| Serif (editorial) | Lora   | Article headlines, featured content, quotes only |

Never mix typefaces within a single UI component.

### Type Scale — Role + Level Model

- **Heading** → H1–H6 (web), Large Title–Subhead (iOS), Display Small–Title Small (Android)
- **Text** → Body copy, long-form editorial
- **Label** → Buttons, badges, navigation, metadata
- **Display** → High-impact surfaces only (hero, splash). Use sparingly.

Token naming convention: `--typography-{property}-{role}-{level}`
e.g. `--typography-font-size-h1`, `--typography-font-weight-bold`

### Font Weights

| Weight   | Value | Usage                                               |
| -------- | ----- | --------------------------------------------------- |
| Regular  | 400   | Body copy, secondary metadata                       |
| Semibold | 600   | Default emphasis — headings, buttons, labels        |
| Bold     | 700   | Display only, or H1–H2 where extra impact is needed |

Italic variants are for editorial inline use only. Never apply italic to buttons or functional UI.

### Responsive Font Sizes (Web only)

Mobile-first. SM is `:root` base.

| Style      | SM (<768px) | MD (≥768px) | LG (≥1024px) |
| ---------- | ----------- | ----------- | ------------ |
| display-lg | 42px        | 54px        | 64px         |
| display-md | 38px        | 48px        | 56px         |
| display-sm | 34px        | 42px        | 48px         |
| h1         | 26px        | 30px        | 36px         |
| h2         | 22px        | 24px        | 28px         |
| h3         | 20px        | 21px        | 22px         |
| h4         | 18px        | 18px        | 18px         |
| h5         | 16px        | 16px        | 16px         |
| h6         | 14px        | 14px        | 14px         |

Text and Label are fixed across all breakpoints (except label-xl: SM/MD 19px, LG 20px).

> Confirmed against three independent sources (Figma variables, `tokens/dm_typography_web_tokens.css`, and Zeroheight docs) as of 2026-06-24. An earlier version of the docs/ markdown had incorrect SM values for h1 (28→26), h2 (24→22), display-lg (40→42), and display-md (36→38) — corrected here.

### Semantic Style vs Semantic Token

These two terms look similar but operate at different layers of the system.

**Semantic Token** — a single named CSS custom property that resolves to one value per viewport mode:

```css
--typography-font-size-h2: 22px;          /* SM: root */
--typography-font-size-h2: 24px;          /* MD: ≥768px */
--typography-font-size-h2: 28px;          /* LG: ≥1024px */
```

**Semantic Style** — a Figma-only construct that bundles multiple tokens into one selectable package:

```
dmw_sans/h2/Semibold
  → font-family:    typography-font-family-sans
  → font-size:      typography-font-size-h2      (responsive)
  → font-weight:    typography-font-weight-semibold
  → line-height:    typography-line-height-narrow
  → letter-spacing: typography-letter-spacing-compact
```

**Who uses which:**

- Designers select **Semantic Styles** in the Figma text panel (one click sets all five attributes)
- Engineers reference **Semantic Tokens** individually in CSS (`var(--typography-font-size-h2)` etc.)

**Why our CSS classes bundle tokens:** The `.h2` utility class in `styles/scss/foundation/_typography.scss` applies font-size, weight, line-height, and letter-spacing together — it is the code-side equivalent of the Figma Semantic Style, ensuring a single class applies the full correct treatment without requiring engineers to assemble the tokens manually.

---

## Line Height

### Web — Unitless Multipliers Only

Never use px for line-height on web.

```
line-height = font-size × multiplier
```

| Token                               | Multiplier | Applied To             |
| ----------------------------------- | ---------- | ---------------------- |
| `--typography-line-height-narrower` | 1.12       | Display (all levels)   |
| `--typography-line-height-narrow`   | 1.20       | H1–H4, Label (all)     |
| `--typography-line-height-compact`  | 1.32       | H5–H6                  |
| `--typography-line-height-normal`   | 1.50       | Text/Body (all)        |
| `--typography-line-height-wide`     | 1.75       | Special editorial only |

Line height values do not change across breakpoints.

### iOS

Follow Apple HIG Dynamic Type natively. Do not override system leading values.

### Android

Follow M3 sp values natively. Always define line height in `sp`, never `dp`.

---

## Letter Spacing (Web only)

| Token   | Value  | Applied To           |
| ------- | ------ | -------------------- |
| narrow  | -0.5%  | Display              |
| compact | -0.2%  | H1–H4                |
| normal  | 0      | Body, Label          |
| wide    | +0.25% | Small text, metadata |

iOS and Android: no overrides. Native defaults only.

---

## Coding Rules

- **Never use raw hex values.** Always use semantic colour tokens via CSS custom properties.
- **Never use px for line-height on web.** Use unitless multipliers only.
- Mobile-first CSS: SM as `:root` base, scale up with `min-width` breakpoints.
- Mobile landscape handled with `orientation: landscape`, not px breakpoints.
- Typography does not change on mobile landscape — layout and padding only.
- British English for UI copy and documentation.
- American English for token names, CSS variable names, and code.

---

## JSON Token Schema

```json
{
  "version": "1.0.4",
  "collections": [
    {
      "name": "Collection Name",
      "modes": [
        {
          "name": "Mode Name",
          "variables": [
            {
              "name": "token/path/name",
              "type": "color | string | float",
              "isAlias": true,
              "value": "<raw value> | { collection, name }"
            }
          ]
        }
      ]
    }
  ]
}
```

## Versioning

All token files share the same version string (currently `1.0.4`). Update the `version` field in JSON files and the CSS comment header together when making changes.

## Styles Architecture

- SCSS source: `styles/scss/`
- Compiled CSS: `styles/css/main.css` (auto-generated — do not edit manually)
- Compile once: `npm run build`
- Watch mode (auto-recompile on save): `npm run watch`

### SCSS Structure

- `foundation/` — reset, breakpoints, typography utilities, spacing
- `components/` — **PRODUCT** styles, one file per component (`_button.scss`, `_editorial-badge.scss`, etc.) — these would ship to the real DM site
- `modules/` — project-specific compositions (future use)
- `scaffolding/` — **PROTOTYPE-ONLY** styles for demo pages: grid layout, section headers, token tooltips. Never shipped to production. Clearly separated from `components/` so the real component CSS can be handed off cleanly to developers.
- `main.scss` — entry point, `@use` only, no actual styles written here

### Rules

- Never write `<style>` blocks inside HTML files
- New components always go in `styles/scss/components/_[name].scss`
- New demo/prototype-only styling always goes in `styles/scss/scaffolding/_[name].scss` — never mix into `components/`
- Always add new files to `main.scss` via `@use`
- Always use semantic colour tokens (`var(--color-...)`) and typography tokens (`var(--typography-...)`) — never raw hex or px line-height

---

## Working Rules

- Before starting any task, read all `.md` files in the `docs/` folder
- Apply DM Design System rules and conventions from `docs/` throughout all work
- When working on a specific component (e.g. button), read the relevant doc file first (e.g. `docs/button.md`)
