/*--------BANNER--------*/

document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.banner-track');
  const slides = document.querySelectorAll('.banner-slide');
  let currentIndex = 0;

  function changeSlide() {
      const currentSlide = slides[currentIndex];
      const video = currentSlide.querySelector('video');

      // Mover el track al siguiente video
      currentIndex = (currentIndex + 1) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Escuchar el evento 'ended' del siguiente video para la transición
      const nextSlide = slides[currentIndex];
      const nextVideo = nextSlide.querySelector('video');
      
      // Reproducir el siguiente video y esperar hasta que termine para cambiar al siguiente
      nextVideo.currentTime = 0;  // Reiniciar el video
      nextVideo.play();
      nextVideo.addEventListener('ended', changeSlide, { once: true });
  }

  // Iniciar el carrusel con el primer video
  const firstVideo = slides[0].querySelector('video');
  firstVideo.play();
  firstVideo.addEventListener('ended', changeSlide, { once: true });
});


/*------------CARRITO------------*/

// Variables globales para el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Cargar carrito desde LocalStorage
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');

// Mostrar u ocultar el carrito al hacer clic en el ícono del carrito
cartIcon.addEventListener('click', () => {
  if (cart.length === 0) {
      alert("El carrito está vacío.");
  } else {
      cartDropdown.classList.toggle('cart-dropdown-hidden');  // Mostrar/ocultar el carrito
  }
});

// Actualizar la interfaz del carrito
function updateCart() {
  cartItemsList.innerHTML = '';  // Limpiar la lista del carrito
  let total = 0;

  // Si no hay productos en el carrito
  if (cart.length === 0) {
      cartItemsList.innerHTML = '<p>El carrito está vacío.</p>';
  } else {
      cart.forEach((item, index) => {
          total += parseFloat(item.price);
          const li = document.createElement('li');
          li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Eliminar</button>`;
          cartItemsList.appendChild(li);
      });
  }

  cartCount.innerText = cart.length;  // Actualizar el contador
  cartTotal.innerText = `$${total.toFixed(2)}`;  // Mostrar el total
  localStorage.setItem('cart', JSON.stringify(cart));  // Guardar el carrito en LocalStorage
}

// Añadir productos al carrito
function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  updateCart();
  alert('Producto añadido al carrito!');
}

// Eliminar productos del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();  // Actualizar la lista de productos en el carrito
}

// Enlazar los botones de "Agregar al carrito" para cada producto
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
      const productName = e.target.getAttribute('data-product');
      const productPrice = e.target.getAttribute('data-price');
      addToCart(productName, productPrice);
  });
});

// Cargar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  updateCart();  // Actualizar el carrito al cargar la página
});

/*--------------------------------------*/




/*---------------------NOVEDAD MUJER EXPORTACION CARRUSEL-------------------- */
document.addEventListener('DOMContentLoaded', () => {
    import('/js/mujerProductos.js').then(module => {
        const productosMujer = module.productosMujer;

        if (!productosMujer) {
            console.error("No se encontraron productos para el carrusel.");
            return;
        }

        const contenedorCarrusel = document.querySelector('.carrusel-container-mujer');
        if (!contenedorCarrusel) {
            console.error("El contenedor del carrusel no está en el DOM.");
            return;
        }

        const productosNovedad = productosMujer.filter(producto => producto.etiqueta?.toLowerCase() === "novedad");

        productosNovedad.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-novedad-mujer');
            productoDiv.innerHTML = `
                <div class="product-container-carrusel">
                    <div class="product-image-carrusel">
                        <img id="mainImage-${producto.id}" src="${producto.imagen[0]}" alt="${producto.nombre}" class="main-product-image">
                        <div class="product-thumbnails">
                            ${producto.miniaturas.map((img, index) => `
                                <img src="${img}" alt="Miniatura ${index + 1}" class="thumbnail-image">
                            `).join('')}
                        </div>
                    </div>
                    <div class="product-info-carrusel">
                        <h3>${producto.nombre}</h3>
                        <p>$${producto.precio.toLocaleString()}</p>
                    </div>
                </div>
            `;

            productoDiv.addEventListener('click', () => {
                const url = `index-producto.html?id=${producto.id}&seccion=mujer`;
                window.location.href = url;
            });

            contenedorCarrusel.appendChild(productoDiv);
        });
    }).catch(err => console.error("Error al importar productos:", err));
});

/***--------ENLACE A PAGINA DE PRODUCTOS--------- */

productoDiv.addEventListener('click', () => {
    const url = `index-producto.html?id=${producto.id}&seccion=mujer`;
    window.location.href = url; // Redirige a la página de producto
});

