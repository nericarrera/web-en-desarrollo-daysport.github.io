const cardWrapper = document.querySelector('.card-wrapper');
const nextArrow = document.getElementById('nextArrow');
const prevArrow = document.getElementById('prevArrow');

let scrollAmount = 0;
const scrollStep = 200;

// Obtenemos el ancho del contenedor y el ancho total de las cards
const containerWidth = cardWrapper.offsetWidth;
const totalScrollWidth = cardWrapper.scrollWidth;

nextArrow.addEventListener('click', function(event) {
    event.preventDefault();
    // Calculamos la cantidad máxima que se puede desplazar
    const maxScrollAmount = totalScrollWidth - containerWidth;

    // Aumentamos el desplazamiento solo si no se ha alcanzado el final
    if (scrollAmount + scrollStep < maxScrollAmount) {
        scrollAmount += scrollStep;
    } else {
        scrollAmount = maxScrollAmount; // Límite al final
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