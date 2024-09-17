const track = document.querySelector('.banner-track');
const slides = document.querySelectorAll('.banner-slide');
let currentIndex = 0;

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






document.addEventListener("DOMContentLoaded", function() {
  const breadcrumb = document.querySelector(".breadcrumb");
  const pathArray = window.location.pathname.split("/").filter(item => item);

  let breadcrumbHTML = `<li><a href="/">Inicio</a></li>`;
  let accumulatedPath = "";

  pathArray.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      if (index === pathArray.length - 1) {
          breadcrumbHTML += `<li><a href="#">${segment}</a></li>`;
      } else {
          breadcrumbHTML += `<li><a href="${accumulatedPath}">${segment}</a></li>`;
      }
  });

  breadcrumb.innerHTML = breadcrumbHTML;
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
      const productPrice = parseInt(product.getAttribute('data-price'));
      const productName = product.getAttribute('data-name').toLowerCase();

      const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(productGender);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(productSize);
      const priceMatch = productPrice <= selectedPrice;
      const searchMatch = productName.includes(searchTerm) || productGender.includes(searchTerm) || productCategory.includes(searchTerm);

      if (genderMatch && categoryMatch && sizeMatch && priceMatch && searchMatch) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  function clearFilters() {
    genderCheckboxes.forEach(checkbox => checkbox.checked = false);
    categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
    sizeCheckboxes.forEach(checkbox => checkbox.checked = false);
    priceRange.value = priceRange.max;
    priceValue.textContent = `$${priceRange.value}`;
    if (searchInput) searchInput.value = '';
    filterProducts();
  }

  genderCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  categoryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  sizeCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  priceRange.addEventListener('input', function() {
    priceValue.textContent = `$${priceRange.value}`;
    filterProducts();
  });
  if (searchInput) searchInput.addEventListener('input', filterProducts);
  clearFiltersButton.addEventListener('click', clearFilters);

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

  filterProducts();
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

  




document.addEventListener('DOMContentLoaded', function() {
    const products = [
      { id: 1, name: "Campera Hombre", gender: "hombre", category: "camperas", size: "M", price: 3500 },
      { id: 2, name: "Remera Mujer", gender: "mujer", category: "remeras", size: "L", price: 2000 },
      { id: 3, name: "Campera Mujer", gender: "mujer", category: "camperas", size: "S", price: 4500 },
      // Agrega más productos aquí...
    ];
  
    const filters = {
      gender: [],
      category: [],
      size: []
    };
  
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
  
      // Renderiza los productos filtrados
      const productsGrid = document.querySelector('.products-grid');
      productsGrid.innerHTML = ''; // Limpiar
      filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.textContent = product.name;
        productsGrid.appendChild(productDiv);
      });
    }
  
    // Inicializa mostrando todos los productos
    updateProducts();
  });







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


