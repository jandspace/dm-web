// ── Notes index — SCAFFOLDING ONLY ────────────────────────────────────────────
// Builds the experiments / projects landing pages (styles/scss/scaffolding/
// _notes-index.scss) from the page's list. Load it before the list, then call:
//
//   renderNotesIndex(ENTRIES)
//
// The page provides #notes-year (year menu <ul>) and #notes-list (cards).
// Entry fields (newest first) — CLAUDE.md › Experiments · Projects:
//
//   id       folder name (YYYYMM-exp-<name> · YYYYMM-prj-<name>)
//   date     'YYYY-MM-DD' — when the work started; the year menu is built from it
//   title    short name
//   status   'In progress' | 'Decided' | 'Done' | 'Archived'
//   notes    short lines, not prose: what it is, then one line per later change (dated)
//   result   outcome / decision, once there is one
//   pages    [label, file in the folder, one-line description]

window.renderNotesIndex = (entries) => {
  const list = document.getElementById('notes-list');
  const menu = document.getElementById('notes-year');
  const years = [...new Set(entries.map((e) => e.date.slice(0, 4)))].sort().reverse();

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  // Accordion card: <details> head = date · status · folder · title
  const card = (e, open) => {
    const status = e.status.toLowerCase().replace(/\s+/g, '-'); // 'In progress' → in-progress
    const item = el('details', `notes-card notes-card--${status}`);
    item.open = open;

    const head = el('summary', 'notes-card__head');
    const meta = el('div', 'notes-card__meta');
    meta.append(el('span', '', e.date), el('span', `notes-card__status notes-card__status--${status}`, e.status), el('code', '', e.id));
    head.append(meta, el('h3', 'notes-card__title', e.title));

    // Body: page links on top (grey block), then the notes — they scroll
    // past a max height, so the links stay in view
    const body = el('div', 'notes-card__body');
    const links = el('ul', 'notes-card__links');
    e.pages.forEach(([label, file, desc]) => {
      const li = el('li');
      const a = el('a', '', label);
      a.href = `${e.id}/${file}`;
      li.append(a, el('span', '', ` — ${desc}`));
      links.append(li);
    });
    const notes = el('div', 'notes-card__notes');
    e.notes.forEach((p) => notes.append(el('p', 'notes-card__text', p)));
    if (e.result) notes.append(el('p', 'notes-card__text', `Result: ${e.result}`));
    body.append(links, notes);

    item.append(head, body);
    return item;
  };

  const render = (year) => {
    list.replaceChildren();
    let first = true; // the top item of the list starts open
    years
      .filter((y) => year === 'all' || y === year)
      .forEach((y) => {
        list.append(el('h2', 'notes-year', y));
        entries.filter((e) => e.date.startsWith(y)).forEach((e) => {
          list.append(card(e, first));
          first = false;
        });
      });
    menu.querySelectorAll('button').forEach((b) => b.setAttribute('aria-current', String(b.dataset.year === year)));
    const url = new URL(location.href);
    if (year === 'all') url.searchParams.delete('year');
    else url.searchParams.set('year', year);
    history.replaceState(null, '', url);
  };

  // Year menu: All + one item per year, with counts
  ['all', ...years].forEach((y) => {
    const count = y === 'all' ? entries.length : entries.filter((e) => e.date.startsWith(y)).length;
    const b = el('button', 'notes-nav__item');
    b.type = 'button';
    b.dataset.year = y;
    b.append(el('span', '', y === 'all' ? 'All' : y), el('span', 'notes-nav__count', String(count)));
    const li = el('li');
    li.append(b);
    menu.append(li);
  });
  menu.addEventListener('click', (event) => {
    const b = event.target.closest('button[data-year]');
    if (b) render(b.dataset.year);
  });

  const initial = new URLSearchParams(location.search).get('year');
  render(years.includes(initial) ? initial : 'all');
};
