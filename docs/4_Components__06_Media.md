# Media

Media is the image or video in a card or module. It fills a box of a fixed ratio, so a card keeps its shape whatever file the editor uploads. The ratio comes from the CMS crop (image) or is always 16:9 (video).

Figma: Web UI Kit › Media (`108:3533`)

---

## 1. Anatomy

| Element | Description |
|---|---|
| **Box** | `.media` plus one ratio modifier. Width comes from the parent; height follows the ratio. `color/background/neutral/light` shows while the file loads |
| **File** | `img` (photo) or `video` (footage), filling the box with `object-fit: cover` |

Media carries **no corner radius** — the card or module that holds it sets one (thumbnails 4px, image-based cards 8px; see Foundation › Border Radius). Overlays such as the play icon, badge or headline scrim belong to that card too.

---

## 2. Image crops

Editors crop each image in the CMS (Article › Images). Every crop is its own field, so one photo can be framed differently per size: tight on a face for the small ones, wider for the large ones.

| Class | CMS crop | Feed size | Ratio | Used in |
|---|---|---|---|---|
| `.media--banner` | Banner Preview (optional) | 964 × 544 | ≈ 16:9 | Article Card Banner, MD and up |
| `.media--portrait-banner` | Mobile portrait banner (optional) | 750 × 700 | 15:14 | Article Card Banner, SM-XS |
| `.media--large` | Large Preview | 308 × 185 | 358:215 (≈ 5:3) | Article Card XL (816 × 490 at XL), also MD |
| `.media--puff` | Puff Image | 154 × 115 | 4:3 | Article Card SM thumbs (Left / Right Thumb) |
| `.media--small` | Small Preview | 87 × 84 | ≈ 1:1 | Areas outside Article Card (to be defined) |
| `.media--302` | 302 Preview | 302 × 322 | 15:16 | Article Card Image Only |
| `.media--vertical` | Vertical (another CMS part) | 400 × 600 | 2:3 | Article Card MD (Vertical Media) |

- **Feed size** is the size the crop is made at in the CMS — not the size it is shown at. The box scales to its column; the ratio stays.
- **Large** follows Article Card XL: the box uses the card's 358:215 (816 × 490 at XL), the same ratio as the 308 × 185 crop to within a pixel.
- **302 Preview** and **Vertical (2:3)** are not in the article page's Images tab; they are set in another part of the CMS (the homepage uses both).
- The CMS also has Google Preview and Splash Preview. Google Preview is for search and sharing, not the page, so it is not a Media crop.

---

## 3. Video

Footage is **16:9** by default: one class, `.media--video`, at any width — the column sets it, so there is no size per breakpoint.

When an Article Card varies its media area, the video takes the card's ratio instead and is cropped to fill it:

| Class | Size | Ratio | Article Card type |
|---|---|---|---|
| `.media--vertical` | 400 × 600 | 2:3 | MD (Vertical Media) |
| `.media--302` | 302 × 322 | 15:16 | Image Only (Medium) |

Vertical footage such as Shorts uses `.media--shorts` (**9:16**). This ratio is for video only — there is no 9:16 photo crop.

- Ratios are not tied to the file type: the same classes hold a photo or a video — except `--shorts`, which is video only.
- Until the video plays, the `poster` image fills the box (same `object-fit: cover`).
- Controls come from Video Player Controls (`modules/video-player-controls/`), not from Media.

---

## 4. Files

- **Photos are JPEG** (quality ~82). PNG only when real transparency is needed (e.g. columnist cut-outs).
- **Alt text:** describe the photo when it adds to the story. Leave `alt=""` when the headline next to it already says the same, as on article cards, where the whole card is one link.
- Serve a file close to the shown size (`srcset`); the feed size is the upper bound for most columns.

---

## 5. Code

```html
<div class="media media--large">
  <img src="…" alt="" />
</div>

<div class="media media--video">
  <video poster="…" muted playsinline></video>
</div>
```

| | File |
|---|---|
| Styles | `styles/scss/components/_media.scss` |
| Demo | `components/media/` |

Existing cards still set their own ratios (`.article-card__media`, Image Only, Banner); they match the table above. Moving them onto `.media` is a later step.

---

## 6. Figma notes

- The Video symbol has three sizes (LG 934 · MD 664 · SM 332, all 16:9). They differ in width only, so code has one class; the sizes can be merged into one symbol.
- The 302 Preview symbol is 302 × **332**, but its label and the live site say 302 × **322** (15:16). 322 is correct; the symbol height is a typo.
