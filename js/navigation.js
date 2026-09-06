const header = document.querySelector(".site-header");

if (header) {
  const mobileQuery = window.matchMedia("(max-width: 720px)");
  const minimumCollapseAt = 200;
  const expandAt = 8;
  let collapseAt = minimumCollapseAt;
  let isCompact = false;
  let updateQueued = false;

  const updateHeaderState = () => {
    if (!mobileQuery.matches) {
      isCompact = false;
      header.classList.remove("is-compact");
      return;
    }

    if (!isCompact) {
      collapseAt = Math.max(
        minimumCollapseAt,
        Math.ceil(header.getBoundingClientRect().height + 32)
      );
    }

    const scrollY = Math.max(0, window.scrollY);

    if (!isCompact && scrollY >= collapseAt) {
      isCompact = true;
      header.classList.add("is-compact");
    } else if (isCompact && scrollY <= expandAt) {
      isCompact = false;
      header.classList.remove("is-compact");
    }
  };

  const scheduleHeaderUpdate = () => {
    if (updateQueued) {
      return;
    }

    updateQueued = true;
    window.requestAnimationFrame(() => {
      updateQueued = false;
      updateHeaderState();
    });
  };

  updateHeaderState();
  window.addEventListener("scroll", scheduleHeaderUpdate, { passive: true });
  window.addEventListener("resize", scheduleHeaderUpdate, { passive: true });

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", scheduleHeaderUpdate);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(scheduleHeaderUpdate);
  }
}
