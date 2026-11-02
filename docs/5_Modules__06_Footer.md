# Footer

The page footer: logo, social links, Back to top, five link menus and the copyright line.

Figma: Web UI Kit › Footer (117:12220) — Breakpoint LG ≥1024 · MD ≥768 · SM-XS <768.
Code: `styles/scss/modules/_footer.scss` · demo `modules/footer/`.

---

## 1. Placement

The footer sits **inside `.container`**, after the last content section — it ends with the container (996 at LG, 1224 at XL), never full-bleed across the window. It carries its own 16px inset and 32px top / bottom padding, like every block in the layout.

## 2. Structure

```html
<footer class="footer">
  <div class="footer__top">
    <a class="footer__logo" href="/" aria-label="Daily Mail home"></a>
    <div class="footer__social">
      <p class="footer__follow">Follow us on:</p>
      <a class="btn btn-secondary-neutral btn--icon-only" href="…" aria-label="Facebook"><span class="icon icon--sn-facebook" aria-hidden="true"></span></a>
      …
    </div>
    <a class="btn btn-quaternary-neutral btn--sm" href="#top">Back to top<span class="icon icon--chevron-up" aria-hidden="true"></span></a>
  </div>

  <div class="footer__menus">
    <details class="footer__menu">
      <summary class="footer__heading">Company<span class="icon icon--chevron-down" aria-hidden="true"></span></summary>
      <ul class="footer__links">
        <li><a href="…">DMG Media</a></li>
        …
      </ul>
    </details>
    …
  </div>

  <p class="footer__copyright">© 2025 Associated Newspapers Limited</p>
</footer>
```

| Part | Class | Notes |
|---|---|---|
| Top row | `.footer__top` | 2px `border/neutral/grey-dark` rule on top, keyline (Divider, end to end) below. 20px top padding |
| Logo | `.footer__logo` | `assets/images/logo-dailymail.svg` as a mask in `icon/neutral/black`, so it turns white in dark mode. 160 × 33 · 195 × 40 from MD |
| Social | `.footer__social` | Button secondary-neutral, icon only (40, round) with a `border/neutral/light` border and an 18px icon (Figma Footer Social Link). "Follow us on:" label-sm semibold, MD+ only |
| Back to top | `.btn.btn-quaternary-neutral.btn--sm` | Label + `chevron-up`. `href="#top"` scrolls to the top without script |
| Menus | `.footer__menus` › `details.footer__menu` | Heading h6 bold, compact line height, wide letter spacing. Links label-xsm regular `text/neutral/grey-dark`, 24px rows, 8px apart (as on the live site). Hover: 60% opacity, no underline, `opacity 0.3s ease-in-out` (none with reduced motion) |
| Copyright | `.footer__copyright` | text-xsm semibold, `text/neutral/darker`, 16px top / bottom padding |

## 3. Breakpoints

| | LG ≥1024 | MD ≥768 | SM-XS <768 |
|---|---|---|---|
| Top row | Logo … Follow us on: · social · Back to top | same | Logo … Back to top; social links on a line of their own, no label |
| Menus | Five columns — `1fr 1fr 224px 224px 1fr`, 12px gap. Always open, no chevron | Accordion, 4px between headings | Accordion, no gap |

## 4. Accordion (below LG)

- Native `<details>` / `<summary>` — no script. Each menu opens on its own; all start closed.
- The heading is 40px high: the `chevron-down` (14px) sits in a 40px box on the right and turns 180° when open (no turn with reduced motion).
- **From LG** the same markup is a column: `::details-content { content-visibility: visible }` shows the list whether or not the menu is open, the chevron is hidden and the heading takes no clicks.

## 5. Notes / open points

- **Back to top height:** Figma draws it 38px high; the Button component's Small is 34px. Code uses Button Small — the row height comes from the 40px social links, so the footer is the same height.
- **Text colours:** Figma fills the heading, link and copyright text with background tokens (`background/neutral/darker`, `background/neutral/grey-dark`); code uses the matching text tokens (`text/neutral/darker`, `text/neutral/grey-dark`).
- **Copy:** Figma "How To Comlain" is corrected to "How to Complain".
- **Open menu:** Figma shows the MD / SM-XS menus closed only. The open list follows the LG list (same type and spacing) with 8px below it.
- **Heading at LG:** the `<summary>` stays in the tab order at LG (it cannot be taken out without script); pressing it changes nothing on screen.
