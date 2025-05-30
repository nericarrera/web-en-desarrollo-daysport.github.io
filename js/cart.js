console.log('Carrito al cargar:', JSON.parse(localStorage.getItem('cart')));

document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    
    // Verifica que los elementos existen
    if (!cartIcon || !cartDropdown) {
      console.error('Elementos del carrito no encontrados');
      return;
    }
  
    // Cargar carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function toggleCart() {
      // Solo alternar el carrito sin afectar otros modales
      const isHidden = cartDropdown.classList.contains('cart-dropdown-hidden');
      
      // Ocultar primero si está visible
      if (!isHidden) {
        cartDropdown.classList.add('cart-dropdown-hidden');
        return;
      }
      
      // Alternar visibilidad del carrito
  cartDropdown.classList.toggle('cart-dropdown-hidden');
  
  // Si el carrito se está mostrando, actualiza su contenido
  if (!cartDropdown.classList.contains('cart-dropdown-hidden')) {
    updateCart();
  }
    }
  
    // Evento para el icono del carrito
    cartIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      toggleCart();
    });
  
    // Evento para cerrar el carrito
    if (cartCloseBtn) {
      cartCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.add('cart-dropdown-hidden');
      });
    }
  
    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
        cartDropdown.classList.add('cart-dropdown-hidden');
      }
    });
  
    // Actualizar carrito
    function updateCart() {
      const cartItemsList = document.getElementById('cart-items-list');
      const cartTotal = document.getElementById('cart-total');
      const cartCount = document.getElementById('cart-count');
      
      if (!cartItemsList || !cartTotal || !cartCount) return;
  
      cartItemsList.innerHTML = '';
      let total = 0;
  
      if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío</p>';
      } else {
        cart.forEach((item, index) => {
          const li = document.createElement('li');
          li.className = 'cart-item';
          li.innerHTML = `
            <div class="cart-item-modal">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-details1">
                <p class="cart-item-name1"><strong>${item.name}</strong></p>
                <p class="cart-item-name1">$${item.price.toFixed(2)}</p>
                ${item.color ? `<p class="cart-item-name1">Color: ${item.color}</p>` : ''}
                ${item.size ? `<p class="cart-item-name1">Talle: ${item.size}</p>` : ''}
                <p class="cart-item-name1">${item.quantity}</p>
                <button class="btn-remove-modal" data-index="${index}">✕</button>
              </div>
            </div>
          `;
          cartItemsList.appendChild(li);
          total += item.price * item.quantity;
        });
      }
  
      cartTotal.textContent = `$${total.toFixed(2)}`;
      cartCount.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      
      // Agregar eventos a los botones de eliminar
      document.querySelectorAll('.btn-remove-modal').forEach(btn => {
        btn.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          removeFromCart(index);
        });
      });
    }
  
    // Función para eliminar items
    function removeFromCart(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    }
  
    // Función para agregar items
    window.addToCart = function(product) {
      product.price = parseFloat(product.price) || 0;
      product.quantity = parseInt(product.quantity) || 1;
  
      const existingIndex = cart.findIndex(item => 
        item.name === product.name && 
        item.color === product.color && 
        item.size === product.size
      );
  
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += product.quantity;
      } else {
        cart.push(product);
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
      
      // Mostrar el carrito automáticamente
      cartDropdown.classList.remove('cart-dropdown-hidden');
    };
  
    // Inicializar
    updateCart();
  });

  // Verifica si el carrito está inicializado
console.log('Carrito:', JSON.parse(localStorage.getItem('cart')));

// Verifica visibilidad del dropdown
console.log('Estilo del dropdown:', document.getElementById('cart-dropdown').style.display);


