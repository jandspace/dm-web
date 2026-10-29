# Article Card — Banner Story

The Banner Story is the full-width top story of a section front: the **Lead Story** (editorial artwork, headline and comments on a black panel), optionally followed by **Secondary Stories** — follow-ups and related stories — on the same black. It comes in **1, 4 or 7 stories**: the Lead Story always first, then 0, 3 or 6 Secondary Stories. It is a **block**, not an Article Card type, so it lives in its own component and folder.

Figma: Web UI Kit › Article Card - Banner (`8138:232841`)

---

## 1. Anatomy

| Element | Description |
|---|---|
| **Shell** (`.article-card-banner`) | `color/background/neutral/lightest` surface with a 1px bottom keyline, inset 16px — `color/border/translucent-dark/pale` (Divider) |
| **Story** (`__story`) | 16px white inset from MD up; 16px below the panel at SM / XS |
| **Panel** (`__panel`) | The Lead Story — `color/background/neutral/black`. Inner bottom keyline, inset 16px — `color/border/translucent-light/subtle`, **only when Secondary Stories follow** |
| **Media** (`__media`) | `<picture>` — editorial artwork, art-directed per breakpoint (§3) |
| **Headline** (`__headline`) | H2, centred, `color/text/neutral/lightest`. Holds the article link |
| **Metadata** (`__metadata`) | Article Card Metadata, Comment Only, centred (§4) |

```html
<article class="article-card-banner">
  <div class="article-card-banner__story">
    <div class="article-card-banner__panel">
      <picture class="article-card-banner__media">
        <source media="(min-width: 768px)" srcset="banner-wide.jpg" />
        <img src="banner-xs.jpg" alt="Tiger maul victim" />
      </picture>
      <div class="article-card-banner__content">
        <h2 class="article-card-banner__headline">
          <a class="article-card-banner__link" href="…">Headline</a>
        </h2>
        <div class="article-card-banner__metadata article-card-metadata">
          <a class="article-card-metadata__comments" href="…">…2.1k comments</a>
        </div>
      </div>
    </div>
    <ul class="article-card-banner__related">            <!-- Secondary Stories: 3 or 6 -->
      <li class="article-card-banner__related-item">
        <img class="article-card-banner__related-media" src="thumb.jpg" alt="" />   <!-- optional -->
        <h3 class="article-card-banner__related-headline">
          <a class="article-card-banner__related-link" href="…">Headline</a>
        </h3>
      </li>
      …
    </ul>
  </div>
</article>
```

The banner sits in the page `.container` (SM 720 · MD 960 · LG 996 · XL 1224; full width below 640).

---

## 2. Layout by Breakpoint

Unlike the Article Card, **SM and XS are separate layouts**: SM (≥640) targets phones in landscape, XS (<640) phones in portrait.

| Breakpoint | Layout | Media ratio | Panel inset | Content padding | Headline |
|---|---|---|---|---|---|
| **XS** <640 | Stacked, full bleed | 360:336 | — | 8 · 16 · 16 | H2 (22) |
| **SM** ≥640 | Media left (50%), text right, vertically centred | 360:336 | — | 16 | H2 (22) |
| **MD** ≥768 | Stacked | 964:544 | 16 | 16 | H2 (24) |
| **LG** ≥1024 | Stacked | 964:544 | 16 | 16 | H2 (28) |
| **XL** ≥1376 | Stacked | 964:544 | 16 | 16 | H2 (28) |

- Headline: `typography/font-size/h2` (sizes follow the token), semibold, line-height narrow, letter-spacing compact.
- Content: headline and metadata 16px apart.

---

## 2-A. Secondary Stories

| | XS <640 | SM ≥640 · MD ≥768 | LG ≥1024 | XL ≥1376 |
|---|---|---|---|---|
| Columns | 1 | 3 | 3 | 3 |
| Thumbnail (4:3, 4px corners) | 102×76 | 96×72 | 96×72 | 120×90 |
| Thumbnail + headline | side by side | **thumbnail floats left, the headline wraps around it** and then runs full width | side by side | side by side |

- **Story:** 16px inset; headline H5 Semibold, line-height compact, `color/text/neutral/lightest`; 12px between thumbnail and headline. The thumbnail is optional — the first row has one in Figma, the second is text only.
- **SM / MD wrap:** Figma draws the thumbnail and the text as two columns (it cannot wrap text round an image), which leaves 3-word lines in the narrow columns. In code the thumbnail floats, so the headline uses the full column width below it.
- **Keylines** (inset 16, `translucent-light/subtle`): XS — between stories; SM+ — under the first row only. None on the last row.
- **Link:** one per story, on the headline, stretched over the story. **Hover** (MD+, pointer): `translucent-light/pale` surface zooms in behind the story (inset 8, 8px corners) — the Article Card hover on a dark surface; keyboard focus: 2px `home-blue/base` outline.

## 3. Artwork

- **The banner title is part of the image** (e.g. "TIGER MAUL VICTIM"), not live text — the slab display face stays in the artwork, so no display font ships with the page.
- **Two artworks**, swapped with `<picture>` — SM and XS share one (both 360:336):

| Source | Used at | Note |
|---|---|---|
| Wide | MD+ (`min-width: 768px`) | 964:544, title included |
| Small | SM and XS, below 768 (`<img>` fallback) | 360:336, title included — at SM it sits beside the text |

- **`alt` carries the title text** of the artwork, so screen readers get what sighted users read in the image. The CMS supplies it per story.
- Artwork is a photo — **JPEG**.

---

## 4. Metadata

Article Card Metadata, Comment Only, centred and light on the black panel:

- Comment link: `color/text/neutral/lightest`, icon `color/icon/neutral/lightest`, label-xxsm semibold ("2.1k comments").
- Hover line (Article Card §5-C) in `color/effect/translucent-light/deep`.
- Sits above the stretched article link (`z-index: 1`), so it keeps its own target.

---

## 5. Interaction

- **One link per banner**, on the headline: `<a class="article-card-banner__link">`. Its `::after` stretches over the whole **panel**.
- **Hover** (after Image Only — pointer anywhere in the panel, or keyboard focus): the image dims, `color/effect/translucent-dark/clear` → `translucent-dark/pale` (`transition: background-color 0.2s`). Text stays white. No hover surface.
- **Keyboard focus:** 2px `color/border/home-blue/base` outline on the panel.
- `prefers-reduced-motion`: no transition.

> The hover is provisional — the Figma hover layer is hidden. Confirm with design before handoff.

---

## 6. Files

| | Path |
|---|---|
| Component | `styles/scss/modules/_article-card-banner.scss` |
| Demo | `modules/article-card-banner/index.html` (Viewport: Live · XL ≥1376 · LG ≥1024 · MD ≥768 · SM ≥640 · XS <640 — buttons name the breakpoint; the preview width shows in the status · Stories: 1 (default) · 4 · 7) · `viewports.html` (every count at every breakpoint) |
| Artwork (demo) | `assets/images/article-card-banner-wide.jpg`, `-xs.jpg` (SM + XS) |
