

/*-------------AGREGAR AL CARRITO-------------*/

function agregarAlCarrito(producto) {
    console.log("Producto que se va a agregar al carrito:", producto); // Depuración

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(
        item => item.id === producto.id && item.color === producto.color && item.talla === producto.talla
    );

    if (productoExistente) {
        productoExistente.cantidad += producto.cantidad;
    } else {
        carrito.push(producto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log("Carrito actualizado:", carrito); // Depuración

    actualizarContadorCarrito();
    alert(`Producto agregado al carrito: ${producto.nombre} - Talle: ${producto.talla}`);
}

/*--------------ACTUALIZAR CARRITO---------------*/

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    console.log("Total productos en el carrito:", totalProductos); // Depuración

    document.getElementById('cart-count').textContent = totalProductos;
}


/*-------------MOSTRAR CARRITO-------------*/

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