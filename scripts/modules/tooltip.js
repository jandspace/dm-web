// ── Tooltip & Popover — behaviour ─────────────────────────────────────────────
// Prototype script for styles/scss/components/_tooltip.scss.
//
//   .popover[popover]       opened by its button[popovertarget] (native: outside
//                           click and Esc close it) — this script only places it
//   .tooltip[popover]       shown on hover (mouse) / focus of the element whose
//                           aria-describedby names it; hidden on leave, blur, Esc
//   Tooltip.flash(tooltip, trigger)   show it for 1.5s ("Link copied")
//
// Placing: on the data-placement side (default top), flipped to the other side
// when it does not fit (then the other axis), 16px inside the viewport, tail on
// the trigger. The
// position goes into --x / --y / --tail; CSS draws it.
//
// Call Tooltip.init(root) again after adding bubbles — ones already set up are skipped.

(() => {
  const OFFSET = 16; // 12 tail + 4 gap
  const EDGE = 16; // kept inside the viewport
  const TAIL_END = 18; // tail centre, nearest an end can get
  const FLIP = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
  const ready = new WeakSet();
  const triggers = new Map(); // bubble → its trigger

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const place = (bubble, trigger) => {
    const t = trigger.getBoundingClientRect();
    const w = bubble.offsetWidth;
    const h = bubble.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const fits = {
      top: t.top - OFFSET - h >= EDGE,
      bottom: t.bottom + OFFSET + h <= vh - EDGE,
      left: t.left - OFFSET - w >= EDGE,
      right: t.right + OFFSET + w <= vw - EDGE,
    };
    // The preferred side, then its opposite, then the other axis (a side bubble
    // on a narrow screen goes below / above)
    const want = bubble.dataset.placement || 'top';
    const order = [want, FLIP[want], ...(want === 'left' || want === 'right' ? ['bottom', 'top'] : ['right', 'left'])];
    const side = order.find((s) => fits[s]) || want;
    let x;
    let y;
    let tail;

    if (side === 'top' || side === 'bottom') {
      x = clamp(t.left + t.width / 2 - w / 2, EDGE, vw - EDGE - w);
      y = side === 'top' ? t.top - OFFSET - h : t.bottom + OFFSET;
      tail = clamp(t.left + t.width / 2 - x, TAIL_END, w - TAIL_END);
    } else {
      x = side === 'left' ? t.left - OFFSET - w : t.right + OFFSET;
      y = clamp(t.top + t.height / 2 - h / 2, EDGE, vh - EDGE - h);
      tail = clamp(t.top + t.height / 2 - y, TAIL_END, h - TAIL_END);
    }

    bubble.dataset.side = side;
    bubble.style.setProperty('--x', `${x}px`);
    bubble.style.setProperty('--y', `${y}px`);
    bubble.style.setProperty('--tail', `${tail}px`);
  };

  const show = (bubble, trigger) => {
    triggers.set(bubble, trigger);
    bubble.dataset.side ||= bubble.dataset.placement || 'top'; // slides in from the preferred side
    if (!bubble.matches(':popover-open')) bubble.showPopover();
    place(bubble, trigger);
  };

  const hide = (bubble) => {
    if (bubble.matches(':popover-open')) bubble.hidePopover();
  };

  const flash = (bubble, trigger, ms = 1500) => {
    show(bubble, trigger);
    clearTimeout(bubble.flashTimer);
    bubble.flashTimer = setTimeout(() => hide(bubble), ms);
  };

  // Popover: place it as it opens (its own button toggles it), before its first
  // frame, so it fades in where it belongs
  const setupPopover = (popover) => {
    const trigger = [...document.querySelectorAll(`[popovertarget="${popover.id}"]`)].find((el) => !popover.contains(el));
    if (!trigger) return;
    triggers.set(popover, trigger);
    popover.addEventListener('beforetoggle', (event) => {
      if (event.newState !== 'open') return;
      popover.dataset.side ||= popover.dataset.placement || 'top'; // slides in from the preferred side
      requestAnimationFrame(() => place(popover, trigger));
    });
  };

  // Tooltip: hover (mouse) and keyboard focus of the element that names it
  const setupTooltip = (tooltip) => {
    document.querySelectorAll(`[aria-describedby~="${tooltip.id}"]`).forEach((trigger) => {
      trigger.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && show(tooltip, trigger));
      trigger.addEventListener('pointerleave', () => hide(tooltip));
      trigger.addEventListener('focus', () => trigger.matches(':focus-visible') && show(tooltip, trigger));
      trigger.addEventListener('blur', () => hide(tooltip));
    });
  };

  // Keep open bubbles on their trigger while the page scrolls or resizes
  const follow = () => {
    triggers.forEach((trigger, bubble) => bubble.matches(':popover-open') && place(bubble, trigger));
  };
  window.addEventListener('scroll', follow, { passive: true, capture: true });
  window.addEventListener('resize', follow);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.tooltip:popover-open').forEach(hide);
  });

  const init = (root = document) => {
    root.querySelectorAll('.popover[popover][id]').forEach((el) => {
      if (ready.has(el)) return;
      ready.add(el);
      setupPopover(el);
    });
    root.querySelectorAll('.tooltip[popover][id]').forEach((el) => {
      if (ready.has(el)) return;
      ready.add(el);
      setupTooltip(el);
    });
  };

  window.Tooltip = { init, place, show, hide, flash };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
