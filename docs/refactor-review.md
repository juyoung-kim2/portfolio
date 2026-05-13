# Refactor Review

## Completed

- 공통 테마 전환 로직을 `js/theme.js`로 분리해 `main.js`와 `sub.js`의 중복을 줄였습니다.
- 상세 페이지 헤더 로딩 경로를 상대 경로로 바꿔 GitHub Pages뿐 아니라 로컬 서버와 다른 하위 경로에서도 동작하도록 했습니다.
- 테마 전환과 모바일 메뉴 제어 요소를 `button`으로 바꿔 키보드 접근성과 ARIA 상태 표현을 보강했습니다.
- 상세 페이지에 `main` 랜드마크를 추가하고, 새 창 외부 링크에 `rel="noopener noreferrer"`를 적용했습니다.
- CSS의 다크 모드 미디어쿼리 위치, 잘못된 중복 셀렉터, 중복 선언, 포커스 표시, reduced motion 대응을 정리했습니다.
- 기존 `style.css`를 `css/base.css`, `css/layout.css`, `css/main.css`, `css/detail.css`로 분리해 역할별 관리 구조로 바꿨습니다.
- 면접관 관점에서 질문이 나올 수 있는 heading hierarchy, 장식 이미지 alt, 아이콘 전용 링크의 접근 가능한 이름, 프로젝트 명칭 불일치, 근거가 필요한 성과 표현을 정리했습니다.

## Recommended Next Steps

- 프로젝트 상세 페이지 6개는 같은 구조를 반복하고 있으므로, 장기적으로는 프로젝트 데이터를 JSON으로 분리하고 템플릿에서 렌더링하는 구조가 유지보수에 유리합니다.
- 공통 버튼/태그 같은 UI 패턴이 더 늘어나면 이후 `components.css`를 추가로 분리해도 좋습니다.
- 이미지가 저장소 용량의 대부분을 차지하므로 WebP/AVIF 변환, 썸네일 별도 생성, `loading="lazy"` 적용 범위를 검토하는 것이 좋습니다.
- HTML 표준 검증은 구형 macOS `tidy`가 HTML5 태그를 오류로 보는 한계가 있어, CI에서는 Nu HTML Checker 같은 최신 검증 도구를 쓰는 편이 정확합니다.
- 포트폴리오 카드 전체를 링크로 만들면 클릭 목표가 커져 사용성이 좋아집니다. 현재는 우측 하단 원형 버튼만 상세 링크입니다.
