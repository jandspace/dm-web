# 3_FOUNDATION

# Iconography

Every icon comes from the DM icon library and is used as the SVG file in `assets/icons/` — never redrawn, never an icon font or PNG. Single-colour icons are drawn with the `.icon` class, so a colour token sets their colour and dark mode changes it automatically.

Figma: DailyMail Icons (`171vKuCduz2EW3XrK12IQT`, frame `24:2253`). Demo: `foundation/iconography/`. Code: `styles/scss/foundation/_icon.scss`.

---

## 1. Files

| Rule | |
| :---- | :---- |
| Source | Exported from Figma with visible layers only — 32 × 32, black |
| Location | `assets/icons/ico-{name}.svg` — add a missing icon here first, then use it |
| Names | `ico-{name}` + style suffix: `-outline`, `-circle`, `-square`, `-color`. Channels `ico-ch-*`, social `ico-sn-*`, national flags `ico-flag-*` |
| Legacy | Files no longer in Figma — listed under Legacy on the demo page; use the library icon instead |

---

## 2. Single-colour icons — `.icon`

The file is a CSS mask and the background is a `color/icon/*` token, so one file serves every colour and both themes.

```html
<span class="icon icon--gear" aria-hidden="true"></span>
<span class="icon icon--16 icon--arrow-right-light" aria-hidden="true"></span>
```

| | |
| :---- | :---- |
| Icon | `.icon--{name}` — the file name without `ico-` |
| Colour | `--icon-color: var(--color-icon-…)` on the icon or any parent (state rules too, e.g. hover). Default `icon/neutral/black` |
| Size | 24 by default · `.icon--16` · `.icon--20` · `.icon--32` (drawn on 32) |
| Dark mode | Nothing to do — the token flips |

```scss
.share-button { --icon-color: var(--color-icon-neutral-grey-dark); }
.share-button:hover { --icon-color: var(--color-icon-interaction-primary-hover); }
```

**Why one class per icon:** the file path sits in `main.css`, so every browser reads it from the same place. A `url()` passed in from the page's inline style (`style="--icon: url(…)"`) is resolved against the stylesheet in some browsers and against the page in others.

**New icon:** add the file to `assets/icons/`, then

```
python3 tools/icon-build/build_icon_list.py > styles/scss/foundation/_icon-list.scss
npm run build
```

---

## 3. Colour icons — `<img>`

Channel colour icons (`*-color`) and national flags (`ico-flag-*`) keep their own colours, so they stay plain images and are left out of `.icon`.

```html
<img src="../../assets/icons/ico-ch-uk-showbiz-color.svg" alt="" width="24" height="24" />
```

---

## 4. Accessibility

- A decorative icon gets `aria-hidden="true"` (`.icon`) or `alt=""` (`<img>`).
- An icon-only button carries its label: `aria-label` on the button.
- Windows High Contrast (`forced-colors`): `.icon` takes the system text colour, so it stays visible.

---

## 5. Browser support

CSS `mask` works in every current browser; `.icon` also sets `-webkit-mask` for Chrome before 120. Icons must be served from the same site (a mask image from another domain needs CORS headers). Backgrounds are left out when printing by default, so `.icon` icons do not print.
