document.addEventListener("DOMContentLoaded", () => {
  window.portfolioTheme?.init();

  const words = document.querySelectorAll(".change_word");
  const wordBox = document.querySelector(".word_box");

  let currentIndex = 0;
  let isAnimating = false;

  // [개선] 각 단어 내부 글자들에게 순서대로 딜레이 주기 (이전에는 css로 개별 적용함)
  words.forEach((word) => {
    const chars = word.querySelectorAll(".char");
    chars.forEach((char, index) => {
      char.style.transitionDelay = `${index * 0.06}s`;
    });
  });
  function showWord(index) {
    if (!words.length || !wordBox || isAnimating) return;
    isAnimating = true;

    const activeWord = words[index];

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wordBox.style.width = `${activeWord.offsetWidth + 4}px`;

        words.forEach((word, i) => {
          word.classList.toggle("on", i === index);
        });

        setTimeout(() => {
          isAnimating = false;
        }, 600);
      });
    });
  }

  showWord(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    showWord(currentIndex);
  }, 3000);

  const careerLists = document.querySelectorAll(".career_list");

  careerLists.forEach((career) => {
    const items = career.querySelectorAll(".list_item");
    const button = career.querySelector(".more_btn");
    if (!items.length || !button) return;

    const textEl = button.querySelector(".text");
    let isExpanded = false;

    button.setAttribute("aria-expanded", "false");

    items.forEach((item, index) => {
      if (index < 2) {
        item.classList.add("show");
      }
    });

    button.addEventListener("click", () => {
      isExpanded = !isExpanded;

      items.forEach((item, index) => {
        if (isExpanded) {
          item.classList.add("show");
        } else {
          item.classList.toggle("show", index < 2);
        }
      });

      if (textEl) {
        textEl.textContent = isExpanded ? "접기" : "더보기";
      }
      button.classList.toggle("expanded", isExpanded);
      button.setAttribute("aria-expanded", String(isExpanded));
    });
  });

  const hamOpen = document.querySelector("#ham_open");
  const hamClose = document.querySelector("#ham_close");
  const mobileNav = document.querySelector(".mobile_nav");
  const overlay = document.querySelector(".overlay");

  if (mobileNav) mobileNav.inert = true;

  function setMenuState(isOpen) {
    mobileNav.classList.toggle("active", isOpen);
    overlay.classList.toggle("active", isOpen);
    hamOpen.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
    mobileNav.inert = !isOpen;

    setTimeout(() => {
      if (isOpen) {
        hamClose.focus();
      } else {
        hamOpen.focus();
      }
    }, 50);
  }

  // 포커스 트랩
  document.addEventListener("keydown", (e) => {
    if (!mobileNav.classList.contains("active")) return;
    const focusable = mobileNav.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    // ESC로 닫기
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      setMenuState(false);
    }
  });

  if (hamOpen && hamClose && mobileNav && overlay) {
    hamOpen.addEventListener("click", () => setMenuState(true));
    hamClose.addEventListener("click", () => setMenuState(false));
    overlay.addEventListener("click", () => setMenuState(false));
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      e.preventDefault();

      const targetEl = document.querySelector(targetId);
      const headerHeight = document.querySelector(".header")?.offsetHeight ?? 0;
      if (!targetEl) return;

      //const elementPosition = targetEl.offsetTop();
      const offsetPosition = targetEl.offsetTop - headerHeight;

      setMenuState(false);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  const fadeEls = document.querySelectorAll(".fade-in");

  fadeEls.forEach((el) => {
    setTimeout(() => {
      el.classList.add("show");
    });
  });
});
