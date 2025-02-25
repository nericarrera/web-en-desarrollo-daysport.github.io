
// Variables globales (declaradas una sola vez)
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');


// Cargar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar los productos en la página del carrito
function displayCartItems() {
    // Limpiar la lista de productos
    cartItemsList.innerHTML = '';

    // Calcular el total y mostrar los productos
    let total = 0;
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <p>${item.name}</p>
                        <p>$${item.price}</p>
                        <button onclick="removeFromCart(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(li);
            total += parseFloat(item.price);
        });
    }

    // Actualizar el total
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Actualizar la lista de productos
}

// Mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

const cartCloseBtn = document.getElementById('cart-close-btn');

if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que el evento se propague
        cartDropdown.classList.add('cart-dropdown-hidden'); // Ocultar el modal
    });
} else {
    console.error('El botón de cierre del carrito no se encontró.');
}

// Cerrar el modal al hacer clic fuera de él
document.addEventListener('click', (event) => {
    if (!cartDropdown.contains(event.target) && !cartIcon.contains(event.target)) {
        cartDropdown.classList.add('cart-dropdown-hidden');
    }
});


// Adjuntar eventos a los botones "Agregar al carrito"
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});