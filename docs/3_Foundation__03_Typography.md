# Typography

Typography defines how text is presented across the product, ensuring clarity, consistency, and readability at scale. It is built on a token-based system that standardises font styles, sizes, and spacing, while supporting flexible use across editorial and UI contexts.

---

## 1. Overview (Principles)

Typography is designed to support clear communication across content and interface. It ensures text remains readable, structured, and consistent across all surfaces.

| Principle | Description |
|---|---|
| **Legibility** | Text is optimised for readability, especially in content-heavy environments. Appropriate font sizes and line heights for long-form reading. Clear distinction between headings and body text. |
| **Accessibility** | Typography follows accessibility best practices to ensure content is usable for all users. Sufficient colour contrast (WCAG AA). Readable sizing and spacing. |
| **Hierarchy** | A defined type scale and roles help structure content clearly. Consistent size and weight progression. Predictable patterns across components. |
| **Consistency** | Typography is applied using predefined styles rather than individual adjustments. Token-based system ensures consistency. Reduces ambiguity in design and development. |
| **Spatial Rhythm** | Text aligns with the spacing system to maintain visual balance. Line heights and spacing follow a consistent grid. Improves readability and layout stability. |

---

## 2. Typeface System

The Daily Mail typeface system is built around two core typefaces, each serving a distinct purpose across product and editorial content.

### 2-A. Font Families

We use two typefaces to balance digital readability with editorial expression.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

| Typeface | Role | Usage |
|---|---|---|
| **Sans (Inter)** | Primary | Used for the majority of UI and content. Body text and paragraphs, UI components (buttons, labels, navigation), metadata and supporting text. Inter is optimised for screen readability and should be used as the default typeface across all platforms. |
| **Serif (Lora)** | Editorial | Used selectively for editorial emphasis. Article headlines and story titles, content cards and featured sections, author comments and quotes. Lora introduces a sense of authority and distinction, and should only be used in editorial contexts. |

### 2-B. Usage Principles

- Default to Sans (Inter) for all functional and UI-related content
- Use Serif (Lora) only where editorial emphasis is required (e.g., Article Headline)
- Avoid mixing typefaces within the same UI component
- Prioritise readability and consistency over stylistic variation
- Not all content requires editorial styling. Use Serif only where it adds clear value.

### 2-C. Platform Considerations

- Font rendering may vary slightly across Web, iOS, and Android
- Minor adjustments may be required to maintain visual consistency
- Consistency of experience is prioritised over pixel-perfect matching

Use Sans for all UI elements to ensure functional clarity, structural integrity, and high-energy legibility across all platforms.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Do not use Serif font for UI elements to maintain functional clarity.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

---

## 3. Type Scale

The type scale defines how text sizes are structured and applied across the product. It works together with typography tokens to create clear hierarchy, consistent usage, and predictable behaviour across platforms. This approach helps avoid inconsistent sizing decisions across teams and products.

### 3-A. Scale Definition

- Font sizes are basically defined in points (pt) to align with visual hierarchy
- The scale ranges from micro labels to large display text
- Sizes are standardised and mapped across Web, iOS, and Android

Typography sizes are defined in Points (pt) for consistency in design. For practical purposes, 1pt can be treated as equivalent to 1px in design tools, although actual implementation may vary across platforms.

### 3-B. Functional Roles

Every text element is assigned a role that defines its purpose and baseline hierarchy.

- **Headings (H1–H6):** The structural foundation of editorial content and SEO. Follow a sequential order for accessibility (e.g., no H3 directly after H1).
- **Display:** High-impact typography for marketing splash pages or special features. To be used exclusively for non-editorial splash screens or marketing landing pages to maintain brand impact. (used sparingly).
- **Text:** Optimised for long-form reading, primarily used for article body paragraphs.
- **Label:** Functional UI typography for buttons, badges, navigation, and metadata.

> Roles define what the text is, not how big it is.

### 3-C. Semantic Scaling

Each role is combined with a scale suffix to define its relative size.

- Standard suffix range: `-xl` → `-xxsm`
- `-md` is the default starting point for each role
- Scale up or down based on layout hierarchy

**Example:**
- `label-lg` → Large size button with 18pt font
- `text-md` → Body copy default font size (16pt)

The role remains consistent, while the suffix adjusts its visual prominence.

### 3-D. Contextual Scaling

Scale is relative within each role, not absolute across the system.

- A `-sm` in Display is larger than a `-sm` in Label
- Each role maintains its own internal hierarchy
- This avoids breaking semantic meaning when adjusting size

This allows flexibility without losing structure.

### 3-E. Usage Principles

- Always define typography using role + scale suffix (e.g. `display-md`, `label-xsm`, ...)
- Do not use raw font sizes (e.g. px/pt) directly
- Maintain correct heading order for accessibility (e.g. no H3 after H1)
- Avoid selecting sizes visually without considering the assigned role.

### 3-F. Platform Alignment

- Font sizes are mapped across Web, iOS, and Android
- Exact values may vary slightly per platform
- Maintain consistent hierarchy rather than exact visual parity
- Refer to the platform size table for implementation details.

| Platform | Reference |
|---|---|
| Web (Desktop & Mobile) | 6. Web Semantic Style Inventory |
| iOS (HIG) | 7. iOS Semantic Style Inventory |
| Android (M3) | 8. Android Semantic Style Inventory (Proposed) |

---

## 4. Typography Roles (Semantic)

Typography roles define the purpose of text across all platforms. They provide a platform-agnostic structure that ensures consistent meaning, while allowing flexible implementation across Web, iOS, and Android.

> Roles define what the text represents. Levels define its relative importance within that role.

### 4-A. Role Definition

The system is built around four core roles:

| Role | Purpose | Primary Content |
|---|---|---|
| **Heading** | Structural hierarchy within content and screens | Article titles, section headers, content entry points. Web → H1–H6. iOS → Large Title to Subhead. Android → Display Small to Title Small (M3, DM custom sp). |
| **Text** | Primary readable content | Article body copy, descriptions and supporting content, long-form editorial passages. |
| **Label** | Functional UI text for interaction | Buttons, badge, label, navigation, metadata, timestamps and UI indicators. |
| **Display** | High-impact surfaces only (*special case, sparingly use) | Hero banners, campaign huge title, splash screens title. |

Each role represents a distinct function within the interface and should be applied consistently across platforms.

### 4-B. Role + Level Model

Typography is structured using a two-layer model:

- **Role** → Semantic purpose (e.g. Heading, Label)
- **Level** → Hierarchy within that role (e.g. H1-H6, Title1-Title3)

This allows the system to adapt across platforms without breaking semantic consistency.

### 4-C. Platform Mapping Principles

Typography roles are mapped differently depending on platform constraints. The goal is not a direct one-to-one match, but a proportional alignment of hierarchy and context.

| | Web (Editorial Structure) | iOS (Native Systems) | Android (Material 3) |
|---|---|---|---|
| Heading | → H1-H6. Strong structural hierarchy for content and SEO | → Large Title, Title1-3, Headline, Subhead. Hierarchy aligned to Apple HIG Dynamic Type | → Display Small, Headline Large-Small, Title Large, Title Small. M3 default sp values are customised to match iOS pt equivalents, ensuring visual consistency across both native platforms |

Not all levels have a direct 1:1 mapping across platforms. Instead, levels should be mapped proportionally based on hierarchy and context.

**Platform Mapping Table**

| Role | Level | Web | iOS | Android (M3) |
|---|---|---|---|---|
| Heading | Level 1 | H1 | Large Title | Display Small |
| Heading | Level 2 | H2 | Title1 | Headline Large |
| Heading | Level 3 | H3 | Title2 | Headline Medium |
| Heading | Level 4 | H4 | Title3 | Headline Small |
| Heading | Level 5 | H5 | Headline | Title Large |
| Heading | Level 6 | H6 | Subhead | Title Small |

**Key Principle:** Platform mapping is about proportional hierarchy — not exact equivalence. The role and its relative weight within the layout must be preserved, even when naming and scale differ across platforms.

### 4-D. Usage Principles

- **Role before Level.** Always identify the semantic role of the text first - Heading, Text, Label, or Display - before deciding on a level. Size and visual weight are outputs of that decision, not inputs.
- **Hierarchy over equivalence.** When mapping typography across platforms, preserve the relative hierarchy of the content — not the exact name or size. A Level 3 Heading should feel like a Level 3 Heading on every platform, even if the specific style differs.
- **Platform naming stays at the implementation layer.** Terms like H1, Title 1, or Headline Small are platform-specific labels for developers and should not drive design decisions. Role and level are the primary language of the system.
- **'Display' role is a deliberate exception.** Display-level typography sits outside the standard hierarchy and should only be applied to high-impact surfaces such as hero banners and campaign pages. It is not a substitute for Heading Level 1 in editorial or UI contexts.

---

## 5. Font Weight System

Font weight defines the visual emphasis of text within the hierarchy. It works alongside role and scale to communicate importance — without relying on size alone.

Our Design System uses a deliberately constrained weight range. Three weights cover the full range of editorial and UI needs. Adding more variation would introduce visual noise without meaningful gain.

### 5-A. Weight Scale

| Weight | Value | Usage |
|---|---|---|
| **Regular** | 400 | The default reading weight. Used for body copy, long-form editorial, and secondary metadata where visual restraint supports sustained reading. |
| **Semibold** | 600 | The primary emphasis weight across the system. Article titles, button text, section headers, and most UI labels default to Semibold. When in doubt, reach for Semibold before Bold. |
| **Bold** | 700 | Reserved for cases where Semibold alone is insufficient. High-priority headings and Display-level typography may use Bold, but it should feel like a deliberate decision — not a default escalation. |

### 5-B. Italic Variants

Each weight has a corresponding italic variant for editorial use. Italics are editorial tools, not UI tools. Do not apply italic weights to buttons, labels, navigation, or any functional UI component.

Italic may be applied to inline text elements such as hyperlinks, where it serves a clear editorial or semantic purpose — distinguishing linked content within a body of text.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Do not apply italic to button labels or any interactive UI component. Button text must remain upright to preserve legibility and maintain the functional clarity expected of a call to action.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

### 5-C. Role-To-Weight Mapping

| Role | Default Weight | Notes |
|---|---|---|
| **Heading** | Semibold (600) | Bold permitted for H1–H2 where editorial impact demands it |
| **Text** | Regular (400) | Semibold permitted for inline emphasis |
| **Label** | Semibold (600) | Consistent across buttons, navigation, and UI indicators |
| **Display** | Bold (700) | Maximum visual weight; used on high-impact surfaces only |

---

## 6. Line Height & Letter Spacing

Line height and Letter spacing work together to define how text breathes on the page. Both are structural decisions — not stylistic ones. On a news platform where readers move through multiple articles in a single session, getting either wrong has a direct cost to comprehension and reading endurance.

Too tight a line height and lines merge visually, forcing the eye to work harder to track across the page. Too loose and the text loses cohesion. Letter spacing follows the same logic — negative tracking tightens large-scale headlines into confident, assertive units, while slightly wider spacing keeps small text legible when individual letterforms need more room to remain distinct.

The Daily Mail Design System defines both values as readability tools, not aesthetic choices.

### 6-A. Web Line Height

Line height on web is expressed as a unitless ratio or em value relative to the font size — never as a fixed px value. Multiplier values are defined as CSS custom properties and applied directly to each style.

`line-height = font-size * multiplier`

The system uses five multipliers, each assigned to a specific role and level:

| Name | Multiplier | Applied to |
|---|---|---|
| Narrower | 1.12 | Display (all levels) |
| Narrow | 1.20 | Heading H1–H4, Label (all levels) |
| Compact | 1.32 | Heading H5–H6 |
| Normal | 1.50 | Text / Body (all levels) |
| Wide | 1.75 | Special editorial use cases only |

### 6-B. iOS — Dynamic Type Leading

iOS line spacing follows native platform conventions entirely. The Daily Mail app does not override system leading values — all spacing is handled by iOS, iPadOS Dynamic Type, which automatically scales leading in response to the user's preferred text size setting.

The table below references the full Apple HIG Dynamic Type scale across all seven size categories, providing a complete implementation reference for designers and developers.

*Figma Variables contains three sampled scales (Small / Large (Default) / xxxLarge) for practical management purposes, actual runtime behaviour follows this full scale.*

**Leading (points)**

| Style | xSmall | Small | Medium | Large (Default) | xLarge | xxLarge | xxxLarge |
|---|---|---|---|---|---|---|---|
| Large Title | 38 | 39 | 40 | 41 | 43 | 46 | 48 |
| Title 1 | 31 | 32 | 33 | 34 | 37 | 39 | 41 |
| Title 2 | 24 | 25 | 26 | 28 | 30 | 32 | 34 |
| Title 3 | 22 | 23 | 24 | 25 | 28 | 30 | 32 |
| Headline | 19 | 20 | 21 | 22 | 24 | 26 | 29 |
| Body | 19 | 20 | 21 | 22 | 24 | 26 | 29 |
| Callout | 18 | 19 | 20 | 21 | 23 | 25 | 28 |
| Subhead | 16 | 18 | 19 | 20 | 22 | 24 | 28 |
| Footnote | 16 | 16 | 16 | 18 | 20 | 22 | 24 |
| Caption 1 | 13 | 13 | 13 | 16 | 19 | 21 | 23 |
| Caption 2 | 13 | 13 | 13 | 13 | 18 | 20 | 22 |

### 6-C. Android — Line Height (sp)

Android line height follows a different scaling architecture to iOS. Rather than a fixed step-by-step table, Android applies non-linear scaling automatically, smaller text sizes scale up more aggressively than larger ones, keeping the interface usable across a wide range of user preferences.

Line height must always be defined in sp (scale-independent pixels). Defining line height in dp will cause text and line height to fall out of sync at larger accessibility sizes on Android 14 and above, resulting in text overlap.

M3 defines role-based scaling behaviour:

| Style | Behaviour |
|---|---|
| Display | No scaling, fixed at defined sp value |
| Headline / Title | Scales with user font size preference |
| Body | Scales with user font size preference |
| Label | Partial, Label Small and Label Medium scale (*Label Large does not) |

**Line Height (sp)**

Because the system handles scaling continuously, the Daily Mail Design System defines three reference points rather than a full step table. These are design and development anchors, not discrete switching thresholds. Android scales fluidly between them based on the user's system setting. Values are aligned with iOS leading to ensure visual rhythm parity across both native platforms.

| Style | Small (0.9x) | Large / Default (1.0x) | xxxLarge (1.35x) |
|---|---|---|---|
| Display Small | 39 | 41 | 48 |
| Headline Large | 32 | 34 | 41 |
| Headline Medium | 25 | 28 | 34 |
| Headline Small | 23 | 25 | 32 |
| Title Large | 20 | 22 | 29 |
| Body Large | 20 | 22 | 29 |
| Body Medium | 19 | 21 | 28 |
| Title Small | 18 | 20 | 28 |
| Label Large | 16 | 18 | 24 |
| Label Medium | 13 | 16 | 23 |
| Label Small | 13 | 13 | 22 |

### 6-D. Cross-Platform Principle

Each platform handles line height differently — Web uses unitless ratios, iOS uses fixed leading values per Dynamic Type scale, and Android applies non-linear sp scaling continuously. The implementation differs, but the goal is the same across all three: visual rhythm parity, not numerical parity.

Consistency comes from applying each platform's native system correctly — not from forcing identical numbers across different rendering environments.

### 6-E. Letter Spacing

Letter spacing fine-tunes the horizontal space between characters. The Daily Mail Design System uses a constrained set of four values, adjustments are intentionally subtle. The goal is to support legibility at different scales, not to create stylistic variation.

All values are defined as percentages and applied on web only. iOS and Android follow each platform's native defaults, no overrides are applied.

| Token | Value | Applied To |
|---|---|---|
| `narrow` | -0.5% | Display — tight tracking reinforces visual impact at large scale |
| `compact` | -0.2% | Heading (H1–H4) — slight tightening improves headline density |
| `normal` | 0 | Body, Label — default; no adjustment |
| `wide` | +0.25% | Small text, metadata — opens up tracking at smaller sizes for legibility |

Sufficient line height and paragraph spacing allow the eye to move through content without effort. Each paragraph feels distinct, reducing cognitive load across longer reading sessions.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Removing paragraph spacing and tightening line height compresses content into a dense block. The text becomes harder to scan and fatiguing to read, particularly damaging on editorial surfaces where reading endurance matters.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

---

## 7. Responsive Typography

Responsive typography applies to web only. Native app platforms, iOS and Android, handle text scaling through their own Dynamic Type and sp systems respectively, and do not require breakpoint-based adjustments.

On web, font sizes respond to three viewport breakpoints. The system does not scale all text — only the styles where size reduction meaningfully improves layout proportion and reading comfort at smaller viewports.

### 7-A. Breakpoints

| Breakpoint | Threshold | Context |
|---|---|---|
| LG | ≥ 1024px | Desktop — full editorial layout |
| MD | ≥ 768px | Tablet / large mobile — transitional layout |
| SM | < 768px | Mobile — single column layout |

### 7-B. Responsive Scale

**Display & Heading (H1-H6)**

| Style | LG (≥1024px) | MD (≥768px) | SM (<768px) |
|---|---|---|---|
| `display-lg` | 64 | 54 | 42 |
| `display-md` | 56 | 48 | 38 |
| `display-sm` | 48 | 42 | 34 |
| `h1` | 36 | 30 | 28 |
| `h2` | 28 | 25 | 24 |
| `h3` | 22 | 21 | 20 |
| `h4` | 18 | 18 | 18 |
| `h5` | 16 | 16 | 16 |
| `h6` | 14 | 14 | 14 |

**Text & Label**

Fixed across all breakpoints (except label-xl)

| Style | LG (≥1024px) | MD (≥768px) | SM (<768px) |
|---|---|---|---|
| `text-lg` | 18 | 18 | 18 |
| `text-md` | 16 | 16 | 16 |
| `text-sm` | 14 | 14 | 14 |
| `text-xsm` | 13 | 13 | 13 |
| `text-xxsm` | 12 | 12 | 12 |
| `label-xl` | 20 | 19 | 19 |
| `label-lg` | 18 | 18 | 18 |
| `label-md` | 16 | 16 | 16 |
| `label-sm` | 14 | 14 | 14 |
| `label-xsm` | 13 | 13 | 13 |
| `label-xxsm` | 12 | 12 | 12 |

### 7-C. Scaling Principles

**Display scales aggressively.**
Display-level text exists for visual impact on large surfaces. On mobile viewports, the same size would dominate the layout and disrupt reading flow. Display-lg reduces from 64pt to 42pt across breakpoints — a reduction of approximately 34%.
**Heading scales selectively.**
Only H1–H3 respond to breakpoints. These are the styles most likely to wrap awkwardly or dominate narrow layouts at their desktop sizes. H4–H6 are already compact enough to remain stable across all viewports without adjustment.

**Text and Label do not scale. (except label-xl)**
Body copy and UI text require consistent sizing for reading comfort and component proportion. Reducing these at smaller viewports would compromise legibility — the point at which font size matters most to the reader.

### 7-D. Implementation

Responsive font sizes are implemented using CSS custom properties scoped to breakpoints. Line height tokens follow the same values as defined in 6. Line Height & Letter Spacing — they do not change with breakpoints.
```
--font-size-display-lg: 40px; /* SM */
--font-size-display-lg: 52px; /* MD */
```
