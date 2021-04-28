'use strict'

for (let i = 1; i < 10; i++) {
  document.getElementById(`hole${i}`).onclick = function () {
    if (this.className == 'hole') {
      if (++(document.getElementById('lost').textContent) == 5) {
        setTimeout( 
          () => {
            alert('Попробуйте ещё раз!');
            clearStatus();
          }
        );
      }
    } else {
      if (++(document.getElementById('dead').textContent) == 10) {
        setTimeout( 
          () => {
            alert('Победа!');
            clearStatus();
          }
        );
      }
    }
  }
}

function clearStatus() {
  document.getElementById('lost').textContent = 0;
  document.getElementById('dead').textContent = 0;
}