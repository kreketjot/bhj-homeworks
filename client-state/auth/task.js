'use strict'

let userId = localStorage.userId;
if ( userId ) {
  showWelcome( userId );
} else {
  showSignin();
}

function showSignin() {
  const signin = document.getElementById( 'signin' );
  signin.classList.add( 'signin_active' );

  const error = signin.querySelector( '.signin__error' );
  error.addEventListener( 'click', e => e.currentTarget.hidden = true );

  const form = signin.querySelector( '#signin__form' );
  form.addEventListener( 'submit', e => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://netology-slow-rest.herokuapp.com/auth.php' );
    xhr.responseType = 'json';
    xhr.addEventListener( 'load', e => {
      form.reset();
      if ( xhr.response.success ) {
        signin.classList.remove( 'signin_active' );
        showWelcome( xhr.response.user_id );
        localStorage.userId = xhr.response.user_id;
      } else {
        showError( 'Неверный логин/пароль' );
      }
    });
    xhr.addEventListener( 'error', e => {
      showError( xhr.statusText );
    });
    xhr.send( new FormData( form ) );
  });

  function showError( message ) {
    error.textContent = message;
    error.hidden = false;
    setTimeout( () => error.hidden = true, 5e3 );
  }
}

function showWelcome( id ) {
  const welcome = document.getElementById( 'welcome' );
  welcome.querySelector( '#user_id' ).textContent = id;
  welcome.querySelector( '.logout' ).addEventListener( 'click', e => {
    delete localStorage.userId;
    welcome.classList.remove( 'welcome_active' );
    showSignin();
  });
  welcome.classList.add( 'welcome_active' );
}