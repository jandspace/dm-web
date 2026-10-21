# Article Card

An Article Card previews one article: media, headline and metadata. It is the building block of every section front and module. Card **type** sets the layout; the **viewport** sets the sizes within that layout.

Figma: Web UI Kit › Article Card (`5209:5051`), Article Card - Image Only (`5525:5532`), Article Card Metadata (`108:7232`)

---

## 1. Anatomy

| Element | Description |
|---|---|
| **Media container** | Image or video at a fixed aspect ratio per card type. 4px corners (Image Only: 8px) |
| **Headline** | Article Headline (`.article-headline`), H2–H6 by card type. Holds the article link and, optionally, an editorial badge inline at the start |
| **Preview text** *(optional)* | CMS-controlled summary under the headline |
| **Live Key Updates** *(optional)* | Live articles only — replaces the preview text slot |
| **Metadata** | Article Card Metadata row — info on the left, comment counter on the right |
| **Keyline** | 1px bottom line, inset 16px — `color/effect/translucent-dark/pale`. Removed on the last card of a column (`.article-card--no-keyline`) |

The card carries its own 16px inset; the column grid carries none (Foundation › Layout & Grid).

---

## 2. Card Types

| Type | Class | Columns | Media | Headline | Badge |
|---|---|---|---|---|---|
| **XL** | `--xl` | 2 (or full) | 358:215 | H2 | lg |
| **XL (Horizontal)** | `--xl-horizontal` | 2 | 358:215, right from MD | H3 | md |
| **XL (Triple)** | `--xl-triple` | 3 | 358:215, 50/50 from LG | H2 | lg |
| **MD (Vertical Media)** | `--md-vertical` | 1 | 2:3, under the headline | H2 | lg |
| **MD** | `--md` | 1 | 358:215 | H4 | md |
| **SM: Left Thumb** | `--sm-left` | 1 | 4:3 thumb, left | H5 | sm |
| **SM: Right Thumb** | `--sm-right` | 1 | 4:3 thumb, right from LG (left on MD / SM-XS) | H6 | xs |
| **Image Only (Large)** | `--image-only --image-only-large` | 2 | 358:215 (SM-XS 15:16) | H3 | lg, top-left |
| **Image Only (Medium)** | `--image-only --image-only-medium` | 1 | 15:16 | H4 | lg, top-left |

- SM: Left Thumb is used in the main (left) columns; SM: Right Thumb in the right-hand sidebar, where metadata is usually dropped.
- SM Thumb + Columnist metadata: the thumbnail is hidden (Columnist needs ≥300px of text width).

### Max width by breakpoint

The card fills its column span, capped at:

| Span | MD ≥768 | LG ≥1024 | XL ≥1376 |
|---|---|---|---|
| 2 columns (XL, XL Horizontal, Image Only Large) | 768 | 664 | 816 |
| 3 columns (XL Triple) | 768 | 996 | 1224 |
| 1 column (MD, MD Vertical, SM, Image Only Medium) | 384 | 332 | 408 |

SM-XS has no cap — the card runs the full container width.

### Thumbnail width (SM types)

XL 152 · LG 120 · MD / SM-XS 128px

---

## 3. Optional Content

### 3-A. Preview Text

- **Editor-controlled.** Present in the HTML only when the editor switches it on. Never shipped and hidden with `display: none`.
- **Viewport rule (CSS):** never shown at SM-XS — keeps mobile browsing fast. Never on SM thumbs.
- Size: XL card → `text-sm` (14px); every other type → `text-xsm` (13px). Regular, line-height normal, `color/text/neutral/grey-dark`, 3 lines max with ellipsis.

### 3-B. Live Key Updates

- Live articles only, and a Live badge always comes with them. Uses the same slot as the preview text (they never appear together).
- Shown at **every** breakpoint, SM-XS included. Never on SM thumbs.
- Each update is a link to its entry; hover changes the text colour only (`color/text/interaction-primary/default`).

---

## 4. Image Only

The headline sits on the image instead of below it.

- **Overlay:** 228px at the bottom of the image — `color/effect/translucent-dark/thick` + 16px backdrop blur, faded in from the top with a gradient mask. Deepens to `translucent-dark/solid` on card hover.
- **Headline:** white (`color/text/neutral/white`), centred. Stays white on hover.
- **Read more:** Quaternary XS button on dark (`.btn-quaternary-dark .btn--xs`) with a trailing arrow. Decorative — the whole card is the link. On card hover a hover line grows under it (§5-C), no button hover.
- **Badge:** signposted top-left on the image, 16px inset, always lg — never inline in the headline.
- No preview text or Key Updates.

---

## 5. Interaction

### 5-A. Article Link

- **One link per card**, on the headline: `<a class="article-card__link">`. Its `::after` stretches over the whole card, so the card is clickable anywhere while assistive tech hears a single link.
- Secondary links (metadata, columnist announcement, key updates) sit above the stretched area (`position: relative; z-index: 1`) and keep their own targets.

### 5-B. Card Hover

While the pointer is **anywhere in the card** — secondary links included — the card is in its hover state:

| | Rest | Hover / keyboard focus |
|---|---|---|
| Headline | `color/text/neutral/darker` | `color/text/interaction-primary/default` |
| Hover surface | scale 0.4, opacity 0 | scale 1, opacity 4% |

- **Hover surface:** `color/background/neutral/black`, inset 8px (half the card padding), 8px corners, `transition: transform 0.15s, opacity 0.15s`. Only at **MD+ with a pointing device** — `(min-width: 768px) and (hover: hover)`. No hover surface on mobile / touch.
- The headline uses the interaction-primary **default** token, not hover: the resting headline is neutral-darker, so default reads better.
- Keyboard focus: same as hover, plus a 2px focus outline on the card.

### 5-C. Hover Line (links in the card)

Channel, comment counter, affiliate link and Read more share one pattern — a line that grows from the left. No `text-decoration` underline.

| Property | Value |
|---|---|
| Element | `::before` on the link (the link is the positioning container) |
| Size / position | 1px high, `bottom: -2px`, full link width (icon included) |
| Colour | `color/effect/translucent-dark/deep` — on dark surfaces `translucent-light/deep` |
| Motion | `transform: scaleX(0)` → `scaleX(1)`, `transform-origin: left`, `transition: transform 0.2s` |

### 5-D. Channel Hover Colour

The channel link turns its section colour on hover through `--article-card-channel-color` (default Home blue). Set it with a modifier — `.article-card-metadata__channel--showbiz` → `color/text/showbiz-red/base` — or on any ancestor (card, section).

---

## 6. Implementation Notes

- **Grid stacking, not `position: absolute`,** for layers inside the media (Image Only image, scrim, overlay, badge). An absolutely positioned ancestor would trap the stretched link inside it.
- **Line-clamped blocks space with `margin`, not `padding`.** Overflow clips at the padding edge, so bottom padding lets the next line show through.
- **Truncating links** keep the ellipsis on an inner span (`__channel-text`, `__affiliate-text`) so the hover line on the link is not clipped.
- **Icons:** Figma originals are stored in `assets/icons/`; pages use an inline SVG sprite (`<symbol>` with `fill="currentColor"`) so colour comes from tokens.

---

## 7. Files

| | Path |
|---|---|
| Card | `styles/scss/components/_article-card.scss`, `_article-card-image-only.scss`, `_article-card-key-updates.scss` |
| Metadata | `_article-card-metadata.scss`, `_columnist-profile-photo.scss`, `_columnist-comment-announcement.scss` |
| Demo | `components/article-card/index.html` (toolbar: Viewport · Badge · Preview · Metadata), `viewports.html` (every type × breakpoint), `components/article-card-metadata/index.html` |
| Generators | `tools/demo-generators/` — the two `index.html` demo pages are generated |
