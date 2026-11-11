# Input

Input is the family of form fields: **Input** (one line of text), **Select** (pick one from a list) and **Textarea** (several lines). They share one box, one set of sizes and one set of states, so a form reads as one system. They are global items: their colours follow the semantic rules (focus `semantic-info`, valid `semantic-success`, error `semantic-error`), not a section colour.

Figma: Web UI Kit › Input (`210:6470`) — Input item, Input, Selectbox item, Selectbox, Input-TextArea, Textarea, Form Icons

---

## 1. Anatomy

| Element | Class | Description |
|---|---|---|
| **Field** | `.input-field` | Label, box and hint stacked, 8px apart. Leave it out when the box stands alone (a search bar, the Pagination page picker) |
| **Label** *(optional)* | `.input-field__label` | label-sm Semibold, `text/neutral/darker`. A `<label for>`; without a visible label the control takes an `aria-label` |
| **Box** | `.input` | The bordered box. Holds the leading icon, the control, actions and the status icon |
| **Leading icon** *(optional)* | `.input > .icon` | `icon/neutral/grey-dark`. 14 · 16 · 18 by size |
| **Control** | `.input__control` | The `<input>`, `<select>` or `<textarea>` itself (a `<span>` in the Dropdown Select trigger). No border or background of its own |
| **Clear** *(optional)* | `button.input__clear` | `ico-xmark-circle`. Shows only while the box has focus and a value |
| **Show / hide** *(optional)* | `button.input__reveal` | `ico-eye-close` / `ico-eye-open` — password fields |
| **Status icon** | `.input::after` | Drawn by the state — no markup. See § 3 |
| **Chevron** | `.input--select::before` | `ico-chevron-down` (up while the Dropdown is open) |
| **Hint** *(optional)* | `.input-field__hint` | text-sm, `text/neutral/grey-dark`; takes the status colour when Valid or Error |

---

## 2. Size and shape

Heights match Button (SM 34 · MD 40 · LG 46), so a field and a button line up in one row. Rectangle corners follow the Rectangular Button too.

| | SM `.input--sm` | **MD** (default) | LG `.input--lg` |
|---|---|---|---|
| Height | 34 | 40 | 46 |
| Text | text-sm | text-md | text-lg |
| Side inset (border included) | 12 | 16 | 20 |
| Gap | 6 | 8 | 10 |
| Icons | 14 | 16 | 18 |
| Loading ring | 20 | 24 | 28 |
| Rectangle corners | 6 | 8 | 10 |

- **Shape:** Rectangle (default) or Pill `.input--pill` (`border-radius/full`). Textarea is Rectangle only.
- **Textarea** `.input--textarea`: MD text, 12px top and bottom, 16px sides, three lines high (96px) and drag-resizable in height. The status icon sits bottom right.
- Width comes from the page (Figma 320).

---

## 3. States

The box draws every state from the control's own attributes where HTML has one, so the markup stays plain.

| State | Box | Status icon | How |
|---|---|---|---|
| **Default** | `background/neutral/white`, 1px `border/neutral/grey-light` | — | — |
| **Placeholder** | text `text/neutral/darker` at 40% | — | `placeholder` |
| **Focus** | 2px `border/semantic-info/base` | — | `:focus-within` |
| **Valid** | 2px `border/semantic-success/base` · hint `text/semantic-success/base` | `ico-tick-circle`, `icon/semantic-success/base` | `.input--success` |
| **Error** | 2px `border/semantic-error/base` · `background/semantic-error/subtlest` · hint `text/semantic-error/base` | `ico-exclamation-mark-triangle`, `icon/semantic-error/base` | `aria-invalid="true"` on the control (Dropdown Select: on the combobox button) |
| **Loading** | `background/neutral/light` | Loading ring (Loading › Three-Quarters Circle), `icon/home-blue/base` | `.input--loading` |
| **Read-only** | `background/neutral/lighter` | `ico-padlock`, `icon/neutral/grey-dark` | `readonly` (Dropdown Select: `aria-readonly="true"`) |
| **Disabled** | `background/neutral/light`; text and leading icon at 40% | `ico-slash-circle`, `icon/neutral/grey-dark` | `disabled` |

- The 2px border is the 1px border plus a 1px inset ring, so the text never moves when the state changes.
- Error keeps its pink background in Input, Select and Textarea alike.
- Error wins over Focus: a field you are fixing stays red.
- Point the hint at the control with `aria-describedby`, so screen readers read the error message.
- No hover state (none in Figma).

---

## 4. Select — two kinds

| | Native Select | Dropdown Select |
|---|---|---|
| Use when | Options are **text only** | Options need more than text — an icon, a group title, a description |
| Markup | `<select class="input__control">` in `.input.input--select` | `.input-select` › `button.input.input--select[role=combobox]` + Dropdown Menu |
| List | The system picker (a wheel on phones) | Dropdown Menu (`docs/4_Components__03_Dropdown-Menu.md`), 4px under the box, full width, 164px high then scrolls |
| Script | None | `scripts/modules/input.js` |

- Both show the same closed box: optional leading icon (Dropdown Select only), the value, the chevron.
- Nothing chosen yet: the placeholder at 40% (`data-placeholder` on the Dropdown Select value; a disabled first `<option>` in a Native Select).
- While the Dropdown is open the box shows Focus and the chevron turns up (`aria-expanded="true"`). Outside click or Esc closes it; ↑ ↓ move through the options.
- A native `<select>` has no read-only mode. A read-only choice uses the Dropdown Select with `aria-readonly="true"` (it won't open).

---

## 5. Code

```html
<!-- Input with label and hint -->
<div class="input-field">
  <label class="input-field__label" for="username">Username</label>
  <div class="input">
    <span class="icon icon--person" aria-hidden="true"></span>
    <input class="input__control" id="username" placeholder="Enter your username" aria-describedby="username-hint" />
    <button type="button" class="input__clear" aria-label="Clear"><span class="icon icon--xmark-circle" aria-hidden="true"></span></button>
  </div>
  <p class="input-field__hint" id="username-hint">Letters and numbers only.</p>
</div>

<!-- Password with show / hide -->
<div class="input">
  <input class="input__control" type="password" aria-label="Password" />
  <button type="button" class="input__reveal" aria-label="Show password" aria-pressed="false"><span class="icon icon--eye-close" aria-hidden="true"></span></button>
</div>

<!-- Native Select (text only) -->
<div class="input input--select">
  <select class="input__control" aria-label="Country">
    <option>United Kingdom</option>
    <option>United States</option>
  </select>
</div>

<!-- Dropdown Select (options with icons) -->
<div class="input-select">
  <button type="button" class="input input--select" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-label="Sort by">
    <span class="icon icon--funnel" aria-hidden="true"></span>
    <span class="input__control" data-placeholder="Sort by"></span>
  </button>
  <div class="dropdown-menu" hidden>
    <div class="dropdown-menu__list" role="listbox">
      <button type="button" class="dropdown-menu__item" role="option" aria-selected="false">
        <span class="icon icon--clock" aria-hidden="true"></span>Latest<span class="icon icon--tick dropdown-menu__tick" aria-hidden="true"></span>
      </button>
      …
    </div>
  </div>
</div>

<!-- Textarea -->
<div class="input input--textarea">
  <textarea class="input__control" aria-label="Comment" placeholder="Leave your comment"></textarea>
</div>
```

| | File |
|---|---|
| Styles | `styles/scss/components/_input.scss` |
| Behaviour | `scripts/modules/input.js` — Clear, Show / hide, Dropdown Select |
| Demo | `components/input/` |
| Used by | Pagination (page picker = Native Select, MD) · Input Group (`docs/4_Components__14_Input-Group.md`) |

---

## 6. Figma notes

Decisions taken in code. Fed back to Figma on 2026-11-11 where marked **(Figma fixed)**.

- **Side insets** **(Figma fixed):** were 12 · 15 · 18; now 12 · 16 · 20 (`spacing/12 · 16 · 20`) in Input and Selectbox. Heights (34 · 40 · 46) were already right — Figma strokes sit outside the layout, so the 1px border doesn't add to the padding.
- **Rectangle corners** **(Figma fixed):** were 8 at every size; now 6 · 8 · 10 (`border-radius/6 · 8 · 10`), as the Rectangular Button.
- **2px states** **(Figma fixed):** Focus / Valid / Error strokes were centred (1px spilling outside the box); now inside, as code (1px border + 1px inset ring).
- **Textarea** **(Figma fixed):** border `border/neutral/light` → `border/neutral/grey-light`; placeholder and disabled text 50% → 40%; loading text full strength (as Input); error background white → `semantic-error/subtlest`. Padding 12 × 16 was already right.
- **Textarea focus (open):** Input-TextArea still has a separate `focus` (soft glow, `Textarea/focused`) next to `active`. On the Web they are one Focus state; removing the glow variant is left to design, since instances may use it.
- **Select:** Selectbox has no Valid / Error states in Figma; code applies Input's.
- **State names (open):** Input uses Title Case, Textarea lower case; this doc uses Input's names (Default · Focus · Valid · Error · Loading · Read-only · Disabled). Not renamed in Figma: renaming variants changes what designers pick, so it is left to design.
- **Auto-complete:** the inline grey completion ("Input Text|complete") needs a data source and is not built; Clear is.
- **Placeholder contrast:** 40% of `neutral/darker` on white is about 2.6:1, under AA for text. Kept as Figma for now — flag for design.
- Checkbox and Radio icons are in Form Icons but have no component frames yet.
