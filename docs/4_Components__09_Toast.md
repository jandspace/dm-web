# Toast

A Toast is short feedback on what just happened — saved, failed, offline, new content — that floats over everything, modals included, and goes. It never asks for a decision the reader must make (that is a Modal).

Figma: Web UI Kit › Toast (`3265:1886`) — Breakpoint SM-XS / MD, Context Success · Error · Warning · Information · Neutral

---

## 1. Anatomy

| Element | Class | Description |
|---|---|---|
| **Region** | `section.toast-region[popover="manual"]` | One per page, straight in `<body>`. Top centre, 16px from the edge; `--bottom` for bottom centre. `calc(100% − 32px)` wide, **738px max** |
| **Toast** | `.toast.toast--{context}[data-theme="light"]` | 12px corners, **Elevation 4**. Padding 12 · 32 right (room for close) · 12 · 16; 12px between icon and body |
| **Icon** *(optional)* | `.toast__icon > .icon` | 48px circle in the context's deep colour, 22px icon in `icon/neutral/lightest` (`--icon-color`). Sits at the top of the row: beside a one-line text it reads as centred; with longer text it stays at the top |
| **Title** *(optional)* | `p.toast__title` | H5 size, Semibold, line height compact; one line, ellipsis |
| **Description** *(optional)* | `p.toast__description` | text-sm Regular, line height normal |
| **Buttons** *(optional)* | `.toast__actions` | Button SM: Quaternary Neutral, then the primary — Neutral Inverse (white), or Brand on a Neutral toast. 8px apart |
| **Close** | `button.toast__close` | Button Quaternary Neutral, icon only (40px), `ico-xmark-light`, top right. No hover / pressed surface on the coloured toast |

**Layout:** SM-XS — the buttons sit under the text, on the right. MD+ — one row, buttons on the right of the text.

---

## 2. Contexts

| Context | Surface | Circle | Icon | Role |
|---|---|---|---|---|
| `--success` | `semantic-success/subtle` | `semantic-success/deep` | `ico-tick` | `status` |
| `--error` | `semantic-error/subtle` | `semantic-error/deep` | `ico-xmark` | `alert` |
| `--warning` | `semantic-warning/subtle` | `semantic-warning/deep` | `ico-exclamation-mark-triangle` | `alert` |
| `--info` | `semantic-info/subtle` | `semantic-info/deep` | `ico-info` | `status` |
| `--neutral` | `neutral/lighter` | `neutral/darker` | `ico-megaphone` | `status` |

**Theme Pinning:** every toast carries `data-theme="light"`, so it keeps the light look in dark mode (Button › Theme Pinning).

---

## 3. Behaviour

| | |
|---|---|
| **Where** | Top centre on every viewport; bottom centre when the top is busy (e.g. a sticky bar the toast would cover) |
| **Above everything** | The region is a manual popover — the top layer — so it shows over an open modal. While a modal is open the rest of the page is inert, so the page script moves the region into the modal, and back to `<body>` when it closes |
| **Auto-dismiss** | **3 seconds** for toasts with no action (no buttons) — e.g. "Article saved", "Link copied"; never for toasts with buttons or errors (close or a button only). The timer waits while the pointer or focus is on the toasts |
| **Stack** | The newest is in front. Each older toast sits **16px further back** (below at the top, above at the bottom) and **5% smaller**, cut to the front toast's height; **3** show. Hover or focus spreads them into a list, 8px apart |
| **Enter / leave** | Slides 16px in from the edge and fades (300ms); leaves the same way (200ms). Reduced motion: no slide or fade |

The page script sets `--toast-index`, `--toast-offset` (the spread-out position) on each toast and `--toast-front-height`, `--toast-stack-height` on the region, and shows / hides the popover — see the demo.

---

## 4. Writing

- Title: what happened, in a few words — "Article saved", "Link copied", "You're offline".
- Description only when it helps: what to do next, or why.
- One or two buttons, each a short verb — "View", "Retry", "Undo". Never "OK" (the toast goes by itself).

---

## 5. Code

```html
<section class="toast-region" id="toast-region" popover="manual" aria-label="Notifications" aria-live="polite">
  <div class="toast toast--success" data-theme="light" role="status">
    <span class="toast__icon"><span class="icon icon--tick" aria-hidden="true"></span></span>
    <div class="toast__body">
      <div class="toast__text">
        <p class="toast__title">Article saved</p>
        <p class="toast__description">Find it in your reading list.</p>
      </div>
    </div>
    <button class="toast__close btn btn-quaternary-neutral btn--icon-only" type="button" aria-label="Dismiss">
      <span class="icon icon--xmark-light" aria-hidden="true"></span>
    </button>
  </div>
</section>
```

| | File |
|---|---|
| Styles | `styles/scss/components/_toast.scss` |
| Demo | `components/toast/` (Try it · both layouts · optional parts · over a modal) |

---

## 6. Figma notes

- **Breakpoint** variants were named iOS / iPad — renamed in Figma to SM-XS <768 / MD ≥768.
- **Buttons** were overridden to 33px; set back in Figma to the Button SM height (34px).
- **Description** changed in Figma from h6 to text-sm Regular.
- **Inner shadow:** "Toast item" carries a raw drop shadow (0 0 16, 20%) on top of Elevation Lv-4. Code leaves it out (no raw shadows) — remove it in Figma, or tell us what it is for.
