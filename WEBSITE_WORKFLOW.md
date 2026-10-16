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
  Research subpage. Retained in the repository but currently hidden from site navigation and homepage links.
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
  equalContributors: ["Author A", "Author B"],
  contributionNote: "* Co-first authors.",
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
- `equalContributors` is optional and marks listed authors with a superscript `*`.
- `contributionNote` is optional display text for the contribution marker.

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
- Keep the existing homepage introduction and headline unless the user explicitly
  requests a rewrite; strengthening CV research descriptions does not imply a bio rewrite.

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
- `research.html` exists but is hidden from primary navigation and homepage links; keep its
  `noindex, nofollow` robots directive while the page is hidden
- `service.html` is visible in navigation

Hidden means:

- The file is still present
- Direct access still works
- It is simply not exposed from the main navigation or homepage links
- For `research.html`, search engines are also asked not to index or follow the page

## Styling Workflow

All shared style changes should go through `css/style.css`.

The mobile header collapse point must remain below the full expanded header height. Keep a
wide hysteresis gap between collapse and expand thresholds so changing the sticky header height
cannot make the two states trigger each other while the user is stationary.

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
- `Shifan_Xu_CV/cv/research.tex`
- `Shifan_Xu_CV/cv/software.tex`

The CV is a single research CV for quantum computing faculty and industry research roles.
Do not impose a three-page limit or add a long opening profile paragraph. Preserve the
traditional academic CV format: separate education/visiting appointments, expanded conference
and proceedings names, individually dated awards, and clearly separated service entries.
Let the content determine the page count; keep headings with their following entries.
Retain the confirmed research, software, teaching, and mentoring updates when changing layout. `professional.tex` is maintained as an optional appointments
record but is not included, to avoid repeating research and teaching roles.

### Publication and contribution status

- Keep manuscripts in preparation distinct from public preprints and accepted/published papers.
- The QRAM error-correction paper is public as arXiv:2610.17185 (submitted
  October 12, 2026; announcement October 14). Use the public title
  "Error-Corrected QRAM Queries with One-Fault-Tolerant CSWAP Gates",
  `status: "preprint"`, and its arXiv link. List it under preprints in both CVs,
  not manuscripts in preparation; keep `selected: false`.
- QCE 2026 acceptance is verified, but a proceedings DOI has not been verified
  as of October 16, 2026. Display the conference name and year without an
  "accepted" suffix; retain the arXiv link and internal acceptance status.
- FTCircuitBench was accepted by ACM Transactions on Quantum Computing (TQC)
  on September 24, 2026, confirmed by the journal decision email. List it among
  accepted papers in both CVs, retain arXiv:2601.03185, and keep `selected: false`
  on the website. Display only the journal name and year for this entry in the
  website and both CVs: do not append "accepted" or prepend "Accepted for
  publication in". Acceptance may remain internal status metadata. Do not add
  a journal DOI, volume, or pages until verified.
- Nathan Wiebe's author-directory link is his official University of Toronto
  profile: `https://www.physics.utoronto.ca/members/wiebe-nathan/` (verified
  September 25, 2026 through the department's faculty directory).
- Full-stack qLDPC resource estimation and AI for quantum architecture are ongoing directions;
  do not turn preliminary estimates or exploratory plans into completed-result claims.
- The current academic research framing is algorithm-driven architecture for
  fault-tolerant quantum computing. Use the candidate's current job-market
  statements as evidence, not older source-audit snapshots. Do not copy or
  publish those private statements, application notes, or email bodies.
- Keep research-experience descriptions direct and concise: name what was studied,
  then the resulting project. The PNNL entry says "Studied QRAM security, leading
  to the OQRAM project." Retain co-first-author credit in the publication entry
  rather than repeating authorship and preprint status in research experience.
- In the academic CV, the Yale research entry lists three short topic bullets:
  "Quantum memory systems", "Magic-state factory design", and "End-to-end
  algorithm-level fault tolerance". Do not expand these into project narratives,
  methods, performance figures, or publication summaries. This editorial choice
  does not replace the separately tailored industry CV's project details.
- For the January-May 2024 University of Chicago visit, hosted by Prof. Liang
  Jiang, describe studying QRAM architectures and qLDPC error correction, with
  the QRAM work leading to Fat-Tree QRAM (ASPLOS 2025). Emphasize what was learned,
  not "initiated subsequent qLDPC research projects"; do not imply that Fat-Tree
  QRAM is a qLDPC project.
- The PennyLane QRAM tutorial (August 30, 2026) is a coauthored tutorial, not a peer-reviewed paper.
  Its visible website entry lives in `service.html`, the CV entry lives in `cv/software.tex`, and its launch is in `js/news.js`.
  `research.html#software` retains a longer description while that page is hidden.
  The candidate confirmed developing almost all of the demo: describe the
  implementation contribution directly while retaining all collaboration credit.
- The 2026 TA assignment is CPSC 4310/5310, Computer Music: Algorithmic and Heuristic Composition;
  the earlier 2022–2023 assignment is CPSC 4470/5470, Introduction to Quantum Computing.
- The candidate confirmed on October 16 that the 2022–2023 TA record covers
  two offerings of the same quantum computing course, not two distinct courses.
  The RPI guest lecture was for CSCI 4965/6965, Quantum Computer System.
- Keep the Fall 2026 CV teaching entry to the course and instructor; omit the
  programming-project guidance and grading description.
- Yale's Certificate of College Teaching Preparation is in progress, expected
  December 2026; workshops and learning communities are complete. Do not list
  the certificate as awarded until completion is confirmed.
- The Italy mentoring entry is informal bachelor's-thesis guidance, not a
  faculty appointment or formal thesis-supervisor role. The verified review
  covered circuit logic, not the student's full noise/error analysis.
  Use the concise visible description "Helped with Qiskit implementation."
- Conference talks, invited talks, and guest lectures are separate categories.
  The July 2026 ISCA presentation is a conference talk; the May 2026 AFOSR QRAM
  MURI closeout presentation is an invited project-review talk, not a grant award.
  The candidate also gave the Systems Architecture for Quantum Random Access
  Memory conference talk at MICRO 2023 in Toronto, Canada.
- Conference reviewing is verified for QIP 2026. Publish only venue and role,
  never the reviewed manuscript, reviewer report, or confidential correspondence.
  Under Conference Reviewing, list the venue without an "External reviewer" prefix.

### Compile and publish the CV file

Use XeLaTeX with the included fonts. From `Shifan_Xu_CV/`:

```bash
mkdir -p /tmp/shifan-cv-build
xelatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/shifan-cv-build cv.tex
xelatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/shifan-cv-build cv.tex
```

Render `/tmp/shifan-cv-build/cv.pdf` and inspect all pages, then copy the verified PDF to
`Shifan_Xu_CV.pdf` in the repository root. That is the file linked by the website.
Keep the `final` document option, clickable links, and PDF title/author metadata enabled.
Keep external PDF links visibly underlined so they remain identifiable without relying on color.
Keep individual publication entries together across page breaks. Earlier research
may use compact dated paragraphs, preserving projects and advisors, rather than
spilling a few old entries onto an otherwise empty page.
Do not commit temporary LaTeX or preview files. After content updates, refresh the relevant
script query versions in HTML and update the visible month in page/CV footers.

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
