# Input Group

An Input Group puts a field and a Button in one box, so the action reads as part of the field: type an email and **Subscribe**, enter a code and **Apply**, pick a currency then type the amount. It is built from Input and Button. The box, its states, Clear and Show / hide all come from Input (`docs/4_Components__13_Input.md`), and the button is a normal Button (`docs/4_Components__01_Button.md`).

Figma: Web UI Kit › Input Group (`5075:1727`) — Input group, Variation Demo

---

## 1. Compositions

| Composition | Job | Button | Examples |
|---|---|---|---|
| **Input + Button** | Action trigger: runs the action on what was typed | Primary Brand · Primary Neutral · Tertiary Neutral (+ icon) | Sign up, Subscribe, Send, Search, Apply, Verify |
| **Button + Input** | Context setter: sets what the typed value means | Tertiary Neutral + chevron, opens a Dropdown Menu | Currency (GBP ⌄ £000.00), country code |
| **Select + Button** | Action on a choice | Primary Brand | Pick an edition, then Go |

- One button per group. A second action, or one that doesn't act on the field, is a separate Button.
- Field modifiers (Clear, Show / hide) sit inside the field as in Input, before the button.

---

## 2. Anatomy

| Element | Class | Description |
|---|---|---|
| **Field** *(optional)* | `.input-field` | Label + group + hint, as Input |
| **Box** | `.input.input-group` | The Input box, always Pill. **46px high** with MD text (text-md) |
| **Leading icon** *(optional)* | `.icon` | As Input, 16 |
| **Control** | `.input__control` | `<input>` or a native `<select>` (Input › Native Select) |
| **Button** | `.btn` | MD (40), Pill, any Button style. 3px from the box edge (1px border + 2px), 16px from the text |
| **Menu** *(Button + Input)* | `.dropdown-menu` | Dropdown Menu under the box, left-aligned with it, 4px gap |

**One size, on purpose.** The group is 46 high so an MD button (40) fits inside with 3px around it, but its text stays MD. There is no SM or LG group: LG text makes the field too short for its value in a narrow column (Beta, a card), which is where groups usually sit.

---

## 3. States

All from Input — the group adds none of its own.

| State | Box | Button |
|---|---|---|
| Default · Focus · Typing · Entered | as Input | Default |
| Valid · Error | as Input (Error: pink box) | Default |
| Read-only | as Input (padlock) | `disabled` |
| Disabled | as Input (slash-circle) | `disabled` |

- The button follows its own rules: hover and pressed as Button, and **Disabled at 20%** (Button › Disabled).
- A button can be disabled while the field is not — e.g. **Apply** waits until a code is typed.
- Read-only and Disabled groups also disable their button; set `disabled` on both.

---

## 4. Behaviour

- **Input + Button / Select + Button:** the group is a `<form>` and the button `type="submit"`, so Enter in the field runs the action — no script.
- **Button + Input:** the button has `aria-haspopup="listbox"` and `aria-expanded` and opens its Dropdown Menu (`scripts/modules/input.js`). Picking an option marks it Selected and puts its short label (`data-label`, or its text) on the button. Outside click or Esc closes it; ↑ ↓ move through the options.

---

## 5. Code

```html
<!-- Input + Button -->
<form class="input-field">
  <label class="input-field__label" for="newsletter-email">Email address</label>
  <div class="input input-group">
    <input class="input__control" id="newsletter-email" type="email" placeholder="email.address@website.com" />
    <button type="submit" class="btn btn-brand">Subscribe</button>
  </div>
</form>

<!-- Button + Input (context setter) -->
<div class="input input-group">
  <button type="button" class="btn btn-tertiary-neutral" aria-haspopup="listbox" aria-expanded="false" aria-label="Currency: GBP">GBP<span class="icon icon--chevron-down" aria-hidden="true"></span></button>
  <div class="dropdown-menu" hidden>
    <div class="dropdown-menu__list" role="listbox" aria-label="Currency">
      <button type="button" class="dropdown-menu__item" role="option" aria-selected="true" data-label="GBP">GBP — British pound<span class="icon icon--tick dropdown-menu__tick" aria-hidden="true"></span></button>
      …
    </div>
  </div>
  <input class="input__control" inputmode="decimal" placeholder="£000.00" aria-label="Amount" />
</div>

<!-- Select + Button -->
<form class="input input-group input--select">
  <select class="input__control" aria-label="Edition">…</select>
  <button type="submit" class="btn btn-brand">Go</button>
</form>
```

| | File |
|---|---|
| Styles | `styles/scss/components/_input-group.scss` (on top of `_input.scss`) |
| Behaviour | `scripts/modules/input.js` |
| Demo | `components/input-group/` |

---

## 6. Figma notes

- **Size:** one size only (46 box, text-md, MD button). Figma draws only this one; no SM or LG group is planned.
- **Shape:** Pill only, as Figma.
- **Insets:** the button sits 3px from the box edge (Figma Container padding 3 = 1px border + 2px). Text is 16px from the box edge, as an MD Input, and 16px from the button (Figma: 4px gap + the inner Input's own padding).
- **Select + Button:** built with the Native Select. A Dropdown Select (options with icons) can't hold a second button inside its trigger; if one is needed it gets its own pattern.
- **Button disabled:** Figma Button's `State=disabled` (20%); code had no Disabled state, so Button › Disabled was added to match.
- **Read-only / Disabled, Button + Input:** the leading Tertiary button was drawn enabled; fixed in Figma (2026-11-11) to `State=disabled`, as the other compositions.
- **Upload** (Upload + "Choose files…") is a file picker, not a text field, and is not built yet.
