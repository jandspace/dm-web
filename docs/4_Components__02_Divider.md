# Divider (Keyline)

A Divider is the 1px line that separates content blocks — cards in a column, sections on a page, Alpha and Beta. It is the line used throughout Article Card and Layout & Grid.

Figma: Web UI Kit › Divider (Keyline) (`92:860`)

---

## 1. Anatomy

| Property | Value |
|---|---|
| **Thickness** | 1px |
| **Colour** | `color/border/translucent-dark/pale` — translucent, so it still reads on tinted surfaces (e.g. a pink box) |
| **Direction** | Horizontal or Vertical |
| **Padding** | 16px at both ends, or none |

On dark surfaces use a light keyline (`color/border/translucent-light/subtle`, as in the Article Card Banner panel). `color/border/neutral/light` is the App keyline — if a Web frame in Figma uses it, treat that as a mistake.

---

## 2. Variants

Figma variants: **Direction** × **Padding**. In code they are the two arguments of the `divider` mixin.

| Direction | Padding | Mixin | Use |
|---|---|---|---|
| Horizontal | 16pt (left & right) | `divider.divider` | **Default** — under cards, sections and rows. The 16px matches the card inset, so neighbouring keylines never touch |
| Horizontal | None | `divider.divider(horizontal, false)` | End to end — inside a component whose content already runs to the edge (e.g. a list in a panel) |
| Vertical | 16pt (top & bottom) | `divider.divider(vertical)` | Between blocks side by side — e.g. Beta's left keyline from LG |
| Vertical | None | `divider.divider(vertical, false)` | Full height — e.g. between items in a toolbar row |

Horizontal sits on the block's bottom edge, vertical on its left edge.

---

## 3. Rules

- **The block draws its own keyline** as a pseudo-element (`::after`, or `::before` when `::after` is taken) — never a separate element such as `<hr>`. The line belongs to the block, so it moves, hides and reorders with it.
- **The last block has none.** A keyline separates two blocks, so the last child of its parent never draws one (`:not(:last-child)::after`, see Layout & Grid › 5-C). Vertical: the block after another draws it on its left (`+`), so the first has none.
- **One line per gap.** Never draw a keyline on both neighbours of the same gap.
- **No shadows between page content.** Content that scrolls with the page is split by keylines, not elevation (Foundation › Elevation, level 0).

---

## 4. Code

```scss
@use '../components/divider';

.card {
  position: relative; // the line is placed against the block

  &:not(:last-child)::after {
    @include divider.divider; // horizontal, 16px in
  }
}

.beta::before {
  @include divider.divider(vertical); // left edge, 16px in from top and bottom
}
```

Layout & Grid uses it through the `keyline` mixin in `styles/scss/foundation/_layout.scss` (`position: relative` + `:not(:last-child)::after`). Article Card and some other modules still write the same line out by hand; moving them onto the mixin is a later step.

| | File |
|---|---|
| Mixin | `styles/scss/components/_divider.scss` |
| Demo | `components/divider/` |

---

## 5. Notes

- **Token:** the keyline is `color/border/translucent-dark/pale` — a border token. `color/effect/translucent-dark/pale` has the same value but is for fills and shadows; earlier code used it by mistake. Never the App keyline `border/neutral/light`.
