// ── Carousel — behaviour ──────────────────────────────────────────────────────
// Prototype script for styles/scss/components/_carousel.scss.
//
//   Arrows    Next: the first item cut off on the right moves to the start (in
//             a Slide carousel, the next slide). Prev: the reverse — the row
//             moves back until the item that was first is the one cut off.
//             No Prev at the start, no Next at the end ([hidden]).
//             Each step glides 600ms, ease-in-out ([data-moving] while it does).
//             [data-step="item"] (Row): one item at a time instead — Next brings
//             the item after the one at the start, Prev the one before it.
//   Dots      .is-active on the dot of the item at the start. Slide: the other
//             slides get aria-hidden.
//   Autoplay  [data-autoplay]: every 5s, as Next — after the end, back to the
//             first item. Slide: the step is the active dot's fill (CSS
//             animation), which waits while the carousel is hovered or focused
//             (CSS) or off screen ([data-paused], set here — from the start, so
//             it only begins once half on screen). Row (no dots): a 5s
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
  const MOVE_MS = 600; // one arrow / autoplay step
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover)');
  const ready = new WeakSet();

  const visibility = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!target.isConnected) return visibility.unobserve(target); // taken off the page
        if (target.toggleAttribute('data-paused', !isIntersecting)) return;
        target.dispatchEvent(new Event('carousel:onscreen')); // a Row's 5s starts now
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

    // Arrows and autoplay glide over MOVE_MS (ease-in-out) — the browser's
    // smooth scroll is too quick and its speed can't be set. [data-moving]
    // lets CSS hold snap off meanwhile. Reduced motion: a jump. A timer ends
    // the step if frames stall (a background tab gets none).
    let frame;
    let done;
    const moveToStart = (item) => {
      if (!item) return;
      target = item;
      const from = track.scrollLeft;
      const to = Math.max(0, Math.min(Math.round(from + x(item) - inset()), track.scrollWidth - track.clientWidth));
      const finish = () => {
        cancelAnimationFrame(frame);
        clearTimeout(done);
        track.scrollLeft = to;
        carousel.removeAttribute('data-moving');
      };
      if (reducedMotion.matches) return finish();
      cancelAnimationFrame(frame);
      clearTimeout(done);
      carousel.setAttribute('data-moving', '');
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min((now - t0) / MOVE_MS, 1);
        const ease = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        track.scrollLeft = from + (to - from) * ease;
        if (t < 1) frame = requestAnimationFrame(step);
        else finish();
      };
      frame = requestAnimationFrame(step);
      done = setTimeout(finish, MOVE_MS + 100);
    };

    // One item at a time ([data-step="item"]) or a view at a time (default)
    const byItem = carousel.dataset.step === 'item';
    const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

    // The first item cut off on the right — none at the end of the row
    const nextItem = () =>
      byItem
        ? !atEnd() && items[items.indexOf(current()) + 1]
        : items.find((item) => x(item) + item.offsetWidth > track.clientWidth + 1);

    next?.addEventListener('click', () => moveToStart(nextItem()));

    prev?.addEventListener('click', () => {
      if (byItem) return moveToStart(items[items.indexOf(current()) - 1] || items[0]);
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
      carousel.setAttribute('data-paused', ''); // until the observer finds it on screen
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
        carousel.addEventListener('carousel:onscreen', restart);
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
