document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("all-publications");

  if (!container || !Array.isArray(window.publications)) {
    return;
  }

  const publications = window.publications.slice().sort(function (a, b) {
    const sortComparison = getPublicationSortKey(b).localeCompare(getPublicationSortKey(a));

    if (sortComparison !== 0) {
      return sortComparison;
    }

    return a.title.localeCompare(b.title);
  });

  if (publications.length === 0) {
    container.innerHTML = '<p class="publication-list-empty">No publications yet.</p>';
    return;
  }

  const grouped = publications.reduce(function (accumulator, publication) {
    const year = String(publication.year);

    if (!accumulator[year]) {
      accumulator[year] = [];
    }

    accumulator[year].push(publication);
    return accumulator;
  }, {});

  container.innerHTML = Object.keys(grouped)
    .sort(function (a, b) {
      return Number(b) - Number(a);
    })
    .map(function (year) {
      const items = grouped[year].map(renderPublicationItem).join("");
      return [
        '<section class="year-block">',
        '<h2 class="year-heading">' + year + "</h2>",
        '<div class="publication-list">' + items + "</div>",
        "</section>"
      ].join("");
    })
    .join("");
});

function renderPublicationItem(publication) {
  const links = Array.isArray(publication.links)
    ? publication.links
        .map(function (link) {
          return '<a href="' + link.url + '">' + link.label + "</a>";
        })
        .join("")
    : "";
  const authors = renderAuthors(publication.authors);

  return [
    '<article class="publication-item">',
    '<h3 class="publication-title">' + publication.title + "</h3>",
    '<p class="publication-authors">' + authors + "</p>",
    '<p class="publication-venue">' + (publication.venueFull || publication.venue) + " · " + publication.year + "</p>",
    links ? '<div class="publication-links">' + links + "</div>" : "",
    "</article>"
  ].join("");
}

function renderAuthors(authors) {
  if (!Array.isArray(authors)) {
    return authors || "";
  }

  return authors
    .map(function (author) {
      const normalizedAuthor = normalizeAuthor(author);
      const content = normalizedAuthor.isSelf
        ? '<span class="author-self">' + normalizedAuthor.name + "</span>"
        : normalizedAuthor.name;

      if (normalizedAuthor.url) {
        return '<a href="' + normalizedAuthor.url + '">' + content + "</a>";
      }

      return content;
    })
    .join(", ");
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
