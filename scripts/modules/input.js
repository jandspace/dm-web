// ── Input ─────────────────────────────────────────────────────────────────────
// Behaviour for the Input component (docs/4_Components__13_Input.md):
//   · Clear (button.input__clear) empties the control and keeps focus in it
//   · Show / hide (button.input__reveal) flips a password field to text and back
//   · Dropdown Select (.input-select) opens its Dropdown Menu, picks an option,
//     closes on outside click or Esc; ↑ ↓ move through the options
// The script only sets state (value, type, aria-*, hidden); CSS draws it.

(() => {
  // Clear — pointerdown keeps focus in the control, so the box stays focused
  // (and the button visible) through the click, also in Safari
  document.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.input__clear')) e.preventDefault();
  });

  document.addEventListener('click', (e) => {
    const clear = e.target.closest('.input__clear');
    if (clear) {
      const control = clear.parentElement.querySelector('.input__control');
      control.value = '';
      control.dispatchEvent(new Event('input', { bubbles: true }));
      control.focus();
      return;
    }

    const reveal = e.target.closest('.input__reveal');
    if (reveal) {
      const control = reveal.parentElement.querySelector('.input__control');
      const show = control.type === 'password';
      control.type = show ? 'text' : 'password';
      reveal.setAttribute('aria-pressed', String(show));
      reveal.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      reveal.querySelector('.icon').classList.replace(show ? 'icon--eye-close' : 'icon--eye-open', show ? 'icon--eye-open' : 'icon--eye-close');
    }
  });

  // ── Dropdown Select ─────────────────────────────────────────────────────────
  const selects = [...document.querySelectorAll('.input-select')].map((root) => ({
    root,
    trigger: root.querySelector('.input'),
    menu: root.querySelector('.dropdown-menu'),
  }));

  const options = (select) => [...select.menu.querySelectorAll('[role="option"]:not(:disabled)')];

  const setOpen = (select, open) => {
    select.menu.hidden = !open;
    select.trigger.setAttribute('aria-expanded', String(open));
  };

  selects.forEach((select) => {
    const { trigger, menu } = select;

    trigger.addEventListener('click', () => {
      if (trigger.getAttribute('aria-readonly') === 'true') return;
      const open = menu.hidden;
      selects.forEach((other) => setOpen(other, other === select && open));
      if (open) (menu.querySelector('[aria-selected="true"]') || options(select)[0])?.focus();
    });

    menu.addEventListener('click', (e) => {
      const option = e.target.closest('[role="option"]');
      if (!option || option.disabled) return;
      menu.querySelectorAll('[role="option"]').forEach((item) => item.setAttribute('aria-selected', String(item === option)));
      trigger.querySelector('.input__control').textContent = option.textContent.trim();
      setOpen(select, false);
      trigger.focus();
    });

    select.root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) {
        setOpen(select, false);
        trigger.focus();
        return;
      }
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      if (menu.hidden) return trigger.click();
      const list = options(select);
      const next = list.indexOf(document.activeElement) + (e.key === 'ArrowDown' ? 1 : -1);
      list[Math.max(0, Math.min(list.length - 1, next))].focus();
    });
  });

  document.addEventListener('click', (e) => {
    selects.forEach((select) => !select.root.contains(e.target) && setOpen(select, false));
  });
})();
