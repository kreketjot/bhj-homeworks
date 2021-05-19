'use strict'

{
  const progressBar = document.getElementById( 'progress' );
  const form = document.getElementById( 'form' );

  form.addEventListener( 'submit', e => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://netology-slow-rest.herokuapp.com/upload.php' );
    xhr.upload.addEventListener( 'loadstart', e => 
      progressBar.value = 0
    );
    xhr.upload.addEventListener( 'progress', e => 
      progressBar.value = (e.loaded / e.total).toFixed(2)
    );
    xhr.upload.addEventListener( 'load', e => 
      progressBar.value = 1
    );
    xhr.send( new FormData( form ) );
  });
}