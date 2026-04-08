document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("all-teaching");

  if (!container || !Array.isArray(window.teachingItems)) {
    return;
  }

  if (window.teachingItems.length === 0) {
    container.innerHTML = '<p class="publication-list-empty">No teaching items yet.</p>';
    return;
  }

  container.innerHTML = window.teachingItems
    .map(function (item) {
      return [
        '<article class="teaching-item">',
        "<h3>" + item.title + "</h3>",
        '<p class="item-meta">' + item.role + " · " + item.term + "</p>",
        "<p>" + item.description + "</p>",
        "</article>"
      ].join("");
    })
    .join("");
});
