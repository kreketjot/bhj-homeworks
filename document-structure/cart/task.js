'use strict' 

{
  const cartSection = document.querySelector('.cart');
  const cart = cartSection.querySelector('.cart__products'); 
  let products = []; 
  getCart();

  [...document.getElementsByClassName('product')].forEach( product => {
    const quantityValue = product.querySelector('.product__quantity-value');

    product.querySelector('.product__quantity-control_dec').addEventListener('click', e => {
      if (quantityValue.innerText > 1) {
        quantityValue.innerText--;
      }
    });

    product.querySelector('.product__quantity-control_inc').addEventListener('click', e =>
      quantityValue.innerText++
    );

    product.querySelector('.product__add').addEventListener('click', e =>
      addProduct(product)
    );
  });

  function addProduct(product) {
    const id = product.dataset.id;
    const quantity = product.querySelector('.product__quantity-value').innerText;
    let cartProduct = cart.querySelector(`.cart__product[data-id="${id}"`);

    if (cartProduct) {
      cartProduct.querySelector('.cart__product-count').innerText -= -quantity;
      products.find( el => el.id == id ).quantity -= -quantity;
    } else {
      const img = product.querySelector('.product__image').src;
      addNewProduct( { id, quantity, img } );
      products.push( { id, quantity } );
    }

    cartProduct = cart.querySelector(`.cart__product[data-id="${id}"`);
    animate( product.querySelector('.product__image'), cartProduct.querySelector('.cart__product-image') );

    saveCart();
  }

  function addRemoveListener(product) {
    product.querySelector('.cart__product-remove').addEventListener('click', e => {
      removeProduct(product);
      product.remove();
    });
  }

  function addNewProduct({id, quantity, img}) {
    const product = document.createElement('div');
    product.classList.add('cart__product');
    product.dataset.id = id;
    product.innerHTML = `
      <img class="cart__product-image" src="${img}">
      <div class="cart__product-count">${quantity}</div>
      <div class="cart__product-remove">-</div>
    `;
    cart.append(product);
    addRemoveListener(product);
    cartSection.removeAttribute('hidden');
  }

  function removeProduct(product) {
    const id = product.dataset.id;
    products = products.filter( el => el.id != id );
    saveCart();
    if (!products.length) {
      cartSection.setAttribute('hidden', '');
    }
  }

  function saveCart() {
    localStorage.cart = JSON.stringify(products);
  }

  function getCart() {
    if (!localStorage.cart) {
      return;
    }
    products = JSON.parse( localStorage.cart );
    products.forEach( el => {
      el.img = document.querySelector(`.product[data-id="${el.id}"`).
        querySelector('.product__image').src;
      addNewProduct(el); 
    });
  }

  function animate(elA, elB) {
    const posA = elA.getBoundingClientRect();
    const posB = elB.getBoundingClientRect();
    const clone = elB.cloneNode();
    clone.classList.add('anim-image');
    let y = posA.top + document.documentElement.scrollTop;
    let x = posA.left + document.documentElement.scrollLeft;
    clone.style.top = y + 'px';
    clone.style.left = x + 'px';

    const steps = 15;
    const dt = 10;
    const dx = (posB.left - posA.left) / steps;
    const dy = (posB.top - posA.top) / steps;

    document.documentElement.append(clone);
    for (let i = 0; i < steps; i++) {
      setTimeout( () => {
        clone.style.top = i * dy + y + 'px';
        clone.style.left = i * dx + x + 'px';
      } , dt * i);
    }
    setTimeout( () => clone.remove(), steps * dt );
  }
}