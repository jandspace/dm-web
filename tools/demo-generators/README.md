# Demo generators

Some component demo pages are **generated** — edit the generator, not the HTML.
Hand edits to a generated page are lost the next time it is regenerated.

| Generated page | Generator |
| --- | --- |
| `modules/article-card/index.html` | `article-card/gen_card.py` + `article-card/card_template.html` |
| `modules/article-card-metadata/index.html` | `article-card-metadata/gen_metadata.py` |

Run from the repo root (Python 3, no dependencies):

```bash
python3 tools/demo-generators/article-card/gen_card.py > modules/article-card/index.html
python3 tools/demo-generators/article-card-metadata/gen_metadata.py > modules/article-card-metadata/index.html
```

- `gen_card.py` builds the card markup; `card_template.html` holds the page shell,
  toolbar (Viewport / Badge / Preview / Metadata) and the demo script. `{body}` in
  the template is replaced with the generated cards.
- After regenerating, check the page in the browser (hard refresh — see CLAUDE.md
  › Local preview).
- Not generated: `modules/article-card/viewports.html` and the other component
  demo pages are edited by hand.
