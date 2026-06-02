# Design Tokens

Design tokens are the visual atoms of our design system. They replace fixed values (like Hex codes or points) with self-explanatory names, ensuring a consistent look and feel across Web, iOS, and Android.

> "Our tokens are the Single Source of Truth for Daily Mail's digital products."

---

## 1. What are Design Tokens?

Design tokens are the smallest building blocks of our design system. Instead of using hard-coded values like Hex codes (`#004DB3`) or points (`16pt`), we use named entities. These tokens act as a bridge between design and engineering, ensuring that our brand identity remains consistent across Web, iOS, and Android.

---

## 2. The Strategic Advantage

- **Consistency at Scale:** A single update to a token automatically propagates across all platforms and channels.
- **Platform Agnostic:** The same token name is used regardless of the platform, minimising communication errors between designers and developers.
- **Contextual Clarity:** We communicate through 'Intent' (e.g. Home Blue Base) rather than raw values (e.g. `#004DB3`), making design decisions transparent.

---

## 3. Token Naming Convention

To ensure a consistent cross-platform workflow, the Daily Mail Design System utilises a standardised **Kebab-case Format** `[token-type]-[element]-[category]-[value]` as its official naming convention. This format provides a human-readable and intuitive hierarchy that serves as the Single Source of Truth for all digital products, ensuring visual consistency regardless of the end-platform's specific technical syntax.

### 3-A. Standard Token Hierarchy

Our tokens generally follow a four-tier structure to maintain clarity and scalability across our global products:

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

However, not all token types require every tier. For example, the `[category]` level is primarily used for colour tokens to describe contextual groupings (e.g. channel & brand, interaction, semantic, editorial, ...), while other token types such as spacing or typography may use a simplified three-tier structure.

#### Token Types

Our system is categorised into three primary types:

- `color`: Defines the brand and functional palette.
- `number`: Defines fixed numerical values such as spacing and radii.
- `typography`: Defines the building blocks of our type system.

#### Element (Property)

This level defines the specific UI element area or the functional CSS property.

- **For Categorical Tokens (Color):** It specifies the target UI element (e.g., background, text, icon, border).
- **For Universal Tokens (Number & Typography):** It defines the core structural property (e.g., spacing, border-radius, font-family).

| Type | Element (Property) | Description |
|---|---|---|
| `color` | `background`, `text`, `icon`, `border`, `effect`, `miscellaneous` | Defines where the colour is applied within the UI. |
| `number` | `spacing`, `border-radius` | Maintains a consistent 4pt-based spatial rhythm. ⚠️ No category level is used for numerical values to ensure universal application. |
| `typography` | `font-family`, `font-weight` | Sets the foundation for our editorial character. ⚠️ No category level is used for typography values to ensure universal application. |

> 💡 **Developer Note:** This level defines the CSS property for universal tokens (spacing, font-size) and the UI element area for categorical tokens (background, text).

#### Category

The third level defines the brand identity or semantic context. This layer is selective. It only appears when context-specific variation (like a brand color) is required.

- 🎨 **Categorical Tokens (Color):** Use this level to define the brand channel or meaning (e.g., home-blue, showbiz-pink, error). This allows the same "Element" (like background) to have different values based on the brand context.
- 📐 **Universal Tokens (Number & Typography):** category level is omitted. Values like spacing or font-family remain constant regardless of the brand channel, ensuring a unified structural foundation across all digital products.

> 💡 **Why the difference in levels?**
> To keep the system efficient, we remove the "Category" for tokens that don't need brand-specific variations. This creates a 3-level "Universal" structure for core scales and a 4-level "Categorical" structure for context-sensitive styles.

| Category | Type Examples | Description |
|---|---|---|
| Brand & Channel | `home-blue`, `showbiz-red`, `sport-green`, etc | Dedicated to specific editorial channels and brand identity. |
| Neutral & Utility | `neutral`, `shade`, etc | Used for standard layouts, surfaces, and layered glass-morphism effects. |
| Editorial | `editorial-highlight`, `editorial-feature`, `editorial-analysis` | |
| Interaction | `interaction-primary`, `interaction-negative`, `interaction-positive` | |
| Semantic (Feedback) | `semantic-error`, `semantic-warning`, `semantic-success`, `semantic-info` | Communicates system states, validation messages, and user feedback. |

#### Values

The final level of our token name defines the specific visual attribute, functional weight, or precise numerical value. To ensure clarity and technical feasibility, values are structured according to their type:

| Value Group | Type | Applied Examples | Description |
|---|---|---|---|
| Brand Tone & Weight | `color` | `base`, `subtle`, `subtlest`, `darker`, `default`, `hover` | Defines the hierarchical intensity within brand/channel palettes. |
| Neutral Colours | `color` | `white`, `lightest`, `darker`, `black` | Defines core functional shades for UI elements and surfaces. |
| Opacity Levels | `color` | `clear`, `pale`, `subtle`, `moderate`, `thick`, `solid` | Semantic names for alpha-transparency (e.g. pale for 10%, moderate for 40%). |
| Universal Digits | `number` | `0`, `4`, `12`, `32`, `full` | Actual point values used for spacing (padding & margin) or rounded corner (border-radius) to ensure developer familiarity. |
| Foundational Styles | `typography` | `sans`, `serif`, `regular`, `semibold`, `bold` | Core typeface families and weight variations. |

### 3-B. Platform Transformation

To ensure a consistent cross-platform workflow, the Daily Mail Design System utilises a standardised Kebab-case Format as its official naming convention. This format provides a human-readable and intuitive hierarchy that serves as the Single Source of Truth for all digital products, ensuring visual consistency regardless of the end-platform's specific technical syntax.

| System Standard | Platform | Format |
|---|---|---|
| `color-background-home-blue-base` | Figma / JSON (Source) | `color/background/home-blue/base` |
| | Web (CSS Variables) | `--color-background-home-blue-base` |
| | iOS / Android (Code) | `colorBackgroundHomeBlueBase` |
| `color-text-neutral-darker` | Figma / JSON (Source) | `color/text/neutral/darker` |
| | Web (CSS Variables) | `--color-text-neutral-darker` |
| | iOS / Android (Code) | `colorTextNeutralDarker` |
| `number-spacing-16` | Figma / JSON (Source) | `number/spacing/16` |
| | Web (CSS Variables) | `--number-spacing-16` |
| | iOS / Android (Code) | `numberSpacing16` |

> 💡 **Why this Format?**
> By adopting this structured hyphenated notation, we enhance the structural integrity and searchability of our tokens across all design tools and codebases. This approach ensures that our system remains scalable and accessible as our technical stack evolves to serve millions of readers worldwide.

---

## 4. Smart Swapping System (Light & Dark Mode)

To maximise designer productivity, we employ a 'Light Mode-first Smart Mapping' strategy. Designers simply apply tokens based on the Light Mode guidelines, and the system automatically swaps these for the optimised Dark Mode values.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

### 🔀 What is Smart Swapping System

- **Concept:** We maintain intuitive names (e.g. Black/White) while the system handles the automated inversion of values based on the active theme.
- **Example:** `color-text-neutral-black`
  - **Light Mode:** Renders as `#000000` (Ensuring legibility on light backgrounds).
  - **Dark Mode:** Automatically swaps to `#FFFFFF` (Ensuring legibility on dark backgrounds).

---

## 5. Practical Application Examples

| Token Name | Assigned Value | Usage Example |
|---|---|---|
| `color-background-home-blue-base` | `#004DB3` | Main Masthead and primary CTA buttons on the Home screen. |
| `color-text-neutral-darker` | `#191919` | Article headlines and body copy (Autoswap to White in Dark Mode). |
| `color-text-neutral-white` | `#FFFFFF` | Text on brand backgrounds or primary button labels. |
| `color-icon-sport-green-base` | `#0CAC0C` | Dedicated icons and identity markers within the Sport section. |
| `number-border-radius-8` | `8pt` | Standard corner rounding for article cards and media containers. |
| `number-border-radius-full` | `999pt` | Perfect pill-shaped rounding for tags, badges, and search bars. |
| `typography-font-family-sans` | `'Inter', sans-serif` | The primary typeface for all functional UI and body text. |
| `typography-font-weight-bold` | `700` | Emphasis for navigation items and primary sub-headings. |
