'use strict'

{
  const editor = document.getElementById( 'editor' );

  document.getElementById( 'reset' ).addEventListener( 'click', e => {
    editor.value = '';
    saveText();
  });

  (function loadText() {
    const text = localStorage.editorText;
    if ( text ) {
      editor.value = text;
    }
  })();

  editor.addEventListener( 'input', e => saveText() );

  function saveText() {
    localStorage.editorText = editor.value;
  }
}
