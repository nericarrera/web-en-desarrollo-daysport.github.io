
// Cargar productos desde LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');

// Función para cargar productos en la página del carrito
function loadCart() {
    cartItemsList.innerHTML = ''; // Limpiar lista de productos
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItemsList.appendChild(li);
    });

    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Eliminar productos del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar LocalStorage
    loadCart(); // Recargar la lista de productos
}

// Cargar el carrito al cargar la página
loadCart();


/*--------------MOSTRAR CARRITO--------------*/
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.querySelector('#carrito-items');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    carrito.forEach(item => {
        carritoContainer.innerHTML += `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <p><strong>${item.nombre}</strong></p>
                <p>Color: ${item.color}</p>
                <p>Talle: ${item.talla}</p>
                <p>Precio: $${item.precio.toLocaleString()}</p>
                <p>Cantidad: ${item.cantidad}</p>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);


/*------------------VACIAR EL CARRITO---------------*/

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    alert('El carrito ha sido vaciado.');
    mostrarCarrito();
}