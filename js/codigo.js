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
/*----------------------------*/

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

/* -----------BOTON PARA AGREGAR AL CARRITO--------------*/

// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", function () {
  // Obtener todos los botones con clase "btn-agregar"
  var botones = document.querySelectorAll(".btn-agregar");

  // Añadir evento de clic a cada botón
  botones.forEach(function (boton) {
      boton.addEventListener("click", function () {
          // Obtener el producto del atributo data-producto
          var producto = boton.getAttribute("data-producto");

          // Redirigir a la página de producto correspondiente
          window.location.href = "index-producto.html?producto=" + producto;
      });
  });
});

/*-------------------------------------------------------------------- */

/*---------------------NOVEDAD MUJER EXPORTACION CARRUSEL-------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const contenedorCarrusel = document.querySelector('.carrusel-container-mujer');

    if (!contenedorCarrusel) {
        console.error("El contenedor del carrusel no está en el DOM.");
        return;
    }

    // Obtener productos con la etiqueta "novedad"
    const productosNovedad = window.obtenerProductosNovedad();

    productosNovedad.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-novedad-mujer');

        // Mostramos solo 1 foto principal por color en el carrusel
        productoDiv.innerHTML = `
            <div class="product-card-novedad-mujer" data-id="${producto.id}">
                <div class="product-image">
                    <img src="${producto.imagen[0]}" alt="${producto.nombre}" class="main-product-image">
                </div>
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio.toLocaleString()}</p>
                </div>
            </div>
        `;

        const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);
        let selectedImage = producto.imagen[0];
        let isInsideProduct = false;

        // Manejo del hover en miniaturas
        const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('mouseover', () => {
                selectedImage = thumbnail.src;
                mainImage.src = selectedImage;
            });
        });

        // Detectar entrada y salida del producto
        productoDiv.addEventListener('mouseover', () => {
            isInsideProduct = true;
        });

        productoDiv.addEventListener('mouseout', () => {
            isInsideProduct = false;
            setTimeout(() => {
                if (!isInsideProduct) {
                    mainImage.src = producto.imagen[0];
                }
            }, 100);
        });

        // Evento para redirigir al producto
        productoDiv.addEventListener('click', () => {
            const url = `index-producto.html?id=${producto.id}&seccion=mujer`;
            window.location.href = url;
        });

        contenedorCarrusel.appendChild(productoDiv);
    });
});
































/*-----------------------------CONTENEDOR DE PRUDUCTOS 1 NERI----------------- */

let currentPosition = 0;
const productWrapper = document.querySelector('.product-wrapper');
const productCards = document.querySelectorAll('.product-card2');
const cardWidth = productCards[0].offsetWidth + 15; // Ancho de cada tarjeta + el espacio (gap)
const totalWidth = cardWidth * productCards.length; // Ancho total de todas las tarjetas

// Manejadores para flechas del product-wrapper
document.getElementById('nextProductArrow').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    // Mover hacia la derecha
    if (currentPosition > -(totalWidth - productWrapper.offsetWidth)) {
        currentPosition -= cardWidth;
        productWrapper.style.transform = `translateX(${currentPosition}px)`;
    }
});

document.getElementById('prevProductArrow').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    // Mover hacia la izquierda
    if (currentPosition < 0) {
        currentPosition += cardWidth;
        productWrapper.style.transform = `translateX(${currentPosition}px)`;
    }
});
/*----------------------------------------------- */


/*-----flechas para mover las cards - 1er seccion------- */

const cardWrapper = document.querySelector('.card-wrapper');
const nextArrow = document.getElementById('nextArrow');
const prevArrow = document.getElementById('prevArrow');

let scrollAmount = 0;
const scrollStep = 200; // Ajusta este valor según sea necesario

function updateDimensions() {
    containerWidth = cardWrapper.offsetWidth;
    totalScrollWidth = cardWrapper.scrollWidth;
    maxScrollAmount = totalScrollWidth - containerWidth;
}

updateDimensions(); // Inicializa las dimensiones

nextArrow.addEventListener('click', function(event) {
    event.preventDefault();
    scrollAmount += scrollStep;
    if (scrollAmount > maxScrollAmount) {
        scrollAmount = maxScrollAmount;
    }
    cardWrapper.style.transform = `translateX(-${scrollAmount}px)`;
});

prevArrow.addEventListener('click', function(event) {
    event.preventDefault();
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    cardWrapper.style.transform = `translateX(-${scrollAmount}px)`;
});

window.addEventListener('load', updateDimensions);
// Asegúrate de llamar a updateDimensions si se agregan o eliminan tarjetas dinámicamente
window.addEventListener('resize', updateDimensions); // Recalcula en caso de cambio de tamaño de ventana



/*---------LLAMADO PARA CARGAR PAGINA-------------------*/



