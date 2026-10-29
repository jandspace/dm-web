# Dropdown Menu

A Dropdown Menu is the panel that drops down from a trigger (a select field, a button, a "more" icon): an optional title, then a list of items to pick from or act on. It is temporary — it closes when an item is chosen, on an outside click or on Esc. The trigger is not part of it; it belongs to the component that opens the menu.

Figma: Web UI Kit › Dropdowns (`175:5715`) — Dropdown Box, Dropdown Title, Dropdown Item

---

## 1. Anatomy

| Element | Class | Description |
|---|---|---|
| **Box** | `.dropdown-menu` | `color/background/neutral/white`, 8px corners, **Elevation 4** (`--elevation-4`). Width from the page (Figma 277px); items never narrower than 176px |
| **Title** *(optional)* | `__title` | Figma "Dropdown Title" (`175:6629`). Icon 32 *(optional)* + heading (label-md Semibold) and description *(optional;* label-xxsm Regular, `text/neutral/grey-dark`), 4px apart. Padding 12 top · 8 sides · 16 bottom; a keyline below, end to end (Divider, Padding None). The text is centred on the icon when it is shorter (no description); a longer text keeps the icon at the top. Leave it out when the list needs no introduction and start the list with a Group Title instead |
| **List** | `__list` | 8px inset. Scrolls when the box is capped with `max-height`; thin scrollbar in `background/neutral/grey-light` |
| **Item** | `__item` | Icon 18 *(optional)* + label (label-sm Semibold, `text/neutral/darker`) + tick when selected. Padding 12 × 8, 8px gap, 4px corners |
| **Group Title** | `__group` | Heading for the items below it — label-sm Semibold, `text/neutral/grey-dark`, 8px top and bottom. No side padding, so it sits 8px further out than the items: it heads a block, it is not an item |
| **Space (Keyline)** | `__separator` | 6px · keyline (Divider, Padding None) · 6px — between groups of items |
| **Space (Empty)** | `__space` | 12px gap — between groups when a keyline is too strong |

---

## 2. Item states

| State | Style | Code |
|---|---|---|
| **Default** | Transparent (`translucent-dark/clear`) | — |
| **Hover** | `background/neutral/light` — as Button Quaternary Neutral | `:hover` (`.is-hover` for demos) |
| **Selected** | `background/home-blue/subtlest` + tick in `icon/home-blue/base` on the right | `aria-selected="true"` |
| **Disabled** | 25% opacity, no hover | `disabled` / `aria-disabled="true"` |
| **Focus** | 2px `border/home-blue/base` outline, inside the item | `:focus-visible` |

- Focus is not in Figma. The outline sits inside the item (`outline-offset: -2px`) because the scrolling list would clip a ring outside it.
- The tick is the only coloured icon, so it is inlined as an SVG `<symbol>` with `currentColor` (copied from `assets/icons/ico-tick.svg`). Item and title icons load from `assets/icons/` as `<img>`.

---

## 3. Usage

- **Pick one** (Country, City, sort order): `role="listbox"` on the list, `role="option"` + `aria-selected` on each item. One item selected at a time.
- **Act** (Share, Report, Save): `role="menu"` on the list, `role="menuitem"` on each item; no selected state.
- **Title or not:** use the Dropdown Title when the menu needs a heading with an icon or a line of explanation (e.g. choosing a city or a team). For a short, self-explanatory list (e.g. Sort by) leave it out and open the list with a Group Title.
- Group long lists with Group Titles; split groups with Space (Keyline), or Space (Empty) when the groups already read as separate.
- Icons are optional but all-or-nothing within a list — don't mix items with and without icons.
- Disabled items stay in the list (so the reader sees the option exists) but cannot be chosen.
- Cap the height where the list could run off-screen; the list scrolls, the title stays.
- Elevation 4 — never put a Dropdown Menu over a modal scrim without raising it (Foundation › Elevation).

---

## 4. Code

```html
<div class="dropdown-menu">
  <div class="dropdown-menu__title">
    <img src="…/ico-gear.svg" alt="" />
    <p class="dropdown-menu__heading">
      Dropdown Title
      <span class="dropdown-menu__description">Description</span>
    </p>
  </div>
  <ul class="dropdown-menu__list" role="listbox" aria-label="Dropdown Title">
    <li class="dropdown-menu__group" role="presentation">First Menus</li>
    <li role="none">
      <button class="dropdown-menu__item" type="button" role="option" aria-selected="true">
        <img src="…/ico-compass.svg" alt="" />
        <span class="dropdown-menu__label">Menu Label</span>
        <svg class="dropdown-menu__tick" aria-hidden="true"><use href="#ico-tick" /></svg>
      </button>
    </li>
    <li class="dropdown-menu__separator" role="separator"></li>
    …
  </ul>
</div>
```

| | File |
|---|---|
| Styles | `styles/scss/components/_dropdown-menu.scss` |
| Demo | `components/dropdown-menu/` |

Opening and closing (trigger, outside click, Esc, arrow keys) is the job of the component that uses the menu; the demo only switches the selection on click.

---

## 5. Figma notes

- **Name:** the Figma page is "Dropdowns"; the component is called Dropdown Menu in code and docs (the panel only — "Dropdown" alone would include the trigger).
- **Title weight:** was label-md **Bold**; changed to **Semibold** in Figma (`dmw_sans/label-md/Semibold`) — Semibold is the label emphasis, Bold is kept for Display and H1–H2.
- **Title keyline:** the Dropdown Title used the App keyline (`border/neutral/light`) — a wrong component instance. Code uses the Web keyline (`effect/translucent-dark/pale`).
- **Hover:** Figma uses `effect/translucent-dark/pale`; code follows Button Quaternary Neutral (`background/neutral/light`).
