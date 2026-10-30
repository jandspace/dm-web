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
// Also adds, on every page:
//   · Theme menu (top right) — Light (default) / Dark: <html data-theme="dark">,
//     kept per browser in localStorage. Frames follow it too (applied before
//     the frame check; the storage event updates open frames).
//   · Footer — copyright and contact line at the bottom of the page.
// Styles: styles/scss/scaffolding/_demo-theme.scss
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
        { name: 'Loading', path: 'components/loading/' },
        { name: 'Media', path: 'components/media/' },
        { name: 'Modal', path: 'components/modal/' },
        { name: 'Pagination', path: 'components/pagination/' },
        { name: 'Tabs', path: 'components/tabs/' },
        { name: 'Toast', path: 'components/toast/' },
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

  // ── Theme (also inside frames) ──
  const THEME_KEY = 'dm-demo-theme';
  const readTheme = () => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  };
  const applyTheme = (theme) => {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  };
  applyTheme(readTheme());
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_KEY) applyTheme(e.newValue);
  });

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

  // ── Theme menu: glyph button → Dropdown Menu (Light / Dark), opens on hover ──
  // Sun / moon glyphs for this menu only (not in the icon library)
  const GLYPHS = {
    light: ['0 0 512 512', 'M275.7 19.7C275.7 8.8 266.9 0 256 0s-19.7 8.8-19.7 19.7v52.5c0 10.9 8.8 19.7 19.7 19.7s19.7-8.8 19.7-19.7zM102.8 75c-7.7-7.7-20.2-7.7-27.8 0s-7.7 20.2 0 27.8l37.1 37.1c7.7 7.7 20.2 7.7 27.8 0 7.7-7.7 7.7-20.2 0-27.8zM437 102.8c7.7-7.7 7.7-20.2 0-27.8-7.7-7.7-20.2-7.7-27.8 0L372 112.1c-7.7 7.7-7.7 20.2 0 27.8 7.7 7.7 20.2 7.7 27.8 0zM19.7 236.3C8.8 236.3 0 245.1 0 256s8.8 19.7 19.7 19.7h52.5c10.9 0 19.7-8.8 19.7-19.7s-8.8-19.7-19.7-19.7zm420.1 0c-10.9 0-19.7 8.8-19.7 19.7s8.8 19.7 19.7 19.7h52.5c10.9 0 19.7-8.8 19.7-19.7s-8.8-19.7-19.7-19.7zM140 399.9c7.7-7.7 7.7-20.2 0-27.9s-20.2-7.7-27.8 0L75 409.2c-7.7 7.7-7.7 20.2 0 27.9s20.2 7.7 27.8 0zM399.9 372c-7.7-7.7-20.2-7.7-27.9 0s-7.7 20.2 0 27.9l37.1 37.1c7.7 7.7 20.2 7.7 27.9 0s7.7-20.2 0-27.9zm-124.2 67.8c0-10.9-8.8-19.7-19.7-19.7s-19.7 8.8-19.7 19.7v52.5c0 10.9 8.8 19.7 19.7 19.7s19.7-8.8 19.7-19.7zM118.2 256c0-76.1 61.7-137.8 137.8-137.8S393.8 179.9 393.8 256 332.1 393.8 256 393.8 118.2 332.1 118.2 256'],
    dark: ['0 0 32 32', 'M30.706 19.721a1 1 0 0 0-1.042-.234A13.423 13.423 0 0 1 12.513 2.335a1 1 0 0 0-1.276-1.278A15.2 15.2 0 0 0 5.51 4.68a15.422 15.422 0 0 0 21.81 21.81 15.2 15.2 0 0 0 3.623-5.728 1 1 0 0 0-.237-1.041'],
  };
  const glyph = (theme) => {
    const [viewBox, d] = GLYPHS[theme];
    const wrap = document.createElement('span');
    wrap.innerHTML = `<svg class="demo-theme__glyph" viewBox="${viewBox}" aria-hidden="true"><path d="${d}" /></svg>`;
    return wrap.firstChild;
  };

  const buildThemeMenu = () => {
    const THEMES = [
      ['light', 'Light'],
      ['dark', 'Dark'],
    ];
    let current = readTheme() === 'dark' ? 'dark' : 'light';

    const trigger = el('button', { class: 'demo-theme__trigger', type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false' });
    const items = THEMES.map(([value, label]) =>
      el('li', { role: 'none' }, [
        el('button', { class: 'dropdown-menu__item', type: 'button', role: 'option', 'data-value': value }, [
          glyph(value),
          el('span', { class: 'dropdown-menu__label', text: label }),
          el('span', { class: 'icon icon--tick dropdown-menu__tick', 'aria-hidden': 'true' }),
        ]),
      ]),
    );
    const menu = el('div', { class: 'dropdown-menu demo-theme__menu', hidden: '' }, [
      el('ul', { class: 'dropdown-menu__list', role: 'listbox', 'aria-label': 'Theme' }, items),
    ]);

    const render = () => {
      const label = THEMES.find(([value]) => value === current)[1];
      trigger.replaceChildren(glyph(current));
      trigger.setAttribute('aria-label', `Theme: ${label}`);
      menu.querySelectorAll('[data-value]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.value === current)));
    };
    const open = (show) => {
      menu.hidden = !show;
      trigger.setAttribute('aria-expanded', String(show));
    };

    // Hover opens it (a short delay on leave crosses the gap to the menu);
    // click / keyboard open it too (no hover on touch). Outside click or Esc closes.
    let closing;
    const wrap = el('div', { class: 'demo-theme' }, [trigger, menu]);
    wrap.addEventListener('mouseenter', () => {
      clearTimeout(closing);
      open(true);
    });
    wrap.addEventListener('mouseleave', () => {
      closing = setTimeout(() => open(false), 200);
    });
    trigger.addEventListener('click', () => open(true));
    menu.addEventListener('click', (e) => {
      const b = e.target.closest('[data-value]');
      if (!b) return;
      current = b.dataset.value;
      applyTheme(current);
      try {
        localStorage.setItem(THEME_KEY, current);
      } catch {} // frames on the page follow through the storage event
      render();
      open(false);
      trigger.focus();
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.demo-theme')) open(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) {
        open(false);
        trigger.focus();
      }
    });

    render();
    document.body.append(wrap);
  };

  // ── Footer: copyright + contact ──
  const buildFooter = () => {
    const mail = el('a', { href: 'mailto:joungmin.shin@dmgmedia.co.uk', text: 'joungmin.shin@dmgmedia.co.uk' });
    document.body.append(
      el('footer', { class: 'demo-footer' }, [
        el('span', { text: `© ${new Date().getFullYear()} Joungmin Shin · Contact: ` }),
        mail,
      ]),
    );
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
    buildThemeMenu();
    buildFooter();
    const index = document.getElementById('demo-index');
    if (index) buildIndex(index);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
