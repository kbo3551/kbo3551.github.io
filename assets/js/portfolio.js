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
  const studio = document.querySelector('#studio');
  const art = studio.querySelector('.studio-art');
  const label = studio.querySelector('.studio-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  const resetGaze = () => {
    studio.style.setProperty('--eye-x', '0px');
    studio.style.setProperty('--eye-y', '0px');
    studio.style.setProperty('--head-turn', '0deg');
  };
  studio.addEventListener('pointermove', event => {
    if (reducedMotion.matches) return;
    const bounds = art.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left - bounds.width * .38) / (bounds.width * .45)));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top - bounds.height * .33) / (bounds.height * .6)));
    studio.style.setProperty('--eye-x', `${x * 10}px`);
    studio.style.setProperty('--eye-y', `${y * 8}px`);
    studio.style.setProperty('--head-turn', `${x * 3}deg`);
  });
  studio.addEventListener('pointerleave', resetGaze);
  studio.addEventListener('click', () => {
    window.clearTimeout(timer);
    studio.classList.add('typing');
    label.textContent = '타닥타닥, 오늘도 개발 중!';
    timer = window.setTimeout(() => {
      studio.classList.remove('typing');
      label.textContent = '마우스로 눈맞춤 · 클릭하면 타이핑';
    }, 2300);
  });
  reducedMotion.addEventListener('change', resetGaze);

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
