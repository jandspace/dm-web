// ── Article Card Media — behaviour ────────────────────────────────────────────
// Prototype script for styles/scss/modules/_article-card-media.scss.
//
//   video[data-preview]     animated preview: muted loop, plays only while at
//                           least half on screen; never with reduced motion
//   .article-card-player    Video: ready → playing ⇄ paused, muted at start,
//                           controls fade after 3s (touch: first tap shows them)
//   .article-card-carousel  arrows, swipe (scroll-snap), dots; a click on a
//                           slide opens the article
//
// Call ArticleCardMedia.init(root) again after adding cards to the page.

(() => {
  const IDLE_MS = 3000;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const clock = (s) => {
    const t = Math.max(0, Math.floor(s || 0));
    return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
  };

  // ── Animated preview ──────────────────────────────────────────────────────

  const previewObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting && !reducedMotion.matches) target.play().catch(() => {});
        else target.pause();
      });
    },
    { threshold: 0.5 },
  );

  const initPreview = (video) => {
    video.muted = true; // autoplay needs muted set as a property too
    video.loop = true;
    video.playsInline = true;
    previewObserver.observe(video);
  };

  // ── Video player ──────────────────────────────────────────────────────────

  const initPlayer = (player) => {
    const video = player.querySelector('video');
    const surface = player.querySelector('.article-card-player__surface');
    const timer = player.querySelector('.video-timer');
    const progress = player.querySelector('.video-progress');
    const elapsed = player.querySelector('.video-progress__elapsed');
    const remaining = player.querySelector('.video-progress__remaining');
    const sound = player.querySelector('[data-action="sound"]');
    let idleTimer;
    let lastPointer = 'mouse';

    const setState = (state) => {
      player.dataset.state = state;
      surface.setAttribute('aria-label', state === 'playing' ? 'Pause video' : 'Play video');
      if (state === 'playing') wake();
      else {
        clearTimeout(idleTimer);
        player.classList.remove('is-idle');
      }
    };

    const wake = () => {
      player.classList.remove('is-idle');
      clearTimeout(idleTimer);
      if (player.dataset.state === 'playing') {
        idleTimer = setTimeout(() => player.classList.add('is-idle'), IDLE_MS);
      }
    };

    const update = () => {
      const pct = video.duration ? (video.currentTime / video.duration) * 100 : 0;
      progress.style.setProperty('--video-progress', `${pct}%`);
      progress.querySelector('[role="progressbar"]').setAttribute('aria-valuenow', Math.round(pct));
      elapsed.textContent = clock(video.currentTime);
      remaining.textContent = `-${clock(video.duration - video.currentTime)}`;
    };

    video.muted = true;
    video.playsInline = true;
    video.addEventListener('loadedmetadata', () => {
      timer.textContent = clock(video.duration);
      update();
    });
    video.addEventListener('timeupdate', update);
    // The video's own events set the state, so a blocked play() never shows
    // as playing
    video.addEventListener('play', () => setState('playing'));
    video.addEventListener('pause', () => !video.ended && setState('paused'));
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      setState('ready');
    });

    player.addEventListener('pointerdown', (e) => (lastPointer = e.pointerType));
    player.addEventListener('pointermove', (e) => e.pointerType === 'mouse' && wake());

    surface.addEventListener('click', () => {
      // Touch: while the controls are hidden, a tap only brings them back
      if (player.dataset.state === 'playing' && lastPointer !== 'mouse' && player.classList.contains('is-idle')) {
        wake();
        return;
      }
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });

    player.querySelector('[data-action="expand"]')?.addEventListener('click', () => {
      if (video.requestFullscreen) video.requestFullscreen();
      else video.webkitEnterFullscreen?.(); // iOS Safari
    });

    sound?.addEventListener('click', () => {
      video.muted = !video.muted;
      const icon = sound.querySelector('.icon');
      icon.classList.toggle('icon--speaker-off', video.muted);
      icon.classList.toggle('icon--speaker-on', !video.muted);
      sound.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
      wake();
    });

    player.querySelector('[data-action="share"]')?.addEventListener('click', () => {
      const url = player.closest('.article-card')?.querySelector('.article-card__link')?.href || location.href;
      if (navigator.share) navigator.share({ url }).catch(() => {});
      else navigator.clipboard?.writeText(url);
      wake();
    });

    player.addEventListener('focusin', wake);
    setState('ready');
  };

  // ── Carousel ──────────────────────────────────────────────────────────────

  const initCarousel = (carousel) => {
    const track = carousel.querySelector('.article-card-carousel__track');
    const items = [...track.children];
    const dots = [...carousel.querySelectorAll('.article-card-carousel__dot')];
    const prev = carousel.querySelector('.article-card-carousel__nav--prev');
    const next = carousel.querySelector('.article-card-carousel__nav--next');

    const index = () => Math.round(track.scrollLeft / track.clientWidth);
    const go = (i) => track.scrollTo({ left: i * track.clientWidth });

    const update = () => {
      const i = index();
      dots.forEach((dot, n) => dot.classList.toggle('is-active', n === i));
      prev.hidden = i === 0;
      next.hidden = i === items.length - 1;
      items.forEach((item, n) => item.setAttribute('aria-hidden', String(n !== i)));
    };

    prev.addEventListener('click', () => go(index() - 1));
    next.addEventListener('click', () => go(index() + 1));
    track.addEventListener('scroll', update, { passive: true });

    // The track sits above the card link (so it can be swiped): pass clicks on
    // a slide on to the article
    track.addEventListener('click', () => {
      carousel.closest('.article-card')?.querySelector('.article-card__link')?.click();
    });

    update();
  };

  const init = (root = document) => {
    root.querySelectorAll('video[data-preview]').forEach(initPreview);
    root.querySelectorAll('.article-card-player').forEach(initPlayer);
    root.querySelectorAll('.article-card-carousel').forEach(initCarousel);
  };

  window.ArticleCardMedia = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
