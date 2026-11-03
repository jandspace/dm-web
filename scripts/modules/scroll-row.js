// ── Scroll Row — behaviour ────────────────────────────────────────────────────
// Prototype script for styles/scss/components/_scroll-row.scss: the chevron
// edges of a row that scrolls sideways. An edge pages the row by 80% of its
// width (smooth via CSS scroll-behavior); it gets [hidden] on a side that cannot
// scroll. Whether edges show at all (MD+ with a mouse) is up to the CSS.
//
//   Tabs                       .tabs                 > .tabs__list                 · .tabs__edge--prev / --next
//   Section Header sub-items   .section-header-tabs  > .section-header-tabs__list  · .section-header-tabs__edge--prev / --next
//   Sticky Navbar channels     .masthead-sticky__center > .masthead-sticky__list   · .masthead-sticky__edge--prev / --next
//   Navbar L2                  .navbar-l2            > .navbar-l2__list            · .navbar-l2__edge--prev / --next
//
// Call ScrollRow.init(root) again after adding rows — rows already set up are skipped.

(() => {
  const ROWS = [
    ['.tabs', '.tabs__list', '.tabs__edge'],
    ['.section-header-tabs', '.section-header-tabs__list', '.section-header-tabs__edge'],
    ['.masthead-sticky__center', '.masthead-sticky__list', '.masthead-sticky__edge'],
    ['.navbar-l2', '.navbar-l2__list', '.navbar-l2__edge'],
  ];
  const ready = new WeakSet();

  const setup = (block, listSelector, edgeSelector) => {
    const list = block.querySelector(listSelector);
    const prev = block.querySelector(`${edgeSelector}--prev`);
    const next = block.querySelector(`${edgeSelector}--next`);
    if (!list || !prev || !next) return;

    const update = () => {
      prev.hidden = list.scrollLeft <= 1;
      next.hidden = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1;
    };
    prev.addEventListener('click', () => list.scrollBy({ left: -0.8 * list.clientWidth }));
    next.addEventListener('click', () => list.scrollBy({ left: 0.8 * list.clientWidth }));
    list.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(update).observe(list);
    document.fonts.ready.then(update); // label widths change once the web font is in
    update();
  };

  const init = (root = document) => {
    ROWS.forEach(([blockSelector, listSelector, edgeSelector]) => {
      root.querySelectorAll(blockSelector).forEach((block) => {
        if (ready.has(block)) return;
        ready.add(block);
        setup(block, listSelector, edgeSelector);
      });
    });
  };

  window.ScrollRow = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
