/*----------------CARRITO DINAMICO--------------*/

document.addEventListener('DOMContentLoaded', () => {
    const carritoHTML = `
        <div class="conteiner-buscador-carrito">
            <div class="cart-icon-container">
                <img src="img/iconos/icon-shop-user-serch/bolsa-de-la-compra.png" alt="Carrito" id="cart-icon">
                <span id="cart-count">0</span>
            </div>
            <div class="user-icon-container">
                <img src="img/iconos/icon-shop-user-serch/usuario (1).png" alt="Usuario" id="user-icon">
            </div>
            <div class="buscador">
                <input type="text" id="search" placeholder="Buscar">
                <a href="#"><img src="img/iconos/icon-shop-user-serch/busqueda (1).png" alt="Buscador-icon" id="serch-icon"></a>
            </div>
        </div>
        <div id="cart-dropdown" class="cart-dropdown-hidden">
            <p class="titulo-carrito">Carrito de compras</p>
            <ul id="cart-items-list"></ul>
            <div class="cart-summary">
                <p>Total: <span id="cart-total">$0</span></p>
                <button id="checkout-btn">Finalizar compra</button>
                <a href="cart.html"><button id="view-cart-btn">Ver carrito</button></a>
            </div>
        </div>
    `;

    // Insertar el carrito al inicio del body o en el contenedor deseado
    document.body.insertAdjacentHTML('afterbegin', carritoHTML);

    // Cargar el contenido del carrito y actualizar el contador
    cargarCarrito();
});

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