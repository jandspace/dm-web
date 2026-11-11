# Article Card

An Article Card previews one article: media, headline and metadata. It is the building block of every section front and module. Card **type** sets the layout; the **viewport** sets the sizes within that layout.

Figma: Web UI Kit › Article Card (`5209:5051`), Article Card - Image Only (`5525:5532`), Article Card Metadata (`108:7232`)

The full-width top story is a separate block — see [Article Card — Banner Story](5_Modules__02_Article-Card-Banner.md).

---

## 1. Anatomy

| Element | Description |
|---|---|
| **Media container** | Image or video at a fixed aspect ratio per card type. 4px corners (Image Only: 8px) |
| **Headline** | Article Headline (`.article-headline`), H2–H6 by card type. Holds the article link and, optionally, an editorial badge inline at the start, followed by a space (§ Badge in the headline). Inter by default; Lora when Figma calls for it (e.g. a columnist's quote) — add `.serif` to the heading, nothing else changes. A columnist's quote headline carries the columnist's photo on its right (§ Quote Headline) |
| **Preview text** *(optional)* | CMS-controlled summary under the headline |
| **Live Key Updates** *(optional)* | Live articles only — replaces the preview text slot |
| **Thumbnail + preview** *(SM: Left Thumb, LG+)* | Under the headline: 4:3 thumbnail with the preview text beside it (§ SM: Left Thumb) |
| **Metadata** | Article Card Metadata row — info on the left, comment counter on the right |
| **Keyline** | 1px bottom line, inset 16px — `color/border/translucent-dark/pale` (Divider). None on the last card of its column (`:last-child`, automatic); `.article-card--no-keyline` removes it anywhere else |

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
| **SM: Left Thumb** | `--sm-left` | 1 | 4:3 thumb — LG+: under the headline, beside the preview; MD / SM-XS: left | H5 | sm |
| **SM: Right Thumb** (Puff) | `--sm-right` | 1 | 4:3 thumb, right from LG (left on MD / SM-XS) | H6 | xs |
| **Image Only (Large)** | `--image-only --image-only-large` | 2 | 358:215 (SM-XS 15:16) | H3 | lg, top-left |
| **Image Only (Medium)** | `--image-only --image-only-medium` | 1 | 15:16 | H4 | lg, top-left |

- SM: Left Thumb is used in the main (left) columns; SM: Right Thumb in the right-hand sidebar, where metadata is usually dropped.
- SM Thumb + Columnist metadata: the thumbnail is hidden (Columnist needs ≥300px of text width).
- "Puff" in the team means SM: Right Thumb — the small card with the image on the right.

### SM: Left Thumb

| Breakpoint | Structure |
|---|---|
| LG / XL | Headline across the card → thumbnail + preview text (12px gap) → metadata across the card. 12px between rows |
| MD / SM-XS | Thumbnail left, headline + metadata on the right. No preview text (the mobile headline is short) |

- Thumbnail and preview are switched together in the CMS (Figma boolean "Thumbnail + Preview Text"). A thumbnail never stands alone; the preview can (it then runs across the card), or both go.
- Thumbnail LG 144 × 108 · XL 152 × 114. The preview runs in full beside it — no truncation; a long preview makes the row taller than the thumbnail.
- Markup is the usual card (media, then `.article-card__body` with headline, preview, metadata); from LG the card is a grid and the body steps aside (`display: contents`).

### Headline length (Desktop / Mobile)

The CMS keeps two headlines per article, each with its own character limit:

| CMS field | Limit | Used at |
|---|---|---|
| Desktop homepage headline | 256 characters | LG, XL |
| Mobile homepage headline | 100 characters | MD, SM, XS — every card type |

The card holds one headline element; which text fills it is the article feed's job, not the card's. Write demo copy at the matching length (mobile headlines are short).

### Quote Headline (columnist photo)

A columnist's quote headline is always serif (`.serif`) and carries the columnist's photo on its right — the photo moved here from the Columnist metadata.

- Columnist Profile Photo, Rectangle, linked to the author page (`tabindex="-1" aria-hidden="true"`, a duplicate of the name link), written after the article link inside the heading.
- Top-aligned, 8px from the text. The cut-out head rises above the disc, so the disc drops by 13/80 of its size — the head lines up with the text top.
- **Default size by level** (Figma Article Card Headline, Quote Headline = Yes, every breakpoint): H2 **xl 80** · H3–H5 **lg 64** · H6 **md 48**. Set with the size modifier in the markup. Whether editors may pick another size in the CMS is still open.
- Live in the comments: the photo takes `columnist-photo--live` (green dot).

```html
<h4 class="h4 serif article-headline">
  <a class="article-card__link" href="…">Headline…</a>
  <a class="columnist-photo columnist-photo--lg" href="…" tabindex="-1" aria-hidden="true"><img class="columnist-photo__img" src="…" alt="Columnist Name" /></a>
</h4>
```

### Badge in the headline

The editorial badge sits inside the article link, at the start of the headline text, size by headline level (H2 lg · H3/H4 md · H5 sm · H6 xs).

- **Gap = one space character**, written after the badge in the markup — no margin. It scales with the headline size (about ¼ of the font size: ≈7px at H2 28, ≈4px at H5 16), is read by screen readers ("Breaking Trump…", not "BreakingTrump…") and is copied with the text. At a line end the browser drops it.
- A newline between the badge and the text counts as the space, so formatted HTML is fine. Never glue the badge to the first word (`</span>Trump`).
- Scripts that insert a badge add the space too (`badgeHTML(…) + ' '`).
- **Vertical position:** `vertical-align: middle`, then a per-size nudge so the badge centre sits on the centre of the headline's capitals — `--headline-badge-shift` in `_article-headline.scss`: xl −3 · lg −2 · md −2 · sm −1 · xs −1px (measured at XS, MD and LG, all within ±0.5px). Retune one size by changing its value, in whole pixels.

```html
<h5 class="h5 article-headline"><a class="article-card__link" href="…"><span class="badge badge--sm badge--highlight article-headline__badge"><span class="badge__label">Breaking</span></span> Corbyn joins Left's demands…</a></h5>
```

### Max width by breakpoint

No max width: the card fills the layout column it sits in (Foundation › Layout & Grid § 5), at every breakpoint.

### Thumbnail width (SM types)

XL 152 · LG 120 (SM: Left Thumb **144**, Figma 5209:5234) · MD / SM-XS 128px

---

## 3. Optional Content

### 3-A. Preview Text

- **Editor-controlled.** Present in the HTML only when the editor switches it on. Never shipped and hidden with `display: none`.
- **Viewport rule (CSS):** never shown at SM-XS — keeps mobile browsing fast. SM: Left Thumb shows it from LG only; SM: Right Thumb never.
- Type: Label Regular, as Figma Article Card Preview Text (108:7210) — line-height narrow (1.2), letter-spacing normal, `color/text/neutral/dark`. Size by card: XL → LG `label-sm` (14px) · SM: Left Thumb → SM `label-xxsm` (12px) · every other type → MD `label-xsm` (13px). No page-level overrides.
- **No truncation** — the text runs in full, exactly as the CMS feeds it, on every card type.

### 3-B. Live Key Updates

- Live articles only, and a Live badge always comes with them. Uses the same slot as the preview text (they never appear together).
- Shown at **every** breakpoint, SM-XS included. Never on SM thumbs.
- Each update is a link to its entry; hover changes the text colour only (`color/text/interaction-primary/default`).

### 3-C. Play Icon (video articles)

- **Video articles only.** Present in the HTML only for video; never shipped and hidden. Decorative (`aria-hidden`) — the whole card is the link.
- Markup: `.article-card__video` inside `.article-card__media`, holding a Video Player Controls play button (`.video-play`, see `modules/video-player-controls/`).
- Position: bottom-left, 8px inset (SM thumbs 6px) — MD (Vertical Media) too.
- Size by card type — set per breakpoint in CSS (`play-size()` mixin), not with a modifier:

| Card type | Play size |
|---|---|
| XL | SM-XS lg 56 · MD+ xl 68 |
| XL (Horizontal) | lg 56 · LG md 44 · XL lg 56 |
| XL (Triple) | lg 56 |
| MD (Vertical Media) | lg 56 |
| MD | md 44 |
| SM: Left / Right Thumb | xs 28 |
| Image Only | — (none) |

What else can fill the media — animated preview, a video the reader plays in the card, a carousel: **Article Card Media** (`docs/5_Modules__05_Article-Card-Media.md`).

---

## 4. Image Only

The headline sits on the image instead of below it.

- **Overlay:** the bottom 40% of the image (no fixed height) — `color/effect/translucent-dark/thick` + 16px backdrop blur, faded in from the top with a cubic ease-out mask (alpha = 1 − (1 − t)³, stops every 20%: 0 · .488 · .784 · .936 · .992 · 1) — it builds up fast and stays dark for most of its height. The headline sits on it with a 32px solid-black text shadow. Deepens to `translucent-dark/solid` on article hover (pointer on the card, not on channel / comments).
- **Headline:** white (`color/text/neutral/white`), centred. Stays white on hover.
- **Read more:** Quaternary XS button on dark (`.btn-quaternary-dark .btn--xs`) with a trailing arrow. Decorative — the whole card is the link. On article hover a hover line grows under it (§5-C), no button hover. On channel / comments both Read more and overlay go back to rest, and return when the pointer is back on the card.
- **Badge:** signposted top-left on the image, 16px inset, always lg — never inline in the headline.
- No preview text or Key Updates.

---

## 5. Interaction

### 5-A. Article Link

- **One link per card**, on the headline: `<a class="article-card__link">`. Its `::after` stretches over the card, **inset 8px** — the same area as the hover surface — so the card is clickable across the surface while assistive tech hears a single link, and the hover state starts and ends exactly at the surface edge.
- The stretched area is `z-index: 1` (above media that follows the headline, e.g. MD Vertical). Secondary links (metadata, columnist name / photo / announcement, key updates) sit above it (`position: relative; z-index: 2`) and keep their own targets.

### 5-B. Card Hover

Two states, by what is under the pointer (inside the 8px-inset surface area):

| | Rest | Article hover / keyboard focus | Secondary link hover |
|---|---|---|---|
| Headline | `color/text/neutral/darker` | `color/text/interaction-primary/default` | `color/text/neutral/darker` (rest) |
| Hover surface | scale 0.4, opacity 0 | scale 1, opacity 4% | scale 1, opacity 4% |

- **Article hover:** pointer on the card itself (the stretched article link).
- **Secondary link hover:** pointer on channel, comments, a key update, the columnist name / photo, the announcement… The surface stays (no flicker when moving across), but the headline goes back to rest so only the link under the pointer shows a hover. Moving back onto the card returns to article hover.
- The outer 8px ring of the card (outside the surface) is not hover and not clickable.

- **Hover surface:** `color/background/neutral/black`, inset 8px (half the card padding), 8px corners, `transition: transform 0.15s, opacity 0.15s`. Only at **MD+ with a pointing device** — `(min-width: 768px) and (hover: hover)`. No hover surface on mobile / touch.
- The headline uses the interaction-primary **default** token, not hover: the resting headline is neutral-darker, so default reads better.
- Keyboard focus: same as hover, plus a 2px focus outline on the card.

### 5-C. Hover Line (links in the card)

Channel, comment counter, affiliate link, columnist name and Read more share one pattern — a line that grows from the left. No `text-decoration` underline.

| Property | Value |
|---|---|
| Element | `::before` on the link (the link is the positioning container) |
| Size / position | 1px high, `bottom: -2px` (columnist name: `bottom: 0`, it clips its own overflow), full link width (icon included) |
| Colour | `color/effect/translucent-dark/deep` — on dark surfaces `translucent-light/deep` |
| Motion | `transform: scaleX(0)` → `scaleX(1)`, `transform-origin: left`, `transition: transform 0.2s` |

### 5-D. Channel Hover Colour

The channel link turns `color/text/neutral/darker` on hover (rest: `neutral/dark`), with the hover line (§5-C). One colour for every section — no per-section hover colour.

---

## 6. Metadata

Article Card Metadata (`.article-card__metadata.article-card-metadata`) — one type per card: Channel, Timestamp, Channel + Timestamp, Comment Only, Ad Feature, Sponsored, Affiliate Content, CTA or Columnist. Channel hover colour: §5-D.

**Comment counter** — the count is followed by the word: "9.9k comments", "1 comment" for one. The word is always in the markup (`<span class="article-card-metadata__comments-word">`); CSS hides it where the count stands alone:

| Where | Word |
|---|---|
| LG / XL — every card type and metadata type | shown |
| MD / SM-XS — one info item (Channel or Timestamp), Ad Feature, Sponsored, Affiliate, Comment Only | shown |
| MD / SM-XS — Channel + Timestamp | hidden |
| SM: Right Thumb (Puff) — every breakpoint, every metadata type | hidden |
| Columnist metadata narrower than 300px (container query) | hidden |

Ad Feature, Sponsored and Affiliate rarely carry comments, but may.

- **Columnist name** (link to the author page): on hover turns `color/text/interaction-primary/default` — the same colour as the headline on card hover — with the hover line (§5-C).
- **Columnist byline:** name + role on the left, comments on the right, bottom-aligned, 12px apart, 8px above. The columnist's **photo is no longer in the metadata** — it sits in the headline (§2 Quote Headline).
- **Columnist photo** is also a link to the author page: `<a class="columnist-photo" href="…" tabindex="-1" aria-hidden="true">` — a duplicate of the name link, so it is hidden from keyboard and screen readers. On hover: 3px outline, no offset, `color/effect/translucent-dark/subtle`, round with the disc. Outside a card (static) the photo stays a `<span>`.

### 6-A. Columnist Photo Colour

Demo: `modules/columnist-profile-photo/` (sizes, Rectangle / Circle, every disc colour, Live).

The disc behind the columnist photo is **editor-controlled per channel**, from the section's `/subtle` or `/base` background. Default: `color/background/home-blue/subtle` (no modifier).

| Modifier on `.columnist-photo` | Disc colour |
|---|---|
| — | `color/background/home-blue/subtle` |
| `--{section}` | `color/background/{section}/subtle` |
| `--{section}-base` | `color/background/{section}/base` |

```html
<span class="columnist-photo columnist-photo--lg columnist-photo--lifestyle">
  <img class="columnist-photo__img" src="…" alt="Amanda Platell" />
</span>
```

- `{section}`: home · news · showbiz · sport · royals · money · lifestyle · health · tv · travel · shopping · crime · property · podcasts · games · science (Editorial Section → Colour Mapping, e.g. `lifestyle` → `lifestyle-azure`).
- The modifiers set `--columnist-photo-color`; the section list lives in `styles/scss/foundation/_sections.scss`.
- Columnist photos are cut-out portraits — keep them PNG (real transparency).

---

## 7. Implementation Notes

- **Grid stacking, not `position: absolute`,** for layers inside the media (Image Only image, scrim, overlay, badge). An absolutely positioned ancestor would trap the stretched link inside it. The scrim is the media box's own `::after` (no element); overlay and badge sit above it with `z-index: 1`.
- **Metadata items sit straight in the row** (no info wrapper); the comments link pushes itself right with `margin-left: auto`.
- **Line-clamped blocks space with `margin`, not `padding`.** Overflow clips at the padding edge, so bottom padding lets the next line show through.
- **Truncating links** keep the ellipsis on an inner span (`__channel-text`, `__affiliate-text`) so the hover line on the link is not clipped.
- **Icons:** Figma originals are stored in `assets/icons/`; single-colour icons use `.icon` (the file as a CSS mask, coloured by a `color/icon/*` token — Foundation › Iconography).

---

## 8. Files

| | Path |
|---|---|
| Card | `styles/scss/modules/_article-card.scss`, `_article-card-image-only.scss`, `_article-card-key-updates.scss`, `_article-card-video.scss` |
| Video controls | `_video-player-controls.scss` — demo `modules/video-player-controls/index.html` |
| Media | `_article-card-media.scss` (Video player, Carousel) · `scripts/modules/article-card-media.js` · Carousel component `components/_carousel.scss` + `scripts/modules/carousel.js` — demo `modules/article-card-media/index.html` |
| Headline | `_article-headline.scss` — badge, Quote Headline (columnist photo) · demo `modules/article-headline/index.html` |
| Metadata | `_article-card-metadata.scss` (comment word rules), `_columnist-comment-announcement.scss` — demo `modules/article-card-metadata/index.html` |
| Columnist photo | `_columnist-profile-photo.scss` · section map `foundation/_sections.scss` — demo `modules/columnist-profile-photo/index.html` (sizes, Rectangle / Circle, disc colour, Live) |
| Demo | `modules/article-card/index.html` (toolbar: Viewport · Badge · Preview · Metadata · Columnist (On: Metadata › Columnist · Normal + badge M+; other Metadata → badge None; badge M+ Opinion turns it on) · Media — Image / Preview (Video in an article) / Video / Carousel / No Media (MD, SM), `viewports.html` (every type × breakpoint) |
| Generators | `tools/demo-generators/` — Article Card, Metadata and Columnist Profile Photo demo pages are generated |
