# Spatial Tokens

Spatial Tokens define the structural DNA of the Daily Mail digital ecosystem. Our system is built upon a 4-point base grid, ensuring a meticulous level of precision and visual rhythm across all platforms. By adopting a 4pt increment as our fundamental unit, we achieve the perfect balance between information density and layout clarity.

---

## The Universal Unit: Points (pt)

To ensure seamless consistency and a "Single Source of Truth" across our diverse digital landscape, all Spatial Tokens are defined in Points (pt). This universal language allows designers and developers to communicate without the friction of manual conversion.

| Platform | Core Unit | Translation |
|---|---|---|
| Web | px (Pixel) | 1pt = 1px |
| iOS | pt (Point) | 1pt = 1pt |
| Android | dp (Density-independent Pixel) | 1pt = 1dp |

---

## 1. The 4-Point Foundation: Precision & Flexibility

The 4-point grid is the industry benchmark for modern, high-density interfaces. While 8pt remains our primary rhythm for major layout blocks, the 4-point approach provides the necessary granularity to fine-tune spacing in tight UI contexts without breaking the overall spatial logic.

- **Refined Granularity:** A 4pt base allows for nuanced spacing choices (e.g. 4, 12, 20pt) that an 8pt system cannot provide, ensuring a better fit for compact components like badges, metadata, and micro-interactions.
- **Mathematical Harmony:** 4 is a universal divisor for almost all modern screen resolutions. This ensures that every element remains "pixel-perfect" and avoids sub-pixel rendering issues on high-DPI displays.
- **Systemic Scalability:** Leading systems like IBM Carbon and Material Design utilise 4pt increments for their micro-spacing tokens to ensure responsiveness and adaptability across diverse device categories.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

### Sub-atomic Scale: Micro-Precision

In addition to our standard 4-point increments, we provide a Sub-atomic Scale for high-precision UI requirements. These values are reserved for specific optical adjustments and 'hairline' elements where the standard 4pt unit may feel either too heavy or insufficient for the desired visual density.

- **25 (1pt):** Specifically for single-pixel dividers, hairline borders, and keyline strokes.
- **50 (2pt):** Used for micro-spacing between nested elements (e.g. an indicator dot next to a label) or fine-tuning focus rings.
- **150 (6pt):** An optical 'middle-ground' used when 4pt is too tight and 8pt is too loose, common in specific icon-to-text relationships.
- **250 (10pt):** A strategic intermediate value. It provides a more relaxed breathing space than 8pt without the full jump to 12pt, ideal for secondary metadata grouping or tight vertical stacks.

> **Guidance for Designers:** Sub-atomic values should be handled with care. Always prioritise the standard 4-point increments (100, 200, 300...) to maintain system-wide rhythm. Use Sub-atomic tokens only when the base grid does not satisfy functional or optical requirements.

---

## 2. Primitive Numbers (The Source of Truth)

These raw numerical values serve as the foundational 'Source of Truth' for our entire spatial system. Our scale is intentionally designed to support a 4-point grid, while offering additional 'Sub-atomic' steps for extreme optical precision.

These primitive values are never assigned directly to UI elements; they must always be mapped to Functional Tokens to ensure system-wide maintainability.

| Scale | Value (point) | Category | Logic |
|---|---|---|---|
| 0 | 0 | None | No space / Sharp corner |
| 25 | 1 | Sub-atomic | Hairlines, Keyline borders |
| 50 | 2 | Sub-atomic | Micro-adjustments |
| 100 | 4 | Base Unit | Fundamental 4pt increment (1 unit) |
| 150 | 6 | Sub-atomic | Optical balancing (1.5 units) |
| 200 | 8 | Standard | 2 units (The 8pt grid base) |
| 250 | 10 | Sub-atomic | Strategic intermediate (2.5 units) |
| 300 | 12 | Standard | 3 units |
| 400 | 16 | Standard | 4 units (Standard content container padding) |
| 500 | 20 | Standard | 5 units (Refined structural gap) |
| 600 | 24 | Standard | 6 units |
| ... | ... | ... | ... |
| 1600 | 64 | Standard | 16 units (Large sections) |
| Full | 9999 | Max | Perfect circles / Pill shapes |

**The Role of Sub-atomic Scale**

While we strictly adhere to 4-point increments for the global layout, we provide a Sub-atomic Scale to handle micro-precision requirements. These values should be handled with care and used only when the standard grid does not satisfy functional or optical needs.

---

## 3. Functional Tokens: Spacing

Spacing tokens govern the "white space" within and between components. They translate our 4-point logic into functional UI relationships for Padding, Margin, and Gap.

Our spacing tokens use direct numerical naming to bridge the gap between design and development. By using the point value as the token name, we eliminate ambiguity and ensure that everyone speaks the same spatial language. These tokens are mapped to our Primitive Numbers to maintain a single source of truth.

- **Logic:** The token name represents the literal pixel value (e.g., `number-spacing-16` equals 16pt).
- **Usage:** Applied to Padding, Margin, and Gap.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

| Token Name | Primitive Mapping | Unit Multiplier | Logic |
|---|---|---|---|
| `spacing-0` | 0 (0pt) | 0x | No space |
| `spacing-1` | 25 (1pt) | 0.25x | Sub-atomic: Hairlines |
| `spacing-2` | 50 (2pt) | 0.5x | Sub-atomic: Micro-adjustments |
| `spacing-4` | 100 (4pt) | 1x (Base) | The 4-Point Base Unit |
| `spacing-6` | 150 (6pt) | 1.5x | Sub-atomic: Optical balancing |
| `spacing-8` | 200 (8pt) | 2x | Standard grouping |
| `spacing-10` | 250 (10pt) | 2.5x | Sub-atomic: Strategic intermediate |
| `spacing-12` | 300 (12pt) | 3x | Intermediate grouping |
| `spacing-16` | 400 (16pt) | 4x | Standard container padding |
| `spacing-20` | 500 (20pt) | 5x | Refined structural gap |
| `spacing-24` | 600 (24pt) | 6x | Sectional rhythm |
| ... | ... | ... | ... |
| `spacing-64` | 1600 (64pt) | 16x | Large structural separation |

---

## 4. Functional Tokens: Border-radius

Similar to spacing, border-radius tokens follow a numerical naming convention. This allows designers to intuitively select the degree of 'roundness' without checking a documentation legend.

- **Logic:** The token name corresponds to the corner radius value (e.g., `number-border-radius-8` equals an 8pt radius).
- **Consistency:** All radius values are anchored to the 4-point system to ensure visual cohesion with the layout grid.

| Token Name | Primitive Mapping | Application Example |
|---|---|---|
| `border-radius-0` | 0 (0pt) | Sharp corners, full-bleed modules |
| `border-radius-2` | 50 (2pt) | Micro-elements (e.g., Checkboxes) |
| `border-radius-4` | 100 (4pt) | Small image thumbnail, small input fields |
| `border-radius-8` | 200 (8pt) | Medium image thumbnail, secondary cards |
| `border-radius-12` | 300 (12pt) | Actionable modules, primary cards |
| `border-radius-16` | 400 (16pt) | Modals (Sheet), Overlays |
| ... | ... | ... |
| `border-radius-full` | 9999 (Full) | Primary pill buttons, Avatars, FABs |

---

## 5. Strategic Implementation (Design Principles)

Beyond the mere application of numerical values, our Spatial Tokens are governed by fundamental design principles rooted in cognitive psychology. These principles ensure our interfaces are not only consistent but also intuitive, efficient, and aesthetically harmonious.

### 5-A. Spatial Hierarchy: Leveraging Gestalt Principles

Effective use of space guides the user's eye and helps them understand information relationships. Our system employs Gestalt Principles of Grouping, specifically Proximity and Similarity, to establish a clear visual hierarchy.

#### Proximity

"Elements placed close together are perceived as a single group." In our system, we use tighter internal spacing for related content (like a headline and its summary) and wider external spacing to separate different news blocks. This helps users instantly distinguish between different stories without visual confusion, creating a natural reading flow across the page.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Grouping by Space: Strategic spacing transforms a flat list into organized content groups. By keeping related items close and separating sections with wider margins, we create a clear visual structure without using lines or boxes.

#### Similarity

"Elements sharing identical visual traits are perceived as having the same function." By consistently applying the same spacing and radius tokens to similar components — such as all 'Read More' buttons or 'Breaking News' badges — we create a predictable environment. Users learn the "language" of our interface once and can then navigate the entire Daily Mail ecosystem with confidence.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Functional Consistency: Different layouts, same feeling. By repeating consistent colors, radius, and element placement, we ensure users recognize shared functionality across any device or screen size.

**Application:** A button's internal padding (`spacing-8`) is always smaller than the margin between that button and an adjacent element (`spacing-16`). This clearly indicates what belongs together.

### 5-B. The "Inner Radius" Rule: Harmonising Form

The interplay between nested elements' curvature is crucial for a refined aesthetic. Our Inner Radius Rule ensures that nested components maintain visual harmony within their parent containers.

- **Principle:** When a rounded element is placed within another rounded container, the inner element's radius should always be smaller than the outer element's radius, relative to the padding between them. This prevents visual tension and creates a concentric, aesthetically pleasing effect.
- **Formula:** Inner Radius = Outer Radius - Padding
- **Application:** If a card has `border-radius-16` and its internal padding is `spacing-12`, a button nested inside should ideally have `border-radius-4` to appear visually balanced.
