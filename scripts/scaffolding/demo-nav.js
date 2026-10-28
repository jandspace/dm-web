// ── Demo side panel + index — SCAFFOLDING ONLY ────────────────────────────────
// Left panel listing every demo page, grouped like the Figma UI Kit
// (Foundation › Components › Modules). Never ships to production.
//
// Load on every demo page (path is relative to the page):
//   <script src="../../scripts/scaffolding/demo-nav.js" defer></script>
// The root index.html loads it too and gets the same list as cards (#demo-index).
//
// Layout (styles: styles/scss/scaffolding/_demo-nav.scss):
//   ≥1640px  panel pinned open, the page is pushed right
//   <1640px  collapsed rail; hover / focus opens the panel over the page
//
// Not shown inside frames (viewport previews load pages in iframes).
//
// Add a page: one entry in NAV below — `path` is relative to the repo root;
// `pages` are sub-pages in the same folder.

(() => {
  const NAV = [
    {
      group: 'Foundation',
      items: [
        { name: 'Colour', path: 'foundation/colour/' },
        { name: 'Typography', path: 'foundation/typography/' },
        { name: 'Layout & Grid', path: 'foundation/layout/' },
        { name: 'Spacing', path: 'foundation/spacing/' },
        { name: 'Border Radius', path: 'foundation/border-radius/' },
        { name: 'Elevation', path: 'foundation/elevation/' },
        { name: 'Iconography', path: 'foundation/iconography/' },
      ],
    },
    {
      group: 'Components',
      items: [
        { name: 'Button', path: 'components/button/', pages: [['Generator', 'button-gen.html']] },
        { name: 'Divider (Keyline)', path: 'components/divider/' },
        { name: 'Dropdown Menu', path: 'components/dropdown-menu/' },
        { name: 'Media', path: 'components/media/' },
      ],
    },
    {
      group: 'Modules',
      items: [
        { name: 'Article Card', path: 'modules/article-card/', pages: [['Viewports', 'viewports.html']] },
        { name: 'Article Card — Banner Story', path: 'modules/article-card-banner/', pages: [['Viewports', 'viewports.html']] },
        { name: 'Article Card Metadata', path: 'modules/article-card-metadata/' },
        { name: 'Article Editorial Badge', path: 'modules/editorial-badge/' },
        { name: 'Article Headline', path: 'modules/article-headline/' },
        { name: 'Navigation', path: 'modules/navigation/', pages: [['Anatomy', 'anatomy.html']] },
        { name: 'Section Header', path: 'modules/section-header/' },
        { name: 'Video Player Controls', path: 'modules/video-player-controls/' },
      ],
    },
  ];

  if (window.self !== window.top) return; // inside a viewport preview frame

  const script = document.currentScript;
  const root = new URL('../../', script.src); // scripts/scaffolding/ → repo root

  const clean = (url) => url.pathname.replace(/index\.html$/, '');
  const here = clean(new URL(location.href));

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => (k === 'text' ? (node.textContent = v) : node.setAttribute(k, v)));
    node.append(...children);
    return node;
  };

  const link = (label, href, className) => {
    const url = new URL(href, root);
    const a = el('a', { href: url.href, class: className, text: label });
    if (clean(url) === here) a.setAttribute('aria-current', 'page');
    return a;
  };

  // Daily Mail logo (Figma Symbol - DailyMail 60:2081) + strapline — links to the index
  const logo = () => {
    const a = link('', '', 'demo-nav__logo');
    a.append(
      el('img', { src: new URL('assets/images/logo-dailymail.svg', root).href, alt: 'Daily Mail', width: '140', height: '29' }),
      el('span', { class: 'demo-nav__strapline', text: 'Design Library for Web (v2)' }),
    );
    return a;
  };

  // ── Side panel ──
  const buildNav = () => {
    const list = el('div', { class: 'demo-nav__groups' });
    NAV.forEach(({ group, items }) => {
      const ul = el('ul', { class: 'demo-nav__list' });
      items.forEach(({ name, path, pages = [] }) => {
        const li = el('li', { class: 'demo-nav__item' }, [link(name, path, 'demo-nav__link')]);
        if (pages.length) {
          li.append(
            el(
              'ul',
              { class: 'demo-nav__sublist' },
              pages.map(([label, file]) => el('li', {}, [link(label, path + file, 'demo-nav__link demo-nav__link--sub')])),
            ),
          );
        }
        ul.append(li);
      });
      list.append(el('p', { class: 'demo-nav__group', text: group }), ul);
    });

    const nav = el('nav', { class: 'demo-nav', 'aria-label': 'DM Web UI Kit' }, [
      el('button', { class: 'demo-nav__toggle', type: 'button', 'aria-label': 'Show demo list' }, [
        el('span', { 'aria-hidden': 'true', text: '+' }),
      ]),
      el('div', { class: 'demo-nav__panel' }, [logo(), list]),
    ]);

    // Click on the rail button pins the panel open until it is clicked again
    nav.querySelector('.demo-nav__toggle').addEventListener('click', () => {
      nav.classList.toggle('demo-nav--open');
    });

    document.body.prepend(nav);
    document.body.classList.add('demo-has-nav');
  };

  // ── Root index (index.html at the repo root) ──
  const buildIndex = (target) => {
    NAV.forEach(({ group, items }) => {
      const grid = el('div', { class: 'demo-index__grid' });
      items.forEach(({ name, path, pages = [] }) => {
        grid.append(
          el('div', { class: 'demo-index__card' }, [
            link(name, path, 'demo-index__name'),
            el('span', { class: 'demo-index__path', text: path }),
            ...pages.map(([label, file]) => link(label, path + file, 'demo-index__sub')),
          ]),
        );
      });
      target.append(el('h2', { class: 'demo-index__group', text: group }), grid);
    });
  };

  const start = () => {
    buildNav();
    const index = document.getElementById('demo-index');
    if (index) buildIndex(index);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
