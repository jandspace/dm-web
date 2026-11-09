// ── Demo: mouse drag = swipe — SCAFFOLDING ONLY ───────────────────────────────
// On demo and prototype pages a mouse can drag any row that scrolls sideways,
// so the touch swipe can be tried on a desktop. Not product behaviour: on the
// site a mouse uses the arrows / chevron edges (and a trackpad scrolls).
//
//   rows     ROWS below — Carousel tracks and every Scroll Row (Tabs, Section
//            Header tabs, Navbar L1, Sticky Navbar, Navbar L2). Only while the
//            row overflows ([data-drag-ready] on hover: grab cursor)
//   drag     the row follows the pointer ([data-dragging]: snap and smooth
//            scroll off — styles/scss/scaffolding/_demo-drag-swipe.scss)
//   release  a row that snaps (Carousel): the item nearest the start snaps
//            there; a drag of more than 40px goes at least one item on, in that
//            direction. Other rows stay where they were let go
//   click    a drag is not a click — links and the card click-through don't fire.
//            The pointer is captured only once it has moved 5px, so a plain
//            click still lands on a button inside the row (e.g. a card's vote)
//
// Delegated from the document, so rows added later work too.

(() => {
  const ROWS = [
    '.carousel__track',
    '.tabs__list',
    '.section-header-tabs__list',
    '.masthead-nav__list',
    '.masthead-sticky__list',
    '.navbar-l2__list',
  ].join(', ');
  const MOVE_PX = 5; // less than this is a click
  const FLICK_PX = 40; // more than this moves at least one item on

  let track = null;
  let snaps = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;
  let pointer = null; // captured once the drag starts, so a plain click still reaches its button

  const overflows = (row) => row.scrollWidth > row.clientWidth + 1;

  document.documentElement.toggleAttribute('data-demo-drag', true);

  // Grab cursor only on a row that can scroll
  document.addEventListener('pointerover', (event) => {
    const row = event.target.closest(ROWS);
    if (row) row.toggleAttribute('data-drag-ready', overflows(row));
  });

  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const row = event.target.closest(ROWS);
    if (!row || !overflows(row)) return;
    event.preventDefault(); // no image ghost drag, no text selection
    track = row;
    snaps = getComputedStyle(row).scrollSnapType !== 'none';
    startX = event.clientX;
    startScroll = row.scrollLeft;
    moved = false;
    pointer = event.pointerId;
  });

  document.addEventListener('pointermove', (event) => {
    if (!track) return;
    const dx = event.clientX - startX;
    if (!moved && Math.abs(dx) < MOVE_PX) return;
    if (!moved) {
      moved = true;
      track.toggleAttribute('data-dragging', true);
      track.setPointerCapture(pointer);
    }
    track.scrollLeft = startScroll - dx;
  });

  const release = (event) => {
    if (!track) return;
    const dragged = track;
    track = null;
    if (!moved) return;
    dragged.removeAttribute('data-dragging');
    setTimeout(() => (moved = false)); // after the click that ends the drag
    if (!snaps) return;

    // Scroll positions that put each item at the start (the track's left padding)
    const inset = parseFloat(getComputedStyle(dragged).paddingLeft);
    const left = dragged.getBoundingClientRect().left;
    const stops = [...dragged.children].map(
      (item) => dragged.scrollLeft + item.getBoundingClientRect().left - left - inset,
    );
    const now = dragged.scrollLeft;
    let target = stops.reduce((a, b) => (Math.abs(b - now) < Math.abs(a - now) ? b : a));
    const dx = event.clientX - startX;
    if (dx < -FLICK_PX) target = Math.max(target, stops.find((s) => s > startScroll + 1) ?? target);
    if (dx > FLICK_PX) target = Math.min(target, stops.findLast((s) => s < startScroll - 1) ?? target);
    dragged.scrollTo({ left: target });
  };

  document.addEventListener('pointerup', release);
  document.addEventListener('pointercancel', release);

  // The click that ends a drag: keep it from links and the card click-through
  document.addEventListener(
    'click',
    (event) => {
      if (!moved || !event.target.closest(ROWS)) return;
      moved = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );
})();
