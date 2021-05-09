'use strict'

{
  const rotators = [];
  [...document.getElementsByClassName('rotator')].forEach( el => makeRotatorActive(el) );

  function makeRotatorActive(el) {
    changeRotatorCase(el);
  }

  function changeRotatorCase(el) {
    const cases = [...el.getElementsByClassName('rotator__case')];
    const len = cases.length;
    const lastIndex = cases.findIndex(el => el.matches('.rotator__case_active'));
    if (lastIndex !== -1) {
      cases[lastIndex].classList.remove('rotator__case_active');
    }

    let newIndex;
    do {
      newIndex = randIndex(len);
    } while (newIndex === lastIndex); 

    const newCase = cases[newIndex];
    newCase.classList.add('rotator__case_active');
    if (!newCase.style.color) {
      newCase.style.color = getColor(newCase);
    }
    return setTimeout( () => changeRotatorCase(el), getTimeout(newCase) );
  } 

  function randIndex(num = 1) { 
    return Math.floor( Math.random() * num ); 
  }

  function getTimeout(el) { 
    return el.dataset.speed || 1000; 
  }

  function getColor(el) { 
    return el.dataset.color || 'black'; 
  }
}