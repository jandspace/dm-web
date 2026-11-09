"""Generates modules/columnist-profile-photo/index.html (Columnist Profile Photo demo page).

Run from the repo root:
    python3 tools/demo-generators/columnist-profile-photo/gen_photo.py > modules/columnist-profile-photo/index.html
"""

SIZES = [('xs', 20), ('sm', 32), ('md', 48), ('lg', 64), ('xl', 80), ('xxl', 96), ('xxxl', 112)]


def photos(kind):
    img = 'columnist-placeholder-circle.png' if kind == 'circle' else 'columnist-placeholder.png'
    mod = ' columnist-photo--circle' if kind == 'circle' else ''
    return '\n'.join(f'''        <figure class="demo-photo">
          <span class="columnist-photo columnist-photo--{s}{mod}"
            ><img class="columnist-photo__img" src="../../assets/images/{img}" alt=""
          /></span>
          <figcaption class="demo-photo__size">{s.upper()} - {px}</figcaption>
        </figure>''' for s, px in SIZES)


# Author profiles' background (Figma) — label → section modifier → background/{token}/subtle.
# Figma hex values match the tokens except Crime Desk (#6B7B8C vs crime-petrol/subtle #678893).
COLOURS = [
    ('', 'Columnist and x-channel writers', 'home-blue'),
    ('news', 'News', 'news-cyan'),
    ('showbiz', 'Showbiz', 'showbiz-red'),
    ('sport', 'Sport', 'sport-green'),
    ('royals', 'Royal', 'royals-violet'),
    ('money', 'TiM', 'money-purple'),
    ('lifestyle', 'Lifestyle', 'lifestyle-azure'),
    ('health', 'Health', 'health-turquoise'),
    ('science', 'Science', 'science-orange'),
    ('crime', 'Crime Desk', 'crime-petrol'),
]
OPTIONS = '\n'.join(f'        <option value="{v}">{label} — {token}/subtle</option>' for v, label, token in COLOURS)

print(f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Columnist Profile Photo</title>
    <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../tokens/dm_tokens.css" />
    <link rel="stylesheet" href="../../tokens/dm_typography_web_tokens.css" />
    <link rel="stylesheet" href="../../styles/css/main.css" />
    <script src="../../scripts/scaffolding/demo-nav.js" defer></script>
  </head>
  <body class="demo-page-body">
    <h1 class="demo-page-h1">Columnist Profile Photo</h1>
    <p class="demo-page-intro">
      The columnist's cut-out portrait on a channel-coloured disc. In an article card it sits on the right of a
      columnist's quote headline (Article Headline › Quote Headline) — default size by level: H2 xl 80 · H3–H5 lg 64 · H6 md 48.
      Rectangle (head rises above the disc) is the default; Circle clips a square portrait. Live adds the green dot.
    </p>

    <!-- Markup:
           <span class="columnist-photo columnist-photo--{{size}} [--circle] [--live] [--{{section}} | --{{section}}-base]">
             <img class="columnist-photo__img" src="…" alt="Name" />
           </span>
         In a card it is a link to the author page: <a class="columnist-photo" href="…" tabindex="-1" aria-hidden="true">.
         Disc colour per channel (author profiles' background): --{{section}} → background/{{section}}/subtle -->
    <div class="demo-vp-toolbar">
      <label for="demo-photo-colour">Background</label>
      <select class="demo-vp-select" id="demo-photo-colour" autocomplete="off">
{OPTIONS}
      </select>
      <span class="demo-vp-toolbar__divider" aria-hidden="true"></span>
      <span id="demo-photo-live-label">Live</span>
      <div class="demo-vp-toggle" role="group" aria-labelledby="demo-photo-live-label" id="demo-photo-live">
        <button type="button" data-live="off" aria-pressed="true">Off</button>
        <button type="button" data-live="on" aria-pressed="false">On</button>
      </div>
    </div>

    <div class="demo-photo-rows" id="demo-photo-rows">
      <h2 class="demo-section-title">Rectangle</h2>
      <div class="demo-photo-row">
{photos('rect')}
      </div>
      <h2 class="demo-section-title">Circle</h2>
      <div class="demo-photo-row">
{photos('circle')}
      </div>
    </div>

    <script>
      // Scaffolding only — Background swaps the disc colour modifier, Live toggles
      // the live dot, on every photo above.
      (() => {{
        const select = document.getElementById('demo-photo-colour');
        const live = document.getElementById('demo-photo-live');
        const photos = document.querySelectorAll('#demo-photo-rows .columnist-photo');
        live.addEventListener('click', (event) => {{
          const button = event.target.closest('button[data-live]');
          if (!button) return;
          live.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
          photos.forEach((photo) => photo.classList.toggle('columnist-photo--live', button.dataset.live === 'on'));
        }});
        const sections = [...select.options].map((o) => o.value).filter(Boolean);
        select.addEventListener('change', () => {{
          photos.forEach((photo) => {{
            sections.forEach((s) => photo.classList.remove(`columnist-photo--${{s}}`));
            if (select.value) photo.classList.add(`columnist-photo--${{select.value}}`);
          }});
        }});
      }})();
    </script>
  </body>
</html>''')
