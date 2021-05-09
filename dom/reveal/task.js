'use strict'

{
  const revealBlocks = document.getElementsByClassName('reveal');
  let last = 0;
  document.addEventListener('scroll', evt => {
    let len = revealBlocks.length;
    for (let i = last; i < len; i++) {
      const position = revealBlocks[i].getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (position.top < windowHeight) {
        revealBlocks[i].classList.add('reveal_active');
      } else {
        break;
      }
    }
  });
}