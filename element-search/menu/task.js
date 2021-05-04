'use strict'

// {
  const cache = new WeakMap();
  let expandedMenu = null;

  function getSubMenu (link) {
    if (!cache.has(link)) {
      const menu = link.parentElement.querySelector('.menu_sub');
      cache.set(link, menu);
    }
    return cache.get(link);
  }

  [...document.getElementsByClassName('menu__link')].
    forEach( 
      link => link.onclick = function() {
        const menu = getSubMenu(link);
        if (menu) {
          clickMenu(menu);
          return false;
        }
      }
    );
  
  function clickMenu(menu) {
    if (expandedMenu == menu) {
      collapseMenu();
    } else {
      collapseMenu();
      expandMenu(menu);
    }
  }

  function expandMenu(menu) {
    expandedMenu = menu;
    menu.className += ' menu_active';
  }

  function collapseMenu() {
    if (!expandedMenu) {
      return;
    }
    expandedMenu.className = expandedMenu.className.
      split(' ').
      filter(
        clName => clName !== 'menu_active'
      ).
      join(' ');
    expandedMenu = null;
  }
// }