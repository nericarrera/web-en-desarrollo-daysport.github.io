// Función para mostrar los productos en el modal del carrito
function mostrarProductosEnCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('cart-items-list');
    const totalCarrito = document.getElementById('cart-total');

    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            ${producto.nombre} - ${producto.color} - Talle ${producto.talla} - $${producto.precio} x ${producto.cantidad}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
    actualizarCarrito();
}

// Cargar los productos del carrito al abrir el modal
document.getElementById('cart-icon').addEventListener('click', () => {
    mostrarProductosEnCarrito();
});


// Actualizar la visualización del carrito
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            total += parseFloat(item.price);
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price} 
                <button onclick="removeFromCart(${index})">Eliminar</button>`;
            cartItemsList.appendChild(li);
        });
    }

    cartCount.innerText = cart.length;
    cartTotal.innerText = `$${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Añadir producto al carrito
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    alert('Producto añadido al carrito!');
}

// Eliminar producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Inicializar carrito en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
    updateCart();

    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = button.getAttribute('data-price');
            addToCart(productName, productPrice);
        });
    });
});

// Cerrar el modal cuando se hace clic fuera del carrito
document.addEventListener('click', (event) => {
    const isClickInside = cartDropdown.contains(event.target);
    const isCartIcon = cartIcon.contains(event.target);

    if (!isClickInside && !isCartIcon) {
        cartDropdown.classList.add('cart-dropdown-hidden');
    }
});

// Prevenir el cierre si se hace clic en el icono del carrito
cartIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    cartDropdown.classList.toggle('cart-dropdown-hidden');
});

// Botón de cierre
const cartCloseBtn = document.getElementById('cart-close-btn');
cartCloseBtn.addEventListener('click', () => {
    cartDropdown.classList.add('cart-dropdown-hidden');
});



/*---------------------------------------------------------*/

// Abrir/cerrar el modal del carrito al hacer clic en el ícono
cartIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Evitar que el clic se propague
    cartDropdown.classList.toggle('cart-dropdown-hidden'); // Alternar la visibilidad del modal
});

// Cerrar el modal al hacer clic fuera de él
document.addEventListener('click', (event) => {
    const isClickInside = cartDropdown.contains(event.target);
    const isCartIcon = cartIcon.contains(event.target);

    if (!isClickInside && !isCartIcon) {
        cartDropdown.classList.add('cart-dropdown-hidden'); // Cerrar el modal
    }
});

// Cerrar el modal al hacer clic en el botón de cierre
cartCloseBtn.addEventListener('click', () => {
    cartDropdown.classList.add('cart-dropdown-hidden'); // Cerrar el modal
});