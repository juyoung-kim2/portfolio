/*다크모드 전환*/
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const lightBtn = document.querySelectorAll(".mode_icon .light");
  const nightBtn = document.querySelectorAll(".mode_icon .night");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  lightBtn.forEach(btn => {
    btn.addEventListener('click', ()=> {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    });
  });

  nightBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    });
  });
});

/*헤더 스타일*/
window.addEventListener("scroll", function () {
  const header = this.document.querySelector(".header");

  if (this.window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/*메인 비쥬얼 텍스트 변경 효과*/
document.addEventListener("DOMContentLoaded", function () {
  const words = document.querySelectorAll(".change_word");
  const wordBox = document.querySelector(".word_box");
  let currentIndex = 0;
  let isAnimating = false; // 애니메이션 상태 확인

  function showWord(index) {
    if (isAnimating) return; // 애니메이션 중복 실행 방지
    isAnimating = true;

    // 텍스트 변경 시마다 동적 width 계산
    const activeWord = words[index];
    wordBox.style.width = `${activeWord.offsetWidth}px`;
    
    words.forEach((word, i) => {
      word.classList.toggle("on", i === index);
    });

    // 애니메이션이 끝나면 isAnimating을 다시 false로 설정
    requestAnimationFrame(() => {
    isAnimating = false;
    });
  }

  showWord(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    showWord(currentIndex);
  }, 3000);
});


/*경력 더보기 버튼*/
document.addEventListener("DOMContentLoaded", function () {
  const careerLists = document.querySelectorAll(".career_list");

  careerLists.forEach((career) => {
    const items = career.querySelectorAll(".list_item");
    const button = career.querySelector(".more_btn");
    const textEl = button.querySelector(".text");

    if (!items.length || !button) return;

    let isExpanded = false;

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

      textEl.textContent = isExpanded ? "접기" : "더보기";
      button.classList.toggle("expanded", isExpanded);
    });
  });
});

/*모바일 사이드 메뉴*/
const hamOpen = document.querySelector("#ham_open"); // 열기
const hamClose = document.querySelector("#ham_close"); // 닫기
const mobileNav = document.querySelector(".mobile_nav");
const overlay = document.querySelector(".overlay");

// 열기 버튼 클릭
hamOpen.addEventListener("click", () => {
  mobileNav.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden"; // 열릴 때
});

function closeMenu(){
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

hamClose.addEventListener("click", closeMenu)
overlay.addEventListener("click", closeMenu)

/*스크롤 헤더 높이 감지*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    e.preventDefault();

    const targetEl = document.querySelector(targetId);
    const headerHeight = document.querySelector(".header").offsetHeight;

    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

window.addEventListener("load", () => {
  const fadeEls = document.querySelectorAll(".fade-in");

  fadeEls.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("show");
    });
  });
});
