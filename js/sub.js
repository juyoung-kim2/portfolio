document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const target = document.querySelector(".fix_bar");
  const triggerPointer = 500;

  if (!target) return;

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;

    if (currentScroll > triggerPointer) {
      if (currentScroll < lastScrollTop) {
        target.classList.add("active");
      } else {
        target.classList.remove("active");
      }
    } else {
      target.classList.remove("active");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, { passive: true });
});
