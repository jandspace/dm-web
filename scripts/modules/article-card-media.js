// ── Article Card Media — behaviour ────────────────────────────────────────────
// Prototype script for styles/scss/modules/_article-card-media.scss.
//
//   Lazy load               every video here is preload="none" in the markup:
//                           its first frame loads only when it comes within a
//                           screen of the viewport
//   video[data-preview]     animated preview: muted loop, plays only while at
//                           least half on screen; never with reduced motion
//   .article-card-player    Video: ready → playing ⇄ paused, muted at start,
//                           controls fade after 3s (touch: first tap shows them).
//                           Pauses when less than half on screen; plays again
//                           on return only if scrolling paused it. Seek: press
//                           or drag on the progress track (role="slider"),
//                           or arrow keys (±5s) / Home / End when it has focus
//   .article-card-carousel  a click on a slide opens the article. Arrows,
//                           dots and autoplay: scripts/modules/carousel.js
//
// Call ArticleCardMedia.init(root) again after adding cards to the page —
// elements already set up are skipped.

(() => {
  const IDLE_MS = 3000;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const ready = new WeakSet(); // elements already set up

  const clock = (s) => {
    const t = Math.max(0, Math.floor(s || 0));
    return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
  };

  // ── Lazy load ─────────────────────────────────────────────────────────────

  // Near the viewport (one screen ahead): fetch the metadata and first frame
  const nearObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        nearObserver.unobserve(target);
        if (target.preload !== 'none') return;
        target.preload = 'metadata';
        if (target.readyState === 0) target.load();
      });
    },
    { rootMargin: '100% 0px' },
  );

  // ── Animated preview ──────────────────────────────────────────────────────

  const previewObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!target.isConnected) return previewObserver.unobserve(target); // taken off the page
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
    nearObserver.observe(video);
    previewObserver.observe(video);
  };

  // ── Video player ──────────────────────────────────────────────────────────

  // Off screen: pause. Back on screen: play again only the ones paused here
  const pausedOffScreen = new WeakSet();
  const playerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!target.isConnected) return playerObserver.unobserve(target); // taken off the page
        if (!isIntersecting && !target.paused) {
          pausedOffScreen.add(target);
          target.pause();
        } else if (isIntersecting && pausedOffScreen.delete(target)) {
          target.play().catch(() => {});
        }
      });
    },
    { threshold: 0.5 },
  );

  const initPlayer = (player) => {
    const video = player.querySelector('video');
    const surface = player.querySelector('.article-card-player__surface');
    const timer = player.querySelector('.video-timer');
    const progress = player.querySelector('.video-progress');
    const bar = progress.querySelector('.video-progress__track');
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
      bar.setAttribute('aria-valuenow', Math.round(pct));
      bar.setAttribute('aria-valuetext', `${clock(video.currentTime)} of ${clock(video.duration)}`);
      elapsed.textContent = clock(video.currentTime);
      remaining.textContent = `-${clock(video.duration - video.currentTime)}`;
    };

    // Seek — the track follows the pointer at once; the video catches up
    const seek = (time) => {
      if (!video.duration) return;
      video.currentTime = Math.min(video.duration, Math.max(0, time));
      progress.style.setProperty('--video-progress', `${(video.currentTime / video.duration) * 100}%`);
      wake();
    };
    const seekAt = (x) => {
      const box = bar.getBoundingClientRect();
      seek(((x - box.left) / box.width) * video.duration);
    };
    const stopScrub = () => delete progress.dataset.scrubbing;

    bar.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault(); // no text selection while dragging
      bar.setPointerCapture(e.pointerId);
      progress.dataset.scrubbing = '';
      seekAt(e.clientX);
    });
    bar.addEventListener('pointermove', (e) => bar.hasPointerCapture(e.pointerId) && seekAt(e.clientX));
    bar.addEventListener('pointerup', stopScrub);
    bar.addEventListener('lostpointercapture', stopScrub);
    bar.addEventListener('keydown', (e) => {
      const to = { ArrowLeft: -5, ArrowRight: 5, Home: -Infinity, End: Infinity }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      seek(Number.isFinite(to) ? video.currentTime + to : to < 0 ? 0 : video.duration);
    });

    video.muted = true;
    video.playsInline = true;
    nearObserver.observe(video);
    playerObserver.observe(video);
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
      pausedOffScreen.delete(video);
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });

    player.querySelector('[data-action="expand"]')?.addEventListener('click', () => {
      if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
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
      else navigator.clipboard?.writeText(url).catch(() => {});
      wake();
    });

    player.addEventListener('focusin', wake);
    setState('ready');
  };

  // ── Carousel ──────────────────────────────────────────────────────────────

  // The track sits above the card link (so it can be swiped): pass clicks on
  // a slide on to the article
  const initCarousel = (carousel) => {
    carousel.querySelector('.carousel__track').addEventListener('click', () => {
      carousel.closest('.article-card')?.querySelector('.article-card__link')?.click();
    });
  };

  const once = (setup) => (el) => {
    if (ready.has(el)) return;
    ready.add(el);
    setup(el);
  };

  const init = (root = document) => {
    root.querySelectorAll('video[data-preview]').forEach(once(initPreview));
    root.querySelectorAll('.article-card-player').forEach(once(initPlayer));
    root.querySelectorAll('.article-card-carousel').forEach(once(initCarousel));
  };

  window.ArticleCardMedia = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
