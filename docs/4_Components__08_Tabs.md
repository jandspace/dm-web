# Tabs

Tabs are a row of options with one selected. They do two jobs with the same look:

| Job | Markup | Example |
|---|---|---|
| **Filter** — switches what shows below, on the same page | `div.tabs > div.tabs__list[role="tablist"] > button.tabs__tab[role="tab"][aria-selected]` + `role="tabpanel"` | Latest · Most read · Video |
| **Navigation** — links to other pages | `nav.tabs > ul.tabs__list > li > a.tabs__tab[aria-current="page"]` | a channel's sections |

Figma: Web UI Kit › Tabs (`1488:57719`) — Tab, Tab - Button

---

## 1. Looks

| | Underline (`.tabs`) | Button (`.tabs--button`) |
|---|---|---|
| Item | Padding 16 × 8, label-md Semibold; 16px apart | Padding 8 × 12, 8px corners, label-sm Semibold; 4px apart, row padding 8 × 16 |
| Unselected | `text/neutral/grey-dark` | `background/neutral/light`, `text/neutral/dark` |
| Selected | `text/neutral/darker` + 4px indicator (the tab's full width), `background/neutral/darker` | `background/neutral/darker` fill (or the channel colour), `text/neutral/lightest` |
| Hover | No background — the 4px indicator shows in `background/neutral/grey-light` | `background/neutral/grey-light` |
| Line under the row | Base line, 1px `border/translucent-dark/subtle` — always | Keyline, 1px `border/translucent-dark/pale` (Divider, end to end) — optional: `.tabs--no-keyline` |
| Icon *(optional)* | `.tabs__icon` 16px, before the label (8px gap); `.tabs--icon-top` puts it above (6px gap, padding 12 × 8) | `.tabs__icon` 16px, before the label (6px gap) |

The row has no fill of its own — it takes the surface it sits on.

**Fill** (`.tabs--fill`, both looks): with only 2–3 tabs, they can share the full width equally. Don't use it with more — the labels get squeezed and the row can't scroll.

**Icons** take the text colour (grey → darker, white on a selected button), so they are inlined: `<svg class="tabs__icon"><use href="#ico-…" /></svg>` with the `<symbol>` copied from `assets/icons/`.

---

## 2. Channel colour (Button only)

| Look | Selected |
|---|---|
| Underline | always `background/neutral/darker` (indicator) — no channel colour |
| Button | `background/neutral/darker` by default; inside a channel, the channel's **base** colour, e.g. `background/sport-green/base` — `.tabs--button.tabs--sport` (every section in `foundation/_sections.scss`) |

`base-darker` is kept for dark mode later — not used here.

---

## 3. When the tabs don't fit

The row scrolls sideways (Scroll Row — the same code as the Navigation channel row and the Section Header Channel Tabs):

| | |
|---|---|
| **Touch, or below MD** | Swipe; the right edge fades out (28px mask). No chevrons |
| **MD+ with a mouse** (`hover: hover`) | Chevron buttons (32px, fading in from the surface) on the side(s) that can scroll; a click pages by 80% of the row. Set `--tabs-surface` when the tabs sit on a colour other than `neutral/lightest` |

The page script scrolls the selected / current tab into view and toggles the chevrons' `hidden` by scroll position.

---

## 4. Behaviour and accessibility

- **Filter:** `role="tablist"` with an `aria-label`; each tab `role="tab"`, `aria-selected`, `aria-controls` its `role="tabpanel"`. Only the selected tab is in the Tab order (`tabindex="-1"` on the others); ← → move and select, Home / End jump to the ends.
- **Navigation:** a `<nav>` with an `aria-label`; the current page's link has `aria-current="page"`. Tab moves through every link.
- Focus: 2px `border/home-blue/base` outline inside the tab (the scrolling row would clip one outside).
- Keep labels short (one or two words); don't wrap them.

---

## 5. Code

```html
<!-- Filter -->
<div class="tabs tabs--button">
  <div class="tabs__list" role="tablist" aria-label="Stories">
    <button class="tabs__tab" type="button" role="tab" aria-selected="true" aria-controls="panel-latest">Latest</button>
    <button class="tabs__tab" type="button" role="tab" aria-selected="false" aria-controls="panel-popular" tabindex="-1">Most read</button>
  </div>
  <button class="tabs__edge tabs__edge--prev" type="button" aria-label="Scroll tabs left" tabindex="-1" hidden>…chevron…</button>
  <button class="tabs__edge tabs__edge--next" type="button" aria-label="Scroll tabs right" tabindex="-1" hidden>…chevron…</button>
</div>
<div role="tabpanel" id="panel-latest">…</div>

<!-- Navigation, in the Sport channel -->
<nav class="tabs tabs--sport" aria-label="Sport sections">
  <ul class="tabs__list">
    <li><a class="tabs__tab" href="/sport/football" aria-current="page">Football</a></li>
    <li><a class="tabs__tab" href="/sport/cricket">Cricket</a></li>
  </ul>
  …edges…
</nav>
```

| | File |
|---|---|
| Styles | `styles/scss/components/_tabs.scss` |
| Scroll Row (shared with Navigation and Section Header) | `styles/scss/components/_scroll-row.scss` — mixins `row`, `fade-end`, `edge` |
| Demo | `components/tabs/` |

---

## 6. Figma notes

- **Icons:** the Underline Tab used SF Symbols glyphs (App only — they don't render on the web). Code uses icons from `assets/icons/`.
- **Button keyline:** was an App Keyline instance (`border/neutral/light`); swapped in Figma to the Web Divider (Horizontal, Padding None — `border/translucent-dark/pale`).
- **Underline:** base line changed in Figma from `border/neutral/grey-light` to `border/translucent-dark/subtle`, the `neutral/lightest` fill removed, the indicator and the selected Button fill set to `neutral/darker`.
- **Button gap:** now 4px in both variants (was 8 / 4).
- **Yellow (Podcasts):** white text on a `podcasts-yellow/base` button may be low contrast — worth checking.

- **Section Header Channel Tabs** are not Tabs: they are a list of related links with no selected state, and part of Section Header. They share only the Scroll Row.
