# Shorts Signpost

A row of Shorts cards that scrolls sideways. Each card shows the Short's cover frame and headline and opens the Short. The Shorts player (the screen a card opens) is not built yet.

Figma: Web UI Kit › Shorts › Shorts Signpost (151:3722) · card: Shorts Signpost - Carousel Card (151:3475).
Code: `styles/scss/modules/_shorts-signpost.scss` · behaviour `scripts/modules/carousel.js` + `scripts/modules/shorts-signpost.js` · demo `modules/shorts-signpost/`.
The row is a **Carousel, Row type** (`docs/4_Components__12_Carousel.md`): arrows, swipe, snap and the cropped cut-off card come from the component; no dots.

---

## 1. Structure

```html
<div class="shorts-signpost">
  <div class="carousel">
    <div class="carousel__track">
      <a class="shorts-card media media--shorts" href="…" data-theme="light">
        <video src="…" poster="…" muted loop playsinline preload="none" aria-hidden="true"></video>
        <p class="shorts-card__headline h6">Headline</p>   <!-- optional -->
      </a>
      …
    </div>
    <div class="carousel__nav carousel__nav--prev" data-theme="light"><button type="button" class="btn btn-tertiary-neutral btn--icon-only" aria-label="Previous Shorts"><span class="icon icon--arrow-left-light" aria-hidden="true"></span></button></div>
    <div class="carousel__nav carousel__nav--next" data-theme="light"><button type="button" class="btn btn-tertiary-neutral btn--icon-only" aria-label="Next Shorts"><span class="icon icon--arrow-right-light" aria-hidden="true"></span></button></div>
  </div>
</div>
```

| Part | Notes |
|---|---|
| `.shorts-signpost` | 16px top and bottom; 16px sides from MD. Keyline below unless last child. Sets the Carousel's `--carousel-gap` 8, `--carousel-end` 16 and `--carousel-inset` 16 (SM-XS: the track runs to the window edge, first card 16px in; 0 from MD) |
| `.shorts-card` | The link is the Media box (`.media--shorts`, 9:16), radius 8. 172 × 306 from MD, 160 × 284 below. Holds the Short's preview `video`; its `poster` is the cover frame |
| Scrim | `::before`, 128px from the bottom: `effect/translucent-dark/clear` → `solid`. Only on a card with a headline |
| `__headline` | Optional — the live site shows none today; leave it out of the HTML when not used (demo filter Headline On / Off). `.h6` (14 semibold, 1.32, +0.25%), `text/neutral/white`, 12px from the card edges, 3 lines max |

**Theme Pinned:** each card and each arrow carries `data-theme="light"`. They sit on the picture, which does not change with the theme — unpinned, the scrim and the white headline would turn light in dark mode.

## 2. Placement and breakpoints

The signpost takes the width of its column, so it fits Fullwidth (`.layout-full`), Alpha or Beta — the row shows as many cards as the column has room for and scrolls the rest. The page decides where it goes (the demo shows it Fullwidth). Figma draws the LG variant in Alpha (664).

| Breakpoint | Figma variant | Card |
|---|---|---|
| LG ≥1024 | Large | 172 × 306, arrows |
| MD ≥768 | Medium | 172 × 306, swipe |
| SM-XS <768 | Small | 160 × 284, swipe; track to the window edge |

## 3. Behaviour

Arrows, swipe and snap: Carousel (`scripts/modules/carousel.js`). Previews: `scripts/modules/shorts-signpost.js`, which plays the card the Carousel stops on (`carousel:settle`).

| | |
|---|---|
| **Next** (LG) | The first card cut off on the right moves to the start of the row and plays its preview |
| **Prev** (LG) | The reverse: the row moves back until the card that was first is the one cut off on the right; the new first card plays |
| **Swipe / trackpad** | The row snaps a card to the start; when it stops, that card plays |
| **Mouse rest** | Desktop with a mouse only: the pointer resting on a card for 1s plays that card |
| **Preview** | One card at a time, muted loop; the card it leaves goes back to its poster. The first card plays at load. Only while the row is at least half on screen; never with reduced motion |

No Prev at the start, no Next at the end. Below LG there are no arrows.

## 4. Notes / open points

- **Cover image:** `.media--shorts` is video only — the cover is the video's poster frame, not a CMS crop.
- **Demo media:** every card plays the same sample clip (Article Card animated preview); the posters are Article Card images, so a poster and the clip don't match.
- **Figma breakpoint names:** the variants still say Large ≥1012 / Medium ≥640 / Small <640. Code follows the current breakpoints (LG ≥1024, MD ≥768).
- **SM "Carousel Control - Left"** (46px button, dashed-square icon) is an off-by-default placeholder in Figma — left out.
- **Card fill:** Figma fills the card with `background/neutral/grey-dark`; the cover always covers it, so the code keeps the Media loading colour.
- **Card hover style, section header, Shorts player:** not defined in Figma yet — to come with the next update.
