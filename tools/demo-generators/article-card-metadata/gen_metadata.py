"""Generates modules/article-card-metadata/index.html (Article Card Metadata demo page).

Run from the repo root:
    python3 tools/demo-generators/article-card-metadata/gen_metadata.py > modules/article-card-metadata/index.html
"""

COMMENTS = '''<a class="article-card-metadata__comments" href="#comments" aria-label="{n} comments"
            ><span class="icon icon--speechbubble-ellipsis article-card-metadata__comments-icon" aria-hidden="true"></span><span class="article-card-metadata__comments-count">{n}</span></a
          >'''

def channel(t):
    return f'<a class="article-card-metadata__channel" href="#channel"><span class="article-card-metadata__channel-text">{t}</span></a>'
def time(t, iso='2026-10-20T11:30'): return f'<time class="article-card-metadata__time" datetime="{iso}">{t}</time>'
def label(t): return f'<span class="article-card-metadata__label">{t}</span>'
def affiliate(t): return (f'<a class="article-card-metadata__affiliate" href="#affiliate" rel="sponsored noopener" target="_blank"'
    f'><span class="article-card-metadata__affiliate-text">{t}</span'
    f'><span class="icon icon--square-arrow-up-right article-card-metadata__affiliate-icon" aria-hidden="true"></span></a>')

def row(info, n='9.9k'):
    info_html = f'<div class="article-card-metadata__info">{info}</div>' if info else '<div class="article-card-metadata__info"></div>'
    return f'''<div class="article-card-metadata">
          {info_html}
          {COMMENTS.format(n=n)}
        </div>'''

CTA = '''<div class="article-card-metadata article-card-metadata--cta">
          <a class="btn btn-brand btn--xs" href="#cta"
            ><span class="btn__content"
              ><span class="icon icon--square-dashed" aria-hidden="true"></span><span class="btn__label">Button</span></span
            ></a
          >
        </div>'''

# (label, note, default content, long content)
TYPES = [
  ('Channel Only', 'Channel links to its section', row(channel('Channel')), row(channel('Royal Family News'), '12.3k')),
  ('Timestamp Only', '', row(time('30m ago')), row(time('Updated 2 hours ago'), '12.3k')),
  ('Channel + Timestamp', '4px disc separator', row(channel('Channel') + time('30m ago')), row(channel('Royal Family News') + time('30m ago'), '12.3k')),
  ('Comment Only', 'Info slot empty', row(''), row('', '12.3k')),
  ('Ad Feature', '', row(label('Ad Feature')), row(label('Ad Feature'), '12.3k')),
  ('Sponsored', '', row(label('Sponsored')), row(label('Sponsored by Brand Partner'), '12.3k')),
  ('Affiliate Content', 'External link', row(affiliate('Affiliate Content')), row(affiliate('Affiliate Content'), '12.3k')),
  ('CTA', 'XS brand button · no comments', CTA, CTA),
]

ANNOUNCE = {
  'scheduled': ('', 'Join Columnist in the comments', 'From 2.30pm'),
  'live': ('<span class="badge badge--xs badge--highlight columnist-announcement__badge"'
           '><span class="badge__label"><span class="badge__live-indicator" aria-hidden="true"><span class="badge__live-dot"></span></span'
           '><span class="badge__text">Live</span></span></span>', 'Columnist is in the comments', 'Join now'),
  'ended': ('', 'Columnist logged off', 'Read their comments'),
}

def columnist(mode, name='Columnist Name', role='Daily Mail Columnist', n='9.9k'):
    live = ' columnist-photo--live' if mode == 'live' else ''
    out = f'''<div class="article-card-metadata article-card-metadata--columnist">
          <div class="article-card-metadata__columnist">
            <div class="article-card-metadata__byline">
              <div class="article-card-metadata__author">
                <a class="article-card-metadata__author-name" href="#author">{name}</a>
                <span class="article-card-metadata__author-role">{role}</span>
              </div>
              {COMMENTS.format(n=n)}
            </div>
            <a class="columnist-photo columnist-photo--lg{live}" href="#author" tabindex="-1" aria-hidden="true"
              ><img class="columnist-photo__img" src="../../assets/images/columnist-placeholder.png" alt="{name}"
            /></a>
          </div>'''
    if mode in ANNOUNCE:
        badge, text, action = ANNOUNCE[mode]
        out += f'''
          <a class="columnist-announcement columnist-announcement--{mode}" href="#comments"
            ><span class="columnist-announcement__text">{badge}{text}</span
            ><span class="columnist-announcement__action">{action}</span></a
          >'''
    return out + '\n        </div>'

COLUMNIST = [
  ('Normal', columnist('normal'), columnist('normal', 'Alexandra Montgomery-Smith', 'Associate Editor')),
  ('Scheduled', columnist('scheduled'), columnist('scheduled', 'Alexandra Montgomery-Smith', 'Associate Editor')),
  ('Live', columnist('live'), columnist('live', 'Alexandra Montgomery-Smith', 'Associate Editor')),
  ('Ended', columnist('ended'), columnist('ended', 'Alexandra Montgomery-Smith', 'Associate Editor')),
]

def cell(html, width, note=''):
    note_html = f'\n        <p class="demo-metadata-note demo-metadata-note--aside">{note}</p>' if note else ''
    return f'''      <div class="demo-cell">
        <div class="demo-metadata-sample demo-metadata-sample--{width}">
        {html}
        </div>{note_html}
      </div>'''

rows = ['      <div class="demo-group-header"><span class="demo-group-title">Standard</span></div>']
for name, note, a, b in TYPES:
    note_html = f'<small class="demo-metadata-note">{note}</small>' if note else ''
    rows.append(f'''      <!-- {name} -->
      <div class="demo-row-label">{name}</div>
{cell(a, 358)}''')

rows.append(f'''      <!-- Columnist (Normal) — full set of modes in the Columnist group below -->
      <div class="demo-row-label">Columnist</div>
{cell(columnist('normal'), 358, 'Normal mode shown. See the Columnist section below for Scheduled, Live and Ended.')}''')

rows.append('      <div class="demo-group-header"><span class="demo-group-title">Columnist</span></div>')
for name, a, b in COLUMNIST:
    rows.append(f'''      <!-- Columnist · {name} -->
      <div class="demo-row-label">{name}</div>
{cell(a, 358)}''')

SIZES = [('xs', 20), ('sm', 32), ('md', 48), ('lg', 64), ('xl', 80), ('xxl', 96), ('xxxl', 112)]
def photos(kind):
    img = 'columnist-placeholder-circle.png' if kind == 'circle' else 'columnist-placeholder.png'
    mod = ' columnist-photo--circle' if kind == 'circle' else ''
    return '\n'.join(f'''          <figure class="demo-photo">
            <span class="columnist-photo columnist-photo--{s}{mod}"
              ><img class="columnist-photo__img" src="../../assets/images/{img}" alt=""
            /></span>
            <figcaption class="demo-photo__size">{s.upper()} - {px}</figcaption>
          </figure>''' for s, px in SIZES)

# Author profiles' background (Figma) — label → section modifier → background/{token}/subtle.
# Figma hex values match the tokens except Crime Desk (#6B7B8C vs crime-petrol/subtle #678893).
PHOTO_COLOURS = [
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
COLOUR_OPTIONS = '\n'.join(f'        <option value="{v}">{label} — {token}/subtle</option>' for v, label, token in PHOTO_COLOURS)

PHOTO_SECTION = f'''
    <h2 class="demo-section-title">Columnist Profile Photo</h2>
    <p class="demo-metadata-note">Sizes xs 20 · sm 32 · md 48 · lg 64 (default) · xl 80 · xxl 96 · xxxl 112 — Rectangle (top) and Circle (bottom). Live adds the green dot (.columnist-photo--live).</p>
    <!-- Disc colour per channel (author profiles' background): .columnist-photo--{{section}} → background/{{section}}/subtle -->
    <div class="demo-vp-toolbar">
      <label for="demo-photo-colour">Background</label>
      <select class="demo-vp-select" id="demo-photo-colour" autocomplete="off">
{COLOUR_OPTIONS}
      </select>
      <span class="demo-vp-toolbar__divider" aria-hidden="true"></span>
      <span id="demo-photo-live-label">Live</span>
      <div class="demo-vp-toggle" role="group" aria-labelledby="demo-photo-live-label" id="demo-photo-live">
        <button type="button" data-live="off" aria-pressed="true">Off</button>
        <button type="button" data-live="on" aria-pressed="false">On</button>
      </div>
    </div>
    <div class="demo-photo-rows" id="demo-photo-rows">
      <div class="demo-photo-row">
{photos('rect')}
      </div>
      <div class="demo-photo-row">
{photos('circle')}
      </div>
    </div>'''

body = "\n\n".join(rows)
print(f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Article Card Metadata</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../tokens/dm_tokens.css" />
    <link rel="stylesheet" href="../../tokens/dm_typography_web_tokens.css" />
    <link rel="stylesheet" href="../../styles/css/main.css" />
    <script src="../../scripts/scaffolding/demo-nav.js" defer></script>
  </head>
  <body class="demo-page-body">
    <h1 class="demo-page-h1">Article Card Metadata</h1>
    <p class="demo-page-intro">
      Bottom row of the article card — info on the left, comment counter on the right. Same at every breakpoint.
      Columnist rows show the four live-comment modes: Normal, Scheduled, Live and Ended.
    </p>

    <!-- Structure:
           .article-card-metadata
             .article-card-metadata__info      — channel link · time · ad label · affiliate link (one or two, or empty)
             .article-card-metadata__comments  — speech-bubble icon + count, links to comments
           CTA type: .article-card-metadata--cta holding a .btn.btn-brand.btn--xs -->
    <div class="demo-grid demo-grid--metadata">
{body}
    </div>
{PHOTO_SECTION}

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
