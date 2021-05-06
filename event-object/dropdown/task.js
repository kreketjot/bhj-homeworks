'use strict'

{
  const openedListClass = 'dropdown__list_active';

  [...document.getElementsByClassName('dropdown')].forEach(
    dropdown => makeDropdown(dropdown)
  );

  function makeDropdown(dd) {
    if (!dd) {
      return false;
    }
    const ddValue = dd.querySelector('.dropdown__value');
    const ddList = dd.querySelector('.dropdown__list');

    dd.addEventListener('click', evt => {
      if (ddList.classList.contains(openedListClass)) {
        closeList(ddList);
      } else {
        openList(ddList);
      }
    });

    [...ddList.getElementsByClassName('dropdown__link')].forEach( item => 
      item.addEventListener('click', evt => {
        evt.preventDefault();
        ddValue.textContent = item.textContent;
      })
    );

    return true;
  }

  function openList(ddList) {
    if (!ddList) {
      return false;
    }
    ddList.classList.add(openedListClass);
    return true;
  }

  function closeList(ddList) {
    if (!ddList) {
      return false;
    }
    ddList.classList.remove(openedListClass);
    return true;
  }
}