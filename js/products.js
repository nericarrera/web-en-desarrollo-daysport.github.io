function toggleSizeChart(event) {
    event.preventDefault();  // Evita que el enlace recargue la página
    const modal = document.getElementById('sizeChartModal');
    modal.classList.toggle('hidden');
}

const relatedGallery = document.querySelector('.related-products-gallery');
const prevRelatedArrow = document.getElementById('prevRelatedArrow');
const nextRelatedArrow = document.getElementById('nextRelatedArrow');

prevRelatedArrow.addEventListener('click', () => {
    relatedGallery.scrollBy({ left: -200, behavior: 'smooth' });
});

nextRelatedArrow.addEventListener('click', () => {
    relatedGallery.scrollBy({ left: 200, behavior: 'smooth' });
});


// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro "producto" de la URL
    var params = new URLSearchParams(window.location.search);
    var producto = params.get("producto");

    // Cambiar el contenido dinámicamente dependiendo del producto
    if (producto === "campera-puffer") {
        document.querySelector(".product-title").textContent = "CAMPERA PUFFER TNF";
        document.querySelector(".product-price").textContent = "$60.000";
        document.querySelector("#mainImage").src = "img/hombre/Camperas de Abrigo/WhatsApp Image 2024-04-30 at 15.56.00 (2).jpeg";
    } else if (producto === "conjunto-tech-premium") {
        document.querySelector(".product-title").textContent = "Conjunto Tech Premium";
        document.querySelector(".product-price").textContent = "$60.000";
        document.querySelector("#mainImage").src = "img/hombre/conjuntos/WhatsApp Image 2024-07-06 at 22.29.24 (1)-fotor-2024070717438.png";
    }
    // Puedes agregar más casos para otros productos...
});


document.querySelectorAll('.zoom-container').forEach(container => {
    let isZoomed = false;
    let startX, startY;

    // Clic para hacer zoom
    container.addEventListener('click', function (e) {
        const img = this.querySelector('img, video');
        const rect = this.getBoundingClientRect();

        if (!isZoomed) {
            isZoomed = true;
            this.classList.add('zoomed');
            img.style.transform = 'scale(2)';  // Zoom al 200%
            this.style.cursor = 'zoom-out';  // Cambia a la lupa de zoom out
            startX = e.pageX - rect.left;
            startY = e.pageY - rect.top;
        } else {
            isZoomed = false;
            this.classList.remove('zoomed');
            img.style.transform = 'scale(1)';  // Vuelve al tamaño original
            img.style.left = '0';
            img.style.top = '0';
            this.style.cursor = 'zoom-in';  // Cambia a la lupa de zoom in
        }
    });

   // Movimiento del mouse para hacer scroll en la imagen cuando está en zoom
container.addEventListener('mousemove', function (e) {
    if (!isZoomed) return;

    const img = this.querySelector('img, video');
    const rect = this.getBoundingClientRect();

    // Posición del mouse relativa al contenedor
    const mouseX = e.pageX - rect.left;
    const mouseY = e.pageY - rect.top;

    // Obtener el tamaño de la imagen
    const imgRect = img.getBoundingClientRect();

    // Ajustamos los movimientos en ambos ejes
    // Invertimos también el movimiento en el eje X
    const moveX = -((mouseX / rect.width) * 300 - 150); 
    const moveY = -((mouseY / rect.height) * 300 - 150);

    // Limitar el movimiento para que no se salga de los bordes
    const maxTranslateX = (imgRect.width - rect.width) / 1.8;
    const maxTranslateY = (imgRect.height - rect.height) / 1.8;

    // Aplicar el límite de movimiento
    const translateX = Math.min(maxTranslateX, Math.max(-maxTranslateX, moveX));
    const translateY = Math.min(maxTranslateY, Math.max(-maxTranslateY, moveY));

    // Mover la imagen dentro de los límites
    img.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
});

// Cambiar el cursor a lupa incluso en estado de zoom
container.addEventListener('mouseenter', function () {
    this.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';  // Muestra la lupa correctamente
});
});

const zoomableImages = document.querySelectorAll('.zoomable-image');

zoomableImages.forEach(image => {
    let zoomedIn = false;

    image.addEventListener('click', function (e) {
        if (!zoomedIn) {
            image.classList.add('zoomed-in');
            zoomedIn = true;
        } else {
            image.classList.remove('zoomed-in');
            zoomedIn = false;
        }
    });

    image.addEventListener('mousemove', function (e) {
        if (zoomedIn) {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const offsetX = -((x / rect.width) * 100 - 50);
            const offsetY = -((y / rect.height) * 100 - 50);

            image.style.transformOrigin = `${offsetX}% ${offsetY}%`;
        }
    });
});