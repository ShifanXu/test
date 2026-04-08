document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("all-news");

  if (!container || !Array.isArray(window.newsItems)) {
    return;
  }

  if (window.newsItems.length === 0) {
    container.innerHTML = '<p class="publication-list-empty">No news items yet.</p>';
    return;
  }

  container.innerHTML = window.newsItems
    .slice()
    .sort(function (a, b) {
      return b.date.localeCompare(a.date);
    })
    .map(function (item) {
      return [
        '<article class="news-card">',
        '<time datetime="' + item.date + '">' + item.label + "</time>",
        "<p>" + item.summary + "</p>",
        "</article>"
      ].join("");
    })
    .join("");
});
