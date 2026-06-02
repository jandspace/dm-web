# Button

Buttons are the **primary triggers for user interaction** within the Daily Mail product ecosystem. They facilitate navigation, form submission, and critical functional actions. To ensure a consistent and high-quality user experience, our buttons follow a strict hierarchical logic designed to guide the user's focus effectively while maintaining the aesthetic integrity of our content-rich environment.

///// IMAGE /////

---

## 1. Usage Principles

- **Priority Driven**: Every screen should ideally feature only one **Primary** action to prevent decision fatigue. Supporting actions should utilise lower hierarchical levels.
- **Contextual Flexibility**: Our buttons are designed to adapt to diverse environments, including standard **lightest surfaces**, tinted sections, and rich media overlays.
- **Consistency over Aesthetics**: While we offer various stylistic versions, the functional intent of the button must remain predictable across all platforms.
- **Legibility First**: We avoid harsh pure white/black contrast to reduce eye strain, opting for a refined palette that meets **WCAG 2.1 AA** standards.

---

## 2. Button Hierarchy

Our system utilises four distinct levels of hierarchy to manage the complexity of news and media interfaces:

| Level | Role | Visual Characteristic |
|---|---|---|
| **Primary** | Critical Action | High-contrast, solid fill. The 'Absolute Authority'. |
| **Secondary** | Supporting Action | Outlined (Ghost) style. Clear structure without the weight. |
| **Tertiary** | Low-emphasis Action | Buttons placed on media surfaces or subtle fill (Subdued). Blends harmoniously with the surface. |
| **Quaternary** | Pure Interaction | Transparent (TextLink-like). Zero footprint, high-intent triggers. |

---

## 3. Strategic Colour Logic

Buttons must maintain clear visibility and hierarchy across all surface types. Selection is determined by the following surface types:

///// IMAGE /////

### Neutral Surfaces

While buttons are primarily placed on our **standard lightest background**, they are also engineered to maintain sufficient contrast on varied shades of grey surfaces.

### Channel Backgrounds

Buttons must remain visually distinct and accessible when used over **specific channel or branded backgrounds or its subtlest backgrounds**, ensuring the action is always identifiable.

### Media Surfaces

Buttons are designed to function accurately over **images or video content**, utilising defined hierarchical variations to maintain legibility against complex or dynamic visuals.

### 🔒 Theme Pinning: Fixed Appearance

In certain UI contexts, button colours should not respond to global theme switching. This is known as Theme Pinning, where a component is locked to a specific appearance (Light or Dark) to preserve visual consistency and contrast.

**Theme Pinning should be applied when:**

- The background is **fixed** (e.g. brand surfaces, editorial colours, or media overlays)
- Automatic theme switching would **reduce contrast or legibility**
- A consistent visual identity must be maintained regardless of user theme

In these cases, button tokens must remain **fixed** and should not participate in **Smart Swapping**.

---

## 4. Interaction States & Tokens

All buttons utilise dedicated **Interaction Tokens** to provide consistent feedback across **Default, Hover and Pressed** states.

### 4-A. General (Brand Blue - Primary) & Contextual Buttons

Primarily utilise **Daily Mail Blue** or semantic interaction tokens (**Positive** / **Negative**). These tokens ensure that the button's intent and importance remain clear during interaction state changes such as Hover, Pressed, or Loading.

Where buttons include both text and mono icons, the same colour token should be applied to both elements to ensure consistent visual feedback across interaction states.

///// IMAGE /////

### 4-B. Neutral Surface Variants

Used in neutral interface areas where brand emphasis is not required. These buttons utilise neutral colour tokens to provide interaction feedback while maintaining a subtle and balanced visual hierarchy.

e.g. `text-neutral-darker`, `background-neutral-lighter`, `border-neutral-grey-light`

### 4-C. Translucent / Media Overlay Variants

Used when buttons appear over imagery, video, or visually rich backgrounds. These variants employ translucent-light or translucent-dark tokens as interaction layers, ensuring clear feedback while preserving the visibility of the underlying content.

e.g. `effect-translucent-dark-pale`, `border-translucent-dark-subtle`, `effect-translucent-dark-moderate`

---

## 5. Button Style Variations

### 5-A. General Situation

Buttons are organised into four levels based on their visual prominence and interaction priority. While Primary actions are strictly controlled, Secondary and Tertiary buttons provide more flexibility depending on the context and visual balance of the interface.

---

### Primary

#### ⚖️ Visual Weight: Highest

Primary buttons represent the main action within a screen or module. They use the brand blue to clearly signal the most important action a user can take. In most situations, only one Primary button should appear within a given context.

#### 1. Primary Brand (Default)

///// IMAGE /////

The default Primary button represents the main action within the interface. It uses the brand blue to clearly signal the most important user action in a given context. This variation should be used in most standard UI situations, particularly on light surfaces where the brand colour provides strong visual emphasis.

**Required Token**

`background-interaction-primary-default`

`text-neutral-white`

---

#### 2. Primary Neutral

///// IMAGE /////

Used when the surrounding interface intentionally adopts a neutral visual tone. In some sections of the product, the UI may prioritise content, imagery, or editorial presentation over strong brand colour. In these cases, a neutral filled button provides the same level of emphasis as a Primary action while maintaining visual harmony with the interface. Use this variation when the default blue Primary button feels visually too dominant or disrupts the visual harmony of the interface.

**Required Token**

`background-neutral-darker`

`text-neutral-lightest`

---

#### 3. Primary Neutral Inverse

///// IMAGE /////

Used when the button appears on dark or highly visual backgrounds. Modules that include background images or Daily Mail channel colours may reduce the contrast or visual clarity of the default Primary button. In these situations, the inverse variation ensures the action remains clearly visible and accessible. This variation preserves the meaning of a Primary action while adapting to darker surfaces.

**Required Token**

`background-neutral-light`

`text-neutral-darker`

*\*Primary variations do not change the meaning of a Primary action.*

---

### Secondary

#### ⚖️ Visual Weight: Medium

Secondary buttons represent supporting actions that sit alongside a Primary action. They provide an alternative option without competing with the main action, allowing users to perform related tasks while maintaining a clear action hierarchy.

#### 1. Secondary Outline (Default)

///// IMAGE /////

Used for alternative actions that support the primary task. Secondary buttons provide clear interaction without competing with the primary action. They are typically used alongside a primary button or in areas where a less dominant action is required.

**Required Token**

`effect-translucent-dark-clear`

`border-neutral-grey-light`

`text-interaction-primary-default`

---

#### 2. Secondary Visible

///// IMAGE /////

Optimised for low-contrast surfaces (e.g. light grey) where standard borders may blend into the background. A translucent border helps maintain separation from the background while keeping the button visually lightweight. This variation (translucent border) should be used sparingly and primarily for low-contrast surfaces.

**Required Token**

`effect-translucent-dark-clear`

`border-translucent-dark-subtle`

`text-interaction-primary-default`

---

#### 3. Secondary Neutral

///// IMAGE /////

Used in neutral content areas where interaction emphasis should remain subtle. This variation provides a neutral alternative when brand-coloured text may feel too prominent.

**Required Token**

`effect-translucent-dark-clear`

`border-neutral-grey-light`

`text-neutral-darker`

---

#### 4. Secondary Light Surface

///// IMAGE /////

Optimised for use across a wide range of lighter environments, including subdued grey backgrounds, imagery, or video. This variant uses a subtle dark border with Neutral Darker text to clearly define the button without introducing strong colour contrast. It ensures the button remains visible whilst maintaining a balanced visual hierarchy within content-rich or media-driven layouts.

**Required Token**

`effect-translucent-dark-clear`

`border-translucent-dark-subtle`

`text-neutral-darker`

---

#### 5. Secondary Dark Surface

///// IMAGE /////

Used on darker imagery or visually complex backgrounds. A lighter border and text colour are applied to maintain clear visibility and ensure the button remains legible without overpowering surrounding content.

**Required Token**

`effect-translucent-light-clear`

`border-translucent-light-moderate`

`text-neutral-lightest`

---

#### Why transparent surface tokens applied?

A transparent surface token like `translucent-dark-clear` or `translucent-light-clear` is intentionally applied to define the button container area. While visually invisible in the default state, it enables consistent hover and interaction feedback without introducing layout shifts.

---

### Tertiary

#### ⚖️ Visual Weight: Light

Tertiary buttons are used for supporting actions that should remain visible but carry lighter visual emphasis. They are often used when multiple actions are presented together and a softer visual hierarchy is preferred.

#### 1. Tertiary Soft (Default)

///// IMAGE /////

Used as the standard low-emphasis option for clean, bright backgrounds. It features a soft, light grey fill that provides just enough separation from the page background to be clickable, without demanding excessive visual weight. We utilise our signature brand blue for the text to ensure the interaction remains clear and recognisable.

**Required Token**

`background-neutral-lighter`

`text-interaction-primary-default`

---

#### 2. Tertiary Visible

///// IMAGE /////

Optimised for light-grey or off-white sections where a standard fill may lack definition. It applies a darkened semi-transparent tint to the button surface, creating enough depth to remain distinct against the background while preserving the core brand identity.

**Required Token**

`effect-translucent-dark-pale`

`text-interaction-primary-default`

---

#### 3. Tertiary Neutral

///// IMAGE /////

Used for functional or dismissive actions such as 'Cancel', 'Close', or 'Settings' that require a more subdued tone. By replacing the brand blue with a professional dark grey, it shifts the visual focus from 'promotion' to 'function', ensuring the interface remains clean and preventing visual clutter in high-density forms or complex settings pages where multiple actions compete for attention.

**Required Token**

`background-neutral-lighter`

`text-neutral-darker`

---

#### 4. Tertiary Light Surface

///// IMAGE /////

Designed for use over imagery, video, or visually rich backgrounds where a softer, integrated appearance is preferred. It features a light semi-transparent surface that creates a subtle frosted effect, allowing underlying media to remain visible whilst maintaining button readability. When placed over imagery or video, a background blur of 16 should be applied to improve text clarity whilst preserving the lightweight visual style.

**Required Token**

`effect-translucent-dark-moderate`

`text-neutral-lightest`

Optional: Background Blur: 16 = iOS SwiftUI `.blur(radius: 8)`

---

#### 5. Tertiary Dark Surface

///// IMAGE /////

Used over darker imagery or high-contrast video scenes where additional separation from the background is required. A deeper semi-transparent surface helps the button remain visible against complex media. When placed over imagery or video, a background blur of 16 should be applied to enhance legibility and maintain clarity within visually dense environments.

**Required Token**

`effect-translucent-light-deep`

`text-neutral-darker`

Optional: Background Blur: 16 = iOS SwiftUI `.blur(radius: 8)`

---

### Quaternary (Transparent)

#### ⚖️ Visual Weight: Minimal

Quaternary buttons represent the lowest level of action within the interface. They are typically used for low-risk or dismissive actions such as cancelling, closing, or secondary triggers that should not compete with primary content.

Although visually transparent, the button still maintains a dedicated container using a clear translucent token (e.g. `translucent-light-clear` or `translucent-dark-clear`). This ensures the interaction area remains consistent and allows hover or pressed feedback to be applied without introducing unnecessary visual weight. The button therefore remains interactive through its clickable area and subtle hover feedback, whilst maintaining a visually lightweight appearance.

#### 1. Quaternary Default (Default)

///// IMAGE /////

Used for supporting actions or low-priority triggers on the standard lightest background. It utilises Interactive Blue text without a visual container to ensure the trigger is recognisable as a brand element, whilst allowing the surrounding primary content to take absolute precedence.

**Required Token**

`effect-translucent-dark-clear`

`text-interaction-primary-default`

---

#### 2. Quaternary Neutral

///// IMAGE /////

Used for safe, non-critical actions such as 'Cancel' or 'Close' where minimal visual impact is required. It employs dark text to provide a functional choice that does not compete with the primary call-to-action, ensuring a clean and focused interface.

**Required Token**

`effect-translucent-dark-clear`

`text-neutral-darker`

---

#### 3. Quaternary Light Surface

///// IMAGE /////

Designed for use over bright imagery or video where even a semi-transparent background would feel too obstructive. It uses Neutral Darker text to maintain a sophisticated contrast against high-key content, providing a clear yet unobtrusive interaction layer. Because this style relies solely on text contrast, readability may vary depending on the underlying imagery. Where stronger clarity is required, a Tertiary button should generally be preferred.

**Required Token**

`effect-translucent-dark-clear`

`text-neutral-darker`

---

#### 4. Quaternary Dark Surface

///// IMAGE /////

Designed for use over bright imagery or video where even a semi-transparent background would feel too obstructive. It uses lightest neutral text to maintain a sophisticated contrast against high-key content, providing a clear yet unobtrusive interaction layer. Because this style relies solely on text contrast, readability may vary depending on the underlying imagery. Where stronger clarity is required, a Tertiary button should generally be preferred.

**Required Token**

`effect-translucent-light-clear`

`text-neutral-lightest`

---

### 5-B. Contextual Situation

Contextual buttons introduce colour variations that communicate a specific meaning within the interface, such as confirming a positive outcome or highlighting a destructive action. Unlike standard buttons, these styles rely on contextual colour cues to reinforce the intent of the action.

In most cases, actions should use the standard **Primary or Secondary button styles defined in General Situations**, which maintain visual consistency across the product. Contextual buttons should only be used when the meaning of an action must be clearly reinforced through colour, such as confirming irreversible changes or signalling a strong positive outcome.

Because contextual colours carry strong semantic meaning, they must be used sparingly and intentionally. Overusing these styles can dilute their significance and create visual noise within the interface.

> 💡 In most cases, **standard interface actions** such as Save, Submit, Continue, or Send should continue to use the default **Primary Blue button** defined in the General Situation hierarchy.

---

### Negative (Red)

Used to communicate destructive or irreversible actions such as deleting or permanently removing content.

**Delete, Remove, Erase, Clear, Reset, Decline, Deny, Dislike, Downvote, Unsubscribe**

#### 1. Negative Solid

///// IMAGE /////

Used when the main action represents a destructive or irreversible outcome. These buttons are typically used in confirmation states where the user must explicitly confirm actions such as deleting or permanently removing content. The solid red treatment clearly communicates the negative consequence of the action.

**Required Token**

`background-interaction-negative-default`

`text-neutral-white`

---

#### 2. Negative Outline

///// IMAGE /////

Used for lighter negative actions within the interface. These actions typically appear in interactive modules where users can quickly respond to content, such as Dislike in comment or engagement modules. Compared to Primary Negative buttons, these actions carry less emphasis.

**Required Token**

`effect-translucent-dark-clear`

`border-neutral-grey-light`

`text-interaction-negative-default`

---

### Positive (Green)

Use Positive (Green) only when the action represents an explicitly beneficial outcome or approval state, rather than a neutral system action. **Activate, Enable, Turn on, Approve, Accept, Allow, Like, Upvote**

#### 1. Positive Solid

///// IMAGE /////

Used when the main action represents a clear positive confirmation. Examples include actions such as Activate, Confirm, or Approve. Positive contextual buttons should be used sparingly. In most cases, standard actions should continue to use the default Primary Blue button.

**Required Token**

`background-interaction-positive-default`

`text-neutral-white`

---

#### 2. Positive Outline

///// IMAGE /////

Used for lightweight positive reactions within the interface. Common examples include actions such as Like in engagement modules. Positive contextual buttons should be used carefully to avoid overuse and preserve their meaning within the interface.

**Required Token**

`effect-translucent-dark-clear`

`border-neutral-grey-light`

`text-interaction-positive-default`

---

## 6. Button States

Buttons provide clear and predictable feedback through a consistent set of interaction states. These states communicate interactivity, confirm user input, and maintain accessibility across different surfaces and contexts.

Each button style utilises predefined **Interaction Tokens** to ensure visual consistency across platforms and devices.

### 6-A. Default

///// IMAGE /////

The default state represents the resting appearance of the button before any user interaction occurs.

Some button styles may utilise a transparent surface token in this state to define the interactive container area. While visually invisible, this structure ensures consistent hover behaviour and prevents layout shifts during state transitions.

### 6-B. Hover

///// IMAGE /////

The hover state indicates that the button is interactive and ready to be activated. Subtle visual feedback is introduced to improve discoverability and reinforce the clickable area.

Depending on the button hierarchy, this may include: Surface tint introduction, Surface opacity change, Colour emphasis. These changes enhance visibility whilst maintaining the visual hierarchy of the interface.

### 6-C. Pressed

///// IMAGE /////

The pressed state provides immediate feedback when a user activates the button. This state confirms that the interaction has been registered and helps users understand the system response.

Typical visual cues include: Surface opacity change, Subtle tonal shift, Depth or contrast change

*Apply `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);`*

### 6-D. Button Tokens by States

#### Primary Button Tokens

| Variations | Tokens |
|---|---|
| **Primary Brand (Default)** | **Default** `background-interaction-primary-default` \| `text-neutral-white` |
| | **Hover** `background-interaction-primary-hover` \| `text-neutral-white` |
| | **Pressed** `background-interaction-primary-pressed` \| `text-neutral-white` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Primary Neutral** | **Default** `background-neutral-darker` \| `text-neutral-lightest` |
| | **Hover** `background-neutral-dark` \| `text-neutral-lightest` |
| | **Pressed** `background-neutral-grey-dark` \| `text-neutral-lightest` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Primary Neutral Inverse** | **Default** `background-neutral-light` \| `text-neutral-darker` |
| | **Hover** `background-neutral-white` \| `text-neutral-darker` |
| | **Pressed** `background-neutral-lighter` \| `text-neutral-darker` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |

#### Secondary Button Tokens

| Variations | Tokens |
|---|---|
| **Secondary Brand (Default)** | **Default** `effect-translucent-dark-clear` \| `border-neutral-grey-light` \| `text-interaction-primary-default` |
| | **Hover** `effect-translucent-dark-pale` \| `border-neutral-grey-light` \| `text-interaction-primary-default` |
| | **Pressed** `effect-translucent-dark-pale` \| `border-neutral-grey-light` \| `text-interaction-primary-default` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Secondary Visible** | **Default** `effect-translucent-dark-clear` \| `border-translucent-dark-subtle` \| `text-interaction-primary-default` |
| | **Hover** `effect-translucent-dark-pale` \| `border-translucent-dark-subtle` \| `text-interaction-primary-default` |
| | **Pressed** `effect-translucent-dark-pale` \| `border-translucent-dark-subtle` \| `text-interaction-primary-default` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Secondary Neutral** | **Default** `effect-translucent-dark-clear` \| `border-neutral-grey-light` \| `text-neutral-darker` |
| | **Hover** `effect-translucent-dark-pale` \| `border-neutral-grey-light` \| `text-neutral-darker` |
| | **Pressed** `effect-translucent-dark-pale` \| `border-neutral-grey-light` \| `text-neutral-darker` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Secondary Light Surface** | **Default** `effect-translucent-dark-clear` \| `border-translucent-dark-subtle` \| `text-neutral-darker` |
| | **Hover** `effect-translucent-dark-pale` \| `border-translucent-dark-subtle` \| `text-neutral-darker` |
| | **Pressed** `effect-translucent-dark-pale` \| `border-translucent-dark-subtle` \| `text-neutral-darker` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Secondary Dark Surface** | **Default** `effect-translucent-light-clear` \| `border-translucent-light-moderate` \| `text-neutral-lightest` |
| | **Hover** `effect-translucent-light-pale` \| `border-translucent-light-moderate` \| `text-neutral-lightest` |
| | **Pressed** `effect-translucent-light-pale` \| `border-translucent-light-moderate` \| `text-neutral-lightest` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |

#### Tertiary Button Tokens

| Variations | Tokens |
|---|---|
| **Tertiary Brand (Default)** | **Default** `background-neutral-lighter` \| `text-interaction-primary-default` |
| | **Hover** `background-neutral-light` \| `text-interaction-primary-default` |
| | **Pressed** `background-neutral-light` \| `text-interaction-primary-default` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Tertiary Visible** | **Default** `effect-translucent-dark-pale` \| `text-interaction-primary-default` |
| | **Hover** `effect-translucent-dark-subtle` \| `text-interaction-primary-default` |
| | **Pressed** `effect-translucent-dark-pale` \| `text-interaction-primary-default` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Tertiary Neutral** | **Default** `background-neutral-lighter` \| `text-neutral-darker` |
| | **Hover** `background-neutral-light` \| `text-neutral-darker` |
| | **Pressed** `background-neutral-light` \| `text-neutral-darker` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Tertiary Light Surface** | **Default** `effect-translucent-dark-moderate` \| `text-neutral-lightest` |
| | **Hover** `effect-translucent-dark-deep` \| `text-neutral-lightest` |
| | **Pressed** `effect-translucent-dark-deep` \| `text-neutral-lightest` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Tertiary Dark Surface** | **Default** `effect-translucent-light-deep` \| `text-neutral-darker` |
| | **Hover** `effect-translucent-light-thick` \| `text-neutral-darker` |
| | **Pressed** `effect-translucent-light-thick` \| `text-neutral-darker` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |

#### Quaternary Button Tokens

| Variations | Tokens |
|---|---|
| **Quaternary Brand (Default)** | **Default** `effect-translucent-dark-clear` \| `text-interaction-primary-default` |
| | **Hover** `background-neutral-light` \| `text-interaction-primary-default` |
| | **Pressed** `background-neutral-light` \| `text-interaction-primary-default` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Quaternary Neutral** | **Default** `effect-translucent-dark-clear` \| `text-neutral-darker` |
| | **Hover** `background-neutral-light` \| `text-neutral-darker` |
| | **Pressed** `background-neutral-light` \| `text-neutral-darker` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Quaternary Light Surface** | **Default** `effect-translucent-dark-clear` \| `text-neutral-darker` |
| | **Hover** `effect-translucent-dark-subtle` \| `text-neutral-darker` |
| | **Pressed** `effect-translucent-dark-subtle` \| `text-neutral-darker` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Quaternary Dark Surface** | **Default** `effect-translucent-light-clear` \| `text-neutral-lightest` |
| | **Hover** `effect-translucent-light-subtle` \| `text-neutral-lightest` |
| | **Pressed** `effect-translucent-light-subtle` \| `text-neutral-lightest` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |

#### Negative & Positive Button Tokens

| Variations | Tokens |
|---|---|
| **Negative Solid** | **Default** `background-interaction-negative-default` \| `text-neutral-white` |
| | **Hover** `background-interaction-negative-hover` \| `text-neutral-white` |
| | **Pressed** `background-interaction-negative-pressed` \| `text-neutral-white` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Negative Outline** | **Default** `effect-translucent-dark-clear` \| `border-neutral-grey-light` \| `text-interaction-negative-default` |
| | **Hover** `effect-translucent-dark-pale` \| `border-translucent-dark-subtle` \| `text-interaction-negative-default` |
| | **Pressed** `effect-translucent-dark-pale` \| `border-translucent-dark-subtle` \| `text-interaction-negative-default` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Positive Solid** | **Default** `background-interaction-positive-default` \| `text-neutral-white` |
| | **Hover** `background-interaction-positive-hover` \| `text-neutral-white` |
| | **Pressed** `background-interaction-positive-pressed` \| `text-neutral-white` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |
| **Positive Outline** | **Default** `effect-translucent-dark-clear` \| `border-neutral-grey-light` \| `text-interaction-positive-default` |
| | **Hover** `effect-translucent-dark-pale` \| `border-translucent-dark-subtle` \| `text-interaction-positive-default` |
| | **Pressed** `effect-translucent-dark-pale` \| `border-translucent-dark-subtle` \| `text-interaction-positive-default` ✢ `box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .4);` |

///// IMAGE /////

---

## 7. Button Size

Buttons are available in five predefined sizes to support different interface densities and interaction contexts. Each size maintains consistent proportions between height, padding, typography, and icon size to ensure visual balance across the product ecosystem. While the overall structure remains consistent, typography tokens may vary slightly between Web and native platforms.

### Platform Typography Adaptation

Because typographic systems differ slightly between platforms, button text styles are mapped to the closest native typography token. Although typography tokens may differ per platform, the overall button height and spatial structure remain consistent, allowing designers and developers to maintain predictable layouts across devices.

### 7-A. Size XS

XS buttons are designed for compact UI areas such as dense toolbars, inline actions, or space-constrained layouts.

///// IMAGE /////

### 7-B. Size SM

SM buttons are suitable for secondary actions within structured layouts where a slightly larger interaction target is required.

///// IMAGE /////

### 7-C. Size MD

MD buttons are the default button size and should be used in most interface contexts.

///// IMAGE /////

### 7-D. Size LG

LG buttons are used for prominent actions that require greater visual emphasis within a layout, such as key actions in feature sections or content modules.

///// IMAGE /////

### 7-E. Size XL

XL buttons are designed for high-priority actions that need maximum visibility, typically used in large layouts such as onboarding flows, promotional modules, or hero sections.

///// IMAGE /////

### Consistency Principle

While typography tokens may vary slightly between platforms, the following elements remain consistent across Web, iOS, and Android:

- Button height
- Horizontal padding structure
- Icon-to-text spacing
- Interaction behaviour

This approach allows the button component to feel native to each platform while maintaining a unified design language across the Daily Mail ecosystem.

---

## 8. Button Compositions (Anatomy)

Buttons can contain three core elements: Label, Icon, and Addon. These elements can be combined to support different interaction needs while maintaining a consistent button structure across all sizes.

Across all button sizes, four common button compositions are supported.

### 8-A. Label Only (Default Button)

///// IMAGE /////

The default button consists of a text label only. Labels should clearly communicate the action the button performs and remain concise to maintain readability and layout balance.

### 8-B. Icon + Label

///// IMAGE /////

An icon can be added alongside the label to help users recognise the action more quickly. Icons should reinforce the meaning of the label rather than replace it.

### 8-C. Label + Addon

///// IMAGE /////

Addons are used to communicate specific functional behaviour within the button. Common examples include indicators such as: expand / collapse, dropdown, navigation cues. Add-ons help clarify interactive behaviour without changing the primary meaning of the label.

### 8-D. Icon Only

///// IMAGE /////

Icon-only buttons are used when space is limited or when the action can be clearly understood without text. Typical examples include: bookmark, settings, close, delete.

Because icon-only buttons rely on visual recognition, they should only be used for widely recognised actions. *Icon-only buttons may appear visually smaller, but the interactive hit area should maintain a minimum touch target of approximately 44px where possible. This can be achieved by providing sufficient spacing around the button within the layout.*

### 8-E. Usage Guidelines

To maintain clarity and reduce cognitive load:

- Avoid combining Icon and Addon within the same button.
- Icons should support the label, not replace it.
- Use Icon-only buttons sparingly and only for well-established actions.

---

## 9. Rectangular Button

While the Daily Mail Design System primarily adopts the Pill-Shaped Button as the default component style, a rectangular button variant exists for specific contextual needs.

Rectangular buttons are used sparingly and should not replace the standard Pill button in general interface interactions. Their primary role is to support legacy patterns or specific layout constraints where the rounded pill shape may feel visually inconsistent with surrounding elements.

Typical use cases include:

- Tab-like navigation elements
- Compact utility controls
- Legacy modules within the product ecosystem

### Corner Radius

Unlike Pill buttons which maintain a fully rounded shape, rectangular buttons use size-based corner radii to ensure visual balance across different button scales.

**Rectangular Button Corner Radius by Size**

| XS | SM | MD | LG | XL |
|---|---|---|---|---|
| 4pt | 6pt | 8pt | 10pt | 12pt |

To maintain visual consistency across the interface, the same token structure, colour logic, and interaction states defined for standard buttons must also apply to rectangular buttons.

In most modern UI scenarios, the Pill button should remain the default and preferred component style.

---

## 10. Button Scenarios

///// IMAGE /////

Use defined button styles as the universal anchor for user actions to ensure navigational consistency.

Do not use channel-specific base colours for functional elements; reserved for branding and contextual identity only.

Use contextual destructive styling and places the action farther from the dominant thumb zone, reducing accidental taps and reinforcing caution.

Do not use a primary button for destructive actions. Placing it within the dominant thumb zone increases prominence and may unintentionally encourage critical actions.
