'use strict'

class CheckBox {
  #_parent;
  #_element;
  #_children;

  constructor(el, par = null) {
    this.#_parent = par;
    this.#_element = el.querySelector('.interest__check');
    this.#_children = [];
    const chlds = el.querySelector('ul.interests');
    if (chlds) {
      const chbs = [...chlds.children].filter( el => el.matches('li.interest') );
      setTimeout( () => this.#_children = chbs.map( li => new CheckBox(li, this)) );
    }

    this.#_element.addEventListener('click', evt => {
      if (this.#_element.checked) {
        this.#enableChildren();
        this.#startEnablingParent();
      } else {
        this.#disableChildren();
        this.#startDisablingParent();
      }
    });
  }

  #enableChildren() {
    this.#_element.checked = true;
    this.#_element.indeterminate = false;
    this.#_children.forEach( child => child.#enableChildren() );
  }

  #disableChildren() {
    this.#_element.checked = false;
    this.#_element.indeterminate = false;
    this.#_children.forEach( child => child.#disableChildren() );
  }

  #startEnablingParent() {
    this.#_parent && this.#_parent.#enableParent();
  }

  #startDisablingParent() {
    this.#_parent && this.#_parent.#disableParent();
  }

  #enableParent() {
    const has = this.#_children.some( chb => !chb.#_element.checked );
    if (has) {
      this.#_element.indeterminate = true;
    } else {
      this.#_element.checked = true;
      this.#_element.indeterminate = false;
    }
    this.#startEnablingParent();
  }

  #disableParent() {
    const has = this.#_children.some( chb => 
      chb.#_element.checked || chb.#_element.indeterminate );
    if (has) {
      this.#_element.checked = false;
      this.#_element.indeterminate = true;
    } else {
      this.#_element.checked = false;
      this.#_element.indeterminate = false;
    }
    this.#startDisablingParent();
  }
}