# 포트폴리오 미리보기

이 사이트는 빌드나 백엔드가 필요 없는 정적 HTML/CSS/JavaScript입니다. GitHub Pages에서 기존과 같은 방식으로 배포할 수 있습니다.

로컬 확인:

```sh
python -m http.server 8000
```

브라우저에서 http://localhost:8000 을 엽니다. GitHub Pages 배포는 저장소의 기존 Pages 브랜치/폴더 설정을 사용합니다.

- 경력 보기 버튼은 회사 경력 섹션으로 이동합니다.
- 회사 경력 행을 클릭하거나 키보드로 선택하면 세부 업무가 펼쳐집니다.
- 개발실의 강아지는 SVG 레이어로 눈동자·고개를 커서 방향에 맞춰 움직입니다. 클릭·탭하면 양 앞발이 번갈아 타이핑합니다. 3D 엔진은 사용하지 않습니다.
- 동작 줄이기 설정을 존중합니다.
- 개인 프로젝트는 기존 실제 이미지와 GitHub 및 문서 링크를 사용합니다. 중단된 프로젝트 배포 링크는 표시하지 않습니다.
- Pretendard를 라이선스와 함께 자체 호스팅합니다. 지도는 기존 카카오 JavaScript API 키·좌표를 사용하며, 지도 영역 근처에서만 SDK를 불러옵니다. API 오류 시 카카오맵 링크를 유지합니다. 카카오 개발자 콘솔에서 배포 도메인과 키가 유효해야 실제 지도가 표시됩니다.

변경 파일: index.html, assets/css/portfolio.css, assets/js/portfolio.js, assets/img/studio.webp.
기존 assets 및 템플릿 파일은 보존했습니다.
