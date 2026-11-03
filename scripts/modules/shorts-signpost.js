// ── Shorts Signpost — behaviour ───────────────────────────────────────────────
// Prototype script for styles/scss/modules/_shorts-signpost.scss. Arrows, swipe
// and snap come from the Carousel (scripts/modules/carousel.js).
//
//   Preview  one card plays its video (muted loop) at a time: the first card at
//            load, then the card the row stops on (carousel:settle — the card
//            an arrow brought to the start, or the one a swipe snapped there),
//            or — mouse only — a card the pointer rests on for 1s. The card it
//            leaves goes back to its poster. Only while the row is at least
//            half on screen; never with reduced motion.
//
// Call ShortsSignpost.init(root) again after adding signposts — ones already
// set up are skipped.

(() => {
  const HOVER_MS = 1000;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  const ready = new WeakSet();

  const setup = (signpost) => {
    const cards = [...signpost.querySelectorAll('.shorts-card')];
    let active = null;
    let onScreen = false;
    let hoverTimer;

    const video = (card) => card.querySelector('video');

    const play = () => {
      if (active && onScreen && !reducedMotion.matches) video(active).play().catch(() => {});
    };

    const activate = (card) => {
      if (card !== active) {
        if (active) video(active).load(); // stops it and shows the poster again
        active = card;
      }
      play();
    };

    signpost.addEventListener('carousel:settle', (event) => activate(event.detail.item));

    cards.forEach((card) => {
      video(card).muted = true; // autoplay needs muted set as a property too
      card.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse' || !mouse.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => activate(card), HOVER_MS);
      });
      card.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
    });

    new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) play();
        else if (active) video(active).pause();
      },
      { threshold: 0.5 },
    ).observe(signpost);

    activate(cards[0]);
  };

  const init = (root = document) => {
    root.querySelectorAll('.shorts-signpost').forEach((signpost) => {
      if (ready.has(signpost)) return;
      ready.add(signpost);
      setup(signpost);
    });
  };

  window.ShortsSignpost = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
