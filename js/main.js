/*다크모드 전환*/
document.addEventListener('DOMContentLoaded',() => {
  const body = document.body;
  const lightBtn = document.querySelector('.mode_icon .light');
  const nightBtn = document.querySelector('.mode_icon .night');

  const savedTheme = localStorage.getItem('theme');
  if ( savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  lightBtn.addEventListener('click', () => {
    console.log('light')
    body.classList.remove('dark-mode');
    localStorage.setItem('theme','light');
  });

  nightBtn.addEventListener('click', () => {
    console.log('dark')
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  });
})
3
/*헤더 스타일*/
window.addEventListener('scroll', function () {
  const header = this.document.querySelector('.header');

  if (this.window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
})

/*메인 비쥬얼 텍스트 변경 효과*/
document.addEventListener('DOMContentLoaded', function () {
  const words = document.querySelectorAll('.change_word');
  const wordBox = document.querySelector('.word_box');
  let currentIndex = 0;

  function showWord(index) {
    words.forEach((word, i) => {
      word.classList.toggle('on', i === index);
    });

    const activeWord = words[index];
    const temp = activeWord.cloneNode(true);
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    temp.style.display = 'inline-flex';
    temp.style.fontSize = '70px'
    temp.style.fontWeight = '700'
    document.body.appendChild(temp);

    const targetWidth = temp.offsetWidth;
    document.body.removeChild(temp);

    wordBox.style.width = targetWidth + 'px';
  }

  showWord(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    showWord(currentIndex);
  }, 3000);
});

/*경력 더보기 버튼*/
document.addEventListener('DOMContentLoaded', function () {
  const careerLists = document.querySelectorAll('.career_list');

  careerLists.forEach(career => {
    const items = career.querySelectorAll('.list_item');
    const button = career.querySelector('.more_btn');
    const textEl = button.querySelector('.text');

    if (!items.length || !button) return;

    let isExpanded = false;

     items.forEach((item, index) => {
      if( index < 2) {
        item.classList.add('show');
      }
    });

    button.addEventListener('click', () =>{
      isExpanded = !isExpanded;

      items.forEach((item, index) => {
       if (isExpanded){
        item.classList.add('show');
       } else {
        item.classList.toggle('show', index < 2 );
       }
      });

      textEl.textContent = isExpanded ? '접기' : '더보기';
      button.classList.toggle('expanded', isExpanded);
    });
  });
});

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