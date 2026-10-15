(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    nav.classList.remove('open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  const careerDetails = [...document.querySelectorAll('#experience details')];
  document.querySelectorAll('[data-career-action]').forEach(button => {
    button.addEventListener('click', () => {
      const open = button.dataset.careerAction === 'expand';
      careerDetails.forEach(detail => { detail.open = open; });
      document.querySelector('#career-status').textContent = open
        ? '회사 3곳과 프로젝트 15개를 모두 펼쳤습니다.'
        : '모든 경력 상세를 접었습니다.';
    });
  });

  const studio = document.querySelector('#studio');
  const animationToggle = studio.querySelector('.animation-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let manuallyPaused = false;
  let studioVisible = false;
  const updateAnimation = () => {
    const paused = manuallyPaused || reducedMotion.matches;
    studio.classList.toggle('typing', studioVisible && !paused && !document.hidden);
    animationToggle.hidden = reducedMotion.matches;
    animationToggle.setAttribute('aria-pressed', String(manuallyPaused));
    animationToggle.setAttribute('aria-label', manuallyPaused ? '강아지 애니메이션 재생' : '강아지 애니메이션 일시정지');
    animationToggle.firstElementChild.textContent = manuallyPaused ? '▷' : 'Ⅱ';
  };
  animationToggle.addEventListener('click', () => {
    manuallyPaused = !manuallyPaused;
    updateAnimation();
  });
  reducedMotion.addEventListener('change', updateAnimation);
  document.addEventListener('visibilitychange', updateAnimation);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      studioVisible = entries[0].isIntersecting;
      updateAnimation();
    }, { threshold: .1 }).observe(studio);
  } else { studioVisible = true; }
  updateAnimation();

  const mapContainer = document.querySelector('#map');
  const mapNote = document.querySelector('.map-note');
  let mapRequested = false;
  const loadMap = () => {
    if (mapRequested) return;
    mapRequested = true;
    const fallback = mapContainer.innerHTML;
    const fail = () => { if (!mapContainer.querySelector('.map-fallback')) mapContainer.innerHTML = fallback; mapNote.textContent = '지도를 불러오지 못했어요. 위의 카카오맵 링크로 확인해 주세요.'; };
    const timeout = window.setTimeout(fail, 12000);
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=da05c073f96832b9b9fef35565d771fa&autoload=false';
    script.onerror = () => { window.clearTimeout(timeout); fail(); };
    script.onload = () => {
      if (!window.kakao?.maps) { window.clearTimeout(timeout); fail(); return; }
      window.kakao.maps.load(() => {
        try {
          const center = new window.kakao.maps.LatLng(37.481277765, 126.952750230);
          mapContainer.replaceChildren();
          const map = new window.kakao.maps.Map(mapContainer, { center, level: 3 });
          map.addControl(new window.kakao.maps.ZoomControl(), window.kakao.maps.ControlPosition.RIGHT);
          map.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.TOPRIGHT);
          const resize = new ResizeObserver(() => { map.relayout(); map.setCenter(center); });
          resize.observe(mapContainer);
          window.clearTimeout(timeout);
          mapNote.textContent = '서울특별시 관악구';
        } catch { window.clearTimeout(timeout); fail(); }
      });
    };
    document.head.append(script);
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { loadMap(); observer.disconnect(); }
    }, { rootMargin: '300px' });
    observer.observe(mapContainer);
  } else { loadMap(); }
})();
