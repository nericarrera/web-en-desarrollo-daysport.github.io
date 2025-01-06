

/*--------------MOSTRAR CARRITO--------------*/
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.querySelector('#cart-items-list');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    carrito.forEach(item => {
        carritoContainer.innerHTML += `
            <li>
                <img src="${item.imagen}" alt="${item.nombre}" width="50">
                <p>${item.nombre}</p>
                <p>Color: ${item.color}</p>
                <p>Talle: ${item.talla}</p>
                <p>Precio: $${item.precio.toLocaleString()}</p>
                <p>Cantidad: ${item.cantidad}</p>
            </li>
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