# 3_FOUNDATION

# Elevation

Elevation uses drop shadows to lift a surface above the page — a visual cue that it sits higher in priority or hierarchy. Shadows are blurs only: no spread, and a small downward offset that grows with the level.

Figma: Web UI Kit › Elevation (Drop Shadow), effect styles `Elevation Lv-1` … `Elevation Lv-5`. Demo: `foundation/elevation/`.

---

## 1. Levels

Level 0 is flat — the page itself, no shadow. Levels 1–5 each have one token.

| Token | Figma style | Shadow (x · y · blur) | Colour token |
| :---- | :---- | :---- | :---- |
| `--elevation-1` | Elevation Lv-1 | 0 · 1px · 4px | `color/effect/translucent-dark/pale` (10%) |
| `--elevation-2` | Elevation Lv-2 | 0 · 2px · 8px | `color/effect/translucent-dark/pale` (10%) |
| `--elevation-3` | Elevation Lv-3 | 0 · 3px · 12px | `color/effect/translucent-dark/subtle` (20%) |
| `--elevation-4` | Elevation Lv-4 | 0 · 4px · 20px | `color/effect/translucent-dark/subtle` (20%) |
| `--elevation-5` | Elevation Lv-5 | 0 · 5px · 28px | `color/effect/translucent-dark/moderate` (40%) |

---

## 2. Which Level? — Pick the Role, Not the Shadow

Ask one question: **how far does it sit from the page, and how much does it stop the reader?** The further it floats and the more it interrupts, the higher the level. Never choose a shadow by eye — pick the role, and the role gives the level.

| Level | Role | The test | DM examples |
| :---- | :---- | :---- | :---- |
| 0 | Page | Scrolls with the page. Content is split by keylines, not shadows. | Page, Article Card, sections, Beta boxes |
| 1 | Sticky | Stuck to an edge of the page; content scrolls underneath. | Sticky Navbar |
| 2 | Floating control | A small control resting on top of content. | Carousel arrows, back-to-top button |
| 3 | Floating panel | A panel that floats over the page and stays while the reader carries on. | Mini video player |
| 4 | Temporary | Appears for a moment — opened by the reader or by the system — and closes on an outside click or by itself. | Dropdown Menu, Nav Panel, Tooltip, Toast |
| 5 | Modal | Blocks the page until it is dealt with; always over a scrim (`color/background/shade/moderate`). The top layer. | Modal |

Stacking order follows the level: a higher level always sits above a lower one.

### 2-A. Figma audit (2026-10-28)

- Already on the right level: Sticky Navbar (Lv-1), Dropdown Menu and Nav Panel (Lv-4), Modal (Lv-5).
- **Toast** uses raw shadows (`0 4 32 40%`, `0 0 16 20%`) instead of a style — should be `Elevation Lv-4`.
- **Tooltip** variants use a separate style named `Elevation Level-5` (another library) — should be `Elevation Lv-4`, like the Tooltip component itself.
- Levels 2 and 3 have no component yet; the roles above are the rule for new ones.

---

## 3. Implementation

- Tokens live in `styles/scss/foundation/_elevation.scss`: `box-shadow: var(--elevation-2);`
- Never write a raw `rgba()` shadow — pick the nearest level.
- The colours are semantic effect tokens, so the shadow follows `[data-theme]`.
- Figma "blur" maps straight to the CSS blur radius; spread is always 0.
