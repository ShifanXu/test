document.addEventListener("DOMContentLoaded", function () {
  renderSelectedPublications();
  renderSelectedNews();
});

function renderSelectedPublications() {
  const container = document.getElementById("selected-publications");

  if (!container || !Array.isArray(window.publications)) {
    return;
  }

  const selectedPublications = window.publications
    .filter(function (publication) {
      return publication.selected;
    })
    .sort(function (a, b) {
      return getPublicationSortKey(b).localeCompare(getPublicationSortKey(a));
    })
    .slice(0, 3);

  if (selectedPublications.length === 0) {
    container.innerHTML = '<p class="publication-list-empty">No selected publications yet.</p>';
    return;
  }

  container.innerHTML = selectedPublications.map(renderPublicationItem).join("");
}

function renderSelectedNews() {
  const container = document.getElementById("selected-news");

  if (!container || !Array.isArray(window.newsItems)) {
    return;
  }

  const selectedNews = window.newsItems
    .filter(function (item) {
      return item.selected;
    })
    .slice(0, 3);

  if (selectedNews.length === 0) {
    container.innerHTML = '<p class="publication-list-empty">No news items yet.</p>';
    return;
  }

  container.innerHTML = selectedNews.map(renderNewsItem).join("");
}

function renderPublicationItem(publication) {
  const links = Array.isArray(publication.links)
    ? publication.links
        .map(function (link) {
          return '<a href="' + link.url + '">' + link.label + "</a>";
        })
        .join("")
    : "";
  const authors = renderAuthors(publication.authors, publication);
  const note = renderPublicationNote(publication);

  return [
    '<article class="publication-item">',
    '<h4 class="publication-title">' + publication.title + "</h4>",
    '<p class="publication-authors">' + authors + "</p>",
    note,
    '<p class="publication-venue">' + publication.venue + " · " + publication.year + "</p>",
    links ? '<div class="publication-links">' + links + "</div>" : "",
    "</article>"
  ].join("");
}

function renderAuthors(authors, publication) {
  if (!Array.isArray(authors)) {
    return authors || "";
  }

  const equalContributors = getEqualContributors(publication);

  return authors
    .map(function (author) {
      const normalizedAuthor = normalizeAuthor(author);
      const marker = equalContributors.indexOf(normalizedAuthor.name) !== -1
        ? '<sup class="author-note-marker">*</sup>'
        : "";
      const content = normalizedAuthor.isSelf
        ? '<span class="author-self">' + normalizedAuthor.name + "</span>" + marker
        : normalizedAuthor.name + marker;

      return content;
    })
    .join(", ");
}

function getEqualContributors(publication) {
  if (!publication || !Array.isArray(publication.equalContributors)) {
    return [];
  }

  return publication.equalContributors.map(getCanonicalAuthorName);
}

function renderPublicationNote(publication) {
  if (!publication || !Array.isArray(publication.equalContributors) || publication.equalContributors.length === 0) {
    return "";
  }

  return '<p class="publication-note">' + (publication.contributionNote || "* Equal contribution.") + "</p>";
}

function normalizeAuthor(author) {
  const rawName = typeof author === "string" ? author : author.name;
  const canonicalName = getCanonicalAuthorName(rawName);

  if (typeof author === "string") {
    return {
      name: canonicalName,
      url: window.authorDirectory ? window.authorDirectory[canonicalName] : "",
      isSelf: canonicalName === "Shifan Xu"
    };
  }

  return {
    name: canonicalName,
    url: author.url || (window.authorDirectory ? window.authorDirectory[canonicalName] : ""),
    isSelf: canonicalName === "Shifan Xu"
  };
}

function getPublicationSortKey(publication) {
  return publication.sortDate || String(publication.year || "");
}

function getCanonicalAuthorName(name) {
  if (!name) {
    return "";
  }

  return window.authorAliases && window.authorAliases[name] ? window.authorAliases[name] : name;
}

function renderNewsItem(item) {
  return [
    '<article class="news-card">',
    '<time datetime="' + item.date + '">' + item.label + "</time>",
    "<p>" + item.summary + "</p>",
    "</article>"
  ].join("");
}
