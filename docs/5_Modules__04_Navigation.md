# Navigation

The site header: **Topbar › Branding › Navbar L1**, plus the **Nav Sheet** on Mweb. Under it, in the page: **Navbar L2** (§ 11).

Team names: **L1** = the main channels (Navbar L1, in the masthead) · **L2** = the bar under the masthead (subchannels or a topic package).

Figma: Web UI Kit › Masthead (71:2568) · Topbar (2839:29038, Large 2841:9111) · Branding (2841:11471) · Navbar - L1 (2839:29304) · Nav Sheet (332:8626) · Nav Sheet sizes (328:29645).
Code: `styles/scss/modules/_masthead.scss`, `_masthead-sheet.scss`, `_navbar-l2.scss` · demo `modules/navigation/` (live masthead) and `modules/navigation/anatomy.html` (every part on its own, with its class).

---

## 1. Rules

- **Full width, always.** The masthead spans the whole browser width at every breakpoint. Its content sits in the page container (720 · 960 · 996 · 1224) with a 16px inset.
- **Channel colour.** `.masthead--{section}` sets the page's channel (sections map, CLAUDE.md › Editorial Section → Colour Mapping). It drives the Topbar channel bar and, on Mweb, the whole masthead background.
- **Mweb (<768) turns the masthead into the channel colour** (`color/background/{channel}/base`): white logo, white labels, Subscribe pill and round login. The Topbar is hidden; the burger opens the Nav Sheet.

## 2. Structure

| Part | Class | Desktop (≥768) | Mweb (<768) |
|---|---|---|---|
| Shell | `header.masthead.masthead--{section}` | `color/background/neutral/lightest`, `border/translucent-dark/pale` keyline under the navbar — 16px in from each side, inside the container padding (Figma Masthead Container Keyline, x 16) | channel base colour, 4px top inset |
| Container | `.masthead__inner` | page container, 16px inset | full width |
| Topbar | `.masthead-topbar` | 32px row, `border/translucent-dark/pale` keyline below | hidden |
| Branding | `.masthead-branding` | 72px (MD) · 84px (LG+) | 48px row |
| Navbar L1 | `nav.masthead-nav` | 38px items | burger + 44px items |
| Nav Sheet | `.masthead-sheet` | — | full screen <640; 390px panel ≥640 |
| Backdrop | `.masthead-sheet-backdrop` | — | ≥640: covers the rest of the screen; click closes the sheet |

## 3. Topbar

- **Left:** channel id — 3px `color/border/{channel}/base` left border + 4px padding (label 7px in; Figma Topbar - Channel Id 66:2166, strokes included in layout), label-xsm Bold `neutral/darker` — then *Last updated: …* (label-xsm Regular `neutral/dark`, **LG+ only**).
- **Right:** Mail+ Subscribe (channel pages only; never for Mail+ subscribers) · Edition · Login / Profile · Search. Each item 16px inset on both sides — Search too, so its label ends 16px before the row's end — with a 1px `color/border/translucent-dark/pale` keyline on its left.
- **Login item by user** (Figma Topbar - Login items 1651:55213): logged out — *Login*, person outline icon; logged in — *Profile*, filled person icon `color/icon/neutral/grey-dark`; Mail+ subscriber — *Profile*, filled person icon in Mail+ blue (`mplus-solid-blue`; Figma uses the Mail+ gradient), and no Subscribe.
- **Topbar Subscribe** (Figma "Topbar - Subscribe Button", `.masthead-topbar-subscribe`): Mail+ gradient pill (165°, `mplus-dark-blue` 4% → `mplus-solid-blue` 65%), 4px / 12px padding, 4px gap; Daily Mail+ wordmark 80×14 (2px top offset) + "Subscribe" label-sm Semibold white. Hover as the Branding Subscribe. Item: 14px icon + label-sm Semibold `neutral/darker`, 6px gap (Edition: flag 14 · label · chevron 12, 4px gap).
- **Hover:** `color/background/neutral/light` pill, 4px / 8px outside the content.
- **Edition menu:** a **Dropdown Menu** (`.dropdown-menu.masthead-edition-menu`, see `docs/4_Components__03_Dropdown-Menu.md`) under the Edition button, right-aligned, min 200px wide. Group Title *Select Edition*, then UK / US / AU / IE as link items (flag icon); the current edition is Selected via `aria-current="true"`. **Picking an edition** (prototype — the site would load that edition) updates every Edition button — Topbar, Sticky Navbar, Nav Sheet: flag and code ("UK Edition" → "US Edition", aria-label "Edition: US") — moves the Selected tick in every menu and closes the menu (`scripts/modules/masthead.js`). Only the position lives in `_masthead.scss` — the panel, items and states come from the component. Content taken from the current production markup (`pageEditionDropdown`).

## 4. Branding

- **Logo:** Daily Mail — 331×68 (LG+) · 267×55 (MD) · 127×26 white (Mweb). Hover: 72% opacity. The link hugs the logo.
- **Daily Mail+ landing** (`.masthead--mplus`): the Daily Mail+ logo instead — 387×68 (LG+) · 312×55 (MD) · 148×26 white (Mweb) (Figma Branding 2841:11459, M_ Branding Id 2902:28145) — and on Mweb the masthead background is the horizontal Mail+ gradient (`mplus-dark-blue` → `mplus-solid-blue`) instead of the channel colour. A Daily Mail+ article uses the general article template (Daily Mail logo, channel colour) — only the Sticky Navbar's right side differs.
- **Mail+ Subscribe — one place per page.** Home and Daily Mail+ home (`.masthead--landing`): the large Subscribe in the Branding slot, none in the Topbar. Every other channel page: the Topbar Subscribe, and the Branding slot stays empty. (Mweb keeps its Subscribe pill on every page.)
- **Slot (desktop):** right column, max 480px, content right-aligned. Landing pages: **Mail+ Subscribe** — 48px pill, Mail+ gradient (`miscellaneous/mailplus/mplus-dark-blue` → `mplus-solid-blue`), Daily Mail+ wordmark 114×20 + "Subscribe" label-xl Semibold white. Hover: `color/background/interaction-primary/hover`, as the primary (brand) button. Other branding elements can replace it.
- **Mweb:** Subscribe pill (34px, lightest, M+ icon + label-sm Semibold) and a round login (44px target, 34px circle with a `translucent-light/moderate` border).
- **Mweb login by user** (Figma M_ Branding - Login items, 2883:22873): logged out — Subscribe + person icon 14; logged in — Subscribe + initials (label-sm Semibold, lightest); Mail+ subscriber — no Subscribe, initials on the Mail+ gradient (118°, `mplus-dark-blue` 4% → `mplus-solid-blue` 65%; `.masthead-login-round--mplus`).

## 5. Navbar L1

| | Desktop | Mweb |
|---|---|---|
| Item | 38px; label-sm **Bold**, `neutral/dark` (current: `neutral/darker`); 8px side padding | 44px; label-sm Semibold, `neutral/lightest`; 10px side padding |
| Indicator | 4px bar in the item's channel colour, inset 8px. Current: shown. Hover: slides up — except items with a dropdown (LG+, mouse): hover darkens the label only, then the tab + panel open | 4px `neutral/lightest` pill, current only |
| Row | LG+: items spread across the container. MD: scrolls sideways with 8px between items, 16px fades at both ends (the row runs into the 16px inset) | burger 44×44 (icon 20) + scrolling row, right edge fades |
| Daily Mail+ | M+ lozenge 28×12 | wordmark 74×13, white |

- Each item carries its channel: `.masthead-nav__item--{section}` (indicator and dropdown tint). The current page: `aria-current="page"` on the link.
- **Dropdown (LG+, pointing device):** items with subchannels (`.masthead-nav__item--has-panel`) turn into a tab (`color/background/{channel}/subtlest`, 8px top corners) and open a panel — Elevation Lv-4, 24px padding, 8px corners, set 16px out past the tab (left edge; right edge for `--end` panels) so the panel text lines up with the tab label and the pointer has room to move. The panel holds the channel link (label-md Bold + arrow, `neutral/light` hover pill) and subchannels in two 160px columns (label-sm Regular; a 1px `border/neutral/grey-dark` line grows from the left on hover). Items near the right edge (Games, Travel, Buyline, Daily Mail+) use `.masthead-nav__panel--end`.
- **Hover intent:** the panel opens 150ms after the pointer rests on an item and closes 300ms after it leaves, so moving diagonally across other tabs towards a panel does not swap or drop it. The script adds `.masthead-nav--intent` and drives `.is-open`; without it the panel follows `:hover` immediately. Keyboard focus (`:focus-within`) and Escape work as usual.
- **L1 channels:** Home · News · Royals · US · Sport · Showbiz · Lifestyle · Money · Crime Desk · Games · Travel · Buyline · M+ — every channel except Crime Desk has subchannels (Daily Mail+: Puzzles). The demo lists them; links are placeholders (#).

## 6. Nav Sheet (Mweb)

- **Open / close:** the burger slides the sheet in from the left (translateX −100% → 0, 0.3s ease); close / backdrop click / Escape slides it back out. No motion with reduced motion. The sheet is planned for every viewport, not only Mweb.
- **Size** (Figma 328:29645 — Small <640 · Medium ≥640 · Large ≥1012): full screen below 640. From 640 up the sheet is 390px wide on the left and the rest is the **backdrop** (Figma "Close Area"): `color/effect/translucent-dark/moderate` plus an 8px background blur. It fades in and out with the sheet (0.3s). The ad slot in the Close Area is hidden in Figma and not built.
- **Row hover** (pointer devices, `.masthead-sheet__channel-row:hover` — the row only, not its open subchannel box): the row turns `color/background/neutral/lighter`; the expand button on it takes `color/effect/translucent-dark/pale`.
- **Bar:** close button 44×44, xmark-light 16.
- **Top:** Home (home colour icon 20 + label-md Semibold) + edition pill (a Button — `.btn.btn-tertiary-neutral.btn--xs`: `neutral/lighter`, flag 12, label-xxsm, chevron 12; hover and pressed from the component) … Login (secondary SM: 33px, `border/neutral/grey-light`, person 14 + label-sm).
- **Edition menu:** the pill opens the same Edition menu as the Topbar (Dropdown Menu, *Select Edition* · UK / US / AU / IE) — `.masthead-sheet__edition-wrap` holds the pill and `.dropdown-menu.masthead-edition-menu.masthead-sheet__edition-menu`, under the pill and **left-aligned** with it (the pill sits on the left, so a right-aligned menu would run off the sheet). While it is open (`aria-expanded="true"`) the pill shows the Button's Pressed state (`neutral/light` + the inset shadow) and the chevron turns up (0.15s, none with reduced motion). Outside click closes it; Escape closes the menu first, the sheet on the next press.
- **Search:** 40px pill — `neutral/lighter`, `border/neutral/grey-light`, magnifier 16, placeholder text-md at 40%.
- **Playlists:** Live · Today's Pick · Podcasts · Deep-Dive — 56px icon box (`neutral/lighter`, `border/neutral/light`, 8px corners) + label-xsm Semibold. Live: 28px `icon/showbiz-red/base` ring around a pulsing dot.
- **Channels:** same order as the desktop L1 — Home · **Daily Mail+** (right under Home) · News · Royals · US · Sport · Showbiz · Lifestyle · Money · Crime Desk · Games · Travel · Buyline — then **Comment last**. Rows of 50px with a light keyline: mono channel icon 20 + label-md Semibold; a 40px expand button (chevron 16) where there are subchannels (none for Crime Desk, Comment).
- **Daily Mail+ row:** the full Daily Mail+ wordmark (114×20, `assets/images/logo-dailymail-plus.svg`), a plain link — no icon, no submenu (Figma 8272:10172).
- **Accordion:** one channel open at a time. Opening animates lightly (0.25–0.3s ease): the panel slides open (grid rows 0fr → 1fr), the label turns Bold in the channel colour, the mono icon crossfades to the colour icon, the expand button fills in and the chevron turns. No motion with reduced motion.
- **Open row** (Figma 332:8791): label-md Bold in the channel colour (`.masthead-sheet__channel--{section}` → `text/{channel}/base`), the colour channel icon, the expand button becomes a `neutral/lighter` circle with the chevron up. Subchannels sit in a `neutral/lighter` box (12px corners, 12px padding): *{Channel} Home* on its own line, then two columns 8px apart; item label-sm Semibold `neutral/dark`, 8px vertical padding. Subchannel hover is the dropdown's: a 1px `color/border/neutral/grey-dark` line grows from the left, 4px under the label (the link hugs its label); also on keyboard focus.
- The page under the open sheet does not scroll (`html.masthead-sheet-open`).

## 7. Hover and input

- **Hover is tied to the input, not the width.** Every hover style (L1 bar, Topbar pills, logo, Subscribe, panel links, sheet expand) sits inside `@media (hover: hover)` — mouse and trackpad get it at any width; touch screens never do, so a tapped item can't stay "hovered".
- Keyboard focus (`:focus-visible`) shows the same states everywhere.
- The dropdown panels stay LG+ only: below 1024 the channel row scrolls and would clip them.

## 8. On scroll — Sticky Navbar (MD+) and Mweb sticky masthead

Figma: Sticky Navbar (2844:3780) · parts (2858:9061) · right side (2891:31679) · login states (2841:15824) · Mweb (2917:31019). Code: `_masthead-sticky.scss`, Mweb part in `_masthead.scss`.

### 8-A. Sticky Navbar (MD+)

- **When:** hidden at first; once the whole masthead has scrolled above the screen it slides down from the top (translateY −100% → 0, 0.3s), and slides back up when the masthead returns. No motion with reduced motion.
- **Bar:** fixed, full width, 48px, Elevation Lv-1 (0 1 4 `translucent-dark/pale`). Background `color/background/{channel}/base`; **Daily Mail+ pages: horizontal Mail+ gradient** (`mplus-dark-blue` → `mplus-solid-blue`, `.masthead-sticky--mplus`).
- **Left (256px, or less):** Daily Mail logo 107×22, white, 20px from the edge (12 + 8). When the channels don't fit beside two 256px columns, the left column shrinks first — down to the logo's width (hug) — before the centre starts to scroll. The right column stays 256px. Daily Mail+ pages: Daily Mail+ logo 125×22. Hover: `translucent-light/pale` pill.
- **Center (the rest):** L1 channels — label-sm Semibold `neutral/lightest`, 38px tall, 10px side padding, 1px apart, 20px row padding; 4px white indicator at the bottom (current: 100%, hover: 40%); Daily Mail+ item: M+ lozenge 28×12. **Centred while they fit; when they don't, left-aligned and scrollable** with 32px chevron edges (fading from the bar colour) on the side(s) that can scroll; a click scrolls ~80%. Only L1 for now — L2 / topic / headline content later.
- **Right (256px):** 34px buttons, right-aligned; the page renders only those it needs.

| Page | Buttons | Spacing |
|---|---|---|
| Channel page (default) | Subscribe · Edition · Login | 12px apart, 14px from the edge |
| Article | Share · *999 comments* | 8px apart, 16px from the edge |
| Daily Mail+ article, reader not subscribed | Subscribe · *999* (comment count) — comments stay open, Subscribe invites them to join | 8px apart, 16px from the edge |

- **Buttons:** Subscribe / Comments — `neutral/lightest` pill, `neutral/darker` label-sm Semibold, 14px icon, 5px gap (Subscribe: M+ mark, 10px gap, 16px left padding); hover `neutral/light`. Share — 1px `translucent-light/moderate` outline, lightest label and icon; hover `translucent-light/pale`.
- **Edition / Login (circles, 34px, 1px `translucent-light/moderate`):** Edition — flag 18 + chevron 8, 4px gap, 8px padding; it opens the same Edition menu as the Topbar, under it on the right. Login by user: logged out — person icon 14; logged in — initials (label-xxsm Semibold); Mail+ subscriber — initials on the Mail+ gradient (hover `home-blue/deep`). Others hover `translucent-light/pale`. Mail+ subscribers get no Subscribe button.

### 8-B. Mweb (<768) — sticky masthead

- The masthead sticks with only its nav row (burger + channels) in view: its top sits `--masthead-collapse` (the height above the nav row, set by the script) above the screen, so the logo block scrolls away and the nav row stays.
- **Scrolling up** (past the logo block) adds `.is-revealed` — `top: 0`, the logo block slides back down (0.3s). **Scrolling down** removes it again. At the very top it is simply in place.
- The nav row is the existing Mweb L1 row. The other Mweb row contents in Figma (L2 tabs, topic header, article share / comments) come later.

### 8-C. Demo

- One toolbar drives everything (masthead, Sticky Navbar preview, Nav Sheet): **Location** (Home · Channel landing · Daily Mail+ landing · Article (General) · Article (Daily Mail+)) and **User type** (Non-logged-in user · Logged-in user · M+ subscriber). **Channel** appears beside Location for Channel landing and both article locations; Home and Daily Mail+ landing set their own channel.
- **Sticky Navbar preview** under the masthead: the bar in place at the chosen viewport. Right side — Home / Channel landing / Daily Mail+ landing: Subscribe · Edition · Login; Article (General), or Article (Daily Mail+) for an M+ subscriber: Share · Comments; Article (Daily Mail+) for anyone else: Subscribe · comment count. The Daily Mail+ landing uses the Mail+ bar and logo; Article (Daily Mail+) looks like Article (General) apart from the right side.
- The demo page itself never slides the Sticky Navbar in at the top of the browser (Live); the viewport previews of the masthead still do when you scroll inside them. SM-XS has no Sticky Navbar.

## 9. Behaviour (script)

Under the masthead the demo page shows the Nav Sheet open in a frame at the chosen viewport — Live uses the browser window's size (`index.html?frame&sheet`: open from the start, accordion works, close does nothing). The demo page holds the reference script: burger opens / closes the sheet (Escape closes), Edition (Topbar, Sticky Navbar, Nav Sheet) toggles its menu (outside click / Escape closes), sheet expand buttons show / hide subchannels, and the current channel is scrolled into view when the row scrolls.

## 10. Static states

For the Anatomy page (like the Button's helpers): `.is-hover` on Topbar actions, Subscribe, L1 links, panel links and the sheet's expand button; `.is-open` on an L1 item shows its tab and panel (MD+).

## 11. Navbar L2

Figma: Navbar - L2 (2841:11409 — MD+ variants: Type L2 - SubChannel / Topic Package × Carousel No / Yes - Start / Yes - Finish) · M_ Navbar - L2 (2891:27468) · SubChannel Tabs Item (2841:10240, Mweb 2891:27385). Code: `_navbar-l2.scss`, edges `scripts/modules/scroll-row.js`.

### 11-A. Placement

- **Part of the page, not the masthead:** the **first child of `<main>`**, under the masthead. **Full width, as the masthead**; its content sits in the same container (`.navbar-l2__inner` — the masthead's `container` mixin: full width below MD, then 960 · 996 · 1224 with a 16px inset). So `<main>` holds the bar first and the page container after it. It changes with the page (subchannels, a topic package, or nothing) and has no sticky state, so it stays out of `header.masthead` and `masthead.js`.
- **Optional:** a page without L2 leaves it out of the HTML.
- Its channel is set on the bar itself (`.navbar-l2--{section}`), the same section as the page's `.masthead--{section}`.
- The Sticky Navbar may later show L2 in its centre (§ 12) — that would be a Sticky Navbar variant sharing the links, not this element.

### 11-B. Structure

```html
<main>
  <nav class="navbar-l2 navbar-l2--sport" aria-label="Sport">
    <div class="navbar-l2__inner">
      <ul class="navbar-l2__list">
        <li><a class="navbar-l2__link" href="…">Football</a></li>
        <li><a class="navbar-l2__link" href="…" aria-current="page">Golf</a></li>
        …
      </ul>
      <button type="button" class="navbar-l2__edge navbar-l2__edge--prev" aria-label="Scroll subchannels left" hidden><span class="icon icon--chevron-left" aria-hidden="true"></span></button>
      <button type="button" class="navbar-l2__edge navbar-l2__edge--next" aria-label="Scroll subchannels right" hidden><span class="icon icon--chevron-right" aria-hidden="true"></span></button>
    </div>
  </nav>
  <div class="container">…</div>
</main>
```

**Topic package:** the first `li` is the head — the topic and its live coverage; topics follow.

```html
<li class="navbar-l2__head">
  <a class="navbar-l2__topic" href="…">Budget 2026<span class="icon icon--chevron-right" aria-hidden="true"></span></a>
  <a class="navbar-l2__live" href="…"><span class="badge__live" aria-hidden="true"></span>Live</a>
</li>
```

The Live link is optional (only while there is live coverage).

### 11-C. Look

| | MD+ (≥768) | Mweb (<768) |
|---|---|---|
| Box | full width (`neutral/lightest`); content in the page container, 16px inset; 12px above the row, 12px row → bar, 8px under the bar (60px) | full width; 48px row |
| Bar | 3px `color/background/{channel}/base`, inside the 16px inset | 4px, full width |
| Row | centred while it fits, 12px padding; overflows → left-aligned, scrolls | from the left, 16px in, 32px fade on the right (swipe) |
| Overflow | mouse: chevron edges (Scroll Row `edge`, 14px chevron, fading from the surface) on the side(s) that can scroll, a click pages ~80%; touch: the fade | the fade |

- **Item** (SubChannel Tabs Item): label-sm Regular `text/neutral/darker`, 4px vertical padding — the same link as the L1 dropdown's subchannels (`masthead.subchannel-link` mixin). **Hover:** a 1px `border/neutral/grey-dark` line grows from the left (also on keyboard focus; mouse only). **Current** (`aria-current="page"`): Semibold, `text/{channel}/base`.
- **Divider:** 1px × 15px `border/neutral/light` between items, 10px either side. (One divider in the Figma frames uses `background/neutral/grey-light` — a stray; all use the border token.)
- **Topic head:** topic — label-sm Semibold + chevron 12, 8px gap; Live — the Editorial Badge live ring (`.badge__live`, 8px dot) in `icon/semantic-error/base` + "Live" label-sm Semibold, 4px gap. No divider between the topic and Live; one after Live. Hover as the items.
- Background `color/background/neutral/lightest`. No Elevation (Level 0 — scrolls with the page).

### 11-D. Demo

- **Index:** **Live** — the module itself (HTML, no frame) in its own **Navbar L2** section between the masthead and the Sticky Navbar. **A viewport chosen** — the section goes and the bar shows in the masthead preview frame, as the first item of the page's first `.layout-full`. The one toolbar drives the masthead and L2 together (Viewport, Location, Channel, User type); **L2** switches Subchannels / Topic package. The subchannels come from the current channel's L1 panel (Crime Desk: none — a note instead). Clicking an item makes it current.
- **Anatomy:** 4. Navbar L2 (subchannels that fit / overflow, topic package, item states) and 7. Mweb Navbar L2.

## 12. Not yet

- Sticky Navbar centre content other than L1 (L2 subchannels, topic package, article headline) and the Mweb row variants.
