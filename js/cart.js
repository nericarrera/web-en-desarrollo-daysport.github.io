document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});


/*-------------CARGAR CARRITO-------------*/


let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const cartIcon = document.getElementById('cart-icon');

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

// Escuchar clics en todo el documento
document.addEventListener('click', (event) => {
    const isClickInside = cartDropdown.contains(event.target); // Verifica si el clic fue dentro del carrito
    const isCartIcon = cartIcon.contains(event.target); // Verifica si el clic fue en el icono del carrito

    if (!isClickInside && !isCartIcon) {
        cartDropdown.classList.add('cart-dropdown-hidden'); // Cierra el carrito si el clic fue fuera
    }
});


/*-----------------CERRAR EL MODAL CUANDO SE HACE CLIC AFUERA DEL CARRITO--------*/

