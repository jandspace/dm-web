// ── Toast — behaviour ─────────────────────────────────────────────────────────
// Prototype script for styles/scss/components/_toast.scss: build a toast, stack
// it, time it out, close it. Needs one section.toast-region[popover="manual"]
// in the page (straight in <body>).
//
//   Toast.show({ context, title, description, actions, keep })
//     context      success · error · warning · info · neutral
//     actions      button labels (0–2); a click on one closes the toast
//     keep         no auto-dismiss (previews)
//   Toast.dismiss(toast)
//
// Auto-dismiss: 3s, only without buttons and not for errors; it waits while the
// pointer or focus is on the toasts. While a modal is open the region moves into
// it (the rest of the page is inert), and back to <body> when it closes.

(() => {
  const ICON = { success: 'tick', error: 'xmark', warning: 'exclamation-mark-triangle', info: 'info', neutral: 'megaphone' };
  const region = () => document.querySelector('.toast-region');

  // Text goes into HTML: escape it (titles and labels can come from data)
  const esc = (text) => String(text).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

  // Stack: index from the front, offset for the spread-out list, the front toast's height
  const layout = () => {
    const r = region();
    const toasts = [...r.querySelectorAll('.toast:not(.is-leaving)')];
    let offset = 0;
    toasts.forEach((toast, i) => {
      toast.style.setProperty('--toast-index', i);
      toast.style.setProperty('--toast-offset', `${offset}px`);
      offset += toast.scrollHeight + 8;
    });
    r.style.setProperty('--toast-front-height', toasts[0] ? `${toasts[0].offsetHeight}px` : 'auto');
    r.style.setProperty('--toast-stack-height', `${Math.max(offset - 8, 0)}px`);
    if (!toasts.length && r.matches(':popover-open')) r.hidePopover();
  };

  const dismiss = (toast) => {
    if (toast.classList.contains('is-leaving')) return;
    toast.classList.add('is-leaving');
    layout();
    setTimeout(() => {
      toast.remove();
      layout();
    }, 200);
  };

  // Into the top layer, above everything — inside an open modal while there is one
  const place = () => {
    const r = region();
    const host = document.querySelector('dialog:modal') || document.body;
    if (r.parentElement !== host) {
      if (r.matches(':popover-open')) r.hidePopover();
      host.append(r);
    }
    if (r.querySelector('.toast') && !r.matches(':popover-open')) r.showPopover();
  };

  const show = ({ context = 'neutral', title, description, actions = [], keep = false }) => {
    const r = region();
    const toast = document.createElement('div');
    toast.className = `toast toast--${context}`;
    toast.dataset.theme = 'light';
    toast.setAttribute('role', context === 'error' || context === 'warning' ? 'alert' : 'status');
    const primary = context === 'neutral' ? 'btn-brand' : 'btn-neutral-inverse';
    toast.innerHTML =
      `<span class="toast__icon"><span class="icon icon--${ICON[context]}" aria-hidden="true"></span></span>` +
      `<div class="toast__body"><div class="toast__text">` +
      `<p class="toast__title">${esc(title)}</p>` +
      (description ? `<p class="toast__description">${esc(description)}</p>` : '') +
      `</div>` +
      (actions.length
        ? `<div class="toast__actions">${actions.map((a, i) => `<button class="btn ${i === actions.length - 1 ? primary : 'btn-quaternary-neutral'} btn--sm" type="button" data-close>${esc(a)}</button>`).join('')}</div>`
        : '') +
      `</div>` +
      `<button class="toast__close btn btn-quaternary-neutral btn--icon-only" type="button" aria-label="Dismiss" data-close><span class="icon icon--xmark-light" aria-hidden="true"></span></button>`;
    r.prepend(toast);
    place();
    layout();

    if (!keep && !actions.length && context !== 'error') {
      const tick = () => (r.matches(':hover, :focus-within') ? setTimeout(tick, 1000) : dismiss(toast));
      setTimeout(tick, 3000);
    }
    return toast;
  };

  document.addEventListener('click', (event) => {
    const close = event.target.closest('.toast [data-close]');
    if (close) dismiss(close.closest('.toast'));
  });
  document.addEventListener('close', () => region() && setTimeout(place), true); // a dialog closed

  window.Toast = { show, dismiss };
})();
