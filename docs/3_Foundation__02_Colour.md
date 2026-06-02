# Colour

Daily Mail colour system goes beyond aesthetics; it is a strategic tool designed for information hierarchy and reading endurance. We ensure millions of readers can digest complex reporting quickly and comfortably.

---

## 1. Colour Logic & Generation

The Daily Mail colour system is built on a precise balance between our high-energy brand and the clarity required for long-form reading. Our colour scales are not chosen by whim; they are built on a consistent, logical framework that keeps our journalism front and centre.

---

## 2. Categorical Channel Alignment (Branding)

### 2-A. The Core Brand Anchor

At the heart of our identity is 'Home Blue (`#004DB3`)'. We use this hue as the anchor for our entire system. We expand this base through a simple, logical process, adding light (tints) or darkness (shades), to create a consistent range of colours. This ensures that whether a colour is used for a small button or a large background, it feels like part of one unified family.

### 2-B. Channel Colours

Each of our editorial channels (e.g. Showbiz, Sport or Royals) has its own distinct brand colour. To keep the system tidy and predictable, every channel follows the exact same scaling logic that we use for Home Blue.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

**Accessibility First**

When we generate a base colour for a channel, we make sure it hits a contrast ratio of at least **4.5:1** against white text. This isn't just a technical requirement; it ensures our channels are inclusive and easy to read, no matter the topic. Adobe Color Contrast Analyzer helps designers ensure text and graphics meet WCAG 2.1 accessibility standards.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

---

## 3. The Neutral Foundation (Greyscale)

For our greys, we focus on 'Reading Endurance'. We avoid pure white (`#FFFFFF`) or pure black (`#000000`) for large areas, as these can tire the eyes over long reading sessions. Instead, we use a carefully calibrated scale that provides a soft, natural contrast. This creates a comfortable reading experience, ensuring the reader's focus stays on the content, not the interface.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

---

## 4. Interaction

Colour plays a critical role in signalling interactive behaviour across the Daily Mail interface. Our interaction colours are designed to provide clear, predictable feedback while maintaining consistency across all editorial channels. We intentionally separate interaction meaning from channel branding. Regardless of the section a reader is browsing, interactive elements must behave consistently to reinforce a stable mental model.

> 💡 Interaction colours are intentionally separated from editorial and channel branding to maintain consistent behaviour across the entire product.

Our interaction system is therefore built around three universal intents:

- **Primary** – the default action used for most interface controls
- **Positive** – actions that confirm or enable something beneficial
- **Negative** – actions that remove, cancel, or undo something

These intents map directly to our existing colour ranges, ensuring they feel like a natural extension of the Daily Mail palette rather than a separate UI layer.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Interaction states follow a consistent behavioural model across the system:

| State | Description |
|---|---|
| **Default** | The base colour that represents the action |
| **Hover** | A stronger tone that increases visual prominence and signals interactivity |
| **Pressed** | A lighter tone combined with depth cues (such as inset shadows) to simulate a physical press |

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

This progression creates a clear visual rhythm that users quickly learn to recognise. In certain variants, such as neutral or translucent surfaces, interaction states may adapt slightly to maintain sufficient contrast. These adjustments ensure that feedback remains visible while preserving the overall visual balance of the interface.

---

## 5. Semantic Reuse

We keep our system lean and intuitive by reusing colours we've already established. Our status colours (Success, Error, Warning, Info) are mapped to the existing ranges of Green, Red, Orange, and Blue that are already part of our brand scale. By doing this, users don't have to relearn what a colour means—if they see a specific shade, they'll intuitively understand the status it represents.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

> 💡 Semantic tokens are intentionally reusable across multiple components. This prevents the creation of component-specific colours and ensures that the system remains scalable and consistent.

---

## 6. Editorial

Editorial colour usage is intentionally limited and highly controlled. Unlike interaction or semantic colours, which support system behaviour, editorial colours highlight content metadata — signals that help readers quickly understand the nature or context of a story.

In the current product experience, editorial colour is primarily used in article badges, such as indicators for breaking news, exclusive stories, opinion pieces, or special reports. To maintain clarity and avoid visual noise, these badges are grouped into a small set of visual categories rather than assigning a unique colour to every label.

These categories typically follow three levels of editorial emphasis:

| Category | Usage |
|---|---|
| **Highlight** | Used for urgent or high-attention stories such as Breaking, Exclusive, Live, ... |
| **Feature** | Used for editorial formats such as Poll, Opinion, ... |
| **Analysis** | Used for analytical or long-form content such as Deep Dive, Special Report, ... |

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

This approach allows the editorial team to introduce new badge labels without expanding the colour system.

In special cases, certain badges may use brand-driven visual treatments. For example, the M+ badge incorporates a proprietary gradient tied to the Daily Mail premium brand. Because this treatment represents a fixed brand asset rather than a reusable interface colour, it is implemented as a dedicated component rather than a colour token.

By limiting editorial colour to a small, predictable set of signals, we ensure that story labels enhance the reading experience without competing with the journalism itself.

---

## 7. Translucent (Visual Depth & Overlays)

Translucency is a strategic tool used to maintain legibility and interaction feedback without obstructing background content. It is primarily applied to media-heavy environments (imagery/video) and interactive states.

### 7-A. Functional Logic

Our translucent layers are calibrated to ensure that UI elements "float" over dynamic content while maintaining WCAG 2.1 AA contrast standards.

- **Adaptive Feedback:** Used for Hover and Pressed states on non-solid buttons to provide responsive cues on any surface.
- **Media Protection:** Used as a subtle "frosted" layer to protect text and icons when placed directly over unpredictable imagery or video.

### 7-B. Visual Application

We categorise translucency based on the surface luminance to ensure visual harmony:

| Type | Application |
|---|---|
| **Translucent Dark (Shade)** | Applied over light imagery or bright backgrounds to introduce subtle depth and maintain contrast. |
| **Translucent Light (Tint)** | Applied over dark imagery or immersive video to ensure light-themed UI elements remain visible and accessible. |

---

## 8. Explore the Token Library

The colour principles outlined above are precisely mapped to our technical standards - the 'Colour Tokens'. For specific Hex values and their corresponding CSS, Swift, or Figma variable names tailored to your project requirements, please refer to the complete technical reference below:

**View Full Color Token Library →**

**Quick Reference Table**

| Target | Token |
|---|---|
| Background (The Lowest level default) | `color-background-neutral-lightest` |
| Top Navigation Bar Background (Home) | `color-background-home-blue-base-darker` |
| Headlines and Body copy | `color-text-neutral-darker` |
| Divider (Keyline) | `color-border-neutral-light` |
| Primary Button Background | `color-background-interaction-primary-default` |
| Headline Badge (e.g. Breaking, Exclusive,...) | `color-editorial-highlight-base` |
| Icon (Default) | `color-icon-neutral-darker` |
| Success Icon (positive confirmation) | `color-icon-semantic-success-base` |
| Pale Background with Brand tone | `color-background-sport-green-subtlest` |

---

## 9. Color Accessibility Standards (WCAG 2.1 AA)

Our colour system is engineered to meet the WCAG 2.1 Level AA standards, ensuring that our journalism is accessible to everyone, including readers with visual impairments or colour vision deficiencies.

### 9-A. Contrast Ratios

To maintain optimal legibility across all platforms, we strictly adhere to the following contrast minimums:

- **Body Text & Critical UI:** A minimum contrast ratio of **4.5:1** against its background for standard-sized text.
- **Large Text & Graphical Elements:** A minimum contrast ratio of **3:1** for large-scale text (18pt+ or bold 14pt+) and essential interface components (e.g. button borders, icons).
- **Incidental Elements:** Decorative elements or inactive/disabled UI states are exempt from these strict ratios but must still maintain visual clarity.

### 9-B. Beyond Colour Alone

Accessibility at Daily Mail is not limited to contrast ratios. We ensure that colour is never the sole provider of information:

- **Multi-Signal Feedback:** Critical states (Error, Success) must use icons or text labels alongside colour to convey meaning.
- **Interaction Cues:** Hover and focus states must provide a distinct visual change (e.g. underline or background shift) to assist users navigating via keyboard or screen readers.

Relying on multiple cues—such as icons, strokes, and typography—to signal importance and status independently of colour. Ensure disabled states remain identifiable; while lower contrast is permitted to signal inactivity, the label must stay legible enough for users to understand the button's purpose.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Relying solely on colour for error identification, which creates accessibility barriers. Furthermore, do not use high-contrast, active styling for buttons when required conditions are not met. This misleadingly signals clickability, increasing the error rate by prompting users to interact with non-functional elements.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

---

## 10. Core Visual Principles

Our colour system is governed by two fundamental principles: Visual Comfort for our readers and Editorial Authority for our content. Every colour decision must support these pillars to maintain the standard of a world-class news institution.

### 10-A. Prioritising Reading Endurance

We design for the long-form reader. In a high-density news environment, excessive contrast can cause visual vibration and lead to eye strain.

**The Soft Contrast Rule**

We avoid using pure black (`#000000`) for text and pure white (`#FFFFFF`) for large background surfaces. Instead, we use our neutral scale to create a balanced, professional environment that invites the reader to engage with our journalism for longer.

Use Neutral Lightest (`#FCFCFC`) as the absolute Level 0 base canvas to prevent halation and maximise long-form reading endurance.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Do not use pure white (`#FFFFFF`) for large background surfaces, as high-contrast halation can cause visual vibration and eye strain

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Use our `background-neutral-darker` background and `text-neutral-lightest` text tokens to create a balanced, high-legibility interface that maintains consistent visual weight.

Do not use pure black (`#000000`) and pure white (`#FFFFFF`) for text and backgrounds. This extreme contrast causes visual vibration and increases eye strain for our readers.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

**Logical Luminance**

Every colour swap between Light and Dark mode is engineered to maintain equivalent perceived luminance, ensuring the 'mood' of our content remains consistent across all themes.

You must ensure that dark mode components maintain the same visual weight as their light mode counterparts to provide a consistent and balanced user experience across both themes.

Avoid using unadjusted light-mode elements or harsh borders that create jarring contrast and disrupt the intended visual hierarchy of the dark theme.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

### 10-B. Maintaining Editorial Authority

A predictable and unified interface is the foundation of our editorial authority. By applying standardised colours, we signal to our readers that every piece of content, from breaking news to lifestyle, meets the Daily Mail's professional standards.

You can use a subtlest brand colour for subtle background emphasis (e.g. `background/showbiz-red/subtlest`), but always anchor link text to our universal blue (`text-link-default`) for clear, consistent interaction.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Do not use channel-specific colours for interactive links. This creates mental-model mismatch and undermines the predictable experience our readers rely on.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Use a subtlest brand shade for the background to define the sport channel's context, whilst maintaining our universal text link token (`text-link-default`) to ensure interaction predictability.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

Do not apply channel-specific brand colours to interactive elements (View→). This violates our interface consistency and risks confusing the user.

Use channel-specific colours for structural elements like headers and borders to strengthen brand identity, but always apply our universal functional tokens for buttons (`background-home-blue-base`) and text links (`text/link/base`).

Do not use channel-specific colours for interactive elements; this disrupts functional consistency and creates ambiguity in the user journey.

= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
image required
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
