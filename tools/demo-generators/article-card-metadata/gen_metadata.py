"""Generates modules/article-card-metadata/index.html (Article Card Metadata demo page).

Run from the repo root:
    python3 tools/demo-generators/article-card-metadata/gen_metadata.py > modules/article-card-metadata/index.html
"""

COMMENTS = '''<a class="article-card-metadata__comments" href="#comments" aria-label="{n} {word}"
            ><span class="icon icon--speechbubble-ellipsis article-card-metadata__comments-icon" aria-hidden="true"></span>{n}<span class="article-card-metadata__comments-word">{word}</span></a
          >'''

def comments(n):
    # The word always follows the count ("9.9k comments", "1 comment"); CSS hides it
    # where the count stands alone (SM Right Thumb · Channel + Timestamp below LG ·
    # Columnist under 300px)
    word = 'comment' if n == '1' else 'comments'
    return COMMENTS.format(n=n, word=word)

def channel(t):
    return f'<a class="article-card-metadata__channel" href="#channel"><span class="article-card-metadata__channel-text">{t}</span></a>'
def time(t, iso='2026-10-20T11:30'): return f'<time class="article-card-metadata__time" datetime="{iso}">{t}</time>'
def label(t): return f'<span class="article-card-metadata__label">{t}</span>'
def affiliate(t): return (f'<a class="article-card-metadata__affiliate" href="#affiliate" rel="sponsored noopener" target="_blank"'
    f'><span class="article-card-metadata__affiliate-text">{t}</span'
    f'><span class="icon icon--square-arrow-up-right article-card-metadata__affiliate-icon" aria-hidden="true"></span></a>')

def row(info, n='9.9k'):
    # info items sit straight in the row; the comments link pushes itself right
    info_html = f'{info}\n          ' if info else ''
    return f'''<div class="article-card-metadata">
          {info_html}{comments(n)}
        </div>'''

CTA = '''<div class="article-card-metadata article-card-metadata--cta">
          <a class="btn btn-brand btn--xs" href="#cta"><span class="icon icon--square-dashed" aria-hidden="true"></span>Button</a>
        </div>'''

# (label, note, default content, long content)
TYPES = [
  ('Channel Only', 'Channel links to its section', row(channel('Channel')), row(channel('Royal Family News'), '12.3k')),
  ('Timestamp Only', '', row(time('30m ago')), row(time('Updated 2 hours ago'), '12.3k')),
  ('Channel + Timestamp', '4px disc separator · below LG the count stands alone', row(channel('Channel') + time('30m ago')), row(channel('Royal Family News') + time('30m ago'), '12.3k')),
  ('Comment Only', 'Info slot empty', row('', '1'), row('', '12.3k')),
  ('Ad Feature', '', row(label('Ad Feature')), row(label('Ad Feature'), '12.3k')),
  ('Sponsored', '', row(label('Sponsored')), row(label('Sponsored by Brand Partner'), '12.3k')),
  ('Affiliate Content', 'External link', row(affiliate('Affiliate Content')), row(affiliate('Affiliate Content'), '12.3k')),
  ('CTA', 'XS brand button · no comments', CTA, CTA),
]

ANNOUNCE = {
  'scheduled': ('', 'Join Columnist in the comments', 'From 2.30pm'),
  'live': ('<span class="badge badge--xs badge--highlight columnist-announcement__badge"'
           '><span class="badge__label"><span class="badge__live" aria-hidden="true"></span>Live</span></span>', 'Columnist is in the comments', 'Join now'),
  'ended': ('', 'Columnist logged off', 'Read their comments'),
}

def columnist(mode, name='Columnist Name', role='Daily Mail Columnist', n='9.9k'):
    # The photo sits in the headline (Article Headline › Columnist photo), not here
    out = f'''<div class="article-card-metadata article-card-metadata--columnist">
          <div class="article-card-metadata__byline">
            <div class="article-card-metadata__author">
              <a class="article-card-metadata__author-name" href="#author">{name}</a>
              <span class="article-card-metadata__author-role">{role}</span>
            </div>
            {comments(n)}
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
{cell(columnist('normal'), 358, 'Normal mode shown. See the Columnist section below for Scheduled, Live and Ended. The photo sits in the headline — see Columnist Profile Photo.')}''')

rows.append(f'''      <!-- Columnist under 300px — the count stands alone -->
      <div class="demo-row-label">Columnist &lt;300px</div>
{cell(columnist('normal'), 280, 'Narrower than 300px: count without the word.')}''')

rows.append('      <div class="demo-group-header"><span class="demo-group-title">Columnist</span></div>')
for name, a, b in COLUMNIST:
    rows.append(f'''      <!-- Columnist · {name} -->
      <div class="demo-row-label">{name}</div>
{cell(a, 358)}''')

body = "\n\n".join(rows)
print(f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Article Card Metadata</title>
    <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml" />
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
      The columnist's photo has its own page (Columnist Profile Photo) and sits in the headline.
    </p>

    <!-- Structure:
           .article-card-metadata
             channel link · time · ad label · affiliate link — one or two, or none (straight in the row)
             .article-card-metadata__comments  — speech-bubble icon + count, links to comments (pushed right)
           CTA type: .article-card-metadata--cta holding a .btn.btn-brand.btn--xs -->
    <div class="demo-grid demo-grid--metadata">
{body}
    </div>
  </body>
</html>''')
