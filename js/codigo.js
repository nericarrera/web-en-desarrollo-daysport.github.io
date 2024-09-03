const track = document.querySelector('.banner-track');
const slides = document.querySelectorAll('.banner-slide');
let currentIndex = 0;

function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(changeSlide, 25000);  // Cambia cada 5 segundos



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
    const products = [
      { id: 1, name: "Producto 1", gender: "hombre", size: "M", price: 3500 },
      { id: 2, name: "Producto 2", gender: "mujer", size: "L", price: 4500 },
      // Más productos...
    ];
  
    const filters = {
      gender: [],
      size: [],
      price: 5000
    };
  
    // Actualizar el valor del filtro de precio
    const priceRange = document.getElementById('price');
    const priceValue = document.getElementById('price-value');
    priceRange.addEventListener('input', function() {
      filters.price = this.value;
      priceValue.textContent = `$${this.value}`;
      updateProducts();
    });
  
    // Actualizar productos en la grid
    function updateProducts() {
      const filteredProducts = products.filter(product => {
        const matchGender = filters.gender.length ? filters.gender.includes(product.gender) : true;
        const matchSize = filters.size.length ? filters.size.includes(product.size) : true;
        const matchPrice = product.price <= filters.price;
  
        return matchGender && matchSize && matchPrice;
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
  
    // Inicializa
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


