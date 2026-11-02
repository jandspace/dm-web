# Advertisement

Ad slots — the space the page keeps for an ad, and its "Advertisement" label. The ad itself (an ad-server iframe) is the slot's only child; the slot reserves the ad's size so the page does not jump when it loads.

Figma: Web UI Kit › Advertisement (76:3047) · placeholder creatives: Ad Placeholder (5100:12848).
Code: `styles/scss/modules/_advertisement.scss` · demo `modules/advertisement/`.

---

## 1. Slots

Sizes are the IAB standard units.

| Slot | Size (IAB name) | Where | Breakpoint |
|---|---|---|---|
| **Billboard** | 970×250 (Billboard) | Top of the page, before the masthead — a band across the window | LG ≥1024 |
| **Billboard — MD** | 728×90 (Leaderboard), or fluid up to 650×250 (`.ad-slot--tall`) | Same band | MD 768–1023 |
| **Side Ads** | 160×600 (Wide Skyscraper) | Beside the container, 8px off, sticky | ≥1350 (`bp.side-ads`) |
| **MPU** | 300×250 (Medium Rectangle) | Beta (332 at LG = 300 + 16 each side); on mobile in the page, between content blocks | All (Beta stacks below LG) |
| **MPU · sticky** | 300×250 in a 300×600 space | Beta | All |
| **DMPU** | 300×600 (Half Page) | Beta | All |
| **Mobile** | 320×50 (Mobile Leaderboard) up to 320×100 (Large Mobile Banner) | A bar fixed to the bottom — the only mobile-size slot; in the page mobile shows MPUs | SM-XS <768 |

No billboard below MD; no bottom bar from MD.

## 2. Structure

```html
<!-- Billboard — before the masthead, outside the container -->
<div class="ad-billboard">
  <aside class="ad-slot" aria-label="Advertisement"><iframe …></iframe></aside>
</div>

<!-- Side Ads — the page's container carries .ad-skin, the rails sit in it -->
<div class="container ad-skin">
  <div class="ad-rail ad-rail--left"><aside class="ad-slot ad-slot--side" aria-label="Advertisement"><iframe …></iframe></aside></div>
  <div class="ad-rail ad-rail--right"><aside class="ad-slot ad-slot--side" aria-label="Advertisement"><iframe …></iframe></aside></div>
  … masthead, page …
  <div class="layout-beta">
    <aside class="ad-slot ad-slot--mpu" aria-label="Advertisement"><iframe …></iframe></aside>
    <aside class="ad-slot ad-slot--mpu ad-slot--sticky" aria-label="Advertisement"><iframe …></iframe></aside>
    <aside class="ad-slot ad-slot--mpu ad-slot--dmpu" aria-label="Advertisement"><iframe …></iframe></aside>
  </div>
</div>

<!-- Mobile: the bottom bar -->
<div class="ad-sticky-bottom"><aside class="ad-slot ad-slot--mobile" aria-label="Advertisement"><iframe …></iframe></aside></div>
```

| Part | Notes |
|---|---|
| `.ad-slot` | Label + creative, centred column, 4px gap. The creative box is `--ad-width` × `--ad-height` (each slot type sets them; a 320×100 mobile ad sets `--ad-height: 100px`) on `background/neutral/lighter` until the ad fills it |
| Label | "Advertisement" drawn by `::before` — label-xxsm (12) regular, `text/neutral/grey-dark`. Its alt text is empty, so screen readers read the slot's `aria-label` once. Above the ad; Side Ads: below, 8px gap; none in the bottom bar |
| `.ad-billboard` | `background/neutral/lighter` band (Figma: light — changed to lighter), full window width; 8 top · 16 sides · 16 bottom. Label at the ad's left |
| `.ad-skin` · `.ad-rail` | Each rail runs the container's height, 8px outside it. The slot sticks at `--ad-sticky-top` (default 16; a page with the sticky masthead sets 48 + 16) and stops at the end of the container |
| `.ad-slot--mpu` | 16px padding; card keyline below unless last child |
| `.ad-slot--sticky` | Keeps a 300×600 space; the 300×250 ad sticks at `--ad-sticky-top` within it |
| `.ad-sticky-bottom` | Fixed to the bottom: `effect/translucent-light/moderate` + 16px blur, 1px `border/translucent-dark/pale` on top, 4 × 16 padding. The page keeps room for it at its end |

## 3. Side Ads and the container

Side Ads should show on every desktop. 160 + 8 each side = 336px beyond the container:

| Container | Layout width needed | + 17px Windows scrollbar |
|---|---|---|
| 996 (LG) | 1332 | **1350** → `bp.side-ads` |
| 1224 (XL) | 1560 | **1580** → XL starts here |

So XL moved from 1376 to **1580** (November 2026): 1366, 1440 and 1536 laptops keep the 996 container and show Side Ads. From 1024 to 1349 there is no room for 160×600 (e.g. 1280 laptops) — a 120×600 Skyscraper would fit from 1252 (open point).

## 4. Placeholder creative (demo)

The demo ads are images exported from Figma Ad Placeholder (5100:12848), one per size: `assets/images/ad-placeholder-{970x250 · 728x90 · 300x250 · 300x600 · 160x600 · 320x50}.jpg`. No placeholder is drawn in code.

## 5. Notes / open points

- **Label type:** Figma draws the Billboard and Side Ads labels in Arial 10 and the MPU label in Inter label-xxsm (12). Code uses label-xxsm for every slot.
- **Billboard top padding:** Figma Desktop has 61px above the label (the frame also carries a sticky wrapper); Tablet has 8. Code uses 8 at both and lets the billboard scroll with the page.
- **Side Ads start:** they start at the top of the container. On the live site they line up a little lower (with the masthead below the top bar) — set by the page if needed.
- **AdChoices chip** (top right in Figma) belongs to the ad creative, not the slot.
- **Bottom bar label:** Figma has an empty 320×18 "Advertisement" tab on top of the bar; left out until it has content.
- **1280 laptops:** no Side Ads between 1024 and 1349 — see § 3.
