const bannerImage = document.querySelector('.banner-image');
const images = ['img/portada/banner1.jpg', 'img/portada/banner2.jpg', 'img/portada/banner3.jpg'];  // Ajusta la ruta de las imágenes
let currentIndex = 0;

function changeImage() {
    bannerImage.style.opacity = 0;  // Desvanece la imagen actual
    setTimeout(() => {
        bannerImage.style.backgroundImage = `url(${images[currentIndex]})`;
        bannerImage.style.opacity = 1;  // Aparece la nueva imagen
        currentIndex = (currentIndex + 1) % images.length;
    }, 500);  // Tiempo para la transición de desvanecimiento
}

setInterval(changeImage, 5000);  // Cambia cada 5 segundos

// Configura la primera imagen al cargar
window.addEventListener('load', () => {
    bannerImage.style.backgroundImage = `url(${images[0]})`;
    bannerImage.style.opacity = 1;
});


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


document.querySelectorAll('.filter-size, .filter-color, .filter-price').forEach(input => {
    input.addEventListener('change', filterProducts);
});

function toggleFilter(filterId) {
    const filter = document.getElementById(filterId);
    filter.style.display = filter.style.display === 'block' ? 'none' : 'block';
}


document.querySelectorAll('.filter-size, .filter-color, .filter-price').forEach(input => {
    input.addEventListener('change', filterProducts);
});

function filterProducts() {
    const selectedSizes = Array.from(document.querySelectorAll('.filter-size:checked')).map(input => input.value);
    const selectedColors = Array.from(document.querySelectorAll('.filter-color:checked')).map(input => input.value);
    const selectedPrice = document.querySelector('.filter-price:checked') ? document.querySelector('.filter-price:checked').value : '';

    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
        const productSize = product.getAttribute('data-size');
        const productColor = product.getAttribute('data-color');
        const productPrice = parseInt(product.getAttribute('data-price'));

        let priceMatch = false;
        if (selectedPrice === 'low' && productPrice <= 20000) {
            priceMatch = true;
        } else if (selectedPrice === 'mid' && productPrice > 20000 && productPrice <= 50000) {
            priceMatch = true;
        } else if (selectedPrice === 'high' && productPrice > 50000) {
            priceMatch = true;
        } else if (!selectedPrice) {
            priceMatch = true;
        }

        const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(productSize);
        const colorMatch = selectedColors.length === 0 || selectedColors.includes(productColor);

        if (sizeMatch && colorMatch && priceMatch) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

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



