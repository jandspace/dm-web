# Loading

Three loaders, one per job. Pick by what is loading, not by look.

| Loader | Class | When |
|---|---|---|
| **Spinning Wheel** | `.loading-page` > `.loading-wheel` | The whole page is loading (first load, a full refresh) |
| **Ellipsis** | `.loading-dots` | Part of the page is still coming (more stories at the end of a list, a module filling in) |
| **Three-Quarters Circle** | `.loading-ring` · Button `.btn--loading` | An action is running (a button was pressed, an input is checking) |

Figma: Web UI Kit › Loading (`214:6737`) — Page Loading - Spinning Wheel, Content Loading - Ellipsis, Loading on Action - Three-Quarters Circle

---

## 1. Page loading — Spinning Wheel

| | |
|---|---|
| Cover | Whole viewport (`position: fixed`), `color/background/neutral/white` at 60% |
| Wheel | 64px, 12 bars of 6 × 16 (full radius), `color/background/neutral/black`. Top bar 40%, the trail behind it 36 → 20%, the rest 16% |
| Motion | Turns in **12 steps** (one bar at a time), 1s a turn |

- Put the cover straight in `<body>`. While it is up the page can't be used: the cover takes every click, and the page does not scroll (`html:has(body > .loading-page:not([hidden]))`). For keyboard users, set `inert` on the page content while it shows.
- Hide it with `hidden`.

## 2. Content loading — Ellipsis

| | |
|---|---|
| Dots | 3 × 18px, 8px apart, `color/icon/neutral/black`; unlit 20% |
| Block | Centred, padding 32 top and bottom, 16 sides |
| Motion | The lit dot moves one step every 0.3s (0.9s a cycle), fading between |

One size only — it is a block, not an inline indicator.

## 3. Loading on action — Three-Quarters Circle

| | |
|---|---|
| Shape | `ico-loading`, inlined so it takes `currentColor` (the button's text colour) |
| Opacity | 40% |
| Motion | One turn every 1.2s, linear |
| Sizes | 24 by default; `--16`, `--20`, `--28`, `--32` |

**Button** shows it while its action runs (`.btn--loading`): the label hides and the ring sits in the middle, one size per button size — XS 16 · SM 20 · MD 24 · LG 28 · XL 32. Button's `.btn-spinner` uses the same `loading.ring` mixin, so a change here reaches every button. Input will use it too.

---

## 4. Motion and accessibility

- **Reduced motion** (`prefers-reduced-motion`): the loaders slow down instead of stopping — a loader that stands still reads as stuck (as Bootstrap). Ring 2.4s, wheel 2s a turn, dots 0.6s a step.
- Each loader is a `role="status"` region with a visually hidden `.loading__text` ("Loading…"), so screen readers announce it. Inside a Button, `aria-label="Loading"` on the button does the job.

---

## 5. Code

```html
<!-- Page -->
<div class="loading-page" role="status">
  <span class="loading-wheel" aria-hidden="true">
    <span></span><span></span><span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span><span></span><span></span>
  </span>
  <span class="loading__text">Loading…</span>
</div>

<!-- Content -->
<div class="loading-dots" role="status">
  <span></span><span></span><span></span>
  <span class="loading__text">Loading…</span>
</div>

<!-- Action -->
<svg class="loading-ring" viewBox="0 0 32 32" aria-hidden="true"><use href="#ico-loading" /></svg>
```

```scss
@use 'loading';
.my-spinner { @include loading.ring; width: 20px; height: 20px; }
```

| | File |
|---|---|
| Styles | `styles/scss/components/_loading.scss` |
| Demo | `components/loading/` |

---

## 6. Figma notes

- **Wheel motion:** Figma turns the wheel smoothly, 90° every 0.6s (2.4s a turn). Code turns it in 12 steps, 1s a turn — the usual motion for a bar spinner.
- **Frames as variants:** each loader is drawn as 3–4 variants (one per frame) linked by prototype; code is one element with a CSS animation.
