'use strict'

{
  let activeTab = 0; // норм так?
  const activeTabClassName = 'tab_active';
  const activeWindowClassName = 'tab__content_active';

  const windows = [...document.getElementsByClassName('tab__content')];
  const tabs = [...document.getElementsByClassName('tab')];
  tabs.forEach( (tab, index) => 
    tab.addEventListener('click', evt => {
      closeTab();
      activeTab = index;
      openTab();
    })
  );

  function closeTab() {
    tabs[activeTab].classList.remove(activeTabClassName);
    windows[activeTab].classList.remove(activeWindowClassName);
  }

  function openTab() {
    tabs[activeTab].classList.add(activeTabClassName);
    windows[activeTab].classList.add(activeWindowClassName);
  }
}