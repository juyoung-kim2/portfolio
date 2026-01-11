/*다크모드 전환*/

function initDarkMode() {
  const body = document.body;

  // 데스크탑 + 모바일 라이트/다크 아이콘 모두 선택
  const lightBtns = document.querySelectorAll('.light');
  const nightBtns = document.querySelectorAll('.night');

  const images = document.querySelectorAll('img.dark-switch');

  // 모드 적용 함수
  function applyTheme(mode) {
    if (mode === 'dark') {
      body.classList.add('dark-mode');

      // 이미지 dark 버전으로 변경
      images.forEach(img => {
        const originalSrc = img.dataset.original;  
        const darkSrc = originalSrc.replace(/([^/]+)$/, 'dark_$1');
        img.src = darkSrc;
      });

    } else {
      body.classList.remove('dark-mode');

      // 원래 이미지로 복원
      images.forEach(img => {
        img.src = img.dataset.original;
      });
    }

    localStorage.setItem('theme', mode);
  }

  // 첫 로딩: 이미지 원본 경로 저장
  images.forEach(img => {
    img.dataset.original = img.src;
  });

  // 저장된 모드 초기 적용
  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  // 라이트모드 버튼
  lightBtns.forEach(btn => {
    btn.addEventListener('click', () => applyTheme('light'));
  });

  // 다크모드 버튼
  nightBtns.forEach(btn => {
    btn.addEventListener('click', () => applyTheme('dark'));
  });
}


/*헤더 스타일*/
window.addEventListener('scroll', function () {
  const header = this.document.querySelector('.header');

  if (this.window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
})

/*스크롤 이벤트*/
window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY;
  const sections = document.querySelectorAll('.animate');

  sections.forEach(function (section) {
    const offTop = section.offsetTop;

    if (!section.classList.contains('on') && scrollPosition + window.innerHeight > offTop + 100) {
      section.classList.add('on');
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
  })
});