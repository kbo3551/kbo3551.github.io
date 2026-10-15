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
  const label = studio.querySelector('.studio-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  studio.addEventListener('pointermove', event => {
    if (reducedMotion.matches || event.pointerType !== 'mouse') return;
    const bounds = studio.getBoundingClientRect();
    studio.style.setProperty('--px', `${((event.clientX - bounds.left) / bounds.width - .5) * 7}deg`);
    studio.style.setProperty('--py', `${-((event.clientY - bounds.top) / bounds.height - .5) * 5}deg`);
  });
  studio.addEventListener('pointerleave', () => {
    studio.style.setProperty('--px', '0deg');
    studio.style.setProperty('--py', '0deg');
  });
  studio.addEventListener('click', () => {
    window.clearTimeout(timer);
    studio.classList.remove('greeting');
    void studio.offsetWidth;
    studio.classList.add('greeting');
    label.textContent = '반가워요! 오늘도 좋은 하루.';
    timer = window.setTimeout(() => {
      studio.classList.remove('greeting');
      label.textContent = '잠깐, 인사하고 갈까요?';
    }, 1600);
  });
})();
