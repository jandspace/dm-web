# Input

Input is the family of form fields: **Input** (one line of text), **Select** (pick one from a list), **Textarea** (several lines) and **Checkbox / Radio** (tick any number / pick exactly one). They share one box, one set of sizes and one set of states, so a form reads as one system. They are global items: their colours follow the semantic rules (focus `semantic-info/subtle`, valid `semantic-success`, error `semantic-error`), not a section colour.

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
| **Focus** | Box unchanged + 2px `border/semantic-info/subtle` ring, 1px outside the box | — | `:focus-within` |
| **Valid** | 2px `border/semantic-success/base` · hint `text/semantic-success/base` | `ico-tick-circle`, `icon/semantic-success/base` | `.input--success` |
| **Error** | 2px `border/semantic-error/base` · `background/semantic-error/subtlest` · hint `text/semantic-error/base` | `ico-exclamation-mark-triangle`, `icon/semantic-error/base` | `aria-invalid="true"` on the control (Dropdown Select: on the combobox button) |
| **Loading** | `background/neutral/light` | Loading ring (Loading › Three-Quarters Circle), `icon/home-blue/base` | `.input--loading` |
| **Read-only** | `background/neutral/lighter` | `ico-padlock`, `icon/neutral/grey-dark` | `readonly` (Dropdown Select: `aria-readonly="true"`) |
| **Disabled** | `background/neutral/light`; text and leading icon at 40% | `ico-slash-circle`, `icon/neutral/grey-dark` | `disabled` |

- The Valid / Error 2px border is the 1px border plus a 1px inset ring, so the text never moves when the state changes.
- Error keeps its pink background in Input, Select and Textarea alike.
- Focus is a ring outside the box (CSS `outline`, `outline-offset: 1px`), the same as Checkbox / Radio. It adds to any state: a field you are fixing keeps its red border and gets the ring.
- The 1px gap is transparent, so the ring reads on any surface.
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

## 5. Checkbox and Radio

Figma: Web UI Kit › Input › Checkbox (`9448:135038`) and Radio (`9451:757`) — State (Default - Unselected · Selected · Focus · Error · Disabled · Disabled - Selected) × Size (SM · MD · LG). Built from the Form Icons (`ico-checkbox-on / -off`, `ico-radio-on / -off`) in Input's format.

| | Checkbox | Radio |
|---|---|---|
| Use when | Any number of choices, or one yes / no (consent, "Don't show this again") | Exactly one of 2–6 visible choices |
| Markup | `<input type="checkbox">` | `<input type="radio" name>` — one `name` per group |
| Selected | `ico-checkbox-on` | `ico-radio-on` |

| Element | Class | Description |
|---|---|---|
| **Choice** | `label.input-choice` | The native input + a `<span>` with the text. The whole label is the click target |
| **Icon** | `input::before` | The input has no look of its own (`appearance: none`); the icon is a mask. Centred on the first text line |
| **Description** *(optional)* | `.input-choice__hint` | Inside the text span, text-sm `text/neutral/grey-dark` |
| **Group** | `fieldset.input-choice-group` | `legend.input-field__label` (the question) + choices + `p.input-field__hint`. 12px between choices |
| **Inline group** | `.input-choice-group--inline` | Choices in a row, 24px apart — short options only (Newest · Oldest · Best rated) |
| **Boxed** | `.input-choice--boxed` | The choice in an Input box: 1px `border/neutral/grey-light`, Input corners, the Input side inset (12 · 16 · 20) on all four sides — one line is 45 · 56 · 67, taller than Input on purpose. Plans, polls, topic pickers |

| | SM `.input-choice--sm` | **MD** (default) | LG `.input-choice--lg` |
|---|---|---|---|
| Icon | 16 | 18 | 20 |
| Text | text-sm | text-md | text-lg |
| Gap | 6 | 8 | 10 |

A size modifier sets only custom properties, so it goes on one choice or on the whole group.

| State | Icon | How |
|---|---|---|
| **Unselected** | off, `icon/neutral/grey-dark` (hover `icon/neutral/darker`) | — |
| **Selected** | on, `icon/semantic-info/base` (hover `icon/semantic-info/deep`) — Input's semantic colours | `checked` |
| **Focus** | 2px `border/semantic-info/subtle` ring, 1px out | `:focus-visible` |
| **Error** | `icon/semantic-error/base`; hint `text/semantic-error/base` | `aria-invalid="true"` on the input |
| **Disabled** | choice at 40% | `disabled` |
| **Boxed · Selected** | 2px `border/semantic-info/base` | `checked` |
| **Boxed · Error** | 2px `border/semantic-error/base` · `background/semantic-error/subtlest` | `aria-invalid="true"` |

- **Consent:** one checkbox in an `.input-field`, the hint under it (`aria-describedby`). Links in the text are fine; they sit in the span.
- **Mixed ("Select all"):** not built — needs an `ico-checkbox-` indeterminate icon (a dash) in the library first.
- **Focus is a ring, not a colour:** Selected is already blue, so a colour change alone would not show focus on a ticked choice. The ring is the lighter `subtle` blue so it reads apart from the selected icon — the same ring as Input.
- No script: the native inputs do keyboard, grouping and form submission.

---

## 6. Code

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

<!-- Consent checkbox -->
<div class="input-field">
  <label class="input-choice"><input type="checkbox" aria-describedby="terms-hint" /><span>I agree to the <a href="/terms">Terms of use</a></span></label>
  <p class="input-field__hint" id="terms-hint">Tick the box to continue</p>
</div>

<!-- Radio group, with descriptions -->
<fieldset class="input-choice-group">
  <legend class="input-field__label">Choose your plan</legend>
  <label class="input-choice"><input type="radio" name="plan" checked /><span>Monthly<span class="input-choice__hint">£1.99 a month</span></span></label>
  <label class="input-choice"><input type="radio" name="plan" /><span>Annual<span class="input-choice__hint">£19.99 a year</span></span></label>
</fieldset>

<!-- Inline SM checkbox group, Boxed -->
<fieldset class="input-choice-group input-choice-group--inline input-choice--sm">…</fieldset>
<label class="input-choice input-choice--boxed"><input type="checkbox" /><span>Sport</span></label>
```

| | File |
|---|---|
| Styles | `styles/scss/components/_input.scss` |
| Behaviour | `scripts/modules/input.js` — Clear, Show / hide, Dropdown Select |
| Demo | `components/input/` |
| Used by | Pagination (page picker = Native Select, MD) · Input Group (`docs/4_Components__14_Input-Group.md`) |

---

## 7. Figma notes

Decisions taken in code. Fed back to Figma on 2026-11-11 where marked **(Figma fixed)**.

- **Side insets** **(Figma fixed):** were 12 · 15 · 18; now 12 · 16 · 20 (`spacing/12 · 16 · 20`) in Input and Selectbox. Heights (34 · 40 · 46) were already right — Figma strokes sit outside the layout, so the 1px border doesn't add to the padding.
- **Rectangle corners** **(Figma fixed):** were 8 at every size; now 6 · 8 · 10 (`border-radius/6 · 8 · 10`), as the Rectangular Button.
- **2px states** **(Figma fixed):** Focus / Valid / Error strokes were centred (1px spilling outside the box); now inside, as code (1px border + 1px inset ring).
- **Textarea** **(Figma fixed):** border `border/neutral/light` → `border/neutral/grey-light`; placeholder and disabled text 50% → 40%; loading text full strength (as Input); error background white → `semantic-error/subtlest`. Padding 12 × 16 was already right.
- **Focus ring (Figma fixed):** code changed Focus from a 2px `semantic-info/base` border to a 2px `semantic-info/subtle` ring 1px outside the box (2026-11-27). Figma way, tested on a copy of the SM Input: an absolute **Focus ring** rectangle inside the frame — x / y −3, size +6, 2px inside stroke `color/border/semantic-info/subtle`, corner radius = box radius + 3, constraints Scale / Stretch, Clip content off. **Figma fixed (2026-11-27):** Input's 12 Focus and Typing with Auto Complete variants, Selectbox's 6 Focus variants and Textarea's `active` and `active - typing` now have the 1px `border/neutral/grey-light` stroke plus the Focus ring layer (ring radius is a fixed number, 9 · 11 · 13 / 999: no token for radius + 3). Input group: see its doc § 6.
- **Textarea focus (open):** Input-TextArea still has a separate `focus` (soft glow, `Textarea/focused`) next to `active`. On the Web they are one Focus state; removing the glow variant is left to design, since instances may use it.
- **Select:** Selectbox has no Valid / Error states in Figma; code applies Input's.
- **State names (open):** Input uses Title Case, Textarea lower case; this doc uses Input's names (Default · Focus · Valid · Error · Loading · Read-only · Disabled). Not renamed in Figma: renaming variants changes what designers pick, so it is left to design.
- **Auto-complete:** the inline grey completion ("Input Text|complete") needs a data source and is not built; Clear is.
- **Placeholder contrast:** 40% of `neutral/darker` on white is about 2.6:1, under AA for text. Kept as Figma for now — flag for design.
- **Checkbox and Radio (Figma, 2026-11-27):** component sets built to match code — icon 16 · 18 · 20, gap `spacing/6 · 8 · 10`, label `dmw_sans/text-sm · md · lg/Regular`, Focus ring layer (round on Radio), Disabled = `Container` at 40%. Radio is the Checkbox set with the `ico-radio-` icons. Not in Figma: Hover (code only), the description line, Boxed, groups. The label is a plain text layer, not a text component property.
- **Selected icon token (Figma fixed, 2026-11-27):** the selected icon was filled with `color/background/semantic-info/base`; now `color/icon/semantic-info/base`, as code (Selected and Disabled - Selected, both sets).
