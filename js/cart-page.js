document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total');

    function updateCartPage() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach((item, index) => {
                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = `
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
                cartItemsContainer.appendChild(div);
                total += item.price * item.quantity;
            });
        }

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    updateCartPage();
});