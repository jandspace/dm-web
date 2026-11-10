---
paths:
  - "experiments/**"
  - "projects/**"
  - "styles/scss/experiments/**"
  - "styles/scss/projects/**"
---

# Experiments and projects

## Which folder

| | Experiments | Projects |
|---|---|---|
| For | A/B tests, one-off tests, pages still being tested | Settled pages or flows built from the library |
| Folder | `experiments/YYYYMM-exp-<name>/` | `projects/YYYYMM-prj-<name>/` |
| Main page | Test pages in the folder | `index.html` in the folder, others beside it. No platform subfolders |
| Inline `<style>` | Allowed (see A/B below) | Never |
| Page SCSS | `styles/scss/experiments/_<name>.scss` | `styles/scss/projects/_<name>.scss` |
| Home button | `data-home="experiments"` (ico-tubes) | `data-home="projects"` (ico-flow) |
| Landing list | `EXPERIMENTS` in `experiments/index.html` | `PROJECTS` in `projects/index.html` |
| Status values | In progress / Decided / Archived | In progress / Done / Archived |

A page that still needs testing (e.g. `experiments/202611-exp-homepage/`) stays in `experiments/` until settled.

## Shared rules for both

- Link `tokens/*.css` and `styles/css/main.css`. Use library classes and `scripts/modules/` as they are.
- Behaviour the library has only inline in a demo moves to `scripts/modules/` first (e.g. `masthead.js`). Never copy it into the page.
- Body keeps the base background `--color-background-neutral-lightest` (set in `foundation/_reset.scss`). Don't repaint unless asked.
- In `<head>`, load both:
  - `<script src="../../scripts/scaffolding/home-button.js" data-home="experiments|projects" defer></script>` (round button bottom-left, back to the landing page)
  - `<script src="../../scripts/scaffolding/page-footer.js" defer></script>` (copyright line as a reveal underlay: fixed to the window bottom on `--color-background-neutral-light`, behind the page; body is the raised lightest layer with a shadow; shown when scrolled to the end)
- Sideways-scrolling rows load `demo-drag-swipe.js` (see HTML rules).
- Images: link the original URL when one exists; otherwise the folder's own `images/`.

## Experiments only

- Nothing outside the experiment folder may import from it.
- **A (control):** links shared CSS only. Inline `<style>` allowed for page layout (grid, widths), never component styles.
- **B (variant):** same links plus an inline `<style>` overriding only the changed parts. Never edit shared SCSS, CSS or JS for a variant, so A stays unaffected.
- An experiment that builds whole pages keeps its styles in `styles/scss/experiments/_<name>.scss` (`@use` in `main.scss`), not inline and not in `scaffolding/`.
- Fixed-breakpoint test: the page frames itself in an iframe of that width (e.g. 1024 for LG) instead of being responsive.
- After the test: move the winning change into `styles/scss/components/` or `modules/` and into `docs/`. Keep or delete the folder.
- Decided or Archived experiments record what was tested. Don't update them to match the library without asking.

## Landing pages

- `experiments/index.html` and `projects/index.html` hold only their list. Cards come from `scripts/scaffolding/notes-index.js` (`renderNotesIndex(EXPERIMENTS|PROJECTS)`) and `styles/scss/scaffolding/_notes-index.scss`. No inline `<style>`.
- They use the library footer (`<footer class="demo-footer">` at the end of `.notes-main`), not `page-footer.js`, because of their fixed left panel.
- Page links show first (grey block); long notes scroll inside the card. The year filter (All / YYYY) is built from `date`.

## Notes — update in the same turn, unasked

Any change in an experiment or project folder → add or update its entry in the landing list, newest first:

| Field | Value |
|---|---|
| `id` | Folder name |
| `date` | Start date |
| `title` | Short title |
| `status` | See table above |
| `notes` | What is tested or built, then each later step |
| `result` | Once Decided / Done |
| `pages` | Label, file path in the folder, one-line description per page |

Copy the shape of the existing entries in the list.

Notes style: short lines, one fact per line, no prose. Explain why only when it decided something. First lines say what it is; each later change is one line starting with its date (`2026-11-03 — …`). Page descriptions are a few words.
