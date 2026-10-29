# Modal

A Modal shows focused content or a required action above the page, over a scrim. It blocks the page until it is closed — with the close button, a footer button, Esc or a click on the scrim. Elevation 5, the highest level (Foundation › Elevation).

The concept follows Bootstrap's modal: header / body / footer, a few sizes, and a body that scrolls inside when the content is long. In code it is the native `<dialog>` opened with `showModal()`, which brings Esc, the focus trap and the scrim (`::backdrop`).

Figma: Web UI Kit › Modal (`3358:62`) — Modal (`3361:11214`), Modal Header (`4811:19070`)

---

## 1. Anatomy

| Element | Class | Description |
|---|---|---|
| **Frame** | `dialog.modal` | Full viewport. Scrim `color/background/shade/moderate`; backdrop padding 32px (Large on SM-XS 16px, Fullwidth 32px top only) |
| **Box** | `__content` | `color/background/neutral/lightest`, 16px corners, **Elevation 5** (`--elevation-5`). Hugs its content up to the viewport height |
| **Header** *(with a title)* | `__header` | Holds the title and the close button |
| **Title** *(optional)* | `h2.__title.h4` | H4 Bold (`dmw_sans/h4/Bold`). Padding 16 · 48 right (room for close) · 16 · 16; keyline below, 16px inset (Divider). Without a title (Figma "No Modal Title") leave the header out: the close button goes straight in the box, in the same corner over the body, and the body starts at the top with its own 16px padding |
| **Close** | `__close` | Button Tertiary Dark, icon only (40px) with `ico-xmark-light` 16px; 6px from the top and right |
| **Body** | `__body` | 16px padding. Scrolls when the box reaches its maximum height; header and footer stay (Figma "Fill (Inner Scroll)") |
| **Footer** *(optional)* | `__footer` | 16px padding, buttons on the right, 12px apart: Secondary (`btn-secondary-brand`) then Primary (`btn-brand`). Keyline above, 16px inset |

The title is an `<h2>` — it heads the dialog — sized with the `.h4` utility class and set in Bold, the weight kept for H1–H2 where extra impact is needed.

---

## 2. Sizes

| Size | Class | SM-XS <768 | MD ≥768 | LG ≥1024 |
|---|---|---|---|---|
| **Default** | — | 480 max | 480 max | 640 max |
| **Large** | `.modal--large` | 640 max (16px backdrop padding) | 800 max | 960 max |
| **Fullwidth** | `.modal--fullwidth` | full width | full width | full width |

**Fullwidth** is a bottom sheet: it sits on the bottom edge, only its top corners are rounded, and header, body and footer are centred at 960px max. Its height is capped so the page stays in view:

| | SM-XS | MD, LG |
|---|---|---|
| Max height | 80% of the viewport (`80dvh`) | 50% of the viewport (`50dvh`) |

These follow common practice — iOS sheets (medium detent ≈ half the screen) and Material 3 bottom sheets open at about half the height; shadcn/ui Drawer caps a bottom drawer at 80vh on mobile. `dvh` follows the mobile address bar (`vh` is the fallback).

---

## 3. Position

| | SM-XS | MD, LG |
|---|---|---|
| Default, Large | Middle | Top (32px from the top) |
| Fullwidth | Bottom | Bottom |

`.modal--middle` and `.modal--bottom` set the position at every breakpoint (Figma Position: Middle, Bottom).

---

## 4. Usage

- One task per modal. If it needs several steps or a long read, use a page.
- Use it to confirm an action that is hard to undo, or to ask for something the reader must give before going on. Don't use it for messages that need no answer — that is a Toast.
- Footer: at most two buttons, Primary on the right. Leave the footer out when there is nothing to choose (the close button is enough).
- Always keep a way out: the close button, Esc and a scrim click all close it.
- The page under an open modal does not scroll (`html:has(.modal[open])`).

---

## 5. Code

```html
<dialog class="modal" id="my-modal" aria-labelledby="my-modal-title" tabindex="-1">
  <div class="modal__content">
    <div class="modal__header">
      <h2 class="modal__title h4" id="my-modal-title">Modal Content Title</h2>
      <button class="modal__close btn btn-tertiary-dark btn--icon-only" type="button" aria-label="Close">
        <img src="…/ico-xmark-light.svg" alt="" />
      </button>
    </div>
    <div class="modal__body">…</div>
    <div class="modal__footer">
      <button class="btn btn-secondary-brand" type="button">Secondary</button>
      <button class="btn btn-brand" type="button">Primary Action</button>
    </div>
  </div>
</dialog>
```

```js
modal.showModal();                                  // open — Esc closes it
modal.focus();                                      // focus the dialog, not the close button
modal.addEventListener('click', (e) => {             // scrim click
  if (e.target === modal) modal.close();
});
```

- `showModal()` focuses the first button — the close button, with a focus ring. `tabindex="-1"` on the dialog + `modal.focus()` right after keeps focus on the dialog itself (`autofocus` on the dialog is not honoured by Chrome). Tab moves on to the close button and the footer buttons.
- Without a title, leave out `.modal__header`, put `.modal__close` first in `.modal__content`, and give the dialog an `aria-label`. Keep the first line of the body short or leave room on the right — the close button sits over it.
- Opening and closing (which button opens it, what each footer button does) is the job of the page that uses it.

| | File |
|---|---|
| Styles | `styles/scss/components/_modal.scss` |
| Demo | `components/modal/` |

---

## 6. Figma notes

- **Header and footer** are absolute in Figma, with 54 / 72px padding on the box to make room; code stacks them (flex column) for the same result.
- **Scroll Bar:** Figma draws its own 10px bar; code uses the thin browser scrollbar (as Dropdown Menu).
