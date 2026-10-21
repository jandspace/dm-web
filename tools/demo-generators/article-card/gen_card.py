"""Generates components/article-card/index.html (Article Card demo page).

Card markup is built here; the page shell, toolbar and demo script live in
card_template.html ({body} is replaced with the generated cards).

Run from the repo root:
    python3 tools/demo-generators/article-card/gen_card.py > components/article-card/index.html
"""

HEADLINE = "Headline of Daily Mail article preview card - lorem ipsum dolor sit amet, con sectetur adipiscing jand"
IMG = '<img src="../../assets/images/article-card-placeholder.png" alt="" />'
IMG_PORTRAIT = '<img src="../../assets/images/article-card-placeholder-portrait.png" alt="" />'
BADGE_SIZE = {2: "lg", 3: "md", 4: "md", 5: "sm", 6: "xs"}
MPLUS = '<span class="badge__mplus"><img src="../../assets/images/mail-plus-lozenge.svg" alt="M+" /></span>'
# Article Card Metadata — Channel Only (components/article-card-metadata)
META = ('<div class="article-card__metadata article-card-metadata">'
        '<div class="article-card-metadata__info">'
        '<a class="article-card-metadata__channel" href="#channel"><span class="article-card-metadata__channel-text">Channel</span></a>'
        '</div>'
        '<a class="article-card-metadata__comments" href="#comments" aria-label="9.9k comments">'
        '<svg class="article-card-metadata__comments-icon" aria-hidden="true"><use href="#ico-speechbubble-ellipsis" /></svg>'
        '<span class="article-card-metadata__comments-count">9.9k</span></a>'
        '</div>')


def headline(level, kind, indent):
    pad = " " * indent
    if kind is None:
        return f'{pad}<h{level} class="h{level} article-headline"><a class="article-card__link" href="#article">{HEADLINE}</a></h{level}>'
    size = BADGE_SIZE[level]
    mplus = MPLUS if kind == "mplus" else ""
    return "\n".join([
        f'{pad}<h{level} class="h{level} article-headline">',
        f'{pad}  <span class="badge badge--{size} badge--highlight article-headline__badge"',
        f'{pad}    >{mplus}<span class="badge__label"><span class="badge__text">Exclusive</span></span></span',
        f'{pad}  >{HEADLINE}',
        f'{pad}</h{level}>',
    ])


IMAGE_ONLY_HEADLINE = "Lorem ipsum dolor sit amet, con sectetur ad ipiscing elit, pellente sque"


def image_only(scale, level, span=""):
    """Image Only card — headline + Read more over the image, badge signposted top-left."""
    cls = f"article-card article-card--image-only article-card--image-only-{scale}" + (f" {span}" if span else "")
    img = IMG_PORTRAIT if scale == "medium" else IMG
    return "\n".join([
        f'    <article class="{cls}">',
        '      <div class="article-card__media">',
        f'        {img}',
        '        <div class="article-card__overlay">',
        '          <div class="article-card__scrim"></div>',
        '          <div class="article-card__overlay-content">',
        f'            <h{level} class="h{level} article-headline"><a class="article-card__link" href="#article">{IMAGE_ONLY_HEADLINE}</a></h{level}>',
        '            <span class="btn btn-quaternary-dark btn--xs article-card__read-more" aria-hidden="true"',
        '              ><span class="btn__content"><span class="btn__label">Read more</span',
        '                ><svg width="1em" height="1em"><use href="#ico-arrow-right-light" /></svg></span',
        '            ></span>',
        '          </div>',
        '        </div>',
        '        <div class="article-card__signpost"></div>',
        '      </div>',
        f'      {META}',
        '    </article>'])


def card(type_mod, level, kind=None, span=""):
    cls = f"article-card article-card--{type_mod}" + (f" {span}" if span else "")
    img = IMG_PORTRAIT if type_mod == "md-vertical" else IMG
    media = f'      <div class="article-card__media">{img}</div>'
    if type_mod == "md-vertical":
        return "\n".join([
            f'    <article class="{cls}">',
            headline(level, kind, 6),
            media,
            f'      {META}',
            '    </article>'])
    return "\n".join([
        f'    <article class="{cls}">',
        media,
        '      <div class="article-card__body">',
        headline(level, kind, 8),
        f'        {META}',
        '      </div>',
        '    </article>'])


def section(title, note, cards):
    return "\n".join([
        '    <!-- ════════════════════════════════════════════════════',
        f'         {title.upper()}',
        f'         {note}',
        '    ════════════════════════════════════════════════════ -->',
        '    <div class="demo-card-section demo-span-3">',
        f'      <div class="demo-card-section__title">{title}</div>',
        f'      <p class="demo-card-section__note">{note}</p>',
        '    </div>',
        "\n\n".join(cards)])


trio = [None]
sections = [
    ("XL", "2 columns (or full width) · media 358:215 · H2",
     [card("xl", 2, None, "demo-span-2")]),
    ("XL (Horizontal)", "2 columns · text left, media right from MD · media 358:215 · H3",
     [card("xl-horizontal", 3, None, "demo-span-2")]),
    ("XL (Triple)", "Full width · 50/50 split from LG · media 358:215 · H2",
     [card("xl-triple", 2, None, "demo-span-3")]),
    ("MD (Vertical Media)", "1 column · headline, portrait media 2:3, metadata · H2",
     [card("md-vertical", 2, k) for k in trio]),
    ("MD", "1 column · media 358:215 · H4",
     [card("md", 4, k) for k in trio]),
    ("SM: Left Thumb", "1 column · thumbnail 4:3 on the left (XL 152 · LG 120 · MD/SM-XS 128px) · H5",
     [card("sm-left", 5, k) for k in trio]),
    ("SM: Right Thumb", "1 column · thumbnail 4:3 on the right from LG, on the left at MD and SM-XS · H6",
     [card("sm-right", 6, k) for k in trio]),
    ("Image Only (Large)", "2 columns · headline on the image · media 358:215 (SM-XS 15:16) · H3 · badge top-left",
     [image_only("large", 3, "demo-span-2")]),
    ("Image Only (Medium)", "1 column · headline on the image · media 15:16 · H4 · badge top-left",
     [image_only("medium", 4)]),
]

body = "\n\n".join(section(*s) for s in sections)
TEMPLATE = open(__file__.replace('gen_card.py', 'card_template.html')).read()
print(TEMPLATE.replace('{body}', body), end='')
