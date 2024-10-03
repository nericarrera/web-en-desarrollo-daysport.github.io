
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Actualizar contador del carrito en la página principal
const cartCount = document.getElementById('cart-count');
cartCount.innerText = cart.length;

// Añadir productos al carrito
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en LocalStorage
    cartCount.innerText = cart.length; // Actualizar contador
}

// Enlazar los botones de "Agregar al carrito" para cada producto
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.getAttribute('data-product');
        const productPrice = e.target.getAttribute('data-price');
        addToCart(productName, productPrice);
        alert('Producto añadido al carrito!');
    });
});