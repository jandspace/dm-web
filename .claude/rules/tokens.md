---
paths:
  - "tokens/**"
  - "tools/token-build/**"
  - "styles/scss/foundation/**"
---

# Tokens

## Files

| File | Holds | Edit? |
|---|---|---|
| `tokens/dm_tokens.json` | Figma export: colour, spacing, border radius | Replace with a new Figma export |
| `tokens/dm_tokens.css` | `--color-*`, `--number-*` | **Generated.** Never by hand |
| `tokens/dm_typography_web_tokens.json` | Figma export: web typography | Replace with a new Figma export |
| `tokens/dm_typography_web_tokens.css` | Web typography custom properties. The only home of font family, weights, sizes | By hand, in sync with its JSON |
| `tokens/dm_typography_app_tokens.json` | Figma export: iOS / Android typography | Replace with a new Figma export |

After a Figma export: `python3 tools/token-build/build_dm_tokens.py > tokens/dm_tokens.css`. The generator groups tokens by path (category › context › variant) in Colour Tokens doc order, and writes the CSS header version from the JSON.

## Two layers

- **Primitive:** raw values, never used in UI. CSS `--primitive-colors-{hue}-{scale}` (e.g. `--primitive-colors-blue-500`). JSON `Foundation > Primitive Colors/{Hue}/{Scale}`.
- **Semantic:** aliases of primitives, used in UI. CSS `--color-{category}-{context}-{variant}` (e.g. `--color-background-neutral-white`). JSON `isAlias: true` pointing at the Foundation collection.
- Colour categories: `color/background/*` (fills), `color/text/*`, `color/border/*` (strokes), `color/icon/*`.

## JSON schema

```json
{
  "version": "x.y.z",
  "collections": [
    {
      "name": "Collection Name",
      "modes": [
        {
          "name": "Mode Name",
          "variables": [
            {
              "name": "token/path/name",
              "type": "color | string | float",
              "isAlias": true,
              "value": "<raw value> | { collection, name }"
            }
          ]
        }
      ]
    }
  ]
}
```

## Versioning

All token files share one version string. Read the current one from `tokens/dm_tokens.json`; don't trust a number written anywhere else.
When tokens change, bump the `version` in every JSON file and the matching CSS comment headers together.

## SCSS aliases (`styles/scss/foundation/`)

- `--spacing-N` → `--number-spacing-N` (`_spacing.scss`)
- `--border-radius-N` → `--number-border-radius-N` (`_border-radius.scss`)
- `--elevation-1…5` from Figma effect styles Elevation Lv-1…5 (`_elevation.scss`)
