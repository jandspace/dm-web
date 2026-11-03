// ── Carousel — behaviour ──────────────────────────────────────────────────────
// Prototype script for styles/scss/components/_carousel.scss.
//
//   Arrows    Next: the first item cut off on the right moves to the start (in
//             a Slide carousel, the next slide). Prev: the reverse — the row
//             moves back until the item that was first is the one cut off.
//             No Prev at the start, no Next at the end ([hidden]).
//   Dots      .is-active on the dot of the item at the start. Slide: the other
//             slides get aria-hidden.
//   Autoplay  [data-autoplay]: every 5s, as Next — after the end, back to the
//             first item. Slide: the step is the active dot's fill (CSS
//             animation), which waits while the carousel is hovered or focused
//             (CSS) or off screen ([data-paused], set here). Row (no dots): a 5s
//             timer, started again whenever the row stops, waiting on the same
//             conditions. None with reduced motion.
//   Event     'carousel:settle' (detail.item) when the row stops — the item an
//             arrow brought to the start, or the one snapped there.
//
// Call Carousel.init(root) again after adding carousels — ones already set up
// are skipped.

(() => {
  const SETTLE_MS = 150; // no scroll event for this long = the row has stopped
  const AUTOPLAY_MS = 5000; // Row; a Slide takes it from its dot fill (CSS)
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover)');
  const ready = new WeakSet();

  const visibility = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!target.isConnected) return visibility.unobserve(target); // taken off the page
        target.toggleAttribute('data-paused', !isIntersecting);
      });
    },
    { threshold: 0.5 },
  );

  const setup = (carousel) => {
    const track = carousel.querySelector('.carousel__track');
    const items = [...track.children];
    const prev = carousel.querySelector('.carousel__nav--prev');
    const next = carousel.querySelector('.carousel__nav--next');
    const dots = [...carousel.querySelectorAll('.carousel__dot')];
    const slides = carousel.classList.contains('carousel--slide');
    let target = null; // the item an arrow is bringing to the start
    let settleTimer;

    // Positions in the track's visible box. The start is the track's left
    // padding (--carousel-inset).
    const inset = () => parseFloat(getComputedStyle(track).paddingLeft);
    const x = (item) => item.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const current = () => {
      const start = inset();
      return items.reduce((a, b) => (Math.abs(x(b) - start) < Math.abs(x(a) - start) ? b : a));
    };

    const moveToStart = (item) => {
      if (!item) return;
      target = item;
      track.scrollBy({ left: x(item) - inset() });
    };

    // The first item cut off on the right — none at the end of the row
    const nextItem = () => items.find((item) => x(item) + item.offsetWidth > track.clientWidth + 1);

    next?.addEventListener('click', () => moveToStart(nextItem()));

    prev?.addEventListener('click', () => {
      // The first whole item — at the end of the row it may sit past the start
      const first = items.find((item) => x(item) >= inset() - 1);
      const limit = x(first) + first.offsetWidth + inset() - track.clientWidth;
      moveToStart(items.findLast((item) => x(item) < limit - 1) || items[0]);
    });

    const update = () => {
      if (prev) prev.hidden = track.scrollLeft <= 1;
      if (next) next.hidden = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      if (!dots.length && !slides) return;
      const i = items.indexOf(current());
      dots.forEach((dot, n) => dot.classList.toggle('is-active', n === i));
      if (slides) items.forEach((item, n) => item.setAttribute('aria-hidden', String(n !== i)));
    };

    track.addEventListener(
      'scroll',
      () => {
        update();
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          carousel.dispatchEvent(new CustomEvent('carousel:settle', { detail: { item: target || current() } }));
          target = null;
        }, SETTLE_MS);
      },
      { passive: true },
    );
    new ResizeObserver(update).observe(track);
    update();

    if (carousel.hasAttribute('data-autoplay')) {
      const advance = () => moveToStart(nextItem() || items[0]);
      visibility.observe(carousel);

      if (dots.length) {
        carousel.addEventListener('animationend', (event) => {
          if (event.target.classList.contains('carousel__dot')) advance();
        });
      } else {
        const held = () =>
          reducedMotion.matches ||
          carousel.hasAttribute('data-paused') ||
          (hover.matches && carousel.matches(':hover')) ||
          carousel.matches(':has(:focus-visible)');
        let timer;
        const restart = () => {
          clearTimeout(timer);
          timer = setTimeout(() => (held() ? restart() : advance()), AUTOPLAY_MS);
        };
        carousel.addEventListener('carousel:settle', restart);
        restart();
      }
    }
  };

  const init = (root = document) => {
    root.querySelectorAll('.carousel').forEach((carousel) => {
      if (ready.has(carousel)) return;
      ready.add(carousel);
      setup(carousel);
    });
  };

  window.Carousel = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
