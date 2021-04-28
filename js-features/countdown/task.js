'use strict'

class Timer {
  #hh; 
  #mm; 
  #ss;
  timeOutCallback;

  constructor(time = '00:00:01', cb = null) {
    const times = time.split(':');
    this.#hh = +times[0];
    this.#mm = +times[1];
    this.#ss = +times[2];
    this.timeOutCallback = cb;
  }

  getTime() {
    const hh = `0${this.#hh}`.slice(-2);
    const mm = `0${this.#mm}`.slice(-2);
    const ss = `0${this.#ss}`.slice(-2);
    return `${hh}:${mm}:${ss}`
  }

  decreseTime() {
    this.#ss--;

    if (this.#ss || this.#mm || this.#hh) {
      if (this.#ss < 0) {
        this.#ss = 59;
        this.#mm--;
        if (this.#mm < 0) {
          this.#mm = 59;
          this.#hh--;
        }
      }
    } else {
      if (this.timeOutCallback != null) {
        this.timeOutCallback();
      }
    }

    return this.getTime();
  }
}

const timerElement = document.getElementById('timer');
const timer = new Timer (
  timerElement.textContent
);
const timerInterval = setInterval(
  () => timerElement.textContent = timer.decreseTime()
  , 1000
);
timer.timeOutCallback = function () {
  clearInterval(timerInterval);
  timerElement.textContent = this.getTime();
  setTimeout ( 
    function () {
      if ( confirm('Вы победили в конкурсе!') ) {
        location.assign('https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.12.tar.xz');
      }
    }
  );
};