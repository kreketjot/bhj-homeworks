'use strict'

{
  const tasksList = document.getElementById('tasks__list');
  const taskInput = document.getElementById('task__input');

  tasksList.addEventListener( 'click', e => {
    if ( e.target.matches('.task__remove') ) {
      e.preventDefault();
      e.target.closest('.task').remove();
    }
  });

  document.getElementById('tasks__form').addEventListener( 'submit', e => {
    e.preventDefault();
    const text = taskInput.value;
    if ( text.trim().length ) {
      addTask(text);
      e.currentTarget.reset();
    }
  });

  function addTask(text) {
    tasksList.insertAdjacentHTML('afterbegin',  `
      <div class="task">
        <div class="task__title">
          ${text}
        </div>
        <a href="#" class="task__remove">&times;</a>
      </div> 
    `);
  }
}