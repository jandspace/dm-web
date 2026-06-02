# Colour Tokens

This page defines the specific colour values and their functional application across the Daily Mail digital ecosystem. Our Smart Swapping logic ensures that every colour token transitions reliably between Light and Dark modes, maintaining legibility and visual consistency across all surfaces.

---

## 🔀 What is Smart Swapping?

Unlike traditional systems that require manual override for every element, our system utilises a semantic mapping layer. This ensures that tokens automatically transition between Light and Dark modes based on their functional role, rather than their literal colour value.

- **Context-Aware:** Tokens are mapped to specific UI elements (e.g., background, text, border), allowing for intelligent inversion.
- **Accessibility First:** Every swap is pre-validated to meet WCAG 2.1 AA standards, ensuring optimal contrast ratios regardless of the user's system theme.
- **Predictability:** Designers and developers can predict how a component will behave in any environment by simply applying the correct functional token.
- **Strategic Flexibility (Theme Pinning):** While the system is dynamic by default, it allows for 'Fixed Appearance' in specific UI contexts such as video players or imagery-heavy modules, where the theme must remain constant to preserve legibility.

---

## 1. Primitive Palettes (The Source of Truth)

Primitive colours are the fundamental building blocks of our colour system. They represent raw hex values before any functional meaning is assigned. All brand palettes are generated using a Solid Overlay logic. While derived through opacity methods, the final output remains a fully opaque (solid) hex value for predictability. To ensure visual consistency across the entire Daily Mail ecosystem, we follow two distinct generation methods.

- **Why Primitives?** They decouple specific hex codes from functional names. This allows us to update the entire brand's 'Blue' in one place without changing the logic of the 'Primary Button'.
- **Generation Logic:** Our primitives are generated using a defined luminance scale (0–1000). This ensures consistent steps between shades, providing enough contrast for both Light and Dark mode swaps.
- **Usage Rule:** Primitive tokens (e.g., `primitive-blue-500`) should never be used directly in UI design. They must always be mapped to a Semantic Token to ensure system-wide consistency and theme-switching support.

### 1-A. Greyscale (Neutral) Palette

The Neutral palette is derived from Daily Mail's legacy product library. Rather than a purely mathematical scale, it is built on a percentage-based visual weight system to maintain the brand's established editorial feel.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

- **Scale Structure:** Our greyscale is organised into a 15-step custom scale, ranging from 0 (White, `#FFFFFF`) to 1000 (Black, `#000000`). Unlike standard 10-step systems, this expanded scale provides the granular control necessary for high-density editorial layouts and complex dark mode mapping.
- **Selection Logic:** These values are selected based on percentage-based visual weight rather than a purely linear mathematical progression. This ensures that the specific grey tones remain faithful to the legacy Daily Mail interface while providing the structural precision required for a modern design system.

> 💡 **Why a Non-Linear Scale?**
>
> A standard linear increment (e.g., 100, 200, 300...) does not guarantee symmetrical visual weight when inverted for Dark Mode. In Dark Mode, pure mathematical inversion often results in contrast that is either too harsh (vibrating) or too muddy for long-form reading.
>
> To address this, we introduced custom 50-step intervals at critical transition points: Greys-350 (`#E0E0E0`), Greys-750 (`#404040`), Greys-850 (`#242424`)
>
> These "Bridge Tokens" ensure that each Light Mode value finds a Dark Mode counterpart of equivalent perceived luminance, rather than just a mathematically opposite hex code.
>
> **Example of Asymmetric Mapping for Symmetrical Experience:**
>
> `color-background-neutral-darker`:
> - Light Mode: Maps to Greys-900 (`#191919`).
> - Dark Mode: Maps to Greys-350 (`#E0E0E0`).
>
> The Logic: Mapping to Greys-100 (`#FCFCFC`) in Dark Mode would create an aggressive, "stark" contrast that causes eye fatigue. By using the custom Greys-350, we maintain a "softened authority" that preserves reading endurance.
>
> This deliberate asymmetry in the numbering system is what produces a consistent, high-quality reading experience across both themes, with all pairings pre-validated against WCAG 2.1 AA standards.

### 1-B. Brand & Channel Palette Generation

To maintain unified vibrancy and visual weight across various Daily Mail channels, all brand palettes are generated using a consistent 'Solid Overlay' logic. While the shades are derived from a base colour overlaid on white or black, the final output is always a fully opaque (solid) hex value. This ensures that whether we are in the Sport, Showbiz, or Royals section, the colour hierarchy remains mathematically harmonious and predictable across all digital surfaces.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

**The Core Logic**

Every channel palette is derived from a single Primary Base (500) hex code. We do not manually adjust the hue or saturation; instead, we utilise a systematic overlay method to create Tints and Shades.

**Tints & Shades Recipe**

By placing the Base (500) colour over pure white or black backgrounds at specific opacities, we achieve a consistent 11-step scale:

- **Tints (Lighter Steps):** Created by layering the Base on a White (`#FFFFFF`) background.
  - `500 (Base)`: 100% Opacity
  - `400 – 50`: Ranging from 80% down to 10% opacity (e.g. Step 50 is a 10% 'Pale' tint).
- **Shades (Darker Steps):** Created by layering the Base on a Black (`#000000`) background.
  - `600 – 900`: Ranging from 80% down to 20% opacity (e.g. Step 900 is the darkest shade at 20% overlay on black).

> 💡 **Designer's Note:** When a new channel is introduced, simply identify your Base (500) and apply these opacity rules. This 'Plug & Play' system allows for infinite brand expansion while preserving the design system's integrity.

---

## 2. Colour Tokens: Semantic Mapping

While Primitive Palettes define our raw materials, Colour Tokens represent their functional application. These tokens are semantically named to describe their purpose, ensuring consistency across all Daily Mail products.

The mapping process transforms a static colour value into a functional design decision. This allows us to update the entire brand's look by simply changing the Primitive reference without touching the underlying UI logic.

| Token Name | Source (Primitive Alias) for Lightmode | Source (Primitive Alias) for Darkmode |
|---|---|---|
| `background-neutral-lightest` | Primitive Colors/Greys/100 | Primitive Colors/Greys/1000 |
| `text-neutral-darker` | Primitive Colors/Greys/900 | Primitive Colors/Greys/350 |
| `background-home-blue-base` | Primitive Colors/Blue/500 | Primitive Colors/Blue/300 |
| `background-sport-green-subtlest` | Primitive Colors/Green/50 | `#213421` (Customised Hex*) |
| `border-neutral-light` | Primitive Colors/Greys/300 | Primitive Colors/Greys/800 |
| `text-interactive-primary-default` | Primitive Colors/Blue/500 | Primitive Colors/Blue/300 |
| `text-interactive-primary-hover` | Primitive Colors/Blue/700 | Primitive Colors/Blue/200 |
| `background-semantic-error-subtle` | Primitive Colors/Red/300 | Primitive Colors/Red/600 |
| `effect-translucent-dark-moderate` | Primitive Colors/Translucent/black-opacity-40 | Primitive Colors/Translucent/white-opacity-40 |

**The Universality of Smart Swapping**

In this system, a token name does not represent a static hex code. Instead, it represents a functional role. When the system theme changes (Lightmode ↔ Darkmode), the token automatically 'swaps' its mapped Primitive value to suit the new environment.

---

## 3. Neutral Tokens

Daily Mail's backbone of the UI. These tokens handle the primary surfaces and content hierarchy.

| Element | Token Name | Light Mode (Primitive) | Dark Mode (Swap) | Usage |
|---|---|---|---|---|
| `background` | `color-background-neutral-lightest` | greys-100 (`#FCFCFC`) | greys-950 (`#121212`) | Primary product surface. |
| `text` | `color-text-neutral-darker` | greys-900 (`#191919`) | greys-350 (`#E0E0E0`) | Primary body texts and headlines. |
| `icon` | `color-icon-neutral-dark` | greys-800 (`#333333`) | greys-400 (`#CCCCCC`) | Primary icon colour. |
| `border` | `color-border-neutral-light` | greys-300 (`#E3E3E3`) | greys-800 (`#333333`) | Primary borders and dividers. |

Use Neutral Lightest (`#FCFCFC`) as the absolute Level 0 base canvas to prevent halation and maximise long-form reading endurance.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Do not use pure white (`#FFFFFF`) for large background surfaces, as high-contrast halation can cause visual vibration and eye strain.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Use Neutral Darker (`#191919`) for primary copy to maintain high legibility while reducing eye strain through softened contrast.

Avoid using pure black (`#000000`) for title and paragraph text to prevent visual vibration and halation against light surfaces.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

---

## 4. Brand & Channel Tokens (Categorical)

These tokens preserve the Daily Mail's unique channel identities while adjusting for visual comfort in different modes.

| Element | Token Name | Light Mode (Primitive) | Dark Mode (Swap) | Usage |
|---|---|---|---|---|
| `background` | `color-background-home-blue-base` | `blue-500` | `blue-300` | Primary Home (brand) surface |
| `background` | `color-background-home-blue-base-darker` | `blue-500` | `blue-800` | Secondary Home (brand) surface (*Sparingly) |
| `background` | `color-background-royal-violet-subtlest` | `violet-50` | `#2A222D` | Pale Royals (brand) surface |
| `text` | `color-text-lifestyle-azure-base` | `azure-500` | `azure-300` | When a title text requires brand identity |
| `icon` | `color-icon-showbiz-red-base` | `red-500` | `red-300` | Channel-specific glyphs. |

---

## 5. Interaction Tokens (General & Contextual)

Interaction tokens define the visual states of interactive elements across the platform. To maintain a lean architecture, these tokens borrow from our Core brand Blue, Green, and Red Primitive palettes depending on the context.

Rather than introducing new hues, interactive states such as Hover and Pressed are communicated through scale shifts within the same palette (e.g. shifting from 500 to 700 for hover state). This ensures a consistent physical response across all functional elements while leveraging our existing colour infrastructure.

**Note on Usage:** Do not interchange Interaction tokens with Semantic tokens. Interaction tokens are strictly for elements that respond to user input (buttons, links, etc.), whereas Semantic tokens are reserved for static status communication. Using the incorrect token type breaks the system's logic and compromises cross-platform predictability.

### 5-A. Interaction Categories

| Category | Description | Usage |
|---|---|---|
| 🟦 Interaction Primary | Based on the 'Daily Mail Blue'. Represents the main action on a page. | All general interactions that do not require specific context (Use Primary, Secondary, Tertiary, Quaternary buttons) |
| 🟩 Interaction Positive | Used for constructive or affirmative actions. | Activate, Turn on, Allow, Like |
| 🟥 Interaction Negative | Used for destructive or high-risk actions. | Delete, Remove, Erase, Decline, Dislike |

### 5-B. Interaction Token Examples

The following table illustrates how interaction tokens are structured. Note that the Value (default, hover, pressed) directly corresponds to the user's action.

| Category | Token Example (Background) | Token Example (Text) | Interaction State |
|---|---|---|---|
| Interaction Primary | `color-background-interaction-primary-default` | `color-text-interaction-primary-default` | Idle / Normal |
| | `color-background-interaction-primary-hover` | `color-text-interaction-primary-hover` | Mouse Over |
| | `color-background-interaction-primary-pressed` | `color-text-interaction-primary-pressed` | Active Click |
| Interaction Positive | `color-background-interaction-positive-default` | `color-text-interaction-positive-default` | Affirmative Action |
| Interaction Negative | `color-background-interaction-negative-default` | `color-text-interaction-negative-default` | Destructive Action |

### 5-C. Usage Specification (Background & Foreground)

To maintain accessibility and structural clarity, interaction tokens must be paired correctly with foreground elements (text/icons).

| DO | DON'T |
|---|---|
| Apply `interaction-primary` for the most important action to guide the user's focus. | Do not use `semantic-success` for general context buttons; use `interaction-positive` to indicate it is a clickable element. |
| Use the hover and pressed values to provide immediate visual feedback to user input. | Do not mix interaction categories on the same level of hierarchy (e.g., having multiple different 'Primary' actions in one module). |
| Use neutral/white for text or icons placed inside a primary blue, positive green, or negative red button background to ensure those elements are clearly visible. (WCAG 2.1 AA compliance) | Avoid using subtle or base values for interactive states; stick to the state-based naming (default, hover, pressed) for clarity. |

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Use `background-interaction-primary-default` as the universal anchor for primary actions (buttons) to ensure navigational consistency. You also can use Neutral Button style.

Do not use channel-specific base colours for functional elements; reserved for branding and contextual identity only.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Use `text-interaction-primary-default` and `icon-interactive-primary-default` as the universal anchor for primary actions (icons and links) to ensure a predictable user journey

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Do not use channel-specific base colours for functional elements; reserve them strictly for branded identity.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

---

## 6. Semantic Feedback Tokens

Semantic Status tokens are used to communicate the system's state or the result of a user's interaction. These tokens ensure that users can immediately understand whether an action was successful, if there is an error, or if a situation requires caution. These tokens utilise the established Red and Green packages from our Primitive scales to signal Success, Error, or Alert states.

**Note on Usage:** These tokens are reserved for feedback only. For the buttons or links that trigger these actions, use the Interaction Tokens (e.g., `interaction-positive`, `interaction-negative`).

### 6-A. The Multi-Element Approach

By categorising semantic colours under specific elements, we provide a flexible 'solution kit' for any UI scenario. Designers simply choose the appropriate element token based on the level of emphasis required:

- **Backgrounds (`background-`):** High emphasis, used for banners or alerts (e.g., `semantic-error-base`).
- **Text (`text-`):** Direct communication, used for error messages or success labels (e.g., `semantic-error-deep`).
- **Icons (`icon-`):** Visual symbols, used for status indicators next to content (e.g., `semantic-error-base`).
- **Borders (`border-`):** Structural feedback, used for highlighting input validation (e.g., `semantic-error-subtle`).

### 6-B. Semantic Status Categories

| Status | Base Colour | Intent | Usage Example |
|---|---|---|---|
| Success | 🟩 Green | Confirms that a task or process has been completed successfully. | "Saved successfully", "File successfully uploaded" |
| Error | 🟥 Red | Informs the user of a critical issue or a failed validation that requires correction. | Validation errors, system failures, failed payment. |
| Warning | 🟧 Orange | Alerts the user to a potential issue or a situation that requires attention before proceeding. | Pending actions, nearing limits, non-critical alerts. |
| Info | 🟦 Blue | Provides neutral, helpful information or supplementary guidance. | Hints, system tips, non-urgent notifications. |

### 6-C. Mapping Example: The Error Scenario

Below is how a single semantic status (Error) is distributed across different elements to provide a comprehensive UI solution:

| Element | Token Path (Example) | Light Mode | Dark Mode | Rationale |
|---|---|---|---|---|
| Background | `background-semantic-error-base` | `red-500` | `red-300` | High-visibility warning banners. |
| Text | `text-semantic-error-deep` | `red-700` | `red-200` | Legible error messages on light/dark. |
| Icon | `icon-semantic-error-base` | `red-500` | `red-300` | Clear visual status indicator. |
| Border | `border-semantic-error-subtle` | `red-300` | `red-600` | Soft validation borders on input fields. |

> 💡 **Designer's Implementation Note**
>
> When choosing a semantic token, consider the Visual Hierarchy:
> 1. **High Emphasis:** Use a combination of `background-semantic-error-base` and `text-neutral-lightest`.
> 2. **Low Emphasis:** Use `Border-subtle` and `text-semantic-error-deep`, `icon-semantic-error-base` to provide feedback without overwhelming the user.
> 3. **Accessibility:** All semantic pairings need to be pre-validated to meet WCAG 2.1 AA standards for legibility.

---

## 7. Editorial Tokens

Editorial tokens are specialised metadata signals used to categorise and highlight stories. Unlike interaction or semantic tokens, these are static indicators that help readers distinguish between different content types, such as Breaking News, Exclusive, Live, or Special Article (e.g. Deep Dive).

### 7-A. Editorial Token Examples

Editorial colour usage is intentionally limited to three levels of emphasis. To maintain clarity and avoid visual noise, all labels and badges are grouped into these visual categories.

| Category | Token Example (Background) | Token Example (Text) | UI Context |
|---|---|---|---|
| Editorial Highlight | `color-background-editorial-highlight` | `color-text-editorial-highlight` | High Impact - Breaking, Exclusive, Live |
| Editorial Feature | `color-background-editorial-feature` | `color-text-editorial-feature` | Format Signal - Poll, Opinion, Interview |
| Editorial Analysis | `color-background-editorial-analysis` | `color-text-editorial-analysis` | In-depth Report - Deep Dive, Special Report |

### 7-B. Strategic Implementation

- **Simplified Logic:** This approach allows the editorial team to introduce new badge labels without expanding the colour system, by simply mapping them to one of the three established categories.
- **Special Case (M+):** The Mail+ (M+) badge is a fixed brand asset incorporating a proprietary gradient. It is implemented as a Dedicated Component rather than a colour token to protect its premium brand identity.
- **Non-Interactive:** Editorial tokens are informative signals. They do not possess hover or pressed states, as their primary role is to highlight metadata, not to trigger actions.
- **Usage Note on Foreground:** To ensure WCAG 2.1 AA compliance, any text or icon placed inside an editorial badge must use `text-neutral-white` or `icon-neutral-white`.
- **Format Selection:** Apply the `background-editorial-highlight` token for Solid Background Badges, or use the corresponding `text-editorial-highlight` or `icon-editorial-highlight` token directly for Text-only Labels. (e.g. Live)

---

## 8. Translucent Effects & Shades (Alpha Layers)

To ensure visual consistency over complex backgrounds (such as imagery or brand gradients), we utilise two distinct translucent token categories. These tokens are engineered with Smart Swapping to maintain legibility and depth across themes.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

> 💡 **Layering Principle**
>
> Translucent tokens operate across two distinct UI layers:
> - **Environment Layer:** Tokens that modify the luminance or perception of an entire background region. These are typically used to dim, tint, or soften imagery and large surfaces.
> - **Component Surface Layer:** Tokens that define the visual surface of UI components placed above content. These tokens create elevation and separation from the background.
>
> This distinction ensures that background adjustments and floating UI components remain semantically separate within the token architecture.

### 8-A. Background Shades

`background-shade-` These are often used as overlays to adjust the luminance of an entire area or to provide a subtle tint over imagery.

- **Logic:** A `background-shade-moderate` token might map to `black-opacity-40` in Lightmode and shift to a different opacity level `black-opacity-60` in Darkmode to preserve the 'mood' of the content.
- **Purpose:** To control the background contrast without completely obscuring the underlying visual details.

These tokens operate at the Environment Layer, meaning they modify the perceived brightness of an entire visual region rather than defining the surface of an individual UI component.

Typical usage examples include: Modal backdrops, Image overlays, Video dimming layers

### 8-B. Translucent Effects

`effect-translucent-dark-...` or `effect-translucent-light-...`

These are primarily used for UI components (like buttons or cards) that sit on top of other elements.

- **Logic:** As shown in the diagram, a `translucent-dark-deep` token (`black-opacity-60`) utilised in Lightmode will automatically swap its primitive value to `white-opacity-60` in Darkmode.
- **Purpose:** To create an 'elevated' glass effect that adapts to the background's luminance.

These tokens operate at the Component Surface Layer, meaning they represent the visual material of floating UI elements rather than modifying the environment.

Typical usage examples include: Floating media controls, Buttons placed over imagery or video, Cards on image-based layouts

### 8-C. Visual Mapping Example

Based on the provided illustration, here is how the tokens dynamically resolve:

| Feature | Token Category | Lightmode Mapping | Darkmode Mapping (Swap) |
|---|---|---|---|
| Component Depth | `effect-translucent-black` | `black-opacity-60` | `white-opacity-60` |
| Area Tinting | `background-shade` | `black-opacity-40` | `black-opacity-60` |

> 💡 **Implementation Note for Designers**
>
> Use `effect` when you need a component to feel "lifted" and `shade` when you need to "push back" or dim a background area (e.g. Modal overlay). Both will automatically adjust via Smart Swapping to ensure WCAG compliance.

---

## 9. Miscellaneous (Exceptions)

The Miscellaneous Pod serves as a flexible container for design tokens that sit outside the standard semantic hierarchy. This space is reserved for unique brand requirements, legacy support, or specific global exceptions that do not yet fit into a broader categorical role.

### 9-A. Broad Application & Purpose

While we strive for maximum standardisation, certain sub-brands or premium services require a distinct visual language to differentiate themselves from the core Daily Mail product.

- **Premium Product Support:** For instance, DailyMail+ may utilise a bespoke set of tokens for its subscription-only features. These are housed here to prevent cluttering the core functional tokens.
- **Legacy Bridging:** Temporary tokens required during transition periods between old and new interface designs.
- **Global Exceptions:** Specific edge cases where a unique colour is required for a singular, non-recurring global element.

### 9-B. Usage Guidelines

To maintain the integrity of the design system, the Miscellaneous pod should be used with discretion:

1. **Limited Scope:** These tokens should only be applied within their specific context (e.g., only within the DailyMail+ user journey).
2. **Review Process:** If a miscellaneous token starts appearing across multiple products, it should be reviewed for promotion to a Semantic or Categorical token.

---

## 10. Theme Pinning: Fixed Appearance

In certain UI contexts, Smart Swapping must be overridden to maintain visual integrity. This is known as Theme Pinning, where a component or frame is 'locked' to a specific appearance (Light or Dark) regardless of the user's global system theme.

### 10-A. When to Pin a Theme

- **Imagery-heavy Contexts:** When a module (like a Podcast Hub item) sits on a permanent dark or blurred image background.
- **Media Interfaces:** Video players and immersive galleries that require a consistent 'Dark' aesthetic for focus.
- **Branded Mastheads:** Elements that must retain specific brand colours to satisfy channel identity.

### 10-B. Strategic Implementation (Overriding the Inheritance)

- **Logic of Fixed State:** By explicitly defining the theme mode at the component level, the mapping layer stops reacting to system-wide changes (Light/Dark).
- **Designer's Responsibility:** When a module is placed on a background that doesn't change (e.g., a dark video player), the designer must ensure the component is pinned to the corresponding theme mode to preserve legibility and contrast.
- **Development Handover:** These pinned sections should be marked in the handoff documentation so that developers can apply a fixed theme attribute (e.g., `data-theme="light"`) to the specific container, preventing it from swapping dynamically.
