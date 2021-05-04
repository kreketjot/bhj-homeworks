'use strict'

{
  let active = 0;
  const slides = [...document.getElementsByClassName('slider__item')];
  const dots = [...document.getElementsByClassName('slider__dot')];

  function hideSlide() {
    slides[active].className = 'slider__item';
    dots[active].className = 'slider__dot';
  }

  function showSlide() {
    slides[active].className += ' slider__item_active';
    dots[active].className += ' slider__dot_active';
  }

  function loopSlides() {
    active = (active + slides.length) % slides.length;
  }

  document.getElementsByClassName('slider__arrow_prev')[0].onclick = () => {
    hideSlide();
    active--;
    loopSlides();
    showSlide();
  };

  document.getElementsByClassName('slider__arrow_next')[0].onclick = () => {
    hideSlide();
    active++;
    loopSlides();
    showSlide();
  };

  dots.forEach(
    (dot, i) => dot.onclick = () => {
      hideSlide();
      active = i;
      showSlide();
    }
  );
}