// ── Demo: mouse drag = swipe — SCAFFOLDING ONLY ───────────────────────────────
// On demo pages a mouse can drag a Carousel track sideways, so the touch swipe
// can be tried on a desktop. Not product behaviour: on the site a mouse uses the
// arrows (and a trackpad scrolls).
//
//   drag     the track follows the pointer ([data-dragging]: snap and smooth
//            scroll off — styles/scss/scaffolding/_demo-drag-swipe.scss)
//   release  the item nearest the start snaps there; a drag of more than 40px
//            goes at least one item on, in that direction
//   click    a drag is not a click — links and the card click-through don't fire
//
// Delegated from the document, so carousels added later work too.

(() => {
  const MOVE_PX = 5; // less than this is a click
  const FLICK_PX = 40; // more than this moves at least one item on

  let track = null;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  document.documentElement.toggleAttribute('data-demo-drag', true);

  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    if (event.target.closest('.carousel__nav')) return; // the arrows stay buttons
    track = event.target.closest('.carousel__track');
    if (!track) return;
    event.preventDefault(); // no image ghost drag, no text selection
    startX = event.clientX;
    startScroll = track.scrollLeft;
    moved = false;
    track.setPointerCapture(event.pointerId);
  });

  document.addEventListener('pointermove', (event) => {
    if (!track) return;
    const dx = event.clientX - startX;
    if (!moved && Math.abs(dx) < MOVE_PX) return;
    if (!moved) {
      moved = true;
      track.toggleAttribute('data-dragging', true);
    }
    track.scrollLeft = startScroll - dx;
  });

  const release = (event) => {
    if (!track) return;
    const dragged = track;
    track = null;
    if (!moved) return;

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

    dragged.removeAttribute('data-dragging');
    dragged.scrollTo({ left: target });
    setTimeout(() => (moved = false)); // after the click that ends the drag
  };

  document.addEventListener('pointerup', release);
  document.addEventListener('pointercancel', release);

  // The click that ends a drag: keep it from links and the card click-through
  document.addEventListener(
    'click',
    (event) => {
      if (!moved || !event.target.closest('.carousel__track')) return;
      moved = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );
})();
