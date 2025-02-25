


// Variables globales
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Cargar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en la interfaz
function updateCart() {
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
                ${item.name} - $${item.price} 
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItemsList.appendChild(li);
            total += parseFloat(item.price);
        });
    }

    // Actualizar el total y el contador
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length;

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCart();
    alert('Producto añadido al carrito!');
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Mostrar/ocultar el modal del carrito
cartIcon.addEventListener('click', () => {
    cartDropdown.classList.toggle('cart-dropdown-hidden');
    updateCart(); // Actualizar la lista de productos al abrir el modal
});

// Cerrar el modal al hacer clic en el botón de cierre
cartCloseBtn.addEventListener('click', () => {
    cartDropdown.classList.add('cart-dropdown-hidden');
});

// Cerrar el modal al hacer clic fuera de él
document.addEventListener('click', (event) => {
    if (!cartDropdown.contains(event.target){
        cartDropdown.classList.add('cart-dropdown-hidden');
    }
});

// Adjuntar eventos a los botones "Agregar al carrito"
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

// Actualizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});