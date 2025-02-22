document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

import { productosNiños } from 'js/niñosProductos.js';