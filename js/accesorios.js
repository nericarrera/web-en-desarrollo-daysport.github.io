document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});