const header = document.querySelector(".site-header");

if (header) {
  const mobileQuery = window.matchMedia("(max-width: 720px)");
  const collapseAt = 72;
  const expandAt = 20;
  let isCompact = false;

  const updateHeaderState = () => {
    if (!mobileQuery.matches) {
      isCompact = false;
      header.classList.remove("is-compact");
      return;
    }

    const scrollY = window.scrollY;

    if (!isCompact && scrollY >= collapseAt) {
      isCompact = true;
      header.classList.add("is-compact");
    } else if (isCompact && scrollY <= expandAt) {
      isCompact = false;
      header.classList.remove("is-compact");
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("resize", updateHeaderState, { passive: true });

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", updateHeaderState);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(updateHeaderState);
  }
}
