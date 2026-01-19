/*다크모드 전환*/

function initDarkMode() {
  const body = document.body;

  // 데스크탑 + 모바일 라이트/다크 아이콘 모두 선택
  const lightBtns = document.querySelectorAll(".light");
  const nightBtns = document.querySelectorAll(".night");

  const images = document.querySelectorAll("img.dark-switch");

  // 이미지 적용 함수 (PC/MO + Light/Dark)
  function applyResponsiveImages(isDark) {
    images.forEach((img) => {
      const original = img.dataset.originalBase; // 예: /images/list/amos_capture01
      const isMobile = window.innerWidth <= 768;

      const sizeSuffix = isMobile ? "_750" : "_1920";
      const themeSuffix = isDark ? "_dark" : "";

      img.src = `${original}${sizeSuffix}${themeSuffix}.png`;
    });
  }

  // 테마 적용 함수
  function applyTheme(mode) {
    const isDark = mode === "dark";

    if (isDark) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }

    applyResponsiveImages(isDark);
    localStorage.setItem("theme", mode);
  }

  // 초기 이미지 base 경로 저장 (파일명 앞부분만)
  images.forEach((img) => {
    // 예: "/images/list/amos_capture01_1920.png"
    // → "/images/list/amos_capture01" 로 변환 저장
    const src = img.src;
    img.dataset.originalBase = src.replace(/(_\d+.*$)/, "");
  });

  // 저장된 모드 적용
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  // 라이트 버튼 이벤트
  lightBtns.forEach((btn) => {
    btn.addEventListener("click", () => applyTheme("light"));
  });

  // 다크 버튼 이벤트
  nightBtns.forEach((btn) => {
    btn.addEventListener("click", () => applyTheme("dark"));
  });

  // 화면 크기 변경 시 이미지 다시 변경
  window.addEventListener("resize", () => {
    const isDark = body.classList.contains("dark-mode");
    applyResponsiveImages(isDark);
  });
}

/*헤더 스타일*/
window.addEventListener("scroll", function () {
  const header = this.document.querySelector(".header");

  if (this.window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/*스크롤 이벤트*/
window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;
  const sections = document.querySelectorAll(".animate");

  sections.forEach(function (section) {
    const offTop = section.offsetTop;

    if (!section.classList.contains("on") && scrollPosition + window.innerHeight > offTop + 100) {
      section.classList.add("on");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const target = document.querySelector(".fix_bar"); // 클래스 붙일 요소
  const triggerPointer = 500;

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;

    if (currentScroll > triggerPointer) {
      // 500이상일때만 진행
      if (currentScroll < lastScrollTop) {
        target.classList.add("active");
      } else {
        target.classList.remove("active");
      }
    } else {
      //500 위에서는 항상 제거
      target.classList.remove("active");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
