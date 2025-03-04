
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
            // Verificar que el precio sea un número
            if (typeof item.price !== 'number') {
                console.error('El precio no es un número:', item.price);
                return;
            }

            const li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <p>${item.name}</p>
                        <p>$${item.price.toFixed(2)}</p>
                        <p>Color: ${item.color}</p>
                        <p>Talle: ${item.size}</p>
                        <p>Cantidad: ${item.quantity}</p>
                        <button onclick="removeFromCart(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity; // Sumar al total considerando la cantidad
        });
    }

    // Actualizar el total y el contador
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length;

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para agregar un producto al carrito
function addToCart(product) {
    // Verificar que el producto tenga un precio válido
    if (typeof product.price === 'undefined' || isNaN(parseFloat(product.price))) {
        console.error('El precio del producto no es válido:', product.price);
        alert('Error: El precio del producto no es válido.');
        return;
    }

    // Convertir el precio a número
    product.price = parseFloat(product.price);

    // Agregar el producto al carrito
    cart.push(product);
    updateCart(); // Actualizar la interfaz del carrito
    alert('Producto añadido al carrito!');
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart(); // Actualizar la interfaz del carrito
}

// Mostrar/ocultar el modal del carrito
cartIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    cartDropdown.classList.toggle('cart-dropdown-hidden');
    updateCart(); // Actualizar la lista de productos al abrir el modal
});

// Cerrar el modal al hacer clic en el botón de cierre
if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        cartDropdown.classList.add('cart-dropdown-hidden');
    });
} else {
    console.error('El botón de cierre del carrito no se encontró.');
}

// Cerrar el modal al hacer clic fuera de él
document.addEventListener('click', (event) => {
    if (!cartDropdown.contains(event.target) && !cartIcon.contains(event.target)) {
        cartDropdown.classList.add('cart-dropdown-hidden');
    }
});

// Adjuntar eventos a los botones "Agregar al carrito"
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        // Obtener los datos del producto desde los atributos del botón
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        const productImage = button.getAttribute('data-image');

        // Verificar que los datos se obtuvieron correctamente
        console.log('Datos del producto:', { productName, productPrice, productImage });

        if (!productName || !productPrice || !productImage) {
            console.error('Faltan datos en el botón "Agregar al carrito".');
            return;
        }

        // Agregar el producto al carrito
        addToCart(productName, productPrice, productImage);
    });
});

// Actualizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

/*--------------------------------------------------------------*/

