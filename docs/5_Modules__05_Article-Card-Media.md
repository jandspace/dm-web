# Article Card Media

What fills the media box of an Article Card (`.article-card__media`). Three types:

| Type | Cards | What the reader can do |
|---|---|---|
| **Image** | Every card, Image Only included | Nothing in the media — a click opens the article. Photo, or a short animated preview |
| **Video** | Not SM thumbs, not Image Only | Play / pause, sound, full screen, share — in the card |
| **Carousel** | Not SM thumbs, not Image Only | Browse up to 5 images or previews; a click on a slide opens the article |

Figma: Web UI Kit › Article Card Media (5279:14012), Article Card Media - Video (5279:13909), Article Card Media - Carousel (5279:14031).
Code: `styles/scss/modules/_article-card-media.scss` · behaviour `scripts/modules/article-card-media.js` · demo `modules/article-card-media/`.

The aspect ratio comes from the card type (see Article Card § 2 and Media). Corners: the card's (4px; Image Only 8px).

---

## 1. Image

- **Photo** — `<img>` straight in `.article-card__media`.
- **Animated preview** — `<video data-preview muted loop playsinline preload="metadata">` in place of the image: 5–7 seconds, no sound, no controls. It plays while at least half of it is on screen and pauses off screen (as on the live site). With *Reduce motion* on it does not play and shows its first frame.
- **Video articles** add the play icon (Article Card § 3-C) — an indicator only; the card link takes the click. Works the same on a photo or a preview.

## 2. Video

`.article-card__media.article-card-player` — the reader plays the video in the card. Starts muted.

| Part | Class | Notes |
|---|---|---|
| Video | `video` | `muted playsinline preload="metadata"`, `src` with `#t=0.1` so the first frame shows as the still |
| Surface | `button.article-card-player__surface` | Covers the media: play / pause. `aria-label` follows the state |
| Centre | `.article-card-player__play` | Video Player Controls `.video-play` lg 56 + `.video-timer` 8px below. Decorative |
| Actions | `.article-card-player__actions` | Right edge, 29px above the bottom: Full screen (`arrows-expand`) · Sound (`speaker-off` / `speaker-on`) · Share (`sharing-android`) — `.btn.btn-tertiary-light.btn--icon-only`, 16px gap (8px when the media is under 215px high) |
| Progress | `.video-progress.video-progress--inline` | Elapsed · 8px track · remaining, one row, 8 / 16 padding, on the dark gradient |

### States (`data-state`)

| State | Shows |
|---|---|
| `ready` | Light play button (`translucent-light/thick`) + duration. No actions, no progress |
| `playing` | Actions + progress. No centre button |
| `paused` | Dark play button (`translucent-dark/moderate`, white icon) + actions + progress |

At the end the video goes back to `ready`.

### Controls while playing

- **Mouse:** the actions and progress fade out (300ms) after 3s without the pointer moving, and come back when it moves.
- **Touch:** while the controls are hidden, the first tap only brings them back; a tap while they show pauses.
- **Keyboard:** controls stay while keyboard focus is inside the player (`:focus-visible` — the focus a mouse click leaves does not count).
- Paused or ready: always shown.

### Sharing

`navigator.share` with the article URL (the card link); where it is not available, the URL is copied.

## 3. Carousel

`.article-card__media.article-card-carousel` — up to 5 items, each an image or an animated preview.

| Part | Class | Notes |
|---|---|---|
| Track | `.article-card-carousel__track` | Horizontal scroll-snap row — swipe on touch, trackpad scroll on desktop |
| Item | `.article-card-carousel__item` | `img` or `video[data-preview]` (a preview plays only while its slide shows) |
| Arrows | `.article-card-carousel__nav--prev` / `--next` | `.btn.btn-tertiary-neutral.btn--icon-only` (`arrow-left-light` / `arrow-right-light`), 8px from the edge, vertically centred. 40% opacity, 100% on media hover or focus. No Prev on the first slide, no Next on the last |
| Dots | `.article-card-carousel__dots` | Bottom, on a dark gradient. Active 32 × 8 `background/neutral/lightest`; others 8 × 8 `effect/translucent-light/moderate`, 8px gap. Decorative |

**Arrows stay on touch screens.** There is no hover there, so they rest at 40% — still visible, so readers can tell the images move, and tappable. Swipe works as well. The dots show how many images there are.

## 4. In a card

- Video and Carousel sit above the card link (`z-index: 2`, like the metadata links). A click on them stays in the media; the headline still opens the article.
- A click on a carousel slide is passed on to the card link, so it opens the article as an image does.
- The card hover surface does not show while the pointer is over the player or the carousel — only over the rest of the card.

## 5. Notes / open points

- **Square (1:1):** Figma shows each type at Landscape, Square and Portrait. No card type uses 1:1 yet (Large 358:215, Vertical 2:3), so the demo sets it only to show the media.
- **Paused button:** `translucent-dark/moderate` here; the Video Player Controls Pause button is `translucent-dark/thick`. Kept as in Figma.
- **Preview file size:** the sample preview is 2580 × 1440 (2.9 MB). A real preview should be about card size (≈ 720px wide) and well under 1 MB.
