
// Cargar el carrito desde localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar los productos en la página del carrito
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor
        cart.forEach((item, index) => {
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
            total += item.price * item.quantity;
        });
    }

    // Mostrar el total
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Llamar a la función para renderizar el carrito
renderCart();