'use strict'

{
  const modalMain = document.getElementById('modal_main');
  const modalSuccess = document.getElementById('modal_success');

  [...document.getElementsByClassName('modal')].
    forEach(
      modal => modal.getElementsByClassName('modal__close')[0].
        onclick = () => hideModal(modal)
    );
  
  modalMain.getElementsByClassName('show-success')[0].onclick = 
    () => {
      hideModal(modalMain);
      showModal(modalSuccess);
    };

  showModal(modalMain);

  function showModal(modal) {
    modal.className = `${modal.className} modal_active`;
  }

  function hideModal(modal) {
    modal.className = 
      modal.className.
      split(' ').
      filter(
        modalClass => modalClass !== 'modal_active'
      ).
      join(' ');
  }
}