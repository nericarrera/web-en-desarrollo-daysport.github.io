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



/* breadcrumb */


document.addEventListener("DOMContentLoaded", function() {
  // Funcionalidad de desplegar las opciones
  const toggleHeaders = document.querySelectorAll('.toggle-header');

  toggleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const target = document.getElementById(header.getAttribute('data-target'));
      target.classList.toggle('active');
      header.classList.toggle('expanded');
    });
  });

  const breadcrumb = document.getElementById('breadcrumb');

  // Actualizar breadcrumb al seleccionar o deseleccionar un filtro
  document.querySelectorAll('.filter-option input').forEach(input => {
    input.addEventListener('change', function() {
      if (input.checked) {
        updateBreadcrumb(input.value);
      } else {
        removeBreadcrumbItem(input.value);
      }
    });
  });

  function updateBreadcrumb(selectedFilter) {
    // Verificar si ya está en el breadcrumb
    const existingItem = Array.from(breadcrumb.children).find(item => item.textContent.trim() === selectedFilter);
    if (existingItem) return;

    // Crear nuevo item del breadcrumb
    let newItem = document.createElement('li');
    newItem.classList.add('breadcrumb-item');
    newItem.textContent = selectedFilter;
    breadcrumb.appendChild(newItem);
  }

  function removeBreadcrumbItem(filter) {
    // Eliminar el elemento del breadcrumb si se deselecciona
    const itemToRemove = Array.from(breadcrumb.children).find(item => item.textContent.trim() === filter);
    if (itemToRemove) {
      breadcrumb.removeChild(itemToRemove);
    }
  }
});






document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todos los headers que se usan para togglear
  const toggleHeaders = document.querySelectorAll('.toggle-header');

  toggleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const target = document.getElementById(header.getAttribute('data-target'));
      // Alternar la clase "active" para mostrar/ocultar contenido
      target.classList.toggle('active');
      
      // Alternar la clase "expanded" para rotar la flecha
      header.classList.toggle('expanded');
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


