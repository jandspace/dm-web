---
paths:
  - "styles/scss/**/*.scss"
  - "components/**/*.html"
  - "modules/**/*.html"
  - "foundation/**/*.html"
  - "experiments/**/*.html"
  - "projects/**/*.html"
---

# Breakpoints and layout

## Adaptive product, responsive prototypes

The live DM site is adaptive: desktop and mobile web are separate sites. A unified responsive build is not planned.
This library is still written mobile-first and responsive from XS to XL, so each component works on both sites. Project pages cover every breakpoint unless the project says otherwise.

## Breakpoints

Source of truth: `styles/scss/foundation/_breakpoints.scss`. Use `@include bp.respond-to(sm|md|lg|xl)`, never hand-written media queries.

| Name | Min width | Container | Typical context |
|---|---|---|---|
| XS | base (no query) | fluid | Phone portrait |
| SM | 640 | 720 | Large phone, foldable |
| MD | 768 | 960 | Tablet portrait |
| LG | 1024 | 996 | Desktop |
| XL | 1580 | 1224 | Wide desktop, room for Side Ads |

- Phone landscape: `@include bp.phone-landscape` = `(orientation: landscape) and (max-height: 500px)`, so tablets are excluded. Layout columns and padding only, never typography.
- Typography tokens switch at 768 and 1024 only.
- **Side Ads** (160×600 beside the container) show from LG. Fully in view from 1350px (996 + 2 × 168 + 17px scrollbar). Narrower, they are cut at the window edge: `overflow-x: clip` on body, never a sideways scroll. XL starts at 1580 so the 1224 container leaves room for them too.

## Layout classes

`styles/scss/foundation/_layout.scss` · demo `foundation/layout/` · Layout & Grid doc § 5 (`docs/3_Foundation__05_Layout-and-Grid.md`).
Column grid: 12 columns from LG, 6 below, no gutters. Class names match Figma page frames.

| Class | Figma | Role |
|---|---|---|
| `.layout-full` | Fullwidth | One section: a module, a split or a row, optional section header on top |
| `.layout-split` | — | Alpha 2/3 + Beta 1/3 from LG. Stacked below LG (Beta under Alpha) |
| `.layout-split--joined` | — | One channel block: no keyline between Alpha and Beta side by side. Stacked, Alpha keeps its bottom keyline |
| `.layout-alpha` / `.layout-beta` | Alpha / Beta | Main column / right rail (332 at LG, fits an MPU). Beta has no padding |
| `.layout-row` > `.layout-col` | Row / Col 1-n | Equal columns from MD (2 → 1/2, 3 → 1/3, 4 → 1/4). Stacked below MD. Cards stack inside each column. Replaces the old nested `column-splitter` |
| `.layout-inset` | inner container | Wraps a box with its own background (e.g. tinted box in Beta): one content block with 16px inset and a keyline |

- Layout classes have **no gap and no padding**. Each card or block carries its own 16px inset, so neighbours sit 32px apart.
- Keylines (`--color-border-translucent-dark-pale`, 1px) sit 16px in from each end, horizontal and Beta's vertical one. Sections, rows and cards each draw their own. The last child of its parent has none (`:last-child`, no override classes).
- So put cards straight into `.layout-col`. Never one wrapper per card.
- SM cards: Left Thumb in Alpha and other main columns, Right Thumb in Beta.
- Hiding or reordering a block at a breakpoint is a page decision, not a layout class.

## Demo viewport switches

Viewport buttons name the breakpoint, never a device width: `XL ≥1580 · LG ≥1024 · MD ≥768 · SM-XS <768` (or `SM ≥640 · XS <640` when they differ), matching Figma variant names. The preview width shows only in the status text, as `1440px preview`.
