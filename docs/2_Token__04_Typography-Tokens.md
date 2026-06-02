# Typography Tokens

The Daily Mail Typography System is engineered to deliver a high volume of complex news with maximum legibility and clear visual hierarchy. Our system ensures a consistent reading experience across our UK, US, and Australian audiences while respecting the unique technical requirements of Web and Mobile platforms.

---

## 1. Typography Principle

The Daily Mail Typography System is more than just a collection of fonts; it is a framework designed to ensure that our global audience can consume complex news with ease and trust. Before diving into the technical tokens, we adhere to four core principles that guide every typographic decision.

| Principle | Description |
|---|---|
| **Legibility Above All** | The primary function of our typography is to be read. We prioritise clear character recognition and optimal spacing. No matter how "creative" a layout may be, if it compromises the reader's ability to digest a headline or a story, it fails our user-centred standard. |
| **Accessibility by Default** | We design for everyone. Our typography system is built to meet WCAG 2.1 AA standards from the start. This includes maintaining high colour contrast, ensuring scalable font sizes (up to 200%), and defining generous leading (line-height) to support readers with visual impairments or dyslexia. |
| **Intentional Hierarchy** | In a fast-paced news environment, we guide the reader's eye through clear information scaffolding. By utilising distinct weights, sizes, and the strategic contrast between our Sans and Serif families, we help users instantly distinguish between editorial headlines, functional UI titles, and core article body copy. This ensures that even in a content-heavy layout, the most critical information is consumed first. |
| **Spatial Rhythm & Consistency** | Our typography is an extension of our 4pt Spatial Grid. Every font size and line-height is calculated to maintain a vertical rhythm that feels stable and professional. This consistency reduces cognitive load and reinforces Daily Mail's authority as a trusted news source. |

---

## 2. Typography Anatomy

To bridge the gap between design intent and technical CSS implementation, we define our typography through three key dimensions: Attributes, Roles, and Scales.

### 2-A. Core Attributes (The Ingredients)

#### Font Family

We utilise two distinct typefaces to balance Daily Mail's editorial heritage with modern digital performance.

- **Sans (Inter):** Used for all other elements, including body copy, paragraphs, and functional labels, to ensure maximum legibility on digital screens.
- **Serif (Lora):** Reserved for editorial headlines and story titles to convey trust and authority.

#### Type Scale

Defined in Points (pt) to align with our visual hierarchy. Our scale ranges from micro-labels to large display headings, ensuring a harmonious progression that guides the reader's eye.

#### Font Weights

While we utilise numerical values (400, 600, 700) for technical precision, we use semantic names for ease of use within our design workflow:

- **Regular (400):** Standard reading weight for body copy and paragraphs.
- **Semibold (600):** Used for standard user actions (Buttons, Links) and general headings. This provides clear emphasis without the visual heaviness of a full bold.
- **Bold (700):** Strictly reserved for high-level headlines, critical alerts, and primary calls to action.

#### Line Height (Leading)

To ensure a harmonious visual rhythm across all screen sizes, we utilise a Relative Scaling System for line height. Instead of fixed pixel values, we define leading as a ratio of the font size (using em or unitless values in CSS). This ensures that the vertical spacing automatically scales in proportion to the typography, maintaining consistency without manual adjustments.

All line-heights are defined as unitless ratios to ensure a harmonious vertical rhythm that scales proportionally with the font size, adhering to the principle: `line-height = font-size * multiplier (1.12, 1.2, 1.32, 1.5, or 1.75)`

- **Narrow (1.2) and Narrower (1.12):** Applied to high-impact Display styles, Headings (H1–H4), and Labels. These lower ratios keep large-scale text and UI elements compact and powerful.
- **Compact (1.32):** Used for Sub-headings (H5–H6) and tighter UI components to maintain a balanced, professional density.
- **Normal (1.5):** The default standard for comfortable, long-form Body Copy. This ratio is optimised for maximum legibility and reading endurance.
- **Wide (1.75):** Reserved for special editorial use cases requiring additional breathing room.

### 2-B. Functional Roles (The Purpose)

Every text element is assigned a role that dictates its semantic meaning and visual prominence.

- **Headings (H1–H6):** The structural foundation of editorial content and SEO. Follow a sequential order for accessibility (e.g., no H3 directly after H1).
- **Display:** High-impact typography for marketing splash pages or special features. To be used exclusively for non-editorial splash screens or marketing landing pages to maintain brand impact. (used sparingly).
- **Text:** Optimised for long-form reading, primarily used for article body paragraphs.
- **Label:** Functional UI typography for buttons, badges, navigation, and metadata.

**Text vs Label (Fundamental Role Differences)**

| Category | Text (Body Text) | Label (Functional UI) |
|---|---|---|
| **Primary Purpose** | Long-form Reading & Narrative | Scanning & Actionable Information |
| **Usage Context** | Article body paragraphs, lead-ins, summaries, and descriptions. | Buttons, form labels, tags, badges, navigation items, and metadata. |
| **Design Logic** | Optimised for Legibility. Features generous line-height (150%) to reduce eye strain. | Optimised for Visibility and space efficiency. Features tighter line-height and letter-spacing. |
| **Typical Elements** | `<p>`, `<li>`, `<blockquote>` | `<button>`, `<label>`, `<span>`, `<nav>`, `<a>` |

### 2-C. Semantic Scaling (The Hierarchy of Size)

While the Functional Role defines the purpose (e.g. Display, Heading, Text, Label), the Suffix defines the specific volume and visual priority within that role. This system uses a standardised set of size modifiers — ranging from `-xl` (Extra Large) down to `-xxsm` (Double Extra Small) — to allow for precise hierarchical control without changing the semantic meaning of the element.

**Same Role, Different Context:**
Our scaling system is contextual. A `-sm` scale within the Display role is intentionally larger than a `-sm` scale within the Label role. This ensures that the scale (`-xxsm` to `-xl`) represents the relative importance within its specific functional context, rather than a fixed absolute value across the entire system.

**The Suffix Logic:**
We use `-md` (Medium) as the standard anchor for each role. Designers should start with `-md` and scale up or down based on the specific hierarchy required for the layout. For example, you would apply `label-lg` for a large primary button and `label-sm` for a smaller utility button. Both remain 'labels' semantically, but the suffix dictates their appropriate scale within the UI.

---

## 3. The Hierarchy of Typography Tokens

The Daily Mail typography hierarchy is a structured framework that translates brand aesthetics into functional digital logic. Our system moves from static foundations to dynamic applications, ensuring that every text element remains consistent yet responsive across all viewports. By decoupling raw values (Primitives) from functional styles (Semantic), we allow for a scalable system where a single style name, such as `text-md`, can intelligently adapt its underlying tokens based on the device context.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

---

## 4. Primitive Tokens (The Foundation)

Primitive tokens are the raw, immutable values of our design system. These do not carry functional meaning on their own but serve as the essential building blocks for all typographic styles.

### 4-A. Font Family

We utilise two distinct typefaces to balance editorial authority with functional clarity:

- **Serif (`typography-font-family-serif`):** Lora. Used for headlines to convey the 'Trusted Authority' of the Daily Mail brand.
- **Sans (`typography-font-family-sans`):** Inter. Used for UI elements and body copy to ensure 'Frictionless Diversity' and legibility.

### 4-B. Font Weight

To maintain a clear visual hierarchy, we define six specific weights, including their respective italic counterparts:

- **Regular:** Standard weight for body copy.
- **Semibold:** For emphasis and secondary headings.
- **Bold:** For primary headings and critical UI actions.
- **Regular Italic, Semibold Italic, Bold Italic:** Approved slanted variants to prevent faux-italic distortion.

---

## 5. Semantic Tokens vs Semantic Styles

Consistency relies on clearly distinguishing between Semantic Styles and Semantic Tokens. Although they sound similar, they perform distinct roles within our system.

### 5-A. The Style Package Logic

Semantic Styles, such as `dmw_sans-label-md-Semibold`, are the high-level identifiers designers interact with in Figma. A Semantic Style is a comprehensive package rather than a single value. It bundles multiple token such as size, weight, and line-height into one selectable unit. This approach ensures that a style name like `label-md` defines the character and purpose of the text, making it intuitive for the team to apply the correct hierarchy across all platforms.

- **Semantic Styles (Figma interface):** These are the high-level options found in the Figma Text Styles menu. A Style is a package that groups several tokens together to create a specific look.
- **Semantic Tokens (The Ingredients):** These are the individual technical values that live inside a Style, such as `typography-font-size-label-md` or `typography-line-height-compact`. Tokens are the single sources of truth for specific attributes like size and spacing.

### 5-B. The Concept of Style Containers

A Semantic Style is a curated combination of typographic attributes. This system ensures that core brand identity remains consistent while providing the technical flexibility needed for a modern news platform.

- **Bundled Logic:** Each package automatically includes a specific font-size, line-height, and letter-spacing mapped to the current viewport.
- **Responsive Intelligence:** When you apply a style like `h1`, the system adjusts the underlying token values based on the viewport, scaling from 36px on Desktop down to 28px on Mobile.
- **Systemic Consistency:** Using these packages removes the guesswork and ensures that 'Clarity at Scale' is maintained across every digital touchpoint without manual input.

---

## 6. Web Semantic Style Inventory (Semantic Tokens)

The following table outlines the core Semantic Tokens available for Web.

**Font family**

| Token Name | Value |
|---|---|
| `typography-font-family-sans` | Inter (Sans) |
| `typography-font-family-serif` | Lora (Serif) |

**Font weight**

| Token Name | Value (weight) | Value (style) |
|---|---|---|
| `typography-font-weight-regular` | 400 | normal |
| `typography-font-weight-semibold` | 600 | normal |
| `typography-font-weight-bold` | 700 | normal |
| `typography-font-weight-regular-italic` | 400 | italic |
| `typography-font-weight-semibold-italic` | 600 | italic |
| `typography-font-weight-bold-italic` | 700 | italic |

**Font size (px)**

| Category | Token Name | Value (LG: ≥1024px) | Value (MD: ≥768px) | Value (SM: <768px) |
|---|---|---|---|---|
| Heading | `h1` | 36 | 30 | 28 |
| | `h2` | 28 | 25 | 24 |
| | `h3` | 22 | 21 | 20 |
| | `h4` | 18 | 18 | 18 |
| | `h5` | 16 | 16 | 16 |
| | `h6` | 14 | 14 | 14 |
| Display | `display-lg` | 64 | 54 | 42 |
| | `display-md` | 56 | 48 | 38 |
| | `display-sm` | 48 | 42 | 34 |
| Text (Body Text) | `text-lg` | 18 | 18 | 18 |
| | `text-md` | 16 | 16 | 16 |
| | `text-sm` | 14 | 14 | 14 |
| | `text-xsm` | 13 | 13 | 13 |
| | `text-xxsm` | 12 | 12 | 12 |
| Label (Functional UI) | `label-xl` | 20 | 19 | 19 |
| | `label-lg` | 18 | 18 | 18 |
| | `label-md` | 16 | 16 | 16 |
| | `label-sm` | 14 | 14 | 14 |
| | `label-xsm` | 13 | 13 | 13 |
| | `label-xxsm` | 12 | 12 | 12 |

> ⚠️ **Responsive Intelligence: Adaptive Font Sizes**
>
> Our font-size tokens are built with responsive logic. This allows a single style to adapt its size automatically when moved between desktop and mobile frames. This ensures a single style behaves correctly across different devices without manual intervention.
>
> - **Dynamic Scaling:** An `h2` style automatically renders at 28px on Desktop and scales to 24px on Mobile.
> - **Figma Implementation:** Change the target viewport (e.g. Desktop to Mobile) by switching the Web Typography settings in Figma Variable Mode.
> - **Development Efficiency:** Developers only need to reference one token as the responsive logic is already embedded within the system values.

**Line height (em or unitless)**

| Token Name | Value |
|---|---|
| `typography-line-height-narrower` | 1.12 |
| `typography-line-height-narrow` | 1.2 |
| `typography-line-height-compact` | 1.32 |
| `typography-line-height-normal` | 1.5 |
| `typography-line-height-wide` | 1.75 |

**Letter spacing**

| Token Name | Value |
|---|---|
| `typography-letter-spacing-narrow` | -0.5 |
| `typography-letter-spacing-compact` | -0.2 |
| `typography-letter-spacing-normal` | 0 |
| `typography-letter-spacing-wide` | 0.25 |

---

## 7. iOS Semantic Style Inventory (Semantic Tokens)

While our Web typography relies on responsive scaling across viewports, our iOS strategy focuses on Native Adaptation. We retain the Daily Mail brand DNA by utilising our Primitive Fonts (Inter and Lora) but structure them according to Apple's Human Interface Guidelines (HIG) for Dynamic Type sizes.

This hybrid approach ensures that our app feels authentically 'Daily Mail' while behaving like a first-class citizen within the iOS ecosystem.

### 7-A. The Native Adaptation Strategy

Our iOS system replaces the web-based viewport logic with Apple's Dynamic Type categories. Instead of scaling based on screen width (Desktop/Mobile), the typography scales based on the user's preferred text size settings in the OS.

- **Brand Typefaces:** We enforce `typographyFontFamilySans` (Inter) and `typographyFontFamilySerif` (Lora) across all styles, overriding the default San Francisco font to maintain brand consistency.
- **HIG Structure:** We adopt Apple's semantic naming conventions (e.g. Large Title, Title 1, Body) to ensure our app respects the user's accessibility choices.
- **Static to Dynamic:** A token like `typographyIosSizeBody1722` serves as the 'Large (Default)' state. If a user adjusts their device text size, the app will automatically scale this value up or down relative to the system baseline.

### 7-B. iOS Token Inventory & Point Values

Unlike the web environment, which utilises relative scaling (e.g. 1.5 multiplier) for line-heights, iOS typography relies on fixed point (pt) values for leading. This ensures precise vertical rhythm within native components.

**Font family**

| Token Name | Value |
|---|---|
| `typographyIosFontFamilySans` | Inter (Sans) |
| `typographyIosFontFamilySerif` | Lora (Serif) |

**Font weight**

| Token Name | Value (weight) | Value (style) |
|---|---|---|
| `typographyIosFontWeightRegular` | 400 | normal |
| `typographyIosFontWeightSemibold` | 600 | normal |
| `typographyIosFontWeightBold` | 700 | normal |
| `typographyIosFontWeightRegularItalic` | 400 | italic |
| `typographyIosFontWeightSemiboldItalic` | 600 | italic |
| `typographyIosFontWeightBoldItalic` | 700 | italic |

**Font size (pt)**

| Token Name | Value Large (Default) | Value Small | Value xxxLarge |
|---|---|---|---|
| `typographyIosSizeLargeTitle` | 34 | 32 | 40 |
| `typographyIosSizeTitle1` | 28 | 26 | 34 |
| `typographyIosSizeTitle2` | 22 | 20 | 28 |
| `typographyIosSizeTitle3` | 20 | 18 | 26 |
| `typographyIosSizeHeadline` | 17 | 15 | 23 |
| `typographyIosSizeBody` | 17 | 15 | 23 |
| `typographyIosSizeCallout` | 16 | 14 | 22 |
| `typographyIosSizeSubhead` | 15 | 13 | 21 |
| `typographyIosSizeFootnote` | 13 | 12 | 19 |
| `typographyIosSizeCaption1` | 12 | 11 | 18 |
| `typographyIosSizeCaption2` | 11 | 11 | 17 |

**Leading (Line Height)**

| Token Name | Value Large (Default) | Value Small | Value xxxLarge |
|---|---|---|---|
| `typographyIosSizeLargeTitle` | 41 | 39 | 48 |
| `typographyIosSizeTitle1` | 34 | 32 | 41 |
| `typographyIosSizeTitle2` | 28 | 25 | 34 |
| `typographyIosSizeTitle3` | 25 | 23 | 32 |
| `typographyIosSizeHeadline` | 22 | 20 | 29 |
| `typographyIosSizeBody` | 22 | 20 | 29 |
| `typographyIosSizeCallout` | 21 | 19 | 28 |
| `typographyIosSizeSubhead` | 20 | 18 | 28 |
| `typographyIosSizeFootnote` | 18 | 16 | 24 |
| `typographyIosSizeCaption1` | 16 | 13 | 23 |
| `typographyIosSizeCaption2` | 13 | 13 | 22 |

**Letter spacing**

| Token Name | Value |
|---|---|
| `typographyIosLetterSpacingNarrow` | -0.5 |
| `typographyIosLetterSpacingCompact` | -0.2 |
| `typographyIosLetterSpacingNormal` | 0 |
| `typographyIosLetterSpacingWide` | 0.25 |

### 7-C. Visualising Dynamic Type in Figma

iOS supports a broad spectrum of Dynamic Type sizes, ranging from xSmall to xxxLarge, to support user accessibility. To facilitate rapid testing of these states within our design workflow, we have implemented a specific Variable Mode strategy in Figma.

**The Three-Mode Configuration** Due to technical constraints within Figma, we have curated three representative modes to cover the essential scaling range. This allows designers to validate the UI against the most critical accessibility scenarios:

- **Large (Default):** The standard baseline experience for the majority of users.
- **Small:** Represents users who prefer compact text density.
- **xxxLarge:** Represents the maximum standard accessibility setting, critical for testing layout endurance and text wrapping.

**How to Apply**

Designers do not need to manually adjust font sizes to test these scenarios.

- **Step 1:** Select your design frame in Figma.
- **Step 2:** Navigate to the 'Apply variable mode' icon in the right-hand panel (Layer section).
- **Step 3:** Choose between Small, Large, or xxxLarge under the iOS Typography collection.

This action will instantly render the app interface at the selected Dynamic Type scale, providing immediate visual feedback on how the content adapts to user preferences without requiring a single manual edit.

---

## 8. Android Semantic Style Inventory (Proposed)

This section defines the typography system for our Android application. To ensure cross-platform consistency between iOS and Android, we adopt a Custom Material Theme strategy.

### 8-A. The Strategy: Material Mirroring

We utilise Google's Material Design 3 (M3) naming conventions (Android Type Scale) for developer efficiency but override the default Google values with our own measurements to align with Daily Mail's brand identity.

- **Semantic Mapping:** We map our largest iOS element (Large Title) to Android's Display Small role, ensuring that Headline roles remain reserved for standard editorial titles.
- **Brand Parity:** We inject Daily Mail's specific values (e.g. Display Small: 34sp instead of Google's default 36sp) to match our iOS design exactly.
- **Unit Translation:** While Figma designs are created in generic points (pt), Android implementation must use sp (Scale-independent Pixels) for text size to ensure accessibility support.

### 8-B. Android Semantic Style Inventory (Core Values)

The following table outlines our Custom Material Scale. These values represent the Default (1.0x) state.

> ⚠️ **Developer Note (Override Required)**
>
> Do not use the default Material Design 3 values. You must override the theme with the specific SP values defined below.
> - **Font Size:** Implement using `sp`.
> - **Line Height:** We recommend using `sp` for line height as well, to ensure the text container scales proportionally with the font size.

| Android Role (Material Name) | M3 Default Value | Daily Mail Custom Value | iOS Equivalent |
|---|---|---|---|
| Display Small | 36sp | 34sp | Large Title (34pt) |
| Headline Large | 32sp | 28sp | Title 1 (28pt) |
| Headline Medium | 28sp | 22sp | Title 2 (22pt) |
| Headline Small | 24sp | 20sp | Title 3 (20pt) |
| Title Large | 16sp | 17sp | Headline (17pt) |
| Body Large | 16sp | 17sp | Body (17pt) |
| Body Medium | 14sp | 16sp | Callout (16pt) |
| Title Small | 14sp | 15sp | Subhead (15pt) |
| Label Large | 14sp | 13sp | Footnote (13pt) |
| Label Medium | 12sp | 12sp | Caption 1 (12pt) |
| Label Small | 11sp | 11sp | Caption 2 (11pt) |

```kotlin
// Android Typography Mapping Example
val DmTypography = Typography(
    displaySmall = TextStyle(fontSize = 34.sp), // iOS Large Title
    headlineLarge = TextStyle(fontSize = 28.sp), // iOS Title 1
    headlineMedium = TextStyle(fontSize = 22.sp), // iOS Title 2
    headlineSmall = TextStyle(fontSize = 20.sp), // iOS Title 3
    titleLarge = TextStyle(fontSize = 17.sp), // iOS Headline
    bodyLarge = TextStyle(fontSize = 17.sp), // iOS Body
    bodyMedium = TextStyle(fontSize = 16.sp), // iOS Callout
    titleSmall = TextStyle(fontSize = 15.sp), // iOS Subhead
    labelLarge = TextStyle(fontSize = 13.sp), // iOS Footnote
    labelMedium = TextStyle(fontSize = 12.sp), // iOS Caption 1
    labelSmall = TextStyle(fontSize = 11.sp), // iOS Caption 2
```

### 8-C. Visualising Dynamic Scales (Logic & Safety Net)

Unlike iOS's lookup table, Android scales typography mathematically based on user settings. To mirror our iOS testing environment in Figma, we simulate three key Android scaling factors.

**The Scaling Logic**

- **Small (0.9x):** Matches iOS's conservative reduction (~90%).
- **Large (Default 1.0x):** The standard baseline experience.
- **Largest (1.3x):** Represents the maximum standard accessibility setting, critical for testing layout endurance.

> ⚠️ **Legibility Safety Net (Minimum Floor)** While Android scales text mathematically, we enforce a Minimum Floor of 11sp.
>
> - **The Issue:** Mathematically, Label Small (11sp) would scale down to 9.35sp on 'Small' settings, which compromises legibility on high-density screens.
> - **The Solution:** We clamp the minimum size at 11sp. This ensures that even users who prefer smaller UI can still read our smallest metadata labels comfortably.

### 8-D. Android Variable Mode Data

The following tables provide the calculated values for Figma Variable Modes. Developers do not need to hardcode these; the Android OS handles the multiplication automatically. However, the Minimum Floor logic must be handled as an exception in the code.

> ⚠️ **Simulation Note for Designers & QA:** The Small and xxxLarge columns are estimated simulations for Figma layout testing. Actual rendering varies due to Android's dynamic scaling logic.
>
> - **Designers:** Focus on layout resilience (e.g. text wrapping), not pixel-perfect matching against these values.
> - **Developers:** Use the Large (Default) column as the single source of truth. Implement these base values, and the OS will handle the scaling.

**Font size (sp)**

| Token Name | Large (Default 1.0x) | Small (0.9x) | xxxLarge (1.35x) |
|---|---|---|---|
| Display Small | 34 | 31 | 46 |
| Headline Large | 28 | 25 | 38 |
| Headline Medium | 22 | 20 | 30 |
| Headline Small | 20 | 18 | 27 |
| Title Large | 17 | 15 | 23 |
| Body Large | 17 | 15 | 23 |
| Body Medium | 16 | 14 | 22 |
| Title Small | 15 | 14 | 20 |
| Label Large | 13 | 12 | 18 |
| Label Medium | 12 | 11 | 16 |
| Label Small | 11 | 11 (Safe Floor) | 15 |

**Line height (sp)**

| Token Name | Large (Default 1.0x) | Small (0.9x) | xxxLarge (1.35x) |
|---|---|---|---|
| Display Small | 41 | 37 | 55 |
| Headline Large | 34 | 31 | 46 |
| Headline Medium | 28 | 25 | 38 |
| Headline Small | 25 | 23 | 34 |
| Title Large | 22 | 20 | 30 |
| Body Large | 22 | 20 | 30 |
| Body Medium | 21 | 19 | 28 |
| Title Small | 20 | 18 | 27 |
| Label Large | 18 | 16 | 24 |
| Label Medium | 16 | 14 | 22 |
| Label Small | 13 | 12 | 18 |
