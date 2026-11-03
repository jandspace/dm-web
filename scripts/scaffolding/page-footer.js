// ── Page footer — SCAFFOLDING ONLY ────────────────────────────────────────────
// Copyright / contact line for experiment and project pages. The library pages
// and the two landing pages use the library footer instead (.demo-footer —
// scripts/scaffolding/demo-nav.js; static in experiments/ and projects/index.html):
//   <script src="../../scripts/scaffolding/page-footer.js" defer></script>
//
// Reveal footer: the line is fixed to the bottom of the window, behind the
// page. The page (body) is a raised layer — lightest surface + a shadow — with
// room below it, so the footer shows as an underlay once the page has been
// scrolled to the end.
//
// How the layering works: the footer has z-index -1, so it paints under the
// body's own background; html carries the footer colour (the body background
// then stays on the body instead of filling the window).
//
// Self-contained like home-button.js: brings the colour tokens if the page has
// none and its own few rules (all prefixed .page-footer). Skipped inside iframes.

(() => {
  if (window.self !== window.top) return;

  const root = new URL('../../', document.currentScript.src); // scripts/scaffolding/ → repo root

  if (![...document.styleSheets].some((s) => s.href && s.href.includes('/tokens/dm_tokens.css'))) {
    const tokens = document.createElement('link');
    tokens.rel = 'stylesheet';
    tokens.href = new URL('tokens/dm_tokens.css', root).href;
    document.head.append(tokens);
  }

  const style = document.createElement('style');
  style.textContent = `
    html { background-color: var(--color-background-neutral-light); }
    body {
      margin-bottom: 56px;
      background-color: var(--color-background-neutral-lightest);
      box-shadow: 0 4px 20px var(--color-effect-translucent-dark-subtle);
    }
    .page-footer {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 56px;
      padding: 0 16px;
      font: 400 12px/1.2 Inter, system-ui, sans-serif;
      color: var(--color-text-neutral-grey-dark);
    }
    .page-footer a { color: inherit; }
  `;
  document.head.append(style);

  const footer = document.createElement('footer');
  footer.className = 'page-footer';
  footer.innerHTML = `© ${new Date().getFullYear()} Joungmin Shin · Contact: <a href="mailto:joungmin.shin@dmgmedia.co.uk">joungmin.shin@dmgmedia.co.uk</a>`;
  document.body.append(footer);
})();
