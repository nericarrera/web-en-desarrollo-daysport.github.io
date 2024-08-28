const banner = document.querySelector('.banner');
const images = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg']; // Agrega tus imágenes aquí
let currentIndex = 0;

function changeImage() {
    banner.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeImage, 5000); // Cambia cada 5 segundos


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


function filterProducts() {
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const items = document.querySelectorAll('.product-item');
    
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const itemPrice = parseInt(item.getAttribute('data-price'));
        
        let priceMatch = false;
        if (price === 'all') {
            priceMatch = true;
        } else if (price === 'low' && itemPrice <= 20000) {
            priceMatch = true;
        } else if (price === 'mid' && itemPrice > 20000 && itemPrice <= 50000) {
            priceMatch = true;
        } else if (price === 'high' && itemPrice > 50000) {
            priceMatch = true;
        }

        if ((category === 'all' || itemCategory === category) && priceMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

let currentPosition = 0;
const productWrapper = document.querySelector('.product-wrapper');
const productCards = document.querySelectorAll('.product-card');
const cardWidth = productCards[0].offsetWidth + 15; // Ancho de cada tarjeta + el espacio (gap)
const totalWidth = cardWidth * productCards.length; // Ancho total de todas las tarjetas

document.getElementById('nextProductArrow').addEventListener('click', () => {
    // Mover hacia la derecha
    if (currentPosition > -(totalWidth - productWrapper.offsetWidth)) {
        currentPosition -= cardWidth;
        productWrapper.style.transform = `translateX(${currentPosition}px)`;
    }
});

document.getElementById('prevProductArrow').addEventListener('click', () => {
    // Mover hacia la izquierda
    if (currentPosition < 0) {
        currentPosition += cardWidth;
        productWrapper.style.transform = `translateX(${currentPosition}px)`;
    }
});
