'use strict'

{
  const bookContent = document.querySelector('.book__content');

  // font size
  const fsBtns = [...document.querySelectorAll('a.font-size')];
  fsBtns.forEach( element => 
    element.addEventListener('click', evt => {
      evt.preventDefault();
      removeBookFS(bookContent);
      removeActiveFS(fsBtns);
      element.classList.add('font-size_active');
      switch (element.dataset.size) {
        case 'small':
          bookContent.classList.add('font-size_small');
          break;
        case 'big':
          bookContent.classList.add('font-size_big');
      }
    })
  );

  function removeBookFS(book) {
    book.classList.remove('font-size_small');
    book.classList.remove('font-size_big');
  }

  function removeActiveFS(btns) {
    btns.forEach( el => el.classList.remove('font-size_active') );
  }

  // font color
  const fontColors = [...document.querySelector('.book__control_color').querySelectorAll('a.color')];
  fontColors.forEach( element => 
    element.addEventListener('click', evt => {
      evt.preventDefault();
      removeBookFC(bookContent);
      removeActiveBtn(fontColors);
      element.classList.add('color_active');
      switch (element.dataset.textColor) {
        case 'gray':
          bookContent.classList.add('book_color-gray');
          break;
        case 'whitesmoke':
          bookContent.classList.add('book_color-whitesmoke');
      }
    })
  );

  function removeBookFC(book) {
    book.classList.remove('book_color-whitesmoke');
    book.classList.remove('book_color-gray');
  }

  function removeActiveBtn(btns) {
    btns.forEach( btn => btn.classList.remove('color_active') );
  }

  // background
  const backgroundColors = [...document.querySelector('.book__control_background').querySelectorAll('a.color')];

  backgroundColors.forEach( element => 
    element.addEventListener('click', evt => {
      evt.preventDefault();
      removeBookBgC(bookContent);
      removeActiveBtn(backgroundColors);
      element.classList.add('color_active');
      switch (element.dataset.bgColor) {
        case 'gray':
          bookContent.classList.add('book_bg-gray');
          break;
        case 'black':
          bookContent.classList.add('book_bg-black');
          break;
        case 'white':
          bookContent.classList.add('book_bg-white');
      }
    })
  );

  function removeBookBgC(book) {
    book.classList.remove('book_bg-gray');
    book.classList.remove('book_bg-white');
    book.classList.remove('book_bg-black');
  }
}