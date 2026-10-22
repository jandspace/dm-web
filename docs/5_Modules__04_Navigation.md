# Navigation — Masthead

The site header: **Topbar › Branding › Navbar L1**, plus the **Nav Sheet** on Mweb.

Figma: Web UI Kit › Masthead (71:2568) · Topbar (2839:29038) · Branding (2841:11471) · Navbar - L1 (2839:29304) · Nav Sheet (332:8626).
Code: `styles/scss/modules/_masthead.scss`, `_masthead-sheet.scss` · demo `modules/navigation/` (live masthead) and `modules/navigation/anatomy.html` (every part on its own, with its class).

---

## 1. Rules

- **Full width, always.** The masthead spans the whole browser width at every breakpoint. Its content sits in the page container (720 · 960 · 996 · 1224) with a 16px inset.
- **Channel colour.** `.masthead--{section}` sets the page's channel (sections map, CLAUDE.md › Editorial Section → Colour Mapping). It drives the Topbar channel bar and, on Mweb, the whole masthead background.
- **Mweb (<768) turns the masthead into the channel colour** (`color/background/{channel}/base`): white logo, white labels, Subscribe pill and round login. The Topbar is hidden; the burger opens the Nav Sheet.

## 2. Structure

| Part | Class | Desktop (≥768) | Mweb (<768) |
|---|---|---|---|
| Shell | `header.masthead.masthead--{section}` | `color/background/neutral/lightest`, keyline under the navbar | channel base colour, 4px top inset |
| Container | `.masthead__inner` | page container, 16px inset | full width |
| Topbar | `.masthead-topbar` | 32px row, light keyline below | hidden |
| Branding | `.masthead-branding` | 72px (MD) · 84px (LG+) | 48px row |
| Navbar L1 | `nav.masthead-nav` | 38px items | burger + 44px items |
| Nav Sheet | `.masthead-sheet` | — | full-screen sheet |

## 3. Topbar

- **Left:** channel id — 3px `color/border/{channel}/base` bar, 8px gap, label-xsm Bold `neutral/darker` — then *Last updated: …* (label-xsm Regular `neutral/dark`, **LG+ only**).
- **Right:** Edition · Login · Search. Each item 16px inset with a 1px `color/border/neutral/light` keyline on its left. Item: 14px icon + label-sm Semibold `neutral/darker`, 6px gap (Edition: flag 14 · label · chevron 12, 4px gap).
- **Hover:** `color/background/neutral/light` pill, 4px / 8px outside the content.
- **Edition menu:** *Select Edition* — UK / US / AU / IE, tick on the current one. Elevation Lv-4 panel (0 4 20 `translucent-dark/subtle`), 8px corners. *Not in Figma yet* — content taken from the current production markup (`pageEditionDropdown`), styling from the system tokens.

## 4. Branding

- **Logo:** Daily Mail — 331×68 (LG+) · 267×55 (MD) · 127×26 white (Mweb). Hover: 72% opacity. The link hugs the logo.
- **Slot (desktop):** right column, max 480px, content right-aligned. Default: **Mail+ Subscribe** — 48px pill, Mail+ gradient (`miscellaneous/mailplus/mplus-dark-blue` → `mplus-solid-blue`), Daily Mail+ wordmark 114×20 + "Subscribe" label-xl Semibold white. Hover: `color/background/interaction-primary/hover`, as the primary (brand) button. Other branding elements can replace it.
- **Mweb:** Subscribe pill (34px, lightest, M+ icon + label-sm Semibold) and a round login (44px target, 34px circle with a `translucent-light/moderate` border, person icon 14).

## 5. Navbar L1

| | Desktop | Mweb |
|---|---|---|
| Item | 38px; label-sm **Bold**, `neutral/dark` (current: `neutral/darker`); 8px side padding | 44px; label-sm Semibold, `neutral/lightest`; 10px side padding |
| Indicator | 4px bar in the item's channel colour, inset 8px. Current: shown. Hover: slides up — except items with a dropdown (LG+, mouse): hover darkens the label only, then the tab + panel open | 4px `neutral/lightest` pill, current only |
| Row | LG+: items spread across the container. MD: scrolls sideways, 16px fades at both ends (the row runs into the 16px inset) | burger 44×44 (icon 20) + scrolling row, right edge fades |
| Daily Mail+ | M+ lozenge 28×12 | wordmark 74×13, white |

- Each item carries its channel: `.masthead-nav__item--{section}` (indicator and dropdown tint). The current page: `aria-current="page"` on the link.
- **Dropdown (LG+, pointing device):** items with subchannels (`.masthead-nav__item--has-panel`) turn into a tab (`color/background/{channel}/subtlest`, 8px top corners) and open a panel — Elevation Lv-4, 24px padding, 8px corners, set 16px out past the tab (left edge; right edge for `--end` panels) so the panel text lines up with the tab label and the pointer has room to move. The panel holds the channel link (label-md Bold + arrow, `neutral/light` hover pill) and subchannels in two 160px columns (label-sm Regular; a 1px `border/neutral/grey-dark` line grows from the left on hover). Items near the right edge (Games, Travel, Buyline, Daily Mail+) use `.masthead-nav__panel--end`.
- **Hover intent:** the panel opens 150ms after the pointer rests on an item and closes 300ms after it leaves, so moving diagonally across other tabs towards a panel does not swap or drop it. The script adds `.masthead-nav--intent` and drives `.is-open`; without it the panel follows `:hover` immediately. Keyboard focus (`:focus-within`) and Escape work as usual.
- **L1 channels:** Home · News · Royals · US · Sport · Showbiz · Lifestyle · Money · Crime Desk · Games · Travel · Buyline · M+ — every channel except Crime Desk has subchannels (Daily Mail+: Puzzles). The demo lists them; links are placeholders (#).

## 6. Nav Sheet (Mweb)

- **Bar:** close button 44×44, xmark-light 16.
- **Top:** Home (home colour icon 20 + label-md Semibold) + edition pill (tertiary XS: `neutral/lighter`, flag 12, label-xxsm, chevron 12) … Login (secondary SM: 33px, `border/neutral/grey-light`, person 14 + label-sm).
- **Search:** 40px pill — `neutral/lighter`, `border/neutral/grey-light`, magnifier 16, placeholder text-md at 40%.
- **Playlists:** Live · Today's Pick · Podcasts · Deep-Dive — 56px icon box (`neutral/lighter`, `border/neutral/light`, 8px corners) + label-xsm Semibold. Live: 28px `icon/showbiz-red/base` ring around a pulsing dot.
- **Channels:** rows of 50px with a light keyline — channel icon 20 + label-md Semibold; a 40px expand button (chevron 16, turns when open) shows the subchannels.
- The page under the open sheet does not scroll (`html.masthead-sheet-open`).

## 7. Behaviour (script)

The demo page holds the reference script: burger opens / closes the sheet (Escape closes), Edition toggles its menu (outside click / Escape closes), sheet expand buttons show / hide subchannels, and the current channel is scrolled into view when the row scrolls.

## 8. Static states

For the Anatomy page (like the Button's helpers): `.is-hover` on Topbar actions, Subscribe, L1 links, panel links and the sheet's expand button; `.is-open` on an L1 item shows its tab and panel (MD+).

## 9. Not yet

- Sticky navbar (condensed bar that appears on scroll).
