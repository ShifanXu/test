# Website Workflow

This repository is a pure static academic website. There is no build system, no framework, and no server-side code. The site is intended to work directly on GitHub Pages.

## Stack

- HTML for page structure
- CSS in `css/style.css`
- Vanilla JavaScript for shared data rendering

## Main Files

- `index.html`
  Homepage. Contains the hero, research summary, selected publications, news, and a lightweight teaching summary.
- `research.html`
  Research subpage.
- `publications.html`
  Full publication list page.
- `teaching.html`
  Teaching and mentoring page.
- `service.html`
  Service page.
- `contact.html`
  Contact page.
- `css/style.css`
  Shared global styles for all pages.

## Shared Data Files

- `js/publications.js`
  Central publication database plus author database and alias mapping.
- `js/news.js`
  News/update data for homepage and `news.html`.
- `js/teaching.js`
  Teaching data used by `teaching.html`.

## Rendering Files

- `js/home.js`
  Renders homepage selected publications and news.
  Note: homepage teaching is currently static in `index.html`, not rendered from `js/teaching.js`.
- `js/publications-page.js`
  Renders the full publications page.
- `js/news-page.js`
  Renders the full news page.
- `js/teaching-page.js`
  Renders the full teaching page.

## Important Conventions

### Publications

Publications are stored in `js/publications.js` as objects in the `publications` array.

Typical fields:

```js
{
  title: "...",
  authors: ["Author A", "Author B"],
  venue: "ASPLOS",
  venueFull: "Architectural Support for Programming Languages and Operating Systems (ASPLOS)",
  year: 2025,
  sortDate: "2025-02",
  selected: true,
  links: [
    { label: "DOI", url: "..." },
    { label: "arXiv", url: "..." }
  ]
}
```

Rules:

- `selected: true` controls whether a publication can appear on the homepage.
- Homepage currently shows the top 3 selected publications.
- `sortDate` is used for ordering. More recent dates sort first.
- `venue` is the short venue used on the homepage.
- `venueFull` is used on `publications.html`.

### Author Links

Author links are managed centrally in `js/publications.js`.

- `authorDirectory`
  Maps canonical author names to personal pages.
- `authorAliases`
  Maps name variants to canonical names.

Preferred workflow:

1. Add a canonical author entry to `authorDirectory`
2. Add common alternate spellings to `authorAliases` if needed
3. In publication entries, use author names as strings whenever possible

Example:

```js
const authorDirectory = {
  "Shifan Xu": "https://www.shifanxu.com"
};

const authorAliases = {
  "Shifan XU": "Shifan Xu"
};
```

Then in a paper:

```js
authors: ["Shifan Xu", "Yongshan Ding"]
```

Behavior:

- On `publications.html`, authors are hyperlinked when a matching author is found.
- On the homepage publication block, author names are plain text.
- `Shifan Xu` is styled with a distinct but subtle color across publication displays.

## Homepage-Specific Notes

- Homepage research summary cards are static in `index.html`.
- Homepage teaching block is static in `index.html`.
- Homepage news comes from `js/news.js`.
- Homepage selected publications come from `js/publications.js`.

If you want homepage and subpage content to stay tightly synced, update both places when needed.

## Teaching Workflow

- Full teaching entries live in `js/teaching.js`
- `teaching.html` uses `js/teaching-page.js` to render those entries
- Homepage teaching is intentionally separate and simplified

When updating teaching:

1. Update `js/teaching.js` for the full page
2. Update the homepage teaching block in `index.html` only if needed

## News Workflow

- Full news entries live in `js/news.js`
- Homepage selected news also comes from `js/news.js`
- `news.html` still exists but is currently hidden from main site navigation

## Hidden/Secondary Pages

- `news.html` exists but is hidden from primary navigation
- `service.html` is visible in navigation

Hidden means:

- The file is still present
- Direct access still works
- It is simply not exposed from the main navigation or homepage links

## Styling Workflow

All shared style changes should go through `css/style.css`.

Important areas:

- Hero layout and spacing
- Nav appearance
- Card spacing
- Publication typography
- Footer styling

Before changing styles, check whether the rule is global or homepage-specific. Many homepage adjustments are scoped with selectors such as:

- `.home-news`
- `.home-publications`
- `.home-teaching`
- `.hero-copy`

## CV Synchronization

The repo also includes a CV source tree:

- `Shifan_Xu_CV/cv.tex`
- `Shifan_Xu_CV/cv/*.tex`

Relevant CV sections:

- `Shifan_Xu_CV/cv/publications.tex`
- `Shifan_Xu_CV/cv/mentoring.tex`
- `Shifan_Xu_CV/cv/extracurricular.tex`
- `Shifan_Xu_CV/cv/teaching.tex`

Current pattern:

- Website publication data is the most up-to-date source for publications
- CV mentoring and service files may contain older but useful factual details

Recommended sync direction:

1. Read website publication data first for latest papers
2. Read CV mentoring/service files for factual older entries
3. Apply updates to both website and CV if asked

## Local Preview

To preview locally:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Safe Update Checklist

When making changes:

1. Update the relevant shared data file if content is data-driven
2. Update static HTML if that section is intentionally not data-driven
3. Check whether homepage and subpage are coupled or intentionally separate
4. Preserve relative links
5. Avoid introducing build tools or dependencies

## Current Intentional Decisions

- Pure static site only
- No React, no templating, no npm dependencies
- Publications use shared data
- News uses shared data
- Full teaching page uses shared data
- Homepage teaching is static and intentionally shorter
- Homepage publication venue uses short names
- Publication subpage uses full venue names

## If You Are a New AI Editing This Repo

Start with these files:

1. `index.html`
2. `css/style.css`
3. `js/publications.js`
4. `js/home.js`
5. any subpage directly related to the requested change

Do not assume homepage and subpages are always fully coupled. Check whether a section is static or data-driven before editing.
