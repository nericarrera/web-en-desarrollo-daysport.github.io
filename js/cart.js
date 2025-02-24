

// Variables globales
const cartDropdown = document.getElementById('cart-dropdown');
const cartIcon = document.getElementById('cart-icon');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Función para mostrar los productos en el modal del carrito
function mostrarProductosEnCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartItemsList.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        cartItemsList.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, index) => {
            const item = document.createElement('li');
            item.innerHTML = `
                ${producto.nombre} - ${producto.color} - Talle ${producto.talla} - $${producto.precio} x ${producto.cantidad}
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            cartItemsList.appendChild(item);
            total += producto.precio * producto.cantidad;
        });
    }

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
    actualizarCarrito();
}

// Función para actualizar el contador del carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartCount.textContent = carrito.length;
}

// Abrir/cerrar el modal del carrito al hacer clic en el ícono
cartIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    cartDropdown.classList.toggle('cart-dropdown-hidden');
    mostrarProductosEnCarrito(); // Mostrar los productos al abrir el modal
});

// Cerrar el modal al hacer clic fuera de él
document.addEventListener('click', (event) => {
    const isClickInside = cartDropdown.contains(event.target);
    const isCartIcon = cartIcon.contains(event.target);

    if (!isClickInside && !isCartIcon) {
        cartDropdown.classList.add('cart-dropdown-hidden');
    }
});

// Cerrar el modal al hacer clic en el botón de cierre
cartCloseBtn.addEventListener('click', () => {
    cartDropdown.classList.add('cart-dropdown-hidden');
});

// Cargar el carrito al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});