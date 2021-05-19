'use strict'

{
  const poll = document.getElementById( 'poll__answers' );
  let pollIndex;
  getPoll();

  function getPoll() {
    const xhr = new XMLHttpRequest();
    xhr.open( 'GET', 'https://netology-slow-rest.herokuapp.com/poll.php' );
    xhr.responseType = 'json';
    xhr.addEventListener( 'load', e => showPoll(xhr.response) );
    xhr.addEventListener( 'error', e => showError( xhr.status, xhr.statusText ) );
    xhr.send();
  }

  function showError( code, text ) {
    const err = document.createElement( 'span' );
    err.textContent = `Ошибка ${code} - ${text}`;
    document.body.append();
  }

  function showPoll(resp) {
    document.getElementById( 'poll__title' ).textContent = resp.data.title;
    pollIndex = resp.id;
    let html = '';
    let i = 0;
    resp.data.answers.forEach( answer => 
      html += `
        <button class="poll__answer" data-id="${i++}">
          ${answer}
        </button>`
    );

    poll.innerHTML = html;
    poll.addEventListener( 'click', e => {
      const btn = e.target;
      if ( !btn.matches( '.poll__answer' ) ) {
        return;
      }
      sendAnswer( btn.dataset.id );
      alert( 'Спасибо, Ваш голос засчитан!' );
    } );
  }

  function sendAnswer(id) {
    const xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://netology-slow-rest.herokuapp.com/poll.php' );
    xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    xhr.responseType = 'json';
    xhr.addEventListener( 'load', e => showResults( xhr.response ) );
    xhr.addEventListener( 'error', e => showError( xhr.status, xhr.statusText ) );
    xhr.send( `vote=${pollIndex}&answer=${id}` );
  }

  function showResults( resp ) {
    const total = resp.stat.reduce( (total, item) => 
      total + item.votes, 0
    );
    poll.innerText = resp.stat.reduce( (html, item) => 
      html + item.answer + ': ' + (item.votes / total * 100).toFixed(2) + '%\n', ''
    );
  }
}