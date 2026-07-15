document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const target = document.querySelector(".fix_bar");
  const triggerPointer = 500;

  if (!target) return;

  window.addEventListener(
    "scroll",
    function () {
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
    },
    { passive: true },
  );

  // 포커스 들어오면 보이게
  target.addEventListener("focusin", function () {
    target.classList.add("active");
  });

  // 포커스 나가면 스크롤 조건에 따라 다시 숨김
  target.addEventListener("focusout", function (e) {
    if (!target.contains(e.relatedTarget)) {
      const currentScroll = window.scrollY;
      if (currentScroll <= triggerPointer || currentScroll > lastScrollTop) {
        target.classList.remove("active");
      }
    }
  });

  const animateEls = document.querySelectorAll(".animate");

  if (animateEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // 한 번만 실행
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -100px 0px" },
    );

    animateEls.forEach((el) => observer.observe(el));
  }
});
