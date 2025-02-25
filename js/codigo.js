
/*--------BANNER--------*/

document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.banner-track');
  const slides = document.querySelectorAll('.banner-slide');
  let currentIndex = 0;

  function changeSlide() {
      const currentSlide = slides[currentIndex];
      const video = currentSlide.querySelector('video');

      // Mover el track al siguiente video
      currentIndex = (currentIndex + 1) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Escuchar el evento 'ended' del siguiente video para la transición
      const nextSlide = slides[currentIndex];
      const nextVideo = nextSlide.querySelector('video');
      
      // Reproducir el siguiente video y esperar hasta que termine para cambiar al siguiente
      nextVideo.currentTime = 0;  // Reiniciar el video
      nextVideo.play();
      nextVideo.addEventListener('ended', changeSlide, { once: true });
  }

  // Iniciar el carrusel con el primer video
  const firstVideo = slides[0].querySelector('video');
  firstVideo.play();
  firstVideo.addEventListener('ended', changeSlide, { once: true });
});


/*---------------------NOVEDAD MUJER EXPORTACION CARRUSEL-------------------- */
document.addEventListener('DOMContentLoaded', () => {
    
    const carrusel = document.querySelector('.zoom-container');
    const thumbnails = document.querySelector('.thumbnails-container');

    import('/js/mujerProductos.js').then(module => {
        const productosMujer = module.productosMujer;

        if (!productosMujer) {
            console.error("No se encontraron productos para el carrusel.");
            return;
        }

        const contenedorCarrusel = document.querySelector('.carrusel-container-mujer');
        if (!contenedorCarrusel) {
            console.error("El contenedor del carrusel no está en el DOM.");
            return;
        }


        const productosNovedad = productosMujer.filter(producto => producto.etiqueta?.toLowerCase() === "novedad");

        productosNovedad.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-novedad-mujer');
            productoDiv.innerHTML = `
                <div class="product-container-carrusel">
                    <div class="product-image-carrusel">
                        <img id="mainImage-${producto.id}" src="${producto.imagen[0]}" alt="${producto.nombre}" class="main-product-image">
                        <div class="product-thumbnails">
                            ${producto.miniaturas.map((img, index) => `
                                <img src="${img}" alt="Miniatura ${index + 1}" class="thumbnail-image">
                            `).join('')}
                        </div>
                    </div>
                    <div class="product-info-carrusel">
                    <p>$${producto.precio.toLocaleString()}</p>
                    <h3>${producto.nombre}</h3> 
                    </div>
                </div>
            `;

            productoDiv.addEventListener('click', () => {
                const url = `index-producto.html?id=${producto.id}&seccion=mujer`;
                window.location.href = url;
            });

            contenedorCarrusel.appendChild(productoDiv);
        });
    }).catch(err => console.error("Error al importar productos:", err));
});

/***--------ENLACE A PAGINA DE PRODUCTOS--------- */

productoDiv.addEventListener('click', () => {
    const url = `index-producto.html?id=${producto.id}&seccion=mujer`;
    window.location.href = url; // Redirige a la página de producto
});

