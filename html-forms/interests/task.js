'use strict'

{
  const interests = [...document.querySelectorAll('.interests_main > ul > li.interest')]
  const checkboxes = interests.map( el => new CheckBox(el) );
}