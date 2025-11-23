/*다크모드 전환*/

function initDarkMode() {
  const body = document.body;
  const lightBtn = document.querySelector('.mode_icon .light');
  const nightBtn = document.querySelector('.mode_icon .night');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  if (lightBtn && nightBtn) {  // 요소가 존재할 경우에만 이벤트 연결
    lightBtn.addEventListener('click', () => {
      console.log('light');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    });

    nightBtn.addEventListener('click', () => {
      console.log('dark');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    });
  } else {
    console.warn('다크모드 버튼을 찾을 수 없습니다.');
  }
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

  sections.forEach(function(section) {
    const offTop = section.offsetTop;

    if (!section.classList.contains('on') && scrollPosition + window.innerHeight > offTop + 100){
      section.classList.add('on');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const target = document.querySelector(".fix_bar"); // 클래스 붙일 요소
  const triggerPointer = 500;

  window.addEventListener("scroll", function(){
    const currentScroll = window.scrollY;

    if( currentScroll > triggerPointer){
      // 500이상일때만 진행
      if(currentScroll < lastScrollTop) {
        target.classList.add("active");
      }else {
        target.classList.remove("active");
      }

    } else {
      //500 위에서는 항상 제거
      target.classList.remove("active");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  })
});