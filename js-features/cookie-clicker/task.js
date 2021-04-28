'use strict'

let lastClick = Date.now();
const cookie = document.getElementById('cookie');
cookie.onclick = function () {
  const now = Date.now();
  document.getElementById('clicker__freq').textContent = 
    (1e3 / (now - lastClick)).toFixed(2);
  lastClick = now;

  const diff = 50;
  const counter = document.getElementById('clicker__counter');
  cookie.width -= diff;
  if (++counter.textContent % 2) {
    cookie.width += 2 * diff; 
  } 
};