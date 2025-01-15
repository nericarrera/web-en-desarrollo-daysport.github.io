/*----------------CARRITO DINAMICO--------------*/


/*-------------CARGAR CARRITO-------------*/

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItemsList.innerHTML = ''; // Limpiar la lista
    let total = 0;
    let count = 0;

    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
                <div>
                    <p>${item.nombre}</p>
                    <p>Talle: ${item.talla}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Precio: $${(item.precio * item.cantidad).toLocaleString()}</p>
                </div>
            </div>
        `;
        cartItemsList.appendChild(listItem);
        total += item.precio * item.cantidad;
        count += item.cantidad;
    });

    cartTotal.textContent = `$${total.toLocaleString()}`; // Actualizar el total
    cartCount.textContent = count; // Actualizar el contador
}

document.addEventListener('DOMContentLoaded', cargarCarrito);



/*----------------AGEGAR AL CARRITO---------------*/

function agregarAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(
        item => item.id === producto.id && item.color === producto.color && item.talla === producto.talla
    );

    if (productoExistente) {
        productoExistente.cantidad += producto.cantidad;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito
    cargarCarrito(); // Actualizar el carrito
    alert(`Producto agregado al carrito: ${producto.nombre}`);
}