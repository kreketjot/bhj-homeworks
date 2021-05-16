'use strict'

{
  const tasksList = document.getElementById('tasks__list');
  const taskInput = document.getElementById('task__input');

  setTaskList();

  tasksList.addEventListener( 'click', e => {
    if ( e.target.matches('.task__remove') ) {
      e.preventDefault();
      e.target.closest('.task').remove();
      saveTasksList();
    }
  });

  document.getElementById('tasks__form').addEventListener( 'submit', e => {
    e.preventDefault();
    const text = taskInput.value;
    if ( text.trim().length ) {
      addTask(text);
      e.currentTarget.reset();
      saveTasksList();
    }
  });

  function addTask2(text) {
    const task = document.createElement('div');
    task.outerHTML =  `
      <div class="task">
        <div class="task__title">
          ${text}
        </div>
        <a href="#" class="task__remove">&times;</a>
      </div> 
    `; /* почему то не разрешает. есть способ создания элемента И изменение его HTML. я знаю про innerHTML, но нужно изменить и HTML самого элемента. возиться с атрибутами не хочется.. Должен быть крутой способ */
    tasksList.prepend(task);
  }

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

  function saveTasksList() {
    localStorage.setItem('tasks', tasksList.innerHTML);
  }

  function setTaskList() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      tasksList.innerHTML = tasks;
    }
  }
}