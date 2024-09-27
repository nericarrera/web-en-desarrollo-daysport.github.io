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


// Seleccionamos el contenedor que contiene la imagen a hacer zoom
const container = document.querySelector('.image-container');
let isZoomed = false; // Controlar el estado del zoom

// Configurar el evento para hacer clic y activar/desactivar el zoom
container.addEventListener('click', function (e) {
    const img = this.querySelector('img');

    // Alternar entre zoom y no zoom al hacer clic
    if (!isZoomed) {
        img.style.transform = 'scale(2)'; // Zoom 200%
        img.style.cursor = 'zoom-out';    // Cambia el cursor a "lupa con menos"
        isZoomed = true;
    } else {
        img.style.transform = 'scale(1)'; // Volver al tamaño normal
        img.style.cursor = 'zoom-in';     // Cambia el cursor a "lupa con más"
        isZoomed = false;
    }
});

// Movimiento del mouse para desplazar la imagen en zoom
container.addEventListener('mousemove', function (e) {
    if (!isZoomed) return;  // Solo mover si está en zoom

    const img = this.querySelector('img');
    const rect = this.getBoundingClientRect();
    const mouseX = e.pageX - rect.left; // Posición X del mouse dentro del contenedor
    const mouseY = e.pageY - rect.top;  // Posición Y del mouse dentro del contenedor

    // Calcular el porcentaje del desplazamiento en función de la posición del mouse
    const offsetX = Math.min(Math.max((mouseX / rect.width) * 100, 0), 100);
    const offsetY = Math.min(Math.max((mouseY / rect.height) * 100, 0), 100);

    // Aplicar el origen de transformación para centrar la imagen donde está el mouse
    img.style.transformOrigin = `${offsetX}% ${offsetY}%`;
});

// Cambiar el cursor a lupa cuando está sobre la imagen
container.addEventListener('mouseenter', function () {
    const img = this.querySelector('img');
    img.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';  // Cambia entre lupa con más o menos según el estado de zoom
});

// Cambiar el cursor a lupa al salir del área de la imagen
container.addEventListener('mouseleave', function () {
    const img = this.querySelector('img');
    img.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';  // Mantener el cursor de lupa incluso al salir del área
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