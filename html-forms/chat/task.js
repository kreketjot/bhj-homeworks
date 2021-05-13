'use strict'

{
  const botMessages = [
    'ТИХО!',
    'Сейчас мы всё проверим',
    'Приятного аппетита',
    'Пойду посмотрю телек',
    'Удачи',
    'Ты думал, я тебе помогать буду?',
    'Ты шутишь, верно?',
    'Спокойнее',
    'Как стать человеком?',
    'Ясно',
    'Хочешь анекдот?'
  ];

  const messageStyle = {
    default: 'message',
    bot: '',
    client: 'message_client'
  };

  let timer = null;

  const messages = document.getElementById('chat-widget__messages');
  const messagesBox = messages.parentElement;

  document.querySelector('.chat-widget').addEventListener('click', evt => {
    evt.currentTarget.classList.add('chat-widget_active');
    setTimer();
  });

  document.getElementById('chat-widget__input').addEventListener('keydown', evt => {
    if (evt.key === 'Enter') {
      const text = evt.currentTarget.value.trim();
      if (text) {
        sendMessage(text);
        evt.currentTarget.value = '';
      }
    }
  });

  function randMessage(messages = botMessages) {
    return messages[ randIndex( messages.length ) ];
  }

  function randIndex(n = 1) {
    return Math.floor( Math.random() * n );
  }

  function printMessage(text = "", style = "") {
    messages.innerHTML += `
      <div class="${messageStyle.default} ${style}">
        <div class="message__time">${getTime()}</div>
        <div class="message__text">${text}</div>
      </div>
    `;
    messagesBox.scrollTo( 0, getHeight(messages) );
  }

  function getTime() {
    const now = new Date();
    const hh = ('0' + now.getHours()).slice(-2); 
    const mm = ('0' + now.getMinutes()).slice(-2); 
    return hh + ':' + mm;
  }

  function sendMessage(text = "") {
    setTimer();
    printMessage(text, messageStyle.client);
    printMessage(randMessage(), messageStyle.bot);
  }

  function setTimer() {
    clearTimeout(timer);
    timer = setTimeout( () => {
      printMessage('Мне уже можно идти спать?');
      timer = null;
    }, 3e4 );
  }

  function getHeight(box) {
    const pos = box.getBoundingClientRect();
    return pos.bottom - pos.top;
  }
}