# Pagination

Pagination moves between the pages of a long list (search results, a section archive, comments). It comes in two patterns, one per experience:

| | Pattern | Why |
|---|---|---|
| **LG ≥1024** | Numbered — `« ‹ 1 … 4 5 6 … 999 › »` | Room to show where you are and jump a few pages at once |
| **MD, SM-XS <1024** | Page picker — `‹ [ 2 ⌄ ] of 999 ›` | Fits a phone; the native picker scrolls through any number of pages; 44px touch targets |

Figma: Web UI Kit › Pagination (`214:7642`) — Pagination, pageination-item

---

## 1. Anatomy

| Element | Class | Description |
|---|---|---|
| **Frame** | `nav.pagination` | Centred. `aria-label="Pagination"` |
| **Numbered** | `ul.__pages` | LG+. Items 4px apart |
| **Page** | `a.__item` | 40px high, 40 min wide, padding 4 × 12, **12px corners**. `background/neutral/lightest`, 1px `border/neutral/light`, label-sm Regular `text/neutral/darker` |
| **Current page** | `a.__item[aria-current="page"]` | `background/neutral/dark`, no border, label-sm **Semibold** `text/neutral/lightest` |
| **Arrow** | `a.__item.__item--arrow` | « ‹ › » — as a page on `background/neutral/light`, `ico-chevron-*` 14px. `aria-label` First / Previous / Next / Last page |
| **Ellipsis** | `span.__ellipsis` | 40 × 40, `ico-dots-horizontal` 14px. Not a link |
| **Page picker** | `.__compact` | Below LG. Arrows 44 × 44, 12px apart |
| **Select** | `.__select > select` | Native `<select>` in the Input look: `background/neutral/white`, 1px `border/neutral/light`, 8px corners, 44px min, padding 8 × 16; text-md. `ico-chevron-down` 14px on the right |
| **Total** | `.__total` | "of" in `text/neutral/grey-dark`, the number in `text/neutral/dark`; text-md |

The select will move onto the Input component once it exists.

---

## 2. Which pages show

**Numbers — always 7 slots** (fewer only when there are fewer than 7 pages). The first and last page always show; the current page sits with its neighbours; an ellipsis marks skipped pages.

| Current | Numbers |
|---|---|
| 1 – 4 | `1 2 3 4 5 … 999` |
| 5 – 995 | `1 … 4 5 6 … 999` (current in the middle) |
| 996 – 999 | `1 … 995 996 997 998 999` |

**Arrows — only where there is somewhere to go.** No disabled arrows.

| Arrow | Shows when |
|---|---|
| ‹ Previous | not on the first page |
| « First | page 3 or later (on page 2, ‹ already goes to the first page) |
| › Next | not on the last page |
| » Last | up to the third-last page |

The page picker shows ‹ and › by the same rule, never « ».

---

## 3. States

| State | Style |
|---|---|
| **Default** | as Anatomy |
| **Hover** | `background/neutral/grey-light` — background only, as Button (no shadow) |
| **Current** | `background/neutral/dark`, Semibold white text; no hover change |

---

## 4. Usage

- Every page and arrow is a link (`<a href="?page=2">`): each page has its own URL, so it can be shared, opened in a new tab and indexed.
- The page picker goes to the chosen page on change.
- Place it below the list it pages, centred, with the list's own spacing above.
- Don't use it for a handful of items — show them all, or use "Load more" with the Ellipsis loader (Loading).

---

## 5. Code

```html
<nav class="pagination" aria-label="Pagination">
  <ul class="pagination__pages">
    <li><a class="pagination__item pagination__item--arrow" href="?page=1" aria-label="First page"><img src="…/ico-chevron-double-left.svg" alt="" /></a></li>
    <li><a class="pagination__item pagination__item--arrow" href="?page=4" aria-label="Previous page"><img src="…/ico-chevron-left.svg" alt="" /></a></li>
    <li><a class="pagination__item" href="?page=1">1</a></li>
    <li><span class="pagination__ellipsis"><img src="…/ico-dots-horizontal.svg" alt="" /></span></li>
    <li><a class="pagination__item" href="?page=4">4</a></li>
    <li><a class="pagination__item" href="?page=5" aria-current="page">5</a></li>
    …
  </ul>
  <div class="pagination__compact">
    <a class="pagination__item pagination__item--arrow" href="?page=4" aria-label="Previous page"><img src="…/ico-chevron-left.svg" alt="" /></a>
    <div class="pagination__picker">
      <label class="pagination__select">
        <select aria-label="Page">…</select>
        <img src="…/ico-chevron-down.svg" alt="" />
      </label>
      <span class="pagination__total">of <span>999</span></span>
    </div>
    <a class="pagination__item pagination__item--arrow" href="?page=6" aria-label="Next page"><img src="…/ico-chevron-right.svg" alt="" /></a>
  </div>
</nav>
```

| | File |
|---|---|
| Styles | `styles/scss/components/_pagination.scss` |
| Demo | `components/pagination/` |

---

## 6. Figma notes

- **Breakpoint:** Figma splits at 1012px ("Large (≥1012px)"); code switches at LG (1024).
- **Hover:** the drop shadow was removed in Figma (hover follows Button: background only).
- **Current page:** changed from label-sm Bold to **Semibold** in Figma.
- **Last page:** » is hidden on the last page (fixed in Figma).
- **Corner radius 12** is kept on purpose (not one of the everyday steps).
