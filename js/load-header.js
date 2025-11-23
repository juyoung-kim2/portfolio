
// load-header.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('/sub_header.html')
    .then(res => {
      if (!res.ok) throw new Error('헤더를 불러오지 못했습니다.');
      return res.text();
    })
    .then(data => {
      const headerContainer = document.getElementById('header');
      if (headerContainer) {
        headerContainer.innerHTML = data;
        initDarkMode();
      }
    })
    .catch(err => console.error('헤더 로딩 오류:', err));
});