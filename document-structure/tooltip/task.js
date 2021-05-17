'use strict'

{
  const needTooltip = [...document.getElementsByClassName('has-tooltip')];
  needTooltip.forEach( item => 
    item.addEventListener( 'click', e => {
      e.preventDefault();
      tooltip(item);
    })
  );

  function tooltip(element) {
    function hideTooltip() {
      tooltip.element.classList.remove('tooltip_active');
      tooltip.opened = null;
    }

    function showTooltip() {
      tooltip.element.innerText = element.getAttribute('title');
      tooltip.opened = element;
      tooltip.element.classList.add('tooltip_active');
      position();
      clearTimeout(tooltip.timer);
      tooltip.timer = setTimeout( () => hideTooltip(), 1e4 );
    }

    function position() {
      const el = element.getBoundingClientRect();
      const tt = tooltip.element.getBoundingClientRect();
      switch (tooltip.element.dataset.position) {
        case 'top':
          tooltip.element.style.top = el.top - tt.height + document.documentElement.scrollTop + 'px';
          tooltip.element.style.left = el.left + document.documentElement.scrollLeft + 'px';
          break;
        case 'left':
          tooltip.element.style.top = el.top + document.documentElement.scrollTop + 'px';
          tooltip.element.style.left = el.left - tt.width + document.documentElement.scrollLeft + 'px';
          break;
        case 'right':
          tooltip.element.style.top = el.top + document.documentElement.scrollTop + 'px';
          tooltip.element.style.left = el.right + document.documentElement.scrollLeft + 'px';
          break;
        default:
          tooltip.element.style.top = el.bottom + document.documentElement.scrollTop + 'px';
          tooltip.element.style.left = el.left + document.documentElement.scrollLeft + 'px';
      }
    }

    if (tooltip.opened === element) {
      hideTooltip();
    } else {
      showTooltip();
    }
  }

  tooltip.element = document.querySelector('.tooltip');
  tooltip.opened = null;
}