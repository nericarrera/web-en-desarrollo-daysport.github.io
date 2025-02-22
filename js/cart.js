document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});


/*-------------CARGAR CARRITO-------------*/
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');

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

/*-----------------CERRAR EL MODAL CUANDO SE HACE CLIC AFUERA DEL CARRITO--------*/

// Escuchar clics en todo el documento
document.addEventListener('click', (event) => {
    const isClickInside = cartDropdown.contains(event.target); // Verifica si el clic fue dentro del carrito
    const isCartIcon = cartIcon.contains(event.target); // Verifica si el clic fue en el icono del carrito

    if (!isClickInside && !isCartIcon) {
        cartDropdown.classList.add('cart-dropdown-hidden'); // Cierra el carrito si el clic fue fuera
    }
});

// Prevenir el cierre si se hace clic en el icono del carrito
cartIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Detiene la propagación para evitar cerrar el modal
    cartDropdown.classList.toggle('cart-dropdown-hidden'); // Abre/cierra el carrito
});

/*--------------CARRITO - BOTON DE CERRAR -----------------*/

// Botón de cierre
const cartCloseBtn = document.getElementById('cart-close-btn');

// Evento para cerrar el carrito
cartCloseBtn.addEventListener('click', () => {
    cartDropdown.classList.add('cart-dropdown-hidden'); // Oculta el carrito
});