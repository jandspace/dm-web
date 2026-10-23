// ── Experiments home button — SCAFFOLDING ONLY ────────────────────────────────
// Every page in experiments/ loads this:
//   <script src="../../scripts/scaffolding/experiments-home.js" defer></script>
// It adds a round button bottom-left (ico-bulb-on); on hover it widens to show
// "Experiments"; it links to the experiments index (experiments/).
//
// Self-contained: some experiment pages don't load main.css, so the script
// brings the colour tokens and its own few rules (all prefixed .exp-home).
// Skipped inside iframes (fixed-viewport previews render the page in a frame).

(() => {
  if (window.self !== window.top) return;

  const script = document.currentScript;
  const root = new URL('../../', script.src); // scripts/scaffolding/ → repo root

  if (![...document.styleSheets].some((s) => s.href && s.href.includes('/tokens/dm_tokens.css'))) {
    const tokens = document.createElement('link');
    tokens.rel = 'stylesheet';
    tokens.href = new URL('tokens/dm_tokens.css', root).href;
    document.head.append(tokens);
  }

  const style = document.createElement('style');
  style.textContent = `
    .exp-home {
      position: fixed;
      bottom: 16px;
      left: 16px;
      z-index: 2000;
      display: flex;
      align-items: center;
      gap: 0;
      box-sizing: border-box;
      height: 40px;
      padding: 0 11px;
      border: 1px solid var(--color-border-neutral-light);
      border-radius: 999px;
      background-color: var(--color-background-neutral-lightest);
      box-shadow: 0 4px 20px var(--color-effect-translucent-dark-subtle);
      font: 600 14px/1.2 Inter, system-ui, sans-serif;
      color: var(--color-text-neutral-darker);
      text-decoration: none;
      transition: gap 0.2s, padding 0.2s;
    }
    .exp-home img { display: block; width: 16px; height: 16px; flex-shrink: 0; }
    .exp-home span {
      max-width: 0;
      overflow: hidden;
      white-space: nowrap;
      opacity: 0;
      transition: max-width 0.2s, opacity 0.2s;
    }
    .exp-home:hover, .exp-home:focus-visible { gap: 8px; padding-right: 16px; }
    .exp-home:hover span, .exp-home:focus-visible span { max-width: 120px; opacity: 1; }
    .exp-home:focus-visible { outline: 2px solid var(--color-border-home-blue-base); outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) { .exp-home, .exp-home span { transition: none; } }
  `;
  document.head.append(style);

  const link = document.createElement('a');
  link.className = 'exp-home';
  link.href = new URL('experiments/', root).href;
  link.setAttribute('aria-label', 'Experiments');
  link.innerHTML = `<img src="${new URL('assets/icons/ico-bulb-on.svg', root).href}" alt="" /><span>Experiments</span>`;
  document.body.append(link);
})();
