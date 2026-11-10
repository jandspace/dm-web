# Featured Links

A short list of links to featured pages — two or three items, each a thumbnail, a heading and a line of text. The whole item is the link. Usually Fullwidth under a Section Header (homepage: "Featured", icon `squares-plus`).

Figma: Web UI Kit › Featured Links (6514:79008) · Featured Link Items (6514:79024: Breakpoint LG ≥1024 / SM ≥640 / XS <640) · homepage block (8963:98140).
Code: `styles/scss/modules/_featured-links.scss` · demo `modules/featured-links/`.

---

## 1. Structure

```html
<section class="layout-full">
  <header class="section-header">
    <h2 class="section-header__title"><span class="icon icon--squares-plus section-header__icon" aria-hidden="true"></span>Featured</h2>
  </header>
  <div class="featured-links">
    <a class="featured-link" href="…">
      <span class="media featured-link__thumb"><img src="…" alt="" /></span>
      <div class="featured-link__body">
        <h3 class="h4 featured-link__title">Heading</h3>
        <p class="label-sm featured-link__text">One line of text</p>
      </div>
    </a>
    …
  </div>
</section>
```

| Part | Class | Notes |
|---|---|---|
| List | `.featured-links` | Stacked below SM; a row from SM, items of equal width. No padding — each item carries its own 16px inset |
| Item | `a.featured-link` | The link. 16px padding, 12px between the thumbnail and the text. Keyline: see § 3 |
| Thumbnail | `.media.featured-link__thumb` | Media box, 64 × 64 (1:1, cover), 4px corners. The image is decorative (`alt=""`): the heading names the link |
| Body | `.featured-link__body` | Heading + text, 8px apart. Needed because the thumbnail–text gap (12) and the heading–text gap (8) differ |
| Heading | `h3.h4.featured-link__title` | H4 Bold (18, 700, 1.2) — `dmw_sans/h4/Bold`, like the Section Header title; `text/neutral/darker`. `h3` under the section's `h2` |
| Text | `p.label-sm.featured-link__text` | Label SM Regular (14, 1.2), `text/neutral/dark` |

## 2. Breakpoints

| Breakpoint | Figma variant | Layout | Item |
|---|---|---|---|
| MD ≥768 (LG, XL) | LG ≥1024 | Row | Thumbnail beside the text |
| SM ≥640 | SM ≥640 | Row | Thumbnail above the text |
| XS <640 | XS <640 | Stacked, full width | Thumbnail beside the text |

The block lays itself out by breakpoint (its own row, not `.layout-row`): Figma keeps the row at SM, while `.layout-row` stacks below MD.

## 3. Keylines

The keyline follows the layout, and the **last item never has one**:

| Layout | Keyline | |
|---|---|---|
| Row (SM+) | Vertical, on the right of each item | 16px in from the top and bottom (Divider, vertical) |
| Stacked (XS) | Horizontal, under each item | 16px in from each side (Divider) |

Drawn by the item's `::after` with the Divider mixin; `:last-child` drops it — no modifier classes. The section's own keyline below the block comes from `.layout-full`.

## 4. Hover and focus

- Hover: the Article Card hover surface (`article-card.hover-surface` mixins — black at 4%, inset 8px, 8px corners, zooms from 0.4), MD+ with a mouse only. The heading turns `text/interaction-primary/default`, as the Article Card headline does (all breakpoints).
- Keyboard focus: 2px `border/home/blue/base` ring inside the item, and the surface.

## 5. Notes

- Two or three items. More would squeeze the row at SM / MD.
- Figma flags (2026-11-10):
  - Heading style is `dmw_sans/h4/Bold` — an exception to the type rule (Bold for Display and H1–H2), kept as designed (confirmed 2026-11-10).
  - XS keyline is drawn end to end (no padding); code keeps the 16px inset, as every content keyline.
  - The homepage section keyline is `border/neutral/light` (App keyline); code uses the layout keyline (`border/translucent-dark/pale`).
