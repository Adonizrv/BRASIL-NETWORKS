/*
=========================================================
BNT BRASIL NETWORKS — JAVASCRIPT PRINCIPAL
Arquivo: main.js

Responsabilidades deste arquivo:
01. Menu mobile
02. Ano automático no rodapé
03. Banner dinâmico
=========================================================
*/

'use strict';

/* =========================================================
   01. MENU MOBILE
   Abre e fecha a navegação em telas menores.
   ========================================================= */

const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuBtn?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;

  menuBtn.setAttribute(
    'aria-expanded',
    open ? 'true' : 'false'
  );
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');

    menuBtn?.setAttribute(
      'aria-expanded',
      'false'
    );
  });
});


/* =========================================================
   02. ANO AUTOMÁTICO NO RODAPÉ
   Evita precisar alterar manualmente o ano a cada virada.
   ========================================================= */

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   03. BANNER DINÂMICO

   - troca automática a cada 5 segundos
   - permite navegação pelas setas
   - permite seleção pelas bolinhas
   ========================================================= */

const slides = [
  ...document.querySelectorAll('.hero-slide')
];

const dots = [
  ...document.querySelectorAll('.dot')
];

const prev = document.querySelector(
  '.slider-arrow.prev'
);

const next = document.querySelector(
  '.slider-arrow.next'
);

let currentSlide = 0;
let sliderTimer;


/* =========================================================
   EXIBE O SLIDE CORRETO
   ========================================================= */

function showSlide(index) {

  if (!slides.length) return;

  currentSlide =
    (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {

    slide.classList.toggle(
      'active',
      i === currentSlide
    );

  });

  dots.forEach((dot, i) => {

    dot.classList.toggle(
      'active',
      i === currentSlide
    );

  });

}


/* =========================================================
   INICIA O SLIDER AUTOMÁTICO
   ========================================================= */

function startSlider() {

  if (!slides.length) return;

  clearInterval(sliderTimer);

  sliderTimer = setInterval(() => {

    showSlide(currentSlide + 1);

  }, 5000);

}


/* =========================================================
   SETA PARA VOLTAR
   ========================================================= */

prev?.addEventListener('click', () => {

  showSlide(currentSlide - 1);

  startSlider();

});


/* =========================================================
   SETA PARA AVANÇAR
   ========================================================= */

next?.addEventListener('click', () => {

  showSlide(currentSlide + 1);

  startSlider();

});


/* =========================================================
   BOLINHAS DE NAVEGAÇÃO
   ========================================================= */

dots.forEach((dot, i) => {

  dot.addEventListener('click', () => {

    showSlide(i);

    startSlider();

  });

});


/* =========================================================
   INICIA O BANNER
   ========================================================= */

if (slides.length > 0) {

  showSlide(0);

  startSlider();

}