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
    let isDragging = false;
    let startX, startY;
    let scrollLeft, scrollTop;

    container.addEventListener('click', function () {
        this.classList.toggle('zoomed');
        isZoomed = !isZoomed;
        if (!isZoomed) {
            // Cuando se desactiva el zoom, vuelve a la posición original
            this.querySelector('img, video').style.transform = 'scale(1)';
            this.querySelector('img, video').style.left = '0';
            this.querySelector('img, video').style.top = '0';
        }
    });

    container.addEventListener('mousedown', function (e) {
        if (isZoomed) {
            isDragging = true;
            startX = e.pageX - this.offsetLeft;
            startY = e.pageY - this.offsetTop;
            scrollLeft = this.scrollLeft;
            scrollTop = this.scrollTop;
        }
    });

    container.addEventListener('mousemove', function (e) {
        if (isZoomed && isDragging) {
            e.preventDefault();
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            const moveX = x - startX;
            const moveY = y - startY;
            this.querySelector('img, video').style.transform = `scale(2) translate(${moveX}px, ${moveY}px)`;
        }
    });

    container.addEventListener('mouseup', function () {
        isDragging = false;
    });

    container.addEventListener('mouseleave', function () {
        isDragging = false;
    });
});