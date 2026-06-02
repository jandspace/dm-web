# 3_FOUNDATION

# Spacing

Spacing is the structural logic that controls distance — within components, between them, and across the full page or screen. It is not cosmetic. It groups related content, separates distinct sections, and creates the reading rhythm that carries a reader through high-density editorial without losing their place. Without it, hierarchy collapses — not because anything looks broken, but because the reader can no longer feel where one thing ends and another begins.

///// IMAGE /////

**A note on units:** All spacing values are expressed in CSS pixels (px) for web. For native app development, the numerical values are identical — iOS uses points (pt) and Android uses density-independent pixels (dp) at 1x scale. See the Spatial Tokens section for the full platform unit reference.

---

## 1. Overview

### 1-A. What This Section Covers

This section defines how spacing tokens are applied across the Daily Mail digital product — Web, iOS, and Android — how they govern padding, margin, and gap within and between components, and how they connect directly to the layout system defined in the Layout & Grid section.

It does not redefine the tokens themselves. Spacing token values, primitive mappings, and the 4-point base grid are documented in the Spatial Tokens section under Token. This section is about application — where the tokens go, how they behave at different breakpoints, and what the rules are.

### 1-B. Relationship to Other Sections

Spacing does not sit in isolation. It connects to three other parts of the system:

- **Spatial Tokens** — the source values. All spacing decisions reference tokens defined there (`spacing-4` through `spacing-64`).
- **Layout & Grid** — the consistent 16px horizontal inset visible across all breakpoints is a spacing value carried by each component individually, not by the column container. This section explains that relationship in full.
- **Components** — internal component spacing (padding, gap between elements) is specified at the component level. This section sets the logic; component documentation sets the values.

---

## 2. The Spacing Scale

The full spacing scale is defined in the Spatial Tokens section. The table below is a reference summary — the values used most frequently in layout and component decisions.

| Token Name | Value | Logic |
| :---- | :---- | :---- |
| `spacing-0` | 0px | No space |
| `spacing-1` | 1px | Sub-atomic: Hairlines |
| `spacing-2` | 2px | Sub-atomic: Micro-adjustments |
| **`spacing-4`** | **4px** | **The 4-Point Base Unit** |
| `spacing-6` | 6px | Sub-atomic: Optical balancing |
| `spacing-8` | 8px | Standard grouping |
| `spacing-10` | 10px | Sub-atomic: Strategic intermediate |
| `spacing-12` | 12px | Intermediate grouping |
| `spacing-16` | 16px | Standard component padding — applied per component, not on the column container. See Section 4-A |
| `spacing-20` | 20px | Refined structural gap |
| `spacing-24` | 24px | Sectional rhythm |
| `spacing-28` | 28px | Structural gap |
| `spacing-32` | 32px | Large structural gap |
| `spacing-48` | 48px | Major section separation |
| `spacing-64` | 64px | Large structural separation |

Sub-atomic tokens (`spacing-1`, `spacing-2`, `spacing-6`, `spacing-10`) exist for precision adjustments. They are not general-purpose spacing steps. Use them only when the standard 4-point increments are insufficient. If in doubt, reach for the next standard step.

///// IMAGE /////
| | |
| :---- | :---- |
| **✅ DO:** Always reference a token from the defined scale — in Figma, select from the `number/spacing` variable library. Every spacing decision is traceable and consistent across the system. | **🚫 DON'T:** Do not enter arbitrary values directly into Figma or code. A value outside the defined scale — like 7px — has no token backing and breaks system consistency. |

---

## 3. Spacing Properties

### 3-A. Padding, Margin, and Gap

Spacing in this system is applied through three distinct properties. Each has a specific role — they are not interchangeable.

| Property | Role | Typical Use |
| :---- | :---- | :---- |
| `padding` | Space inside a component, between its edge and its content | Button labels, card content inset, input field internal spacing |
| `margin` | Space outside a component, between it and adjacent elements | Separation between independent content blocks |
| `gap` | Space between children within a flex or grid container | Card rows, stacked content, form field spacing |

Avoid using `margin` for spacing inside components. Prefer `padding` for internal control and `gap` for multi-child layouts. `margin` on individual child elements within a flex container can produce inconsistent results across browsers and is harder to maintain at scale.

### 3-B. Vertical Spacing — Margin vs Gap

Vertical rhythm between stacked content blocks (e.g., article cards stacked in a column) should use `gap` within a flex or grid container rather than bottom margins on individual items. This removes the last-child margin problem and keeps the spacing logic in the parent container where it is easier to override at different breakpoints.

💡 **Note for developers:**
```css
/* Preferred */
.content-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}

/* Avoid */
.content-stack .card {
  margin-bottom: var(--spacing-16);
}
```

---

## 4. Layout Spacing

### 4-A. Column Padding

Many layout systems apply horizontal padding to the column container, creating a shared inset that all child elements inherit. This approach works well in uniform layouts, but it creates a hard constraint: any element that needs to break out of that inset — a full-bleed image, an edge-to-edge background — requires a negative margin on a shared structural layer.

In the Daily Mail Design System, the column container carries no padding. Each component and module is responsible for its own 16px horizontal spacing. This keeps full-bleed handling clean and isolated at the component level, and ensures structural layout decisions do not cascade into component behaviour.

Across all breakpoints, the visual result is consistent: 16px of horizontal space on each side of the content area. **However, this padding is not applied at the grid container level. It is carried by each component and module individually.**

Every component — article cards, paragraph blocks, carousels, module containers — holds its own 16px horizontal padding. The grid container itself has no padding. The visual column alignment emerges from each component respecting the same `spacing-16` value.

```css
/* ✅ DO — Padding lives on the component */
.article-card {
  padding-inline: var(--spacing-16);
}

/* ❌ DON'T — Padding on the container causes double spacing */
.column {
  padding-inline: var(--spacing-16);
}
```

A full-bleed element (such as an article image that runs edge to edge) can override its own padding independently, without affecting the container or any sibling components.

This applies where a component already carries padding and a child element needs to break out of it — for example, an image inside a card component. In article body layouts, where individual elements carry their own padding independently, full-bleed images simply omit padding rather than override it.

```css
/* Full-bleed override — component level only */
.article-image {
  margin-inline: calc(var(--spacing-16) * -1);
  width: calc(100% + var(--spacing-32));
}
```

### 📝 Note for developers

Do not add `padding-inline` to the column container.

Components already carry `spacing-16` internally — adding container-level padding will result in 32px of unintended spacing.

| Breakpoint | Visual Column Padding | Token | Applied At |
| :---- | :---- | :---- | :---- |
| XS (< 640px) | 16px | `spacing-16` | Component / Module |
| SM (≥ 640px) | 16px | `spacing-16` | Component / Module |
| MD (≥ 768px) | 16px | `spacing-16` | Component / Module |
| LG (≥ 1024px) | 16px | `spacing-16` | Component / Module |
| XL (≥ 1376px) | 16px | `spacing-16` | Component / Module |

### 4-B. Column Gutter

///// IMAGE /////

The visual gap between two adjacent components is 32px. This is not a separate `gap` or `margin` property applied at the column level — it is the result of two component-level paddings meeting: 16px on the right edge of the left component, and 16px on the left edge of the right component.

There is no gutter defined on the column container itself. The 32px spacing emerges from the padding model, not from an explicit structural gap.

| Property | Value | Token | Applied At |
| :---- | :---- | :---- | :---- |
| Component padding (per side) | 16px | `spacing-16` | Component / Module |
| Visual gutter between components | 32px | `spacing-16` × 2 | Emergent — not explicitly set |

### 4-C. Breakpoint Spacing Reference

The structural spacing values — column padding and gutter — are fixed across all breakpoints. What changes between breakpoints is the container width and column count, not the spacing unit.

| Breakpoint | Container | Columns | Component Padding (per side) | Visual Gutter (emergent) |
| :---- | :---- | :---- | :---- | :---- |
| XS (< 640px) | 100% fluid | 6 | 16px | 32px |
| SM (≥ 640px) | Max 720px | 6 | 16px | 32px |
| MD (≥ 768px) | Max 960px | 6 | 16px | 32px |
| LG (≥ 1024px) | 996px fixed | 12 | 16px | 32px |
| XL (≥ 1376px) | 1224px fixed | 12 | 16px | 32px |

---

## 5. Component-Level Spacing

### 5-A. What Component Spacing Covers

Component spacing governs the internal structure of individual UI components — the padding inside a button, the gap between an icon and a label, the vertical stack inside a card. These values are specified at the component level and documented within each component's own section.

The governing principle is proximity: elements that belong together use tighter spacing; elements that are distinct use wider spacing. The spacing difference creates the grouping — no additional visual dividers required. See also [Spatial Tokens → 5-A. Spatial Hierarchy](https://docs.google.com/document/d/1uVlkw2xDWe2ZCPBYPFoXrLrPX7sVTLc-pQ0RxrpEnuQ/edit#heading=h.7f0vhkfb9ea7).

### 5-B. Carousel and Horizontal Scroll Gaps

///// IMAGE /////

Carousel and horizontal scroll components define their own item gap independently. The visual gutter between standard columns does not apply here.

Item gaps should be selected from values below `spacing-16` — typically `spacing-8` or `spacing-12` — to reflect the proximity of items within a single scrollable group. Exact values are specified at the component level.

---

## 6. Implementation

### 6-A. Token Usage

All spacing — in Figma and in code — must reference spacing tokens. Hardcoded values break the connection to the token system and create a maintenance burden when values change.

In Figma, use the token variables directly. In code, use CSS custom properties.

```css
/* ✅ DO */
padding: var(--spacing-16);

/* ❌ DON'T */
padding: 16px;
```

---

### 6-B. Box Model Reset

All spacing values in this system assume `box-sizing: border-box`. Apply this reset globally to ensure padding and border are included within the element's declared width, not added to it.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Without this reset, padding values behave differently across elements and the layout calculations in this section will not hold.

💡 **Note:** This reset applies to Web only. iOS and Android handle padding within the element boundary by default — no equivalent configuration is required on native platforms.

---

### 6-C. CSS Token Reference

Spacing tokens are available as CSS custom properties. They are defined globally in the token stylesheet and can be applied to any CSS property that accepts a length value.

```css
:root {
  --spacing-0:  0px;
  --spacing-1:  1px;
  --spacing-2:  2px;
  --spacing-4:  4px;
  --spacing-6:  6px;
  --spacing-8:  8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
}
```


