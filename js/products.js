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
    let startX, startY, offsetX, offsetY;
    let isDragging = false;

    // Clic para hacer zoom
    container.addEventListener('click', function (e) {
        const img = this.querySelector('img, video');

        if (!isZoomed) {
            isZoomed = true;
            this.classList.add('zoomed');
            img.style.transform = 'scale(2)';
            this.style.cursor = 'zoom-out';
            startX = e.pageX - this.offsetLeft;
            startY = e.pageY - this.offsetTop;
            offsetX = 0;
            offsetY = 0;
        } else {
            isZoomed = false;
            this.classList.remove('zoomed');
            img.style.transform = 'scale(1)';
            img.style.left = '0';
            img.style.top = '0';
            this.style.cursor = 'zoom-in';
        }
    });

    // Arrastrar y mover la imagen cuando está en zoom
    container.addEventListener('mousemove', function (e) {
        if (!isZoomed) return;

        const img = this.querySelector('img, video');
        const rect = this.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        
        const moveX = e.pageX - rect.left - startX;
        const moveY = e.pageY - rect.top - startY;

        // Limitar el movimiento para que no se salga de los bordes
        const maxMoveX = (imgRect.width - rect.width) / 2;
        const maxMoveY = (imgRect.height - rect.height) / 2;

        const translateX = Math.min(maxMoveX, Math.max(-maxMoveX, moveX));
        const translateY = Math.min(maxMoveY, Math.max(-maxMoveY, moveY));

        img.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
    });

    // Cambiar a modo de arrastre con el mouse
    container.addEventListener('mousedown', function (e) {
        if (isZoomed) {
            isDragging = true;
        }
    });

    container.addEventListener('mouseup', function () {
        isDragging = false;
    });

    container.addEventListener('mouseleave', function () {
        isDragging = false;
    });
});