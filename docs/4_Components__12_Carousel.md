# Carousel

Items in a row that scrolls sideways and snaps an item to the start. Every carousel has to show that there is more than what is in view — the two types do it in different ways.

Figma: Web UI Kit › Carousel (3927:40511) — Carousel Indicator, Indicator item. (The Figma page sits under Modules; in code it is a Component: it has no content of its own and modules are built with it.)
Code: `styles/scss/components/_carousel.scss` · behaviour `scripts/modules/carousel.js` · demo `components/carousel/`.
Used by: Article Card carousel (Slide), Shorts Signpost (Row).

---

## 1. Types — how the reader sees there is more

| Type | In view | Shows there is more by | Dots |
|---|---|---|---|
| **Row** (default) | Several items, each its own width | The item **cut off on the right** — with a 16px fade on the edge | **No** |
| **Slide** (`.carousel--slide`) | One item fills the box | **Dots** — nothing else is in view | **Yes** |

Rule: **if an item is cut off, no dots; if one item fills the box, dots.** On a Row the cut-off item already says "more"; dots would also be ambiguous there (one per item or per page? the number in view changes with the width). On a Slide there is no cut-off item, so the dots (and the arrows, at every width) are the sign.

- Dots only up to **7 items** (the Figma Indicator stops at 7). More than that is a Row.
- This is a rule of the type, not an editor's choice.

## 2. Structure

```html
<div class="carousel [carousel--slide" data-theme="light"] [data-autoplay]>
  <div class="carousel__track">
    …items (any element: img, video, a card link)…
  </div>
  <div class="carousel__nav carousel__nav--prev"><button type="button" class="btn btn-tertiary-neutral btn--icon-only" aria-label="Previous"><span class="icon icon--arrow-left-light" aria-hidden="true"></span></button></div>
  <div class="carousel__nav carousel__nav--next"><button type="button" class="btn btn-tertiary-neutral btn--icon-only" aria-label="Next"><span class="icon icon--arrow-right-light" aria-hidden="true"></span></button></div>
  <!-- Slide only -->
  <div class="carousel__dots" aria-hidden="true"><span class="carousel__dot"></span> × n</div>
</div>
```

| Part | Notes |
|---|---|
| `.carousel__track` | Scroll Row (no scrollbar, smooth paging, instant with reduced motion). `scroll-snap-type: x mandatory`: a swipe always stops with an item at the start. Its children are the items — no wrapper |
| Row fade | `mask-image`, 16px on the right edge (Scroll Row `fade-end`), so the cut-off item fades out. None on a Slide |
| Slide items | Each `flex-basis: 100%` (`min-width: 0`, so an image shrinks to the box). The module sizes the box |
| `.carousel__nav` | **Slide: every width. Row: LG only** (§ 6). 40px tertiary icon-only button, 8px around it, at the vertical centre of the picture — with or without dots. No shadow (flat on the picture, not an Elevation level). 40% opacity, 100% while the carousel is hovered or the arrow focused. No Prev at the start, no Next at the end (`hidden`, set by script) |
| `.carousel__dots` | **Inside the picture**, along its bottom edge, over a scrim (`effect/translucent-dark/clear` → `moderate`): centred, 8px gap, 16 × 20 padding (Figma: 8 around the Indicator + its own 8 × 12), no clicks (decorative). Never under the picture — in a card the headline follows the picture directly, and the arrows stay at its centre |
| `.carousel__dot` | 8 × 8, `.is-active` 32 × 8 (width animates 200ms) |

### Module settings

Set on the carousel or a parent:

| Property | Default | Use |
|---|---|---|
| `--carousel-gap` | 0 | Space between items |
| `--carousel-inset` | 0 | Where the first item sits — and where a snapped item stops (`scroll-padding`) |
| `--carousel-end` | 0 | Room after the last item |

Shorts Signpost: 8 · 16 (0 from MD) · 16.

## 3. Dots (Carousel Indicator)

Figma: Article Card Media › Carousel Slider (5279:14017).

| Dot | Size | Colour |
|---|---|---|
| Inactive | 8 × 8 | `effect/translucent-light/moderate` |
| Active | 32 × 8 | `background/neutral/lightest` |

One look only: dots always sit on the picture, over the dark scrim. (The Figma Carousel Indicator also has On Light Background variants; no Slide uses them, so they are not in code.)

**With Auto-Play** (`data-autoplay`) on a Slide: the active dot is a track in the inactive colour that fills with the active colour — 8px → 32px in 5s. When it is full the carousel moves to the next slide; after the last, the first. Any slide change starts a new fill. With `prefers-reduced-motion: reduce` there is no fill — the active dot is a plain 32 × 8.

**A Slide is always Theme Pinned** (`data-theme="light"` on `.carousel`): the picture does not change with the theme, so the scrim, the dots and the arrows must not either. On a Row only the items on pictures and the arrows carry it (Shorts Signpost).

## 4. Autoplay

`data-autoplay` on either type. Every **5s** the carousel moves as **Next** does; after the end, back to the first item.

| | Slide | Row |
|---|---|---|
| Step | The next slide | The item cut off on the right moves to the start (a page of items) |
| Timing | The active dot's fill (CSS animation) — it shows the wait | A 5s timer in the script, started again whenever the row stops — nothing shows the wait |

Both wait while the carousel is hovered with a mouse, has keyboard focus, or is less than half on screen; any move (arrow, swipe) starts the 5s again. None with `prefers-reduced-motion: reduce`.

## 5. Behaviour

`scripts/modules/carousel.js`

| | |
|---|---|
| **Next** | The first item cut off on the right moves to the start. On a Slide that is the next slide |
| **Prev** | The reverse: the row moves back until the item that was first is the one cut off on the right. Next then Prev returns to where it was |
| **Swipe / trackpad** | Snaps an item to the start |
| **Dots** | Follow the item at the start. Slide: the other slides get `aria-hidden` |
| **`carousel:settle`** | Event on `.carousel` when the row stops; `detail.item` is the item at the start (or the one an arrow brought there). Shorts Signpost plays that card's preview |

Call `Carousel.init(root)` after adding carousels to the page.

## 6. Arrows by device

| | LG ≥1024 (desktop) | Below LG (tablet, mobile) |
|---|---|---|
| **Slide** | Arrows | **Arrows** + swipe |
| **Row** | Arrows | No arrows — swipe |

- **Desktop:** arrows on both — a mouse cannot swipe.
- **Slide on touch:** a single picture gives no hint that it moves. The arrows (with the dots) tell the reader it is a slider, and are a way to move it besides swiping. They rest at 40% (there is no hover on touch) and come to 100% while tapped.
- **Row on touch:** the item cut off on the right already says "swipe me", and arrows over a row of small cards would cover them. Swipe only.

Code: `--carousel-nav` on `.carousel` — `none` below LG on a Row, `block` otherwise.

## 7. Notes / open points

- **Mouse drag on demo pages only:** the demos load `scripts/scaffolding/demo-drag-swipe.js`, so a mouse can drag a track to try the touch swipe on a desktop (it snaps like a swipe; a drag is not a click). Not product behaviour — on the site a mouse uses the arrows and a trackpad scrolls.
- **Figma page:** Carousel is under Modules in the Figma file; proposed to move it to Components.
