# Section Header

Title row that opens a section on the homepage and channel pages. Two components:

- **Section Header** — label, optional leading icon, link arrow, action, description and sub-items.
- **Section Header - Branded** — a banner with a background image and the channel name or logo, for branded channels and verticals.

Figma: Web UI Kit › Section Header (7648:22288), Section Header - Branded (6416:109910). Item sets: DM26 App › Section Header / Title Bar redesign (34325:40868).
Code: `styles/scss/modules/_section-header.scss`, `_section-header-branded.scss` · demo `modules/section-header/`.

---

## 1. Section Header

### 1-A. Structure

Minimal markup — no row or label wrappers. The header lays out its children itself (flex-wrap): title … action on the first line, description and sub-items on a line each.

```html
<!-- Linked: icon + label + arrow, one link -->
<header class="section-header">
  <h2 class="section-header__title"><a class="section-header__link" href="/showbiz"><img class="section-header__icon" src="ico-ch-uk-showbiz-color.svg" alt="" /><span class="section-header__text">More Showbiz<span class="section-header__arrow btn btn-quaternary-neutral btn--icon-only" aria-hidden="true"><span class="icon icon--arrow-right-light" aria-hidden="true"></span></span></span></a></h2>
  <a class="section-header__action" href="/showbiz/all">Action Here<span class="icon icon--chevron-right" aria-hidden="true"></span></a>
  <p class="section-header__description">Preview text</p>
</header>

<!-- Not linked: the title holds icon + label directly -->
<header class="section-header section-header--sm">
  <h2 class="section-header__title"><span class="icon icon--square-dashed section-header__icon" aria-hidden="true"></span>War in the Middle East</h2>
</header>
```

| Part | Class | Notes |
|---|---|---|
| Container | `.section-header` | `color/background/neutral/lightest`; padding 20 top · 8 bottom · 16 sides; 8px gap between lines and between title and action |
| Title | `h2.section-header__title` | Fills the first line. Holds the link — or, when the header does not link, the icon and label directly |
| Link | `a.section-header__link` | Icon + label + arrow — **one link** |
| Leading icon | `.section-header__icon` | Optional — on the icon itself: `.icon` (follows the label colour, also on hover) or `<img>` (keeps its colours). Centred on the first label line; a wrapped label runs on under the text, not under the icon |
| Label text | `.section-header__text` | Only in a linked header — it holds the arrow. Without a link the label is plain text in the title |
| Arrow | `.section-header__arrow` | `.btn.btn-quaternary-neutral.btn--icon-only`, decorative (`aria-hidden`). Sits **inside** `.section-header__text`, right after the last word |
| Action | `a.section-header__action` | Optional, right of the title — label + chevron, its own link |
| Description | `.section-header__description` | Optional preview text — text-sm Regular, line-height normal, `color/text/neutral/grey-dark` |
| Sub-items | `.section-header-tabs` | Optional — MD only (see 1-D) |

### 1-B. Scale

| | Medium (default) · Primary | Small · Secondary |
|---|---|---|
| Class | `.section-header` | `.section-header.section-header--sm` |
| Label | dmw_sans/h3/Bold — 20 · 21 · 22 (<768 · ≥768 · ≥1024, via the h3 token) | dmw_sans/h4/Bold — 18 |
| Icon | 20 (<768) · 22 (≥768) | 18 |
| Icon ↔ label gap | 6 (<768) · 8 (≥768) | 6 |
| Arrow button | 40, icon 16 | 30, icon 14 |
| Height (label row) | 52 · 53 · 54 | 50 |
| Sub-items | ✓ | — |

Mweb (SM-XS <768) and Dweb (LG ≥1024) use the same component; the breakpoint only changes the sizes above.

### 1-C. Item sets

| Items | Medium | Small |
|---|---|---|
| Label only | ✓ | ✓ |
| Label, Link arrow | ✓ | ✓ |
| Icon, Label | ✓ | ✓ |
| Icon, Label, Link arrow | ✓ | ✓ |
| Icon, Label, Link arrow, Description | ✓ | ✓ |
| Icon, Label, Link arrow, Sub-items | ✓ | N/A |
| Label, Sub-items (topic, no link) | ✓ | N/A |

Action ("Action Here ›") can be added to any linked or unlinked header.

### 1-D. Sub-items (Channel Tabs)

Sub-channels or topics in one row that scrolls sideways.

- Item: label-sm Semibold, `color/text/neutral/dark`, 4px vertical padding, 16px apart.
- Hover: a 1px `color/border/neutral/grey-dark` line grows from the left under the label.
- **Mweb (<768):** swipe; the right edge fades out (16px).
- **Dweb (≥768 with a mouse):** chevron edge buttons ("Horizontal Scroll Edge": 32px, surface gradient from transparent to 40%, 14px chevron in `color/icon/neutral/grey-dark`; on hover the chevron turns `color/icon/interaction-primary/default` and the surface steps to `color/background/neutral/lighter`) on the side(s) that can scroll. Each click scrolls ~80% of the row. The shared Scroll Row script (`scripts/modules/scroll-row.js`) sets `[hidden]` on an edge that cannot scroll — the same script runs Tabs and the Sticky Navbar.

### 1-E. Interaction

- Hover / keyboard focus on the link: label and icon turn `color/text/interaction-primary/default`, the arrow shows its quaternary surface (`color/background/neutral/light`).
- **Long labels wrap — no truncation.** The arrow follows the last word onto whichever line it ends on; a leading icon stays on the first line and the wrapped lines run on under the text.
- The arrow slides 8px to the right on hover (Figma Label Container: no gap at rest, 8px on hover), 0.2s; no motion with reduced motion.
- Action: `interaction-primary/default` → `interaction-primary/hover`, plus the hover line of the Article Card Metadata links (1px `color/effect/translucent-dark/deep`, grows from the left).

---

## 2. Section Header - Branded

### 2-A. Structure

| Part | Class | Notes |
|---|---|---|
| Container | `.section-header-branded` | lightest; padding 20 top · 8 bottom · 16 sides; 4px gap |
| Banner | `a.section-header-branded__banner` | **The whole banner is the link.** 52px, 8px corners, 4px / 48px padding |
| Background | `img.section-header-branded__bg` | Cover image, blurred 4px |
| Surface | banner `::before` | `color/effect/translucent-dark/pale` → `translucent-dark/deep` on hover |
| Name / Logo | `span.section-header-branded__name` or `img.section-header-branded__logo` | Straight in the banner (no slot wrapper) — channel name or logo, centred, max 44px tall |
| Name (text) | `.section-header-branded__name` | dmw_serif/h2/Semibold, white |
| Arrow | `.section-header-branded__arrow` | `.btn.btn-tertiary-dark.btn--sm.btn--icon-only` (34, icon 14), 8px from the right, decorative |
| Sub-items | `.section-header-tabs` | Optional, as in 1-D |

### 2-B. Notes

- The slot takes either text (the channel name in the serif face) or a logo image (SVG/PNG, white on the dark surface).
- The blur is applied to the image (`filter`), not as a `backdrop-filter` on the surface: same look, and no backdrop-filter layer for Chrome to leave unclipped at the rounded corners.
