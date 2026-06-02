# Toggle Switch

A Toggle Switch is a binary control that immediately commits a change — no confirmation step required. It represents a persistent on/off state and must always communicate that state clearly, regardless of the surface it sits on.

---

## 1. Anatomy

| Element | Description |
|---|---|
| **Track** | The pill-shaped background. Carries the On/Off state colour and changes with interaction state |
| **Thumb (Disk)** | The circular handle that slides within the track. Always `color/icon/neutral/lightest`. Carries Elevation Lv-2 drop shadow in the On state only |
| **Label** | Descriptive text placed to the left or right of the track. Always required — a toggle without a label is inaccessible |
| **Supporting text** *(optional)* | Secondary description below the label |

---

## 2. Size

Two sizes are defined. Track proportions, thumb diameter, and internal padding remain consistent across both.

| Size | Track width | Thumb size | Usage |
|---|---|---|---|
| **Medium** | 46px | 22px | Default. Standard settings screens and preference panels |
| **Small** | 36px | 18px | Dense layouts where vertical space is constrained |

Size dimensions are consistent across Web, iOS, and Android. Typography tokens for accompanying labels may differ per platform.

---

## 3. Component Props

| Prop | Values | Default |
|---|---|---|
| `colour` | `Blue` \| `Green` | `Blue` |
| `size` | `Medium` \| `Small` | `Medium` |
| `state` | `Default` \| `Hover` \| `Disabled` | `Default` |
| `activate` | `On` \| `Off` | `On` |

---

## 4. Colour System

### Core Rule

**Blue is the default On colour.** This aligns directly with the button system, where `interaction-primary` (Blue) is the universal anchor for all interactive controls. Green is a contextual exception — applied only when the criteria for a Positive Green button would also be met.

> 💡 **Interaction colours** are intentionally decoupled from editorial and channel branding. Toggle colour never changes based on the section or channel the user is browsing.

---

### 4-A. Blue vs Green — Decision Rule

**Blue is the default. Green requires justification.**

The deciding question:
> *Would this same action warrant a Positive Green button if it were a button instead of a toggle?*

If Yes, Green may be appropriate. If there is any doubt, use Blue.

| Context | Colour | Example |
|---|---|---|
| Feature on/off | 🔵 Blue | Dark Mode, Auto-play, Show captions |
| Preference / setting | 🔵 Blue | Notification sound, Data saving mode |
| Permission / consent | 🔵 Blue | Allow notifications, Marketing emails |
| Explicitly affirmative — matches Positive Green button criteria | 🟢 Green | Rare. Apply only when the action is as contextually loaded as an Approve or Activate button |

In practice, **Green toggle use cases are very rare.** The bar should match the Positive Green button — which itself is used sparingly across the entire product.

---

### 4-B. Multiple Toggles on One Screen

When a screen contains more than one toggle, **use Blue for all toggles consistently.**

Do not mix Blue and Green on the same screen. The visual inconsistency adds noise without adding meaning — users do not read colour differences between toggles at that level of granularity. They register it as an error.

| Scenario | Colour |
|---|---|
| Single toggle — any standard context | 🔵 Blue (default) |
| Single toggle — explicit Positive Green criteria met | 🟢 Green |
| Multiple toggles on one screen | 🔵 Blue — unified across all |

---

### 4-C. Channel and Branded Backgrounds

Channel colours (e.g. Showbiz Red, Sport Green, ...) are **never applied to the toggle Track.** The toggle is a system-level control, not a channel-branded element.

#### Track — follows token rules

The Track colour is always determined by the design token. In Light and Dark mode, the token resolves to different values automatically — this is expected behaviour, not an exception.

| Token | Light mode | Dark mode |
|---|---|---|
| `color/background/interaction-primary/default` | `#004db3` | `#6694d1` |
| `color/background/interaction-positive/default` | `#0cac0c` | `#6dcd6d` |
| `color/effect/translucent-dark/pale` (Off) | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` |

Channel colours are not part of this token set and must never be substituted in.

#### Disk — Theme Pinned

The Disk (`color/icon/neutral/lightest`, `#fcfcfc`) is **Theme Pinned** — it does not respond to Light/Dark mode switching. Its value is fixed at all times, in all contexts.

The visual contrast between a Blue or Green toggle and a strongly coloured channel background is intentional. It signals that the control belongs to the system layer, not to editorial content. That distinction is useful, not a flaw.

---

## 5. States & Tokens

### 5-A. Full State Token Reference

#### Off State

| State | Track token | Thumb token | Thumb shadow |
|---|---|---|---|
| **Default** | `color/effect/translucent-dark/pale` | `color/icon/neutral/lightest` | None |
| **Hover** *(Web only)* | `color/effect/translucent-dark/subtle` | `color/icon/neutral/lightest` | None |
| **Disabled** | `color/effect/translucent-dark/pale` | `color/icon/neutral/lightest` | None |

#### On State — Blue *(Default)*

| State | Track token | Thumb token | Thumb shadow |
|---|---|---|---|
| **Default** | `color/background/interaction-primary/default` | `color/icon/neutral/lightest` | Elevation Lv-2 |
| **Hover** *(Web only)* | `color/background/interaction-primary/hover` | `color/icon/neutral/lightest` | Elevation Lv-2 |
| **Disabled** | `color/background/interaction-primary/default` | `color/icon/neutral/lightest` | Elevation Lv-2 |

#### On State — Green *(Contextual exception)*

| State | Track token | Thumb token | Thumb shadow |
|---|---|---|---|
| **Default** | `color/background/interaction-positive/default` | `color/icon/neutral/lightest` | Elevation Lv-2 |
| **Hover** *(Web only)* | `color/background/interaction-positive/hover` | `color/icon/neutral/lightest` | Elevation Lv-2 |
| **Disabled** | `color/background/interaction-positive/default` | `color/icon/neutral/lightest` | Elevation Lv-2 |

---

### 5-B. Disabled Treatment

Disabled state is applied as **component-level opacity: 25%** on the entire toggle. Underlying colour tokens remain identical to the Default state — no separate disabled colour tokens are defined.

This keeps the token architecture lean and ensures both On-Disabled and Off-Disabled are handled through a single rule.

> 💡 The label accompanying a disabled toggle must remain legible enough for the user to understand the control's purpose, even at reduced opacity.

---

### 5-C. Elevation

The thumb drop shadow is present **in the On state only** (Default and Hover). It is absent in all Off states.

```
Elevation Lv-2
  type:    DROP_SHADOW
  color:   color/effect/translucent-dark/pale
  offset:  0, 2
  radius:  8
  spread:  0
```

---

### 5-D. Platform Scope

| State | Web | iOS | Android |
|---|---|---|---|
| Off — Default | ✅ | ✅ | ✅ |
| Off — Hover | ✅ | — | — |
| On — Default | ✅ | ✅ | ✅ |
| On — Hover | ✅ | — | — |
| Disabled (On + Off) | ✅ | ✅ | ✅ |
| Focus | Native default | Native | Native |

**Hover** is Web only. Touch platforms have no hover state. On Web, hover feedback is necessary — the track shape alone is not always sufficient to signal interactivity.

**Focus** follows the same approach as the Button component. Browser and OS native focus behaviour is used across all platforms. No custom focus token is defined.

---

## 6. Relationship to the Button System

The Toggle Switch is not a standalone component with its own interaction logic. It is the same system applied to a different form factor — inheriting the button's colour hierarchy, contextual colour rules, and Hover transition model in full.

### 6-A. Colour hierarchy

| Principle | Button | Toggle |
|---|---|---|
| Default interactive colour | `interaction-primary` (Blue) | `interaction-primary` (Blue) |
| Contextual affirmative colour | `interaction-positive` (Green) — used sparingly | `interaction-positive` (Green) — same criteria, same rarity |
| Hover transition model | Shifts to `/hover` token within same palette | Identical — inherits the same rule |
| Channel colour on interactive elements | Not permitted | Not permitted |
| Focus | Native browser default | Native browser default |

Green means the same thing whether it appears on a button or a toggle — and it should appear with the same frequency.

---

### 6-B. Hover transition logic

All interactive elements in the Daily Mail Design System follow the same physical rule — darker or denser on hover, lighter or sparser on release. The toggle inherits this entirely. There is no special-casing.

| Layer | Default → Hover transition |
|---|---|
| Primary Solid button (Blue / Green / Red) | Shifts to a darker tone within the same palette (`/default` → `/hover`) |
| Toggle — On state | `interaction-primary/default` → `interaction-primary/hover` / `interaction-positive/default` → `interaction-positive/hover` |
| Toggle — Off state | `translucent-dark/pale` → `translucent-dark/subtle` |

This is why the On Hover track (`interaction-primary/hover`, `#002e6b`) appears notably darker than the Default state. That is the correct and intended behaviour — consistent with how the Primary Solid button responds to hover across the product.

---

## 7. Accessibility

- Toggle must meet **WCAG 2.1 AA** — minimum **3:1** contrast ratio for UI components against their background.
- On state colour alone is not sufficient to communicate state. Thumb position must shift visibly between Off and On.
- Always pair with a visible text label. A toggle without a label is inaccessible.
- `role="switch"` is the correct ARIA role.
- `aria-checked` must reflect the current state: `true` (On) or `false` (Off).
- Keyboard: `Space` toggles state. `Tab` moves focus in and out.
- All interaction states must use `<button>` as the root element. Do not substitute `<div>` for Hover or Disabled states — this breaks keyboard navigation and screen reader behaviour.
- Disabled toggles must remain visually parseable. Reduced opacity signals inactivity while preserving label legibility.

---

*Component: Toggle Switch — Daily Mail Design System*
*Last updated: 2026/05/11*
