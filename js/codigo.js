let currentIndex = 0;
const track = document.querySelector('.banner-track');
const slides = document.querySelectorAll('.banner-slide');

function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(changeSlide, 25000);  // Cambia cada 5 segundos



/* flechas para mover las cards - 1er seccion */

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


// Variables globales para el carrito
let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');

// Mostrar u ocultar el carrito al hacer clic en el ícono del carrito
cartIcon.addEventListener('click', () => {
    cartDropdown.classList.toggle('hidden');
});

// Añadir productos al carrito
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCart();
}

// Actualizar la interfaz del carrito
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItemsList.appendChild(li);
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Eliminar productos del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Asegurarse de que los botones de "Agregar al carrito" existan y funcionen
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.getAttribute('data-product');
        const productPrice = e.target.getAttribute('data-price');
        addToCart(productName, productPrice);
        alert('Producto añadido al carrito!');
    });
});



document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  const products = document.querySelectorAll('.product');

  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();

    products.forEach(product => {
      const productName = product.getAttribute('data-name').toLowerCase();
      const productGender = product.getAttribute('data-gender').toLowerCase();
      const productCategory = product.getAttribute('data-category').toLowerCase();

      if (productName.includes(searchTerm) || productGender.includes(searchTerm) || productCategory.includes(searchTerm)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterProducts);
});


document.addEventListener('DOMContentLoaded', function() {
  const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
  const priceRange = document.getElementById('price');
  const priceValue = document.getElementById('price-value');
  const products = document.querySelectorAll('.product');
  const menuLinks = document.querySelectorAll('.menu-li-a, .submenu-item a');
  const searchInput = document.getElementById('search');
  const clearFiltersButton = document.getElementById('clear-filters');

  // Función para asignar eventos a los botones
  function assignButtonEvents() {
    const agregarButtons = document.querySelectorAll('.btn-agregar-filtro');
    const comprarButtons = document.querySelectorAll('.btn-comprar-filtro');

    agregarButtons.forEach(button => {
      button.removeEventListener('click', handleAddToCart);  // Remover eventos antiguos
      button.addEventListener('click', handleAddToCart);
    });

    comprarButtons.forEach(button => {
      button.removeEventListener('click', handleBuyNow);  // Remover eventos antiguos
      button.addEventListener('click', handleBuyNow);
    });
  }

  // Funciones para manejar clics
  function handleAddToCart() {
    alert('Producto agregado al carrito');
  }

  function handleBuyNow() {
    alert('Producto comprado');
  }

  // Función para filtrar productos
  function filterProducts() {
    const selectedGenders = Array.from(genderCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const selectedCategories = Array.from(categoryCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const selectedSizes = Array.from(sizeCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const selectedPrice = parseInt(priceRange.value);
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    products.forEach(product => {
      const productGender = product.getAttribute('data-gender');
      const productCategory = product.getAttribute('data-category');
      const productSize = product.getAttribute('data-size');
      const productPrice = parseInt(product.getAttribute('data-price')) || 0;
      const productName = product.getAttribute('data-name') ? product.getAttribute('data-name').toLowerCase() : '';

      const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(productGender);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(productSize);
      const priceMatch = productPrice <= selectedPrice;
      const searchMatch = productName.includes(searchTerm);

      if (genderMatch && categoryMatch && sizeMatch && priceMatch && searchMatch) {
        product.style.display = 'block';  // Mostrar producto
      } else {
        product.style.display = 'none';   // Ocultar producto
      }
    });

    // Asegurarse de que los botones tengan eventos asignados
    assignButtonEvents();
  }

  // Función para limpiar filtros
  function clearFilters() {
    genderCheckboxes.forEach(checkbox => checkbox.checked = false);
    categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
    sizeCheckboxes.forEach(checkbox => checkbox.checked = false);
    priceRange.value = priceRange.max;
    priceValue.textContent = `$${priceRange.value}`;
    if (searchInput) searchInput.value = '';
    filterProducts();
  }

  // Escuchar los cambios en los filtros
  genderCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  categoryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  sizeCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  priceRange.addEventListener('input', function() {
    priceValue.textContent = `$${priceRange.value}`;
    filterProducts();
  });
  if (searchInput) searchInput.addEventListener('input', filterProducts);
  clearFiltersButton.addEventListener('click', clearFilters);

  // Filtrar productos al hacer clic en los enlaces del menú
  menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const filterValue = link.getAttribute('data-filter');
      if (filterValue) {
        document.querySelector(`input[value="${filterValue}"]`).checked = true;
        filterProducts();
      }
    });
  });

  // Inicializar mostrando todos los productos
  filterProducts();
});



document.addEventListener('DOMContentLoaded', function() {
  const filters = document.querySelectorAll('.filter-option input');
  const clearButton = document.getElementById('clear-filters');
  const productCards = document.querySelectorAll('.product');

  filters.forEach(filter => {
    filter.addEventListener('change', updateFilters);
  });

  clearButton.addEventListener('click', clearFilters);

  function updateFilters() {
    const selectedFilters = Array.from(filters)
      .filter(filter => filter.checked)
      .map(filter => filter.value);

    productCards.forEach(card => {
      const cardGender = card.getAttribute('data-gender');
      const cardCategory = card.getAttribute('data-category');

      if (selectedFilters.includes(cardGender) || selectedFilters.includes(cardCategory)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function clearFilters() {
    filters.forEach(filter => {
      filter.checked = false;
    });
    productCards.forEach(card => {
      card.style.display = 'block';
    });
  }
});



document.addEventListener('DOMContentLoaded', function() {
  const products = [
    { id: 1, name: "Campera Hombre Liviana", gender: "hombre", category: "campera-liviana", size: "M", price: 3500, image: "img/hombre/joggin/WhatsApp Image 2024-07-06 at 22.31.59 (2).jpeg" },
    { id: 2, name: "Remera Mujer", gender: "mujer", category: "remeras", size: "L", price: 2000, image: "img/mujer/remera/remera1.jpg" },
    { id: 3, name: "Campera Mujer de Abrigo", gender: "mujer", category: "campera-abrigo", size: "S", price: 4500, image: "img/mujer/campera/campera-abrigo2.jpg" },
    { id: 4, name: "Campera Hombre Liviana", gender: "hombre", category: "campera-liviana", size: "M", price: 3500, image: "img/hombre/joggin/WhatsApp Image 2024-07-06 at 22.31.59 (2).jpeg" },
    { id: 5, name: "Campera Hombre Liviana", gender: "hombre", category: "campera-liviana", size: "M", price: 3500, image: "img/hombre/joggin/WhatsApp Image 2024-07-06 at 22.31.59 (2).jpeg" },
    { id: 6, name: "Remera Mujer", gender: "mujer", category: "remeras", size: "L", price: 2000, image: "img/mujer/remera/remera1.jpg" },
    { id: 7, name: "Campera Mujer de Abrigo", gender: "mujer", category: "campera-abrigo", size: "S", price: 4500, image: "img/mujer/campera/campera-abrigo2.jpg" },
    { id: 8, name: "Campera Hombre Liviana", gender: "hombre", category: "campera-liviana", size: "M", price: 3500, image: "img/hombre/joggin/WhatsApp Image 2024-07-06 at 22.31.59 (2).jpeg" },
    // Agrega más productos según tus necesidades...
  ];

  const filters = {
    gender: [],
    category: [],
    size: []
  };

  // Resto del código (filtros y renderizado) permanece igual
  // Actualizar los filtros cuando se seleccionan los checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const filterType = this.name; // Puede ser 'gender', 'category', o 'size'
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
    const filteredProducts = products.filter(product => {
      const matchGender = filters.gender.length ? filters.gender.includes(product.gender) : true;
      const matchCategory = filters.category.length ? filters.category.includes(product.category) : true;
      const matchSize = filters.size.length ? filters.size.includes(product.size) : true;

      return matchGender && matchCategory && matchSize;
    });

    // Renderiza los productos filtrados con imagen, nombre y precio
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = ''; // Limpiar

    if (filteredProducts.length === 0) {
      productsGrid.textContent = "No se encontraron productos.";
    } else {
      filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const productName = document.createElement('product-nombre');
        productName.textContent = product.name;

        const productPrice = document.createElement('product-precio');
        productPrice.textContent = `$${product.price}`;

        productDiv.appendChild(img);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);

        productsGrid.appendChild(productDiv);
      });
    }
  }

  // Inicializa mostrando todos los productos
  updateProducts();
});


document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todos los headers que se usan para togglear
  const toggleHeaders = document.querySelectorAll('.toggle-header');

  toggleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = header.getAttribute('data-target');
      const target = document.getElementById(targetId);
      
      if (target) {
        // Alternar la clase "active" para mostrar/ocultar contenido
        target.classList.toggle('active');
        
        // Alternar la clase "expanded" para rotar la flecha
        header.classList.toggle('expanded');
      }
    });
  });
});


function filterProducts() {
  // Lógica de filtrado...

  // Reasignar eventos a los botones después de actualizar la visibilidad
  const agregarButtons = document.querySelectorAll('.btn-agregar-filtro');
  const comprarButtons = document.querySelectorAll('.btn-comprar-filtro');

  agregarButtons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Producto agregado al carrito');
    });
  });

  comprarButtons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Producto comprado');
    });
  });
}

// Llamar a filterProducts cada vez que se haga un cambio
filterProducts();



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


