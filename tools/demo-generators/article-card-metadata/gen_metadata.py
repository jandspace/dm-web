"""Generates modules/article-card-metadata/index.html (Article Card Metadata demo page).

Run from the repo root:
    python3 tools/demo-generators/article-card-metadata/gen_metadata.py > modules/article-card-metadata/index.html
"""

COMMENTS = '''<a class="article-card-metadata__comments" href="#comments" aria-label="{n} comments"
            ><svg class="article-card-metadata__comments-icon" aria-hidden="true"><use href="#ico-speechbubble-ellipsis" /></svg
            ><span class="article-card-metadata__comments-count">{n}</span></a
          >'''

def channel(t):
    return f'<a class="article-card-metadata__channel" href="#channel"><span class="article-card-metadata__channel-text">{t}</span></a>'
def time(t, iso='2026-10-20T11:30'): return f'<time class="article-card-metadata__time" datetime="{iso}">{t}</time>'
def label(t): return f'<span class="article-card-metadata__label">{t}</span>'
def affiliate(t): return (f'<a class="article-card-metadata__affiliate" href="#affiliate" rel="sponsored noopener" target="_blank"'
    f'><span class="article-card-metadata__affiliate-text">{t}</span'
    f'><svg class="article-card-metadata__affiliate-icon" aria-hidden="true"><use href="#ico-square-arrow-up-right" /></svg></a>')

def row(info, n='9.9k'):
    info_html = f'<div class="article-card-metadata__info">{info}</div>' if info else '<div class="article-card-metadata__info"></div>'
    return f'''<div class="article-card-metadata">
          {info_html}
          {COMMENTS.format(n=n)}
        </div>'''

CTA = '''<div class="article-card-metadata article-card-metadata--cta">
          <a class="btn btn-brand btn--xs" href="#cta"
            ><span class="btn__content"
              ><svg width="1em" height="1em" aria-hidden="true"><use href="#ico-square-dashed" /></svg
              ><span class="btn__label">Button</span></span
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

SPRITE = '''    <svg style="display: none" aria-hidden="true">
      <symbol id="ico-speechbubble-ellipsis" viewBox="0 0 14 14">
        <path d="M13.6587 1.79014C13.4312 1.35381 13.0944 1.01783 12.6613 0.786569C12.2238 0.555311 11.6944 0.4375 11.0688 0.4375H2.94C2.31 0.4375 1.77625 0.555311 1.33875 0.786569C0.905625 1.01783 0.573125 1.35381 0.345625 1.79014C0.118125 2.22212 0 2.74572 0 3.36532V8.19993C0 8.81952 0.11375 9.34749 0.345625 9.78383C0.5775 10.2158 0.91 10.5474 1.33875 10.7787C1.77188 11.0099 2.2925 11.1277 2.89625 11.1277H3.23313V12.6593C3.23313 12.9385 3.30313 13.1567 3.43875 13.3182C3.57875 13.4796 3.77562 13.5625 4.025 13.5625C4.2 13.5625 4.36625 13.5189 4.51937 13.4272C4.6725 13.34 4.85625 13.2047 5.07063 13.0171L7.20562 11.1277H11.0644C11.69 11.1277 12.2194 11.0099 12.6569 10.7787C13.0944 10.5474 13.4269 10.2158 13.6544 9.78383C13.8819 9.34749 14 8.81952 14 8.19993V3.36532C14 2.74572 13.8863 2.22212 13.6544 1.79014H13.6587ZM4.64188 6.43713C4.4625 6.62039 4.24375 6.71202 3.98563 6.71202C3.7275 6.71202 3.50875 6.62039 3.325 6.43713C3.14563 6.25386 3.05813 6.0357 3.05813 5.78262C3.05813 5.52955 3.14563 5.31138 3.325 5.12812C3.50875 4.94486 3.7275 4.85322 3.98563 4.85322C4.24375 4.85322 4.4625 4.94486 4.64188 5.12812C4.82125 5.31138 4.90875 5.52955 4.90875 5.78262C4.90875 6.0357 4.82125 6.25386 4.64188 6.43713ZM7.665 6.43713C7.48125 6.62039 7.2625 6.71202 7.00875 6.71202C6.755 6.71202 6.53188 6.62039 6.34812 6.43713C6.16438 6.25386 6.0725 6.0357 6.0725 5.78262C6.0725 5.52955 6.16438 5.31138 6.34812 5.12812C6.53188 4.94486 6.75063 4.85322 7.00875 4.85322C7.26688 4.85322 7.48125 4.94486 7.665 5.12812C7.84875 5.31138 7.94062 5.52955 7.94062 5.78262C7.94062 6.0357 7.84875 6.25386 7.665 6.43713ZM10.6794 6.43713C10.5 6.62039 10.2812 6.71202 10.0231 6.71202C9.765 6.71202 9.55062 6.62039 9.36687 6.43713C9.1875 6.25386 9.1 6.0357 9.1 5.78262C9.1 5.52955 9.1875 5.31138 9.36687 5.12812C9.55062 4.94486 9.76937 4.85322 10.0231 4.85322C10.2769 4.85322 10.5 4.94486 10.6794 5.12812C10.8631 5.31138 10.955 5.52955 10.955 5.78262C10.955 6.0357 10.8631 6.25386 10.6794 6.43713Z" fill="currentColor" />
      </symbol>
      <symbol id="ico-square-arrow-up-right" viewBox="0 0 14 14">
        <path d="M12.6778 10.9278C12.6778 11.8922 11.8922 12.6778 10.9278 12.6778H3.07222C2.10778 12.6778 1.32222 11.8922 1.32222 10.9278V3.07222C1.32222 2.10778 2.10778 1.32222 3.07222 1.32222H6.52944V0.388889H3.07222C1.59056 0.388889 0.388889 1.59056 0.388889 3.07222V10.9239C0.388889 12.4056 1.59056 13.6072 3.07222 13.6072H10.9239C12.4056 13.6072 13.6072 12.4056 13.6072 10.9239V7.46667H12.6739V10.9239L12.6778 10.9278Z" fill="currentColor" />
        <path d="M10.9278 0.388889C10.9278 0.388889 10.9317 0.388889 10.9356 0.388889H8.85111C8.77333 0.388889 8.69167 0.412222 8.62556 0.455C8.55944 0.497778 8.50889 0.563889 8.47778 0.633889C8.44667 0.707778 8.43889 0.789444 8.45445 0.867222C8.47 0.945 8.50889 1.015 8.56333 1.07333L10.01 2.52L6.81722 5.71278C6.75889 5.77111 6.75889 5.86833 6.81722 5.92667L8.06944 7.17889C8.12778 7.23722 8.225 7.23722 8.28333 7.17889L11.4761 3.98611L12.9228 5.43278C12.9772 5.48722 13.0511 5.52611 13.1289 5.54167C13.2028 5.55722 13.2844 5.54944 13.3622 5.51833C13.4361 5.48722 13.4983 5.43667 13.5411 5.37056C13.5839 5.30444 13.6072 5.22667 13.6072 5.145V3.06444C13.6072 3.06444 13.6072 3.06833 13.6072 3.07222V0.388889H10.9239H10.9278Z" fill="currentColor" />
      </symbol>
      <symbol id="ico-square-dashed" viewBox="0 0 32 32">
        <path d="M12.733 32H6.893C3.093 32 0 28.907 0 25.107v-5.84h3.387v5.84c0 1.933 1.573 3.507 3.506 3.507h5.84V32zm19.267-19.267h-3.387V6.893c0-1.933-1.573-3.506-3.506-3.506h-5.84V0h5.84C28.907 0 32 3.093 32 6.893v5.84zM3.387 12.733H0V6.893C0 3.093 3.093 0 6.893 0h5.84v3.387h-5.84c-1.933 0-3.506 1.573-3.506 3.506v5.84zm21.72 19.267h-5.84v-3.387h5.84c1.933 0 3.507-1.573 3.507-3.506v-5.84H32v5.84C32 28.907 28.907 32 25.107 32z" fill="currentColor" />
      </symbol>
    </svg>'''

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
{SPRITE}

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
