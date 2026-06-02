# **3\_FOUNDATION**

# **Layout & Grid**

Layout and Grid define the structural logic that organises every surface across the Daily Mail digital ecosystem. They establish how content is positioned, how space is distributed, and how the interface adapts across devices — from the smallest smartphone to a wide desktop monitor.

![][image1]

### 📝 A note on units:

*All values in this document are expressed in CSS pixels (px). For native app development, the numerical values are identical — iOS uses points (pt) and Android uses density-independent pixels (dp) at 1x scale. For full platform unit reference, see the Spatial Tokens section.*

---

## **1. Overview**

### **1-A. What Layout & Grid is**

Layout and Grid form the invisible scaffolding of the interface. They are not decorative — they are structural. Every component, every content block, and every typographic element sits within a grid that has been deliberately defined to support high-density editorial content at scale.

A disciplined layout system is what allows a reader to scan a busy news page and still understand it instantly. Without it, content loses hierarchy. Components lose context. The page becomes noise.

![][image2]

### **1-B. Scope of This Document**

This document covers the web layout system for Daily Mail's Desktop Web and Mobile Web products.

It defines:

- **Responsive Breakpoints** — the thresholds at which layout adapts across screen widths
- **Viewport & Container** — how content width is controlled and centred at each breakpoint
- **Column Grid** — the column structure applied per breakpoint

Native app layout (iOS and Android) shares the same underlying grid principles defined here, but platform-specific implementation is documented separately within the App UI Kit.

### 💡 Current Implementation Scope (May 2026)

**Breakpoints** are a universal ruler. They apply across all Daily Mail digital products. What varies between products is the content feed and the layout decisions made at each tier, not the breakpoint thresholds themselves.

| Product | Breakpoints Used | Content Feed | Status |
| :---- | :---- | :---- | :---- |
| **Website — Desktop + Tablet** | MD, LG, XL | Desktop feed | **Confirmed — in progress** |
| **Website — Mobile**<br>**App — Mobile + Tablet** | XS, SM, MD, LG | Mobile feed | **Confirmed — in progress** |

MD and LG are shared tiers — both products operate within them. The difference is the content feed and how each product chooses to express the layout at those widths. A tablet running the app at 1024px (LG) and a browser-based tablet at the same width are at the same point on the ruler, but may render different content and layout treatments.

> **📝 Note:** Mobile Web and App grid specifications, including tablet layout within the app, are documented separately within the Mobile Web and App UI Kit sections.

### **1-C. Core Principles**

| Principle | Description |
| :---- | :---- |
| **Structure before expression** | Grid decisions exist to serve clarity and reading efficiency, not visual style. A layout that serves the content is always the right layout. |
| **Consistency across breakpoints** | Layouts adapt at each breakpoint, but the underlying logic — column count, container width, gutter — follows a predictable system. A reader should never feel disoriented when the layout shifts. |
| **Density with control** | Daily Mail operates at high editorial density. The grid is built to support that density without compromising legibility or visual hierarchy. More content is not an excuse for less structure. |
| **Mobile first** | All responsive CSS is written Mobile First. Default styles target the smallest viewport. Breakpoints expand upward using `min-width`. Think of it as designing outward, not inward. This is not a convention. It is a requirement. |

### **1-D. How to Use This Document**

This document is the primary reference for all layout and grid decisions across Desktop Web and Mobile Web. When applying the system:

- Always use the correct container width for the active breakpoint. Do not stretch or override it.
- Do not modify column count or gutter size outside of documented exceptions.
- Refer to the Figma UI Kit for live layout frames and annotated specs at each breakpoint.
- When in doubt, default to the more restrictive container. A narrower container on a wide viewport is a safe fallback. The reverse is not.

---

## **2. Responsive Breakpoints**

[**See Breakpoint Demo in Web UI Kit**](https://www.figma.com/design/vB97J7hRY6OcmcnKJOOlHj/%F0%9F%92%A0-DM25---Dweb---Mweb-----UI-Kit-V2?node-id=400-6871&p=f&t=oeKe36n1KaUlgSYX-11)

### **2-A. Overview**

Breakpoints are the defined thresholds at which the layout responds to changes in viewport width. They are not arbitrary numbers — each one reflects a meaningful shift in the range of devices and screen sizes that Daily Mail readers use.

The system uses five breakpoints, named by size tier from Extra Small to Extra Large. All breakpoints are defined using `min-width`, in keeping with the mobile-first approach established in Section 1.

![][image3]

### **2-B. Breakpoint Definitions**

| Breakpoint | Dimension | rem | Prefix | Target Devices |
| :---- | :---- | :---- | :---- | :---- |
| **XS** Extra Small | < 640px | — | `xs` or none | Smartphones (portrait) |
| **SM** Small | ≥ 640px | 40rem | `sm` | Smartphones (landscape), foldables, mini tablets |
| **MD** Medium | ≥ 768px | 48rem | `md` | Standard tablets (iPad), small laptops |
| **LG** Large | ≥ 1024px | 64rem | `lg` | Tablets (landscape), compact and legacy laptops (12"–14", up to 1366px) |
| **XL** Extra Large | ≥ 1376px | 86rem | `xl` | Standard laptops (1440px+), desktop monitors |

**On the XS tier.** XS has no media query of its own — it is the default. Any style written without a breakpoint prefix applies to XS. This is what mobile first means in practice.

**On the SM tier.** 640px is the minimum width at which a two-column card layout becomes viable. Below this threshold, content stacks in a single column. The 640px value aligns with Tailwind's default `sm` breakpoint and reflects the realistic lower bound for phone landscape and small tablet viewports.

**On the LG tier.** LG covers tablets in landscape orientation and compact or legacy laptops — typically 12" to 14" screens running at 1024px to 1280px. These devices receive the standard 996px container. A 1366×768 legacy laptop sits at the top end of this tier and is intentionally kept here.

**On the XL tier.** 1376px is set deliberately above the 1366×768 legacy laptop resolution. At 1376px and above — standard laptops (1440px+), widescreen monitors — the wider 1224px container activates. The 10px gap between 1366 and 1376 is intentional: it ensures legacy laptops never accidentally trigger the wider container.

### **2-C. CSS Media Query Declarations**

All breakpoints use `min-width`. There are no `max-width` queries in the base system, with the exception of the Phone Landscape override documented in 2-E.

```css
/* XS — default, no media query */

/* SM — 640px and up */
@media (min-width: 640px) { ... }

/* MD — 768px and up */
@media (min-width: 768px) { ... }

/* LG — 1024px and up */
@media (min-width: 1024px) { ... }

/* XL — 1376px and up */
@media (min-width: 1376px) { ... }
```

### **2-D. Figma Variant Naming**

Breakpoints are reflected in Figma component variants using the following naming convention. Consistency here matters — it keeps the handoff between design and development unambiguous.

| Variant (Breakpoint) | Applied Breakpoint | Notes |
| :---- | :---- | :---- |
| `XL ≥1376` | ≥ 1376px | |
| `LG ≥1024` | ≥ 1024px | |
| `MD ≥768` | ≥ 768px | |
| `SM-XS <768` | < 768px | Default for most Mobile Web components. Covers the full XS–SM range. |
| `SM ≥640` | ≥ 640px | Used only when XS and SM require separate layout treatment |
| `XS <640` | < 640px | Used only when XS and SM require separate layout treatment |

The `SM-XS <768` label is the standard variant for most Mobile Web components. Separate `XS` (for Mobile Portrait) and `SM` (for Mobile Landscape) variants are added only when the layout genuinely differs between the two tiers — for example, a card component that shifts from single-column to two-column at 640px.

### **2-E. Phone Landscape — Special Handling**

When a smartphone is rotated to landscape, its viewport width increases significantly. Most modern phones in landscape reach 667px (iPhone SE) to 932px (iPhone 15 Pro Max) in CSS width, which causes them to enter the SM or even MD breakpoint tier. Without intervention, a phone in landscape mode may receive a tablet layout — not intentional.

To prevent this, a targeted override is applied using `orientation` combined with a `max-height` filter. The `max-height: 500px` value safely isolates phone landscape from tablet landscape, since phones in landscape have a height well below 500px while tablets do not.

```css
/* Phone landscape override — restores Mobile Web layout for rotated phones */
@media (orientation: landscape) and (max-height: 500px) {
  /* Apply Mweb layout rules */
}
```

This query targets phones in landscape only. Tablets, laptops, and desktop monitors are entirely unaffected.

> **📝 Note:** This is not a new breakpoint in the system. It is a scoped override applied at the component or module level where the layout would otherwise behave incorrectly. The `max-height: 500px` threshold may be adjusted if specific devices require it, but should not be raised above 600px to avoid encroaching on tablet landscape viewports.

### **2-F. Current Implementation Scope**

The table below shows which breakpoint tiers are actively implemented per product, and their current build status.

| Breakpoint | Desktop & Tablet Website | Mobile Website & App (Mobile & Tablet) | Status |
| :---- | :---- | :---- | :---- |
| XS (< 640px) | — | ✅ Active | In progress |
| SM (≥ 640px) | — | ✅ Active | In progress |
| MD (≥ 768px) | ✅ Active | ✅ Active | In progress |
| LG (≥ 1024px) | ✅ Active | ✅ Active (tablet) | In progress |
| XL (≥ 1376px) | ✅ Active | — | In progress |

---

## **3. Viewport & Container**

### **3-A. Overview**

The **container** is the horizontal boundary within which all page content sits. It controls how wide the content area can grow as the viewport expands, and ensures that content never stretches uncomfortably across very wide screens.

Two types of container are used across the breakpoint system. Fluid containers expand with the viewport up to a defined maximum width. Fixed containers stay at a set width regardless of how wide the viewport gets. The transition from fluid to fixed happens at LG — below it, content breathes with the screen; above it, it holds a consistent shape.

A consistent 16px inset appears on each side of the content area across all breakpoints. This spacing is carried by each component and module individually, not by the column container.
See Foundation → [**Spacing, Section 4-A**](https://zeroheight.com/609615368/p/418425-wip-spacing/t/227d992230) for full details.

### **3-B. Container Definitions**

| Breakpoint | Viewport | Container Type | Max-width | Notes |
| :---- | :---- | :---- | :---- | :---- |
| **XS** | < 640px | Fluid | — (100%) | Full-width. No container cap. |
| **SM** | ≥ 640px | Fluid | 720px | Caps at 720px for cross-platform consistency. See 3-C. |
| **MD** | ≥ 768px | Fluid | 960px | Fluid up to 960px, then holds. |
| **LG** | ≥ 1024px | Fixed | 996px | Fixed container. Fluid behaviour ends here. |
| **XL** | ≥ 1376px | Fixed | 1224px | Wider container for standard laptops and monitors. |

### **3-C. Why SM Caps at 720px**

![][image4]

Without an explicit container cap, phone landscape layouts behave inconsistently across browsers and operating systems. Some apply their own internal viewport limits; others let content stretch to the full screen width. Neither produces a predictable result.

Setting `max-width: 720px` removes that inconsistency. All phones in landscape — regardless of browser or platform — receive the same container width. 720px sits comfortably within the landscape viewport of most modern smartphones, leaving a small margin on each side that prevents content from pressing against the screen edge.

```css
/* SM container */
@media (min-width: 640px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}
```

### **3-D. LG and XL Container Transition**

LG and XL use fixed containers. The shift from fluid (MD) to fixed (LG) is the most significant structural change in the system — it is where the layout stops adapting to the viewport and instead centres a defined content width within it.

```css
/* MD container — fluid with cap */
@media (min-width: 768px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}

/* LG container — fixed, compact */
@media (min-width: 1024px) {
  .container {
    max-width: 996px;
    margin: 0 auto;
  }
}

/* XL container — fixed, wider */
@media (min-width: 1376px) {
  .container {
    max-width: 1224px;
    margin: 0 auto;
  }
}
```

### **3-E. Viewport Coverage Reference**

The table below shows how the container behaves across common real-world screen widths.

| Device | Viewport Width | Active Breakpoint | Container Width | Side Margin (each) |
| :---- | :---- | :---- | :---- | :---- |
| Smartphone portrait (iPhone 15) | 393px | XS | 393px (100%) | — |
| Smartphone landscape (iPhone 15) | 852px | SM → capped* | 720px* | 66px |
| Tablet portrait (iPad 10th gen) | 768px | MD | 768px (fluid) | — |
| Tablet portrait (iPad Pro 11") | 834px | MD | 834px (fluid) | — |
| Legacy laptop (1366×768) | 1366px | LG | 996px | 185px |
| Standard laptop (15", 1920×1080 @125%) | 1536px | XL | 1224px | 156px |
| FHD monitor (1920×1080) | 1920px | XL | 1224px | 348px |

---

## **4. Column Grid**

### **4-A. Overview**

The column grid divides the container into equal-width columns. It is the primary tool for controlling how content is proportioned and aligned within the layout. All layout decisions — from a single full-width banner to a four-column card row — are expressed in terms of column spans.

Two grid systems are in use across the breakpoint range. Desktop Web uses a 12-column grid, which provides the flexibility needed to handle high-density editorial layouts. Tablet (MD) and Mobile (SM & XS) use a 6-column grid, reflecting the narrower container and simpler content hierarchy appropriate for that viewport.

A consistent 16px inset is visible on each side of the content area across all breakpoints — carried by each component, not by the column container. The 32px visual gap between adjacent components is emergent, not explicitly set. Both are covered in detail in the Spacing section.

### **4-B. Grid Definitions**

| Breakpoint | Container | Columns | Column Width | Padding (each side) |
| :---- | :---- | :---- | :---- | :---- |
| **XS** (< 640px) | 100% fluid | 6 | Fluid (16.6667%) | 16px |
| **SM** (≥ 640px) | Max 720px fluid | 6 | Fluid (16.6667%) | 16px |
| **MD** (≥ 768px) | Max 960px fluid | 6 | Fluid (16.6667%) | 16px |
| **LG** (≥ 1024px) | 996px fixed | 12 | 8.3333% (=83px) | 16px |
| **XL** (≥ 1376px) | 1224px fixed | 12 | 8.3333% (=102px) | 16px |

Breakpoint: **XS < 640px**
![][image5]
- Container: **100% fluid**
- Columns: **6**
- Column Width: **Fluid (16.6667%)**
- Padding: **16px (each side)**

Breakpoint: **SM ≥ 640px**
![][image6]
- Container: **Max 720px fluid**
- Columns: **6**
- Column Width: **Fluid (16.6667%)**
- Padding: **16px (each side)**

Breakpoint: **MD ≥ 768px**
![][image7]
- Container: **Max 960px fluid**
- Columns: **6**
- Column Width: **Fluid (16.6667%)**
- Padding: **16px (each side)**

Breakpoint: **LG ≥ 1024px**
![][image8]
- Container: **996px fixed**
- Columns: **12**
- Column Width: **8.3333% (=83px)**
- Padding: **16px (each side)**

Breakpoint: **XL ≥ 1376px**
![][image9]
- Container: **1224px fixed**
- Columns: **12**
- Column Width: **8.3333% (=102px)**
- Padding: **16px (each side)**

> **📝 Note:** Discover more about [Website Breakpoint in the Figma UI Kit](https://www.figma.com/design/vB97J7hRY6OcmcnKJOOlHj/%F0%9F%92%A0-DM25---Dweb---Mweb-----UI-Kit-V2?node-id=400-6871&p=f&t=2QDa1kQO1ORp1zuG-11)

---

### **4-C. Desktop Web: 12-Column Grid (LG and XL)**

`LG` and `XL` both use a 12-column grid. The column width differs because the container width differs — 996px at LG (≥ 1024px), 1224px at XL (≥ 1376px) — but the structural logic is identical. Content is always positioned in terms of column spans, not absolute pixel values.

| | **Breakpoint: XL ≥1376px** | **Breakpoint: LG ≥1024px** |
| :---- | :---- | :---- |
| Container | 1224px | 996px |
| Columns | 12 | 12 |

![][image10]
**Breakpoint: XL ≥1376px** — Container: 1224px — Columns: 12

![][image11]
**Breakpoint: LG ≥1024px** — Container: 996px — Columns: 12

**Column Span Reference**

Full span reference across both fixed breakpoints. Use this when specifying component widths in Figma or development handoff.

| Span | LG (996px) | XL (1224px) |
| :---- | :---- | :---- |
| 12 col | **996px** | **1224px** |
| 9 col | **747px** | **918px** |
| 8 col | **664px** | **816px** |
| 6 col | **498px** | **612px** |
| 4 col | **332px** | **408px** |
| 3 col | **249px** | **306px** |
| 2 col | **166px** | **204px** |
| 1 col | **83px** | **102px** |

---

### **4-D. Tablet & Mobile Web: 6-Column Grid (XS, SM, and MD)**

XS, SM, and MD all use a 6-column grid. Columns are fluid across all three tiers — widths scale proportionally with the container rather than sitting at fixed pixel values. Content is positioned using percentage-based spans.

Complex multi-column layouts from Desktop Web are simplified to two or three columns at these tiers. A 4-column card row at XL becomes 3-column at MD and 2-column at SM or XS.

| | **Breakpoint: MD ≥768px** | **Breakpoint: SM ≥640px** | **Breakpoint: XS <640px** |
| :---- | :---- | :---- | :---- |
| Container | Fluid (max 960) | Fluid (max 720) | 100% Fluid |
| Columns | 6 | 6 | 6 |

![][image12]
**Breakpoint: MD ≥768px** — Container: Fluid (max 960) — Columns: 6

![][image13]
**Breakpoint: SM ≥640px** — Container: Fluid (max 720) — Columns: 6

![][image14]
**Breakpoint: XS <640px** — Container: 100% Fluid — Columns: 6

**Column Span Reference — 6-column fluid grid (XS, SM, MD)**

| Span | Percentage | Width at 768px (MD min) | Typical Use |
| :---- | :---- | :---- | :---- |
| 6 col | 100% | 768px | Full-width banner |
| 4 col | 66.6% | 512px | 2/3 width content |
| 3 col | 50% | 384px | 2-column card row |
| 2 col | 33.3% | 256px | 3-column card row |
| 1 col | 16.6% | 128px | Narrow utility column |

> **📝 Note:** Pixel values are based on the 768px minimum viewport (MD). At XS and SM, pixel values will differ as the container scales. XS and SM specifications are provisional and will be confirmed once Mobile Web layout decisions are finalised.

---

### **4-E. Grid Exceptions**

The column grid governs the majority of layout decisions, but certain UI patterns require deliberate exceptions. These are not violations of the system — they are defined behaviours for specific contexts. Additional exceptions will be documented as they are identified through implementation.

#### Full-width override

Hero banners, full-bleed images, and background modules may intentionally extend beyond the container to the viewport edge. In these cases, the containing element spans full viewport width while any text or interactive content within it remains aligned to the column grid.

#### Carousel and horizontal scroll gaps

Within carousel and horizontally scrollable components, the gap between items is defined independently of the standard 32px column gutter. A 32px gap between adjacent cards in a horizontal scroll context is visually excessive. Gap values for carousel components are specified at the component level — refer to the relevant component documentation for exact values.
