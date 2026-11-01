# Tooltip & Popover

Two bubbles on one shape, as in Bootstrap:

| | Popover | Tooltip |
|---|---|---|
| **Content** | Icon (optional), title, description, buttons (optional), close | Short text only |
| **Opens** | On click of its button | On hover (mouse) or keyboard focus of its trigger — or flashed after an action ("Link copied") |
| **Closes** | Close button, outside click, Esc | Pointer leaves, focus leaves, Esc — a flash after 1.5s |
| **Width** | 280 | Hugs the text, 240 at most |
| **Touch** | Works the same (tap) | No hover on touch: never the only way to say something. Only flashed feedback shows there |

Figma: Web UI Kit › Tooltip (Popover) (`3341:6789`). Code: `styles/scss/components/_tooltip.scss` · behaviour `scripts/modules/tooltip.js` · demo `components/tooltip/`.

---

## 1. Shape (both)

- Surface `color/background/neutral/lightest`, **4px corners** — the tail can sit near the very end of an edge, which a bigger radius would not allow.
- **Elevation Lv-4** (Temporary — closes on outside click or by itself). Drawn as a `drop-shadow` so the tail casts it too.
- **Motion:** in from the trigger's side (8px) with a fade, out the same way — **150ms** (Toast: 16px, 300 / 200ms; a bubble is smaller and shorter-lived). CSS only: `@starting-style` and `display` / `overlay` transitions on the popover. Reduced motion: none.
- **Tail** 24 × 12, on the edge that faces the trigger. Centred, or as far as **18px from an end** (tail centre) — the 12 Figma "Tale direction" variants. `.popover--no-tail` / `.tooltip--no-tail` for none.

## 2. Popover

| Part | Class | Notes |
|---|---|---|
| Box | `div.popover[popover]` | Grid: icon column 48 + 12 gap, then the text column. Padding 12 · 32 right (clear of the close) · 12 · 16 |
| Icon *(optional)* | `span.popover__icon > .icon` | 48 circle `color/background/home-blue/subtlest`, 22px icon `color/icon/interaction-primary/default` |
| Title | `p.popover__title` | H5 Semibold (`dmw_sans/h5/Semibold`); 16px right padding, clear of the close |
| Description | `p.popover__description` | label-xsm Regular, line-height narrow, `color/text/neutral/dark`. **3 lines at most** — longer content belongs in a Modal |
| Buttons *(optional)* | `.popover__actions` | Button SM: Secondary Brand + Quaternary Brand, 8px apart, 12px under the description |
| Close | `button.popover__close` | Same as the Toast close: Button Quaternary Neutral, icon only (40), `ico-xmark-light` 16, top right, 50% opacity; on hover / focus full opacity with the 40px area in `effect/translucent-dark/pale` |

```html
<button class="btn btn-secondary-neutral" type="button" popovertarget="tip-1">More info</button>
<div class="popover" id="tip-1" popover data-placement="bottom">
  <span class="popover__icon" aria-hidden="true"><span class="icon icon--info-circle-outline"></span></span>
  <p class="popover__title">Tooltip Title Here</p>
  <p class="popover__description">Tooltip description.</p>
  <div class="popover__actions">
    <button class="btn btn-secondary-brand btn--sm" type="button">Button</button>
    <button class="btn btn-quaternary-brand btn--sm" type="button">Button</button>
  </div>
  <button class="popover__close btn btn-quaternary-neutral btn--icon-only" type="button" aria-label="Close" popovertarget="tip-1" popovertargetaction="hide">
    <span class="icon icon--xmark-light" aria-hidden="true"></span>
  </button>
</div>
```

The native `popover` attribute does the opening and closing (the button's `popovertarget`, outside click, Esc) and puts the box in the top layer — no script for that. Keep the popover right after its button in the HTML so Tab moves into it.

## 3. Tooltip

```html
<button class="btn btn-tertiary-neutral btn--icon-only" type="button" aria-label="Save" aria-describedby="tip-save">…</button>
<div class="tooltip" id="tip-save" role="tooltip" popover="manual" data-placement="top">Save for later</div>
```

- H5 Semibold, padding 12 · 16, 240px at most (wraps).
- The trigger names it with `aria-describedby`; the script shows it on mouse hover and keyboard focus (`:focus-visible`), hides it on leave, blur and Esc.
- **Flash** after an action: `Tooltip.flash(tooltip, trigger)` — 1.5s (e.g. Copy link → "Link copied", `role="status"`). The only tooltip that shows on touch, because it follows a tap.
- **Not for results that matter.** A tooltip is small and next to the button, easy to miss, and cannot hold a button. Pick by what happened:

| Situation | Feedback |
|---|---|
| The result is stored or sent, or may need a follow-up (Undo, View, Retry) — e.g. **Save article**, post a comment | **Toast** |
| A light confirmation that ends where it happened — e.g. **Link copied** | **Tooltip** flash next to the button |
| The button's own state (saved / not saved) | **The button**: filled icon + `aria-pressed="true"`; its tooltip is only the label ("Save article" / "Saved") |

  Demo (Save article): Loading while it saves, then the filled bookmark stays (`aria-pressed`) and the tooltip label reads "Saved". On a real page the result also goes in a Toast — not shown on this page.

## 4. Placement

`data-placement="top | bottom | left | right"` — the preferred side from the trigger (default top). The script:

1. uses that side if the bubble fits (16px inside the viewport), else the opposite side, else the other axis (a side bubble on a narrow screen goes below / above);
2. slides the bubble along the edge to stay 16px inside the viewport;
3. moves the tail to keep pointing at the trigger (`--tail`, 18px from an end at most);
4. writes the side it chose to `data-side` (the tail follows it) and the position to `--x` / `--y` — CSS draws it;
5. follows the trigger while the page scrolls or resizes.

In-page samples (no script) use `data-side` and `data-align="start | end"` directly.

## 5. Mobile (SM-XS)

The same bubble — the popover (280) fits a 390 screen with 16px each side; at an edge it slides and the tail moves. No bottom sheet: the content is small, and a sheet would lose the link to what was tapped. Add a sheet variant only if a larger popover is ever needed.

## 6. Figma notes

- **Elevation:** the rich variants use `Elevation Level-5` (another library's style); code uses Lv-4, as the simple variant and Foundation › Elevation.
- **Close button:** Figma uses an App SF Symbol at 50%; code uses the Toast close for consistency.
- **Not in code:** the "Annotation" (designer note) and the empty "Hidden" variant; the green "Link copied" fill — the basic (neutral) bubble only.
