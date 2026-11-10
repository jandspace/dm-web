---
paths:
  - "**/*.html"
  - "scripts/**/*.js"
  - "tools/demo-generators/**"
  - "assets/**"
---

# HTML, JS, icons and media

## HTML — fewest elements

- Add an element only when it does a job: semantics (heading, link, button, list), a layout or style that cannot sit on an existing element, or behaviour.
- Figma frames, wrappers and slots are not markup. Example: Section Header has no row or label wrappers; header, title and link lay out their own children.
- Put the class on the element, don't wrap it: `<span class="icon icon--x section-header__icon">`, not a span around the icon.
- Optional parts are left out of the HTML when unused. Never present-and-hidden.

## HTML formatting

- One block element per line, children indented two spaces. A short element holding only inline content (link, span, img) may stay on one line.
- Never write a section, card list or page on one long line. Editors stop highlighting long lines and nobody can edit them. Scripts that build markup must format it before writing.
- Plain characters (`'`, `"`, `£`), not references (`&#x27;`). Escape only `&`, `<`, `>`.

## JS — least behaviour

- Prefer native HTML and CSS (`:hover`, `:focus-visible`, `scroll-snap`, `<details>`) over script.
- Script sets state (attribute or class, e.g. `aria-checked`, `data-state`). CSS draws it. No styles written from JS.
- One small script per behaviour. No libraries, no wrapper abstractions.
- Shared behaviour lives in `scripts/modules/`. Never copy it into a page.

## Demo pages (`components/`, `modules/`, root `index.html`)

- `<body class="demo-page-body">` (background `--color-background-neutral-lighter`). Put light/dark surfaces on the samples, not the page.
- Load the side panel: `<script src="../../scripts/scaffolding/demo-nav.js" defer></script>`, and add the page to the list in `scripts/scaffolding/demo-nav.js`.
- Some pages are generated. Edit the generator in `tools/demo-generators/` and regenerate. See its `README.md` for which pages.

## Mouse drag = swipe (demo only)

- Every demo and project page with a sideways-scrolling row (Carousel track, Scroll Row: Tabs, Section Header tabs, Navbar L1, Sticky Navbar, Navbar L2) loads `<script src="../../scripts/scaffolding/demo-drag-swipe.js" defer></script>`.
- It lets a mouse drag the row like a touch swipe on desktop. Carousel snaps as a swipe does; a drag is not a click.
- Never product behaviour. On the site a mouse uses the arrows / chevron edges.
- A new kind of scrolling row goes into the script's `ROWS` list (styles: `scaffolding/_demo-drag-swipe.scss`).
- Experiments marked Decided or Archived stay as tested.

## Icons

- Source: `assets/icons/` only. SVG, exported from the Figma icon library (DailyMail Icons, file `171vKuCduz2EW3XrK12IQT`, frame `24:2253`), visible layers only, 32 × 32, black. Browse at `foundation/iconography/` (Legacy = no longer in Figma). Doc: `docs/3_Foundation__07_Iconography.md`.
- Never draw new SVGs or export icons into a page or experiment folder. Missing icon → add the Figma original to `assets/icons/` as `ico-*.svg`, run `python3 tools/icon-build/build_icon_list.py > styles/scss/foundation/_icon-list.scss`, then `npm run build`.
- Single-colour icons: `<span class="icon icon--{name} [icon--16|20|32]" aria-hidden="true"></span>` (CSS mask, `foundation/_icon.scss`). Colour with `--icon-color: var(--color-icon-…)`. Default is `--color-icon-neutral-black`, which flips in dark mode.
- Never pass the file through inline style (`style="--icon: url(…)"`). Browsers resolve that path differently.
- Channel colour icons (`*-color`) and flags (`ico-flag-*`) keep their colours: `<img src="../../assets/icons/ico-ch-uk-showbiz-color.svg" alt="" />`.

## Images and media

- Photos: JPEG, quality ~82. PNG only for real transparency (e.g. columnist cut-outs). Figma often exports opaque photos as RGBA PNG; check the alpha before keeping PNG. Icons: SVG.
- Image and video boxes use `.media` + a CMS crop ratio: `--banner`, `--portrait-banner`, `--large`, `--puff`, `--small`, `--302`, `--video` (16:9), `--vertical` (2:3), `--shorts` (9:16, video only). Other ratios take photo or video. Doc: `docs/4_Components__05_Media.md` (Article Card media is a separate module: `docs/5_Modules__05_Article-Card-Media.md`).
- The card sets the corner radius, not `.media`.
- In experiments and projects, link the original image URL (e.g. `https://i.dailymail.com/…`) when one exists. Download only images with no linkable source, into that folder's `images/`.

## Article Card details

Doc: `docs/5_Modules__01_Article-Card.md`.
- Comment counter: count + word, `392 comments` / `1 comment`. Word goes in `<span class="article-card-metadata__comments-word">`. CSS hides the word (count only) on SM Right Thumb (Puff), on Channel + Timestamp below LG, and on Columnist metadata under 300px wide. (§ 6)
- Columnist photo sits in the headline (Quote Headline, serif only), not the metadata. Sizes: H2 xl · H3–H5 lg · H6 md. (§ 2)
