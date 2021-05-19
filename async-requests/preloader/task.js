'use strict'

{
  const currency = 'руб';
  const loader = document.getElementById('loader');
  const items = document.getElementById('items');
  const exchangeRates = localStorage.getItem('exchange rates');
  if (exchangeRates) {
    showExchangeRates( JSON.parse(exchangeRates) );
  } 
  getExchangeRates();

  function getExchangeRates() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://netology-slow-rest.herokuapp.com');
    xhr.responseType = 'json';
    xhr.addEventListener( 'loadstart', e => toggleLoader() );
    xhr.addEventListener( 'loadend', e => toggleLoader() );
    xhr.addEventListener( 'load', e => showExchangeRates( xhr.response ));
    xhr.addEventListener( 'error', e => showError() );
    xhr.send();
  }

  function toggleLoader() {
    loader.classList.toggle('loader_active');
  }

  function showError() {
    items.textContent = 'Произошла ошибка! Пожалуйста, перезагрузите страницу!';
  }

  function showExchangeRates(response) {
    let html = '';
    Object.values( response.response.Valute ).forEach( valute => {
      html += `
        <div class="item">
          <div class="item__code">
            ${valute.CharCode}
          </div>
          <div class="item__value">
            ${valute.Value}
          </div>
          <div class="item__currency">
            ${currency}
          </div>
        </div>`;
    });
    items.innerHTML = html;
    localStorage.setItem( 'exchange rates', JSON.stringify(response) );
  }
}