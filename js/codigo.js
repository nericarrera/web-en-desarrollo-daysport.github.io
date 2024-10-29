/*--------BANNER--------*/

let currentIndex = 0;
const track = document.querySelector('.banner-track');
const slides = document.querySelectorAll('.banner-slide');

function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Ajuste de tiempo según el tipo de contenido
    const currentSlide = slides[currentIndex];
    const isVideo = currentSlide.querySelector('video');

    let delay = 5000; // Duración predeterminada para imágenes (5 segundos)

    if (isVideo) {
        delay = isVideo.duration * 1000 || 10000; // Duración del video o 10 seg si no se carga
    }

    setTimeout(changeSlide, delay);
}

// Inicia el carrusel con el tiempo adecuado
setTimeout(changeSlide, 8000);  // Primero se espera 5 segundos

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

/*--------------------BOTON LIMPIAR FILTRO--------------------*/
document.addEventListener('DOMContentLoaded', function() {
  const clearFiltersButton = document.getElementById('clear-filters');
  
  const filters = {
    gender: [],
    category: [],
    size: [],
    color: []
  };

  clearFiltersButton.addEventListener('click', function() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });

    document.getElementById('min-price-range').value = 1000;
    document.getElementById('max-price-range').value = 250000;
    document.getElementById('price-display-min').textContent = '$1.000';
    document.getElementById('price-display-max').textContent = '$250.000';

    filters.gender = [];
    filters.category = [];
    filters.size = [];
    filters.color = [];

    updateProducts(true); // Mostrar todos los productos
  });

  function updateProducts(showAll = false) {
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
      if (showAll) {
        product.style.display = 'block'; 
      } else {
        const productGender = product.getAttribute('data-gender');
        const productCategory = product.getAttribute('data-category');
        const productSize = product.getAttribute('data-size');
        const productColor = product.getAttribute('data-color');

        const genderMatch = filters.gender.length === 0 || filters.gender.includes(productGender);
        const categoryMatch = filters.category.length === 0 || filters.category.includes(productCategory);
        const sizeMatch = filters.size.length === 0 || filters.size.some(size => productSize.includes(size));
        const colorMatch = filters.color.length === 0 || filters.color.includes(productColor);

        if (genderMatch && categoryMatch && sizeMatch && colorMatch) {
          product.style.display = 'block';  
        } else {
          product.style.display = 'none';   
        }
      }
    });
  }

  updateProducts();
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
/*------------------------------------------------------------------------------*/

/*-----------------FILTRO POR COLORES Y OTROS ATRIBUTOS--------------*/
document.addEventListener('DOMContentLoaded', function() {
  const filters = {
    gender: [],
    category: [],
    size: [],
    color: []
  };

  // Escuchar cambios en los checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const filterType = this.name; // Puede ser 'gender', 'category', 'size', o 'color'
      const filterValue = this.value.toLowerCase(); // Convertimos a minúsculas para asegurar coincidencias

      if (this.checked) {
        filters[filterType].push(filterValue);
      } else {
        filters[filterType] = filters[filterType].filter(value => value !== filterValue);
      }

      updateProducts();
    });
  });

  function updateProducts() {
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
      const productGender = product.getAttribute('data-gender').toLowerCase();
      const productCategory = product.getAttribute('data-category').toLowerCase();
      const productSize = product.getAttribute('data-size').toLowerCase();
      const productColors = product.getAttribute('data-color').toLowerCase().split(','); // Convertimos en array
      const productPrice = parseInt(product.getAttribute('data-price'));

      const genderMatch = filters.gender.length === 0 || filters.gender.includes(productGender);
      const categoryMatch = filters.category.length === 0 || filters.category.includes(productCategory);
      const sizeMatch = filters.size.length === 0 || filters.size.some(size => productSize.includes(size));
      const colorMatch = filters.color.length === 0 || filters.color.some(color => productColors.includes(color));

      if (genderMatch && categoryMatch && sizeMatch && colorMatch) {
        product.style.display = 'block';  // Mostrar el producto si coincide con los filtros
      } else {
        product.style.display = 'none';   // Ocultar el producto si no coincide
      }
    });
  }

  // Inicialmente, mostrar todos los productos
  updateProducts();
});
/*----------------------------------------------------------------------------------------- */


/*-------------------------LLAMADO DE FILTRO DE PRECIOS-------------------- */

document.getElementById('max-price-range').addEventListener('input', function() {
  document.getElementById('price-display-max').textContent = `$${parseInt(this.value).toLocaleString()}`;
  updateProducts();  // Actualiza los productos al mover el rango
});

/*----------------------------------------------------------------------------- */


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
          name: "Remera modal viscosa con cuello en V",
          price: 7500,
          gender: "mujer",
          category: "remeras",
          images: ["img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 2.jpeg", "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 3.jpeg"],
          colors: ["Rosa", "Gris", "Negro"],
          status: "Nuevo",
          sizes: ["S", "M", "L", "XL", "XXL"]
      },
      {
          id: 2,
          name: "Bermuda Cargo Nike",
          price: 25000,
          gender: "hombre",
          category: "bermudas",
          images: ["img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 1.jpeg", "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 2.jpeg"],
          colors: ["Beige", "Tostado", "Negro"],
          status: "",
          sizes: ["M", "L", "XL"]
      },
      {
          id: 3,
          name: "Remera Modal Soft",
          price: 7500,
          gender: "mujer",
          category: "remeras",
          images: ["img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 1.jpeg", "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 2.jpeg"],
          colors: ["Celeste", "Negro"],
          status: "Nuevo",
          sizes: ["S", "M", "L", "XL"]
      },
      {
          id: 4,
          name: "Campera Rompeviento Puma Women",
          price: 35000,
          gender: "mujer",
          category: "camperas",
          images: ["img/mujer/campera rompeviento/campera-rompeviento-puma 1.jpeg", "img/mujer/campera rompeviento/campera-rompeviento-puma 6.jpeg"],
          colors: ["Negro", "Rosa", "Violeta", "Verde Agua"],
          status: "Nuevo",
          sizes: ["S", "M", "L", "XL"]
      },
      {
          id: 5,
          name: "Conjunto Nike Women",
          price: 35000,
          gender: "mujer",
          category: "conjuntos",
          images: ["img/mujer/conjuntos/conjunto-verano-nike-mujer 1.jpeg", "img/mujer/conjuntos/conjunto-verano-nike-mujer 2.jpeg"],
          colors: ["Blanco", "Negro"],
          status: "Nuevo",
          sizes: ["S", "M", "L", "XL", "XXL"]
      },
      {
          id: 6,
          name: "Campera Puffer Nike con piel",
          price: 65000,
          gender: "hombre",
          category: "camperas",
          images: ["img/hombre/camperas-de-abrigo/campera-puffer-nike-combinada 1.jpeg"],
          colors: ["Combinado"],
          status: "Nuevo",
          sizes: ["L"]
      },
      {
          id: 7,
          name: "Blusa Modal Strass",
          price: 8000,
          gender: "mujer",
          category: "remeras",
          images: ["img/mujer/blusa-modal-strass-cuelloR/blusa-modal-strass-cuelloR 1.jpeg", "img/mujer/blusa-modal-strass-cuelloR/blusa-modal-strass-cuelloR 2.jpeg"],
          colors: ["Negro", "Azul Marino"],
          status: "Nuevo",
          sizes: ["L", "XL"]
      },
      // Puedes añadir más productos aquí
  ];

  const productsGrid = document.querySelector('.products-grid');
  const productsPerLoad = 4;
  let currentPage = 1;

  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = "Cargar Más Productos";
  loadMoreButton.className = "load-more-button";
  productsGrid.parentElement.appendChild(loadMoreButton);

  function displayProducts(page) {
    const startIndex = (page - 1) * productsPerLoad;
    const endIndex = startIndex + productsPerLoad;
    const productsToShow = products.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-card';
      productDiv.setAttribute('data-id', product.id);
      productDiv.setAttribute('data-price', product.price);
      productDiv.setAttribute('data-gender', product.gender);
      productDiv.setAttribute('data-category', product.category);
      productDiv.setAttribute('data-color', product.colors.join(','));
      productDiv.setAttribute('data-size', product.sizes.join(','));

      const mainImage = document.createElement('img');
      mainImage.src = product.images[0];
      mainImage.alt = product.name;
      mainImage.className = 'product-image';

      mainImage.addEventListener('click', function() {
          window.location.href = `index-producto.html?id=${product.id}`;
      });

      const thumbnailsContainer = document.createElement('div');
      thumbnailsContainer.className = 'thumbnails-container';
      product.images.forEach((imgSrc, index) => {
          const thumbnail = document.createElement('img');
          thumbnail.src = imgSrc;
          thumbnail.alt = `Vista color ${index + 1}`;
          thumbnail.className = 'thumbnail';
          
          thumbnail.addEventListener('click', (e) => {
              e.stopPropagation();
              mainImage.src = imgSrc;
          });

          thumbnailsContainer.appendChild(thumbnail);
      });

      const productPrice = document.createElement('p');
      productPrice.className = 'product-price';
      productPrice.textContent = `$${product.price.toLocaleString()}`;

      const productName = document.createElement('p');
      productName.className = 'product-name';
      productName.textContent = product.name;

      const productColors = document.createElement('p');
      productColors.className = 'product-colors';
      productColors.textContent = `${product.colors.join(", ")}`;

      const productCategory = document.createElement('p');
      productCategory.className = 'product-category';
      productCategory.textContent = `${product.category}`;

      const productStatus = document.createElement('p');
      productStatus.className = 'product-status';
      productStatus.textContent = product.status;

      productDiv.appendChild(mainImage);
      productDiv.appendChild(thumbnailsContainer);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(productName);
      productDiv.appendChild(productCategory);
      productDiv.appendChild(productColors);
      productDiv.appendChild(productStatus);
      productsGrid.appendChild(productDiv);
    });

    if (endIndex >= products.length) {
      loadMoreButton.style.display = 'none';
    }
  }

  displayProducts(currentPage);

  loadMoreButton.addEventListener('click', function() {
    currentPage++;
    displayProducts(currentPage);
  });
});
/*----------------------------------------------------------------*/

/*-----------------RE DIRIGE A LA PAGINA DE PRODUCTO------------ */
// Redirige al usuario a la página de producto cuando haga clic en un producto
document.addEventListener('DOMContentLoaded', function() {
  const products = document.querySelectorAll('.product-card'); // O tu clase para los productos

  products.forEach(product => {
    product.addEventListener('click', function() {
      const productId = product.getAttribute('data-id'); // Asegúrate de que cada producto tenga un data-id único
      window.location.href = `index-producto.html?id=${productId}`; // Redirige a la página del producto
    });
  });
});

/*------------------------------------------------------------------- */

/*-----------------CAPTURA INFORMACION AL HACER CLICK EN EL PRODUCTO-------------*/
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  // Simulación de productos
  const products = [
    // Aquí debes tener los productos que has definido antes, incluyendo id, name, price, etc.
  ];

  // Encuentra el producto que coincide con el ID
  const product = products.find(p => p.id == productId);

  if (product) {
    document.querySelector('.product-name1').textContent = product.name;
    document.querySelector('.product-price1').textContent = `$${product.price}`;
    document.querySelector('.product-category1').textContent = product.category;

    // Agrega los talles disponibles
    const sizesContainer = document.querySelector('.product-sizes');
    product.sizes.forEach(size => {
      const sizeElement = document.createElement('span');
      sizeElement.textContent = size;
      sizesContainer.appendChild(sizeElement);
    });

    // Aquí añades las imágenes, videos, etc.
  }
});

/*--------------------CAMBIAR DE IMAGEN PARA CONTENEDOR DE PRODUCTOS--------------*/
document.querySelectorAll('.product-thumbnails img').forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
    const mainImage = this.closest('.product-card').querySelector('.product-main-image img');
    mainImage.src = this.src; // Cambia la imagen principal al hacer clic en la miniatura
  });
});

/*----------------------*/

/*-----------------------CORRIJIENDO ERRORES DE CLASES---------------*/
document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('.element-class');
  
  if (element) {
      const width = element.offsetWidth;
      // Resto del código...
  } else {
      console.error('El elemento no existe en el DOM.');
  }
});

/*------------------------------------------------------------------- */


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



