// ── Masthead — behaviour ──────────────────────────────────────────────────────
// Prototype script for styles/scss/modules/_masthead.scss, _masthead-sheet.scss
// and _masthead-sticky.scss. Load it after the markup (no defer) — demo
// scaffolding may call window.mastheadRevealCurrent once it has run.
//
//   · burger slides the Nav Sheet in from the left (≥640: 390px + blurred backdrop);
//     close button, backdrop click or Escape slides it out
//   · Edition buttons (Topbar, Sticky Navbar flag) toggle their menus (click outside closes)
//   · Nav Sheet channels open as an accordion (one at a time)
//   · the current channel is scrolled into view when the row scrolls
//   · LG+ with a mouse: dropdown panels open after 150ms on an item and
//     close 300ms after the pointer leaves (hover intent) — passing over
//     other tabs on the way to a panel does not swap it
//   · ?sheet (the Navigation demo's Nav Sheet preview): the sheet stays open
//
// Sticky Navbar channels: chevron edges — scripts/modules/scroll-row.js

window.mastheadRevealCurrent = () => {
  const list = document.querySelector('.masthead-nav__list');
  const current = list.querySelector('[aria-current="page"]');
  if (!current || list.scrollWidth <= list.clientWidth) return;
  const item = current.parentElement;
  list.scrollLeft = item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2;
};
(() => {
  const sheet = document.getElementById('masthead-sheet');
  const backdrop = document.getElementById('masthead-sheet-backdrop');
  const trigger = document.querySelector('.masthead-nav__trigger');
  // Slide in from the left: show, then add .is-open on the next frame so
  // the transform transitions; on close, hide once the slide has ended
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // ?sheet (the Nav Sheet preview frame): open from the start, no slide,
  // and it stays open — close / backdrop / Escape do nothing
  const pinned = new URLSearchParams(location.search).has('sheet');
  const setSheet = (open) => {
    if (pinned && !open) return;
    trigger.setAttribute('aria-expanded', String(open));
    if (open) {
      sheet.hidden = false;
      backdrop.hidden = false;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          sheet.classList.add('is-open');
          backdrop.classList.add('is-open');
        }),
      );
      sheet.querySelector('.masthead-sheet__close').focus();
    } else {
      sheet.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      let done = false;
      const hide = () => {
        if (done || sheet.classList.contains('is-open')) return;
        done = true;
        sheet.hidden = true;
        backdrop.hidden = true;
        sheet.removeEventListener('transitionend', onEnd);
      };
      // only the sheet's own slide counts (children transition too)
      const onEnd = (e) => e.target === sheet && e.propertyName === 'transform' && hide();
      if (reduceMotion.matches) hide();
      else {
        sheet.addEventListener('transitionend', onEnd);
        setTimeout(hide, 400); // fallback if transitionend never fires
      }
      trigger.focus();
    }
  };
  trigger.addEventListener('click', () => setSheet(true));
  if (pinned) {
    sheet.hidden = backdrop.hidden = false;
    sheet.classList.add('is-open');
    backdrop.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }
  backdrop.addEventListener('click', () => setSheet(false));
  sheet.querySelector('.masthead-sheet__close').addEventListener('click', () => setSheet(false));

  // Edition menus — the Topbar's and the Sticky Navbar's flag; one open at a time
  const editions = [...document.querySelectorAll('.masthead-edition, .masthead-sticky__edition')].map((btn) => ({
    btn,
    menu: document.getElementById(btn.getAttribute('aria-controls')),
  }));
  const setMenu = (edition, open) => {
    edition.menu.hidden = !open;
    edition.btn.setAttribute('aria-expanded', String(open));
  };
  editions.forEach((edition) => {
    edition.btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = edition.menu.hidden;
      editions.forEach((other) => setMenu(other, other === edition && open));
    });
  });
  document.addEventListener('click', (e) => {
    editions.forEach((edition) => !edition.menu.hidden && !edition.menu.contains(e.target) && setMenu(edition, false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!sheet.hidden) setSheet(false);
    editions.forEach((edition) => setMenu(edition, false));
  });

  const nav = document.querySelector('.masthead-nav');
  const desktop = window.matchMedia('(min-width: 1024px) and (hover: hover)');
  const OPEN_DELAY = 150;
  const CLOSE_DELAY = 300;
  let openItem = null;
  let openTimer = 0;
  let closeTimer = 0;
  const closePanel = () => {
    openItem?.classList.remove('is-open');
    openItem = null;
  };
  const openPanel = (item) => {
    if (openItem && openItem !== item) openItem.classList.remove('is-open');
    item.classList.add('is-open');
    openItem = item;
  };
  nav.classList.add('masthead-nav--intent');
  nav.querySelectorAll('.masthead-nav__item').forEach((item) => {
    const hasPanel = item.classList.contains('masthead-nav__item--has-panel');
    item.addEventListener('mouseenter', () => {
      if (!desktop.matches) return;
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
      if (item === openItem) return;
      // after the delay: open this item's panel, or close the open one
      openTimer = setTimeout(() => (hasPanel ? openPanel(item) : closePanel()), OPEN_DELAY);
    });
    item.addEventListener('mouseleave', () => {
      clearTimeout(openTimer);
      closeTimer = setTimeout(closePanel, CLOSE_DELAY);
    });
  });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closePanel());

  // Accordion: one channel open at a time
  const expands = [...sheet.querySelectorAll('.masthead-sheet__expand')];
  expands.forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      expands.forEach((other) => {
        other.setAttribute('aria-expanded', String(other === btn && open));
        other.setAttribute('aria-label', `${other === btn && open ? 'Hide' : 'Show'} ${other.closest('.masthead-sheet__channel').querySelector('.masthead-sheet__channel-label').textContent} sections`);
      });
    });
  });
})();

// Scroll behaviour (reference for the build):
//   · Mweb (<768): the masthead sticks with only its nav row in view; scrolling
//     down hides the logo block, scrolling up brings it back (.is-revealed)
//   · MD+: the Sticky Navbar slides down once the masthead has left the screen
//     and slides back up when the masthead returns
//   · Sticky Navbar channels: chevrons on the side(s) that can scroll
(() => {
  const masthead = document.querySelector('.masthead');
  const navRow = masthead.querySelector('.masthead-nav');
  const sticky = document.getElementById('masthead-sticky');

  // Mweb: how far the masthead may slide up — everything above the nav row
  const setCollapse = () => masthead.style.setProperty('--masthead-collapse', `${navRow.offsetTop}px`);
  setCollapse();
  window.addEventListener('resize', setCollapse);
  document.fonts.ready.then(setCollapse);

  // Mweb: reveal the logo block when scrolling up (past it), hide it when scrolling down
  const THRESHOLD = 4; // px of movement before the direction counts
  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (y <= 0) masthead.classList.remove('is-revealed');
      else if (y > lastY + THRESHOLD) masthead.classList.remove('is-revealed');
      else if (y < lastY - THRESHOLD && y > navRow.offsetTop) masthead.classList.add('is-revealed');
      if (Math.abs(y - lastY) > THRESHOLD) lastY = y;
    },
    { passive: true },
  );

  // MD+: Sticky Navbar in once the whole masthead is above the screen (a
  // masthead that isn't rendered has no box — it never counts as scrolled away)
  new IntersectionObserver(([entry]) => {
    const box = entry.boundingClientRect;
    sticky.classList.toggle('is-visible', !entry.isIntersecting && box.height > 0 && box.bottom <= 0);
  }).observe(masthead);

  // Sticky Navbar channels: chevron edges — scripts/modules/scroll-row.js
})();
