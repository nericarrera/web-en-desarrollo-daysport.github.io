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


function changeImage(element) {
    document.getElementById('mainImage').src = element.src;
}

function showVideo() {
    document.getElementById('videoModal').classList.remove('hidden');
}

function toggleVideo() {
    document.getElementById('videoModal').classList.toggle('hidden');
}


document.querySelectorAll('.zoom-container').forEach(container => {
    let isZoomed = false;
    let startX, startY;
    let isDragging = false;

    // Clic para hacer zoom
    container.addEventListener('click', function (e) {
        const img = this.querySelector('img, video');
        
        if (!isZoomed) {
            isZoomed = true;
            this.classList.add('zoomed');
            img.style.transform = 'scale(2)';
            startX = e.pageX - this.offsetLeft;
            startY = e.pageY - this.offsetTop;

        } else {
            isZoomed = false;
            this.classList.remove('zoomed');
            img.style.transform = 'scale(1)';
            img.style.left = '0';
            img.style.top = '0';
        }
    });

    // Permitir el arrastre (panning) dentro de los límites de la imagen
    container.addEventListener('mousemove', function (e) {
        if (!isZoomed || !isDragging) return;
        
        const img = this.querySelector('img, video');
        const rect = this.getBoundingClientRect(); // Obtener tamaño del contenedor
        const imgRect = img.getBoundingClientRect(); // Tamaño de la imagen dentro del contenedor

        let moveX = e.pageX - rect.left - startX;
        let moveY = e.pageY - rect.top - startY;

        // Limitar el movimiento dentro del contenedor
        const maxMoveX = (imgRect.width - rect.width) / 2;
        const maxMoveY = (imgRect.height - rect.height) / 2;

        // Ajustar el movimiento para que no sobrepase los límites de la imagen
        moveX = Math.min(maxMoveX, Math.max(-maxMoveX, moveX));
        moveY = Math.min(maxMoveY, Math.max(-maxMoveY, moveY));

        img.style.transform = `scale(2) translate(${moveX}px, ${moveY}px)`;
    });

    container.addEventListener('mousedown', function () {
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