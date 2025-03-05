// Cargar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Variables globales
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

function addToCart(product) {
    // Convertir el precio a número
    product.price = parseFloat(product.price);

    // Verificar que el precio sea un número válido
    if (isNaN(product.price)) {
        console.error('El precio no es un número válido:', product.price);
        alert('Error: El precio del producto no es válido.');
        return;
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(
        (item) =>
            item.name === product.name &&
            item.color === product.color &&
            item.size === product.size
    );

    if (existingProduct) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        existingProduct.quantity += product.quantity;
    } else {
        // Si no está en el carrito, agregarlo
        cart.push(product);
    }

    // Actualizar el carrito en la interfaz
    updateCart();
    alert('Producto añadido al carrito!');
}

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

            // Crear el elemento del producto en el carrito
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
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Sumar las cantidades

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
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

        // Crear el objeto producto
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1, // Puedes ajustar esto según sea necesario
            color: 'default', // Ajusta según sea necesario
            size: 'default' // Ajusta según sea necesario
        };

        // Agregar el producto al carrito
        addToCart(product);
    });
});

// Actualizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});