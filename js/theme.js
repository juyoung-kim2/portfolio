const THEME_STORAGE_KEY = "theme";
const DARK_MODE_CLASS = "dark-mode";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  console.log(savedTheme);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getResponsiveImageSize() {
  if (window.innerWidth <= 768) return "_750";
  if (window.innerWidth <= 1536) return "_1600";
  return "_1920";
}

function updateThemeControls(mode) {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const isActive = button.dataset.themeToggle === mode;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateResponsiveImages(isDark) {
  document.querySelectorAll("img.dark-switch").forEach((image) => {
    const base = image.dataset.base;
    if (!base) return;

    const themeSuffix = isDark ? "_dark" : "";
    image.src = `${base}${getResponsiveImageSize()}${themeSuffix}.png`;
  });
}

function applyTheme(mode) {
  const isDark = mode === "dark";

  document.body.classList.toggle(DARK_MODE_CLASS, isDark);
  localStorage.setItem(THEME_STORAGE_KEY, mode);
  updateThemeControls(mode);
  updateResponsiveImages(isDark);
}

function bindThemeControls() {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeToggle);
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  const updateHeaderState = () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

window.portfolioTheme = {
  applyTheme,
  init() {
    bindThemeControls();
    applyTheme(getPreferredTheme());
    initHeaderScroll();
  },
  refreshImages() {
    updateResponsiveImages(document.body.classList.contains(DARK_MODE_CLASS));
  },
};

window.addEventListener("resize", () => {
  window.portfolioTheme.refreshImages();
});

// top 버튼 추가
window.addEventListener("load", () => {
  const topBtn = document.createElement("button");
  topBtn.innerHTML = `<img src="images/portfolio_arrow.png" alt="화살표" />`;
  topBtn.className = "top-btn";

  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
