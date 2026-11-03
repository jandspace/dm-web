// ── Home button — SCAFFOLDING ONLY ────────────────────────────────────────────
// Every page in experiments/ and projects/ loads this, naming its section:
//   <script src="../../scripts/scaffolding/home-button.js" data-home="experiments" defer></script>
//   <script src="../../scripts/scaffolding/home-button.js" data-home="projects" defer></script>
// It adds a round button bottom-left (Experiments: ico-bulb-on · Projects:
// ico-page-edit); on hover it widens to show the section name; it links to
// that section's index (experiments/ · projects/).
// The copyright footer is a separate script: scripts/scaffolding/page-footer.js.
//
// Self-contained: some experiment pages don't load main.css, so the script
// brings the colour tokens and its own few rules (all prefixed .home-btn).
// Skipped inside iframes (fixed-viewport previews render the page in a frame).

(() => {
  if (window.self !== window.top) return;

  const script = document.currentScript;
  const root = new URL('../../', script.src); // scripts/scaffolding/ → repo root
  const SECTIONS = {
    experiments: { label: 'Experiments', icon: 'ico-bulb-on' },
    projects: { label: 'Projects', icon: 'ico-page-edit' },
  };
  const section = script.dataset.home in SECTIONS ? script.dataset.home : 'experiments';
  const { label, icon } = SECTIONS[section];

  if (![...document.styleSheets].some((s) => s.href && s.href.includes('/tokens/dm_tokens.css'))) {
    const tokens = document.createElement('link');
    tokens.rel = 'stylesheet';
    tokens.href = new URL('tokens/dm_tokens.css', root).href;
    document.head.append(tokens);
  }

  const style = document.createElement('style');
  style.textContent = `
    .home-btn {
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
    .home-btn img { display: block; width: 16px; height: 16px; flex-shrink: 0; }
    .home-btn span {
      max-width: 0;
      overflow: hidden;
      white-space: nowrap;
      opacity: 0;
      transition: max-width 0.2s, opacity 0.2s;
    }
    .home-btn:hover, .home-btn:focus-visible { gap: 8px; padding-right: 16px; }
    .home-btn:hover span, .home-btn:focus-visible span { max-width: 120px; opacity: 1; }
    .home-btn:focus-visible { outline: 2px solid var(--color-border-home-blue-base); outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) { .home-btn, .home-btn span { transition: none; } }
  `;
  document.head.append(style);

  const link = document.createElement('a');
  link.className = 'home-btn';
  link.href = new URL(`${section}/`, root).href;
  link.setAttribute('aria-label', label);
  link.innerHTML = `<img src="${new URL(`assets/icons/${icon}.svg`, root).href}" alt="" /><span>${label}</span>`;
  document.body.append(link);
})();
