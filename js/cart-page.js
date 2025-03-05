// Cargar el carrito desde localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Referencias a los elementos del DOM
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotal = document.getElementById('cart-total');

// Función para mostrar los productos en la página del carrito
// Función para mostrar los productos en la página del carrito
function renderCart() {
    // Limpiar el contenedor de productos
    cartItemsContainer.innerHTML = '';

    // Calcular el total
    let total = 0;

    if (cart.length === 0) {
        // Si el carrito está vacío, mostrar un mensaje
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        // Recorrer los productos del carrito y mostrarlos
        cart.forEach((item, index) => {
            // Verificar que el precio sea un número
            if (typeof item.price !== 'number') {
                console.error('El precio no es un número:', item.price);
                return;
            }

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>$${item.price.toFixed(2)}</p>
                    <p>Color: ${item.color}</p>
                    <p>Talle: ${item.size}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity; // Sumar al total
        });
    }

    // Mostrar el total
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    // Eliminar el producto del carrito
    cart.splice(index, 1);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Volver a renderizar el carrito
    renderCart();
}

// Llamar a la función para renderizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', renderCart);

console.log('Carrito actual:', cart); // Depuración
console.log('Producto a agregar:', product); // Depuración