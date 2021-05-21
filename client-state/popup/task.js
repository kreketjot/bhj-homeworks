'use strict'

{
  // куки не работают на локальной машине. на apache сервере заработали. оставлю их закоментированными. но напишу аналог localStorage
  // if ( !document.cookie.includes( 'subscribeModalClosed' ) ) {
  if ( !localStorage.subscribeModalClosed ) {
    const modal = document.getElementById( 'subscribe-modal' );
    modal.classList.add( 'modal_active' );
    modal.querySelector( '.modal__close' ).addEventListener( 'click', e => {
      modal.classList.remove( 'modal_active' ); 
      // document.cookie = `subscribeModalClosed=true; max-age=${365 * 24 * 60 * 60}`;
      localStorage.subscribeModalClosed = true;
    });
  }
}