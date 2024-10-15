/*--------BANNER--------*/

let currentIndex = 0;
const track = document.querySelector('.banner-track');
const slides = document.querySelectorAll('.banner-slide');

function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(changeSlide, 25000);  // Cambia cada 25 segundos

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

/*-----------------FILTRO precio-------------------- */

document.addEventListener('DOMContentLoaded', function() {
  const minPriceRange = document.getElementById('min-price-range');
  const maxPriceRange = document.getElementById('max-price-range');
  const priceDisplayMin = document.getElementById('price-display-min');
  const priceDisplayMax = document.getElementById('price-display-max');

  // Actualizar los valores al mover los controles de rango
  minPriceRange.addEventListener('input', function() {
    priceDisplayMin.textContent = `$${parseInt(minPriceRange.value).toLocaleString()}`;
    updateRangeBar();
  });

  maxPriceRange.addEventListener('input', function() {
    priceDisplayMax.textContent = `$${parseInt(maxPriceRange.value).toLocaleString()}`;
    updateRangeBar();
  });

  // Actualizar la barra de rango entre los dos valores
  function updateRangeBar() {
    const minVal = parseInt(minPriceRange.value);
    const maxVal = parseInt(maxPriceRange.value);
    const bar = document.querySelector('.price-range-bar');

    const minPercent = (minVal / parseInt(minPriceRange.max)) * 100;
    const maxPercent = (maxVal / parseInt(maxPriceRange.max)) * 100;

    bar.style.left = minPercent + '%';
    bar.style.right = (100 - maxPercent) + '%';
  }

  // Inicializar la barra de rango
  updateRangeBar();
});

/*--------------------------------------------------- */


/*--------------------AGREGAR PRODUCTOS AL FILTRO-----------------*/
document.addEventListener('DOMContentLoaded', function() {
  const products = [
    {
      id: 1,
      name: "Remera modal viscosa - cuello en V",
      price: 7500,
      gender: "mujer",
      category: "remeras",
      images: ["img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 2.jpeg", "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 3.jpeg", "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 4.jpeg", "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 5.jpeg"],
      colors: ["Rosa", "Gris", "Negro", "Verde oliva"],
      status: "Nuevo"
    },
    {
      id: 2,
      name: "Bermuda Cargo Nike",
      price: 25000,
      gender: "hombre",
      category: "bermudas",
      images: ["img/hombre/bermudas-cargo-nike/download (1).jpeg", "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 2.jpeg", "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 3.jpeg"],
      colors: ["Beige", "Tostado", "Negro"],
      status: ""
    },
    {
      id: 3,
      name: "Remera Modal Sof",
      price: 7500,
      gender: "mujer",
      category: "remeras",
      images: ["img/hombre/bermudas-cargo-nike/download (1).jpeg", "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 2.jpeg", "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 3.jpeg"],
      colors: ["Beige", "Tostado", "Negro"],
      status: ""
    },

    // Añade más productos aquí
  ];

  function displayProducts(productsToShow) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = ''; // Limpiar la cuadrícula antes de agregar productos

    productsToShow.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-card';

      // Imagen principal
      const mainImageContainer = document.createElement('div');
      mainImageContainer.className = 'main-image-container';
      const mainImage = document.createElement('img');
      mainImage.src = product.images[0];  // La primera imagen como principal
      mainImage.alt = product.name;
      mainImage.className = 'main-image';
      mainImageContainer.appendChild(mainImage);

      // Miniaturas
      const thumbnailsContainer = document.createElement('div');
      thumbnailsContainer.className = 'thumbnails-container';
      product.images.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imgSrc;
        thumbnail.alt = `Vista color ${index + 1}`;
        thumbnail.className = 'thumbnail';
        thumbnail.addEventListener('click', () => {
          mainImage.src = imgSrc;  // Cambiar la imagen principal
        });
        thumbnailsContainer.appendChild(thumbnail);
      });

      // Detalles del producto
      const productDetails = document.createElement('div');
      productDetails.className = 'product-details1';

      const productPrice = document.createElement('p');
      productPrice.className = 'product-price1';
      productPrice.textContent = `$${product.price.toLocaleString()}`;

      const productName = document.createElement('p');
      productName.className = 'product-name1';
      productName.textContent = product.name;

      const productCategory = document.createElement('p');
      productCategory.className = 'product-category1';
      productCategory.textContent = product.category;

      const productColors = document.createElement('p');
      productColors.className = 'product-colors1';
      productColors.textContent = `${product.colors.length} colores`;

      const productStatus = document.createElement('p');
      productStatus.className = 'product-status1';
      productStatus.textContent = product.status;

      productDetails.appendChild(productPrice);
      productDetails.appendChild(productName);
      productDetails.appendChild(productCategory);
      productDetails.appendChild(productColors);
      productDetails.appendChild(productStatus);

      // Añadir todo al producto
      productDiv.appendChild(mainImageContainer);
      productDiv.appendChild(thumbnailsContainer);
      productDiv.appendChild(productDetails);
      productsGrid.appendChild(productDiv);
    });
  }

  // Mostrar los productos al cargar la página
  displayProducts(products);
});

/*--------------------CAMBIAR DE IMAGEN PARA CONTENEDOR DE PRODUCTOS--------------*/
document.querySelectorAll('.product-thumbnails img').forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
    const mainImage = this.closest('.product-card').querySelector('.product-main-image img');
    mainImage.src = this.src; // Cambia la imagen principal al hacer clic en la miniatura
  });
});

/*-----------------------FILTRO DESPLEGABLE--------------- */
document.addEventListener('DOMContentLoaded', function() {
  const toggleHeaders = document.querySelectorAll('.toggle-header');

  toggleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = header.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);

      if (targetContent) {
        targetContent.classList.toggle('toggle-content'); // Mostramos/ocultamos la sección
        header.classList.toggle('expanded'); // Rotamos la flecha
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const toggleHeaders = document.querySelectorAll('.toggle-header');

  toggleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = header.getAttribute('data-target');
      const target = document.getElementById(targetId);

      if (target.classList.contains('active')) {
        // Si ya está activo (desplegado), lo ocultamos suavemente
        target.style.height = target.scrollHeight + 'px'; // Establece la altura actual antes de colapsar
        setTimeout(() => {
          target.style.height = '0px';
        }, 1); // Pequeña demora para que el cambio de altura ocurra de forma visible
        target.classList.remove('active');
      } else {
        // Si está colapsado, lo desplegamos suavemente
        target.classList.add('active');
        target.style.height = target.scrollHeight + 'px'; // Calcula la altura del contenido para desplegar
        setTimeout(() => {
          target.style.height = 'auto'; // Ajustamos la altura a auto después de la transición para mantener el contenido visible
        }, 10000); // Debe coincidir con la duración de la transición en CSS (0.5s en este caso)
      }
    });
  });
});

/*----------------FILTRO POR COLORES------------------------------------------------ */

document.addEventListener('DOMContentLoaded', function() {
  const filters = {
    gender: [],
    category: [],
    size: [],
    color: [] // Propiedad para filtrar por color
  };

  // Escucha los cambios en los checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const filterType = this.name; // Puede ser 'gender', 'category', 'size', o 'color'
      const filterValue = this.value;

      if (this.checked) {
        filters[filterType].push(filterValue);
      } else {
        filters[filterType] = filters[filterType].filter(value => value !== filterValue);
      }

      updateProducts();
    });
  });

  function updateProducts() {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
      const productGender = product.getAttribute('data-gender');
      const productCategory = product.getAttribute('data-category');
      const productSize = product.getAttribute('data-size');
      const productColor = product.getAttribute('data-color');

      const genderMatch = filters.gender.length === 0 || filters.gender.includes(productGender);
      const categoryMatch = filters.category.length === 0 || filters.category.includes(productCategory);
      const sizeMatch = filters.size.length === 0 || filters.size.includes(productSize);
      const colorMatch = filters.color.length === 0 || filters.color.includes(productColor);

      if (genderMatch && categoryMatch && sizeMatch && colorMatch) {
        product.style.display = 'block';  // Mostrar el producto si coincide con todos los filtros
      } else {
        product.style.display = 'none';   // Ocultar el producto si no coincide
      }
    });
  }

  // Inicialmente, mostrar todos los productos
  updateProducts();
});
/*----------------------------------------------------------------------------------------- */


/*-----------------------------CONTENEDOR DE PRUDUCTOS 1 NERI----------------- */

let currentPosition = 0;
const productWrapper = document.querySelector('.product-wrapper');
const productCards = document.querySelectorAll('.product-card');
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


