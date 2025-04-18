/*-----------MODAL------------- */
document.querySelectorAll('.menu-li').forEach(menuItem => {
    menuItem.addEventListener('mouseenter', () => {
      document.body.style.overflow = 'hidden';
      // Forzar el scroll al inicio del modal
      const modal = menuItem.querySelector('.modal');
      if (modal) {
        modal.scrollTop = 0;
      }
    });
    
    menuItem.addEventListener('mouseleave', () => {
      document.body.style.overflow = '';
    });
  });

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


/*---------------------NOVEDAD MUJER CARRUSEL-------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const contenedorCarrusel = document.querySelector('.carrusel-container-mujer');
    
    import('/js/mujerProductos.js').then(module => {
        const productosMujer = module.productosMujer;
        const productosNovedad = productosMujer.filter(producto => 
            producto.etiqueta?.toLowerCase() === "novedad"
        );

        productosNovedad.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-novedad-mujer');
            
            // Verificar si hay miniaturas disponibles
            const hasMiniaturas = producto.miniaturas && producto.miniaturas.length > 0;
            
            productoDiv.innerHTML = `
                <div class="product-container-carrusel">
                    <div class="product-image-carrusel">
                        <img id="mainImage-${producto.id}" src="${producto.imagen[0]}" 
                             alt="${producto.nombre}" class="main-product-image">
                        ${hasMiniaturas ? `
                        <div class="product-thumbnails">
                            ${producto.miniaturas.map((miniatura, index) => `
                                <img src="${miniatura.src}" alt="Miniatura ${index + 1}" 
                                     class="thumbnail-image"
                                     data-product-id="${producto.id}">
                            `).join('')}
                        </div>` : ''}
                    </div>
                    <div class="product-info-carrusel">
                        <p>$${producto.precio.toLocaleString()}</p>
                        <h3>${producto.nombre}</h3> 
                    </div>
                </div>
            `;

            // Evento click para redirección
            productoDiv.addEventListener('click', (e) => {
                if (!e.target.classList.contains('thumbnail-image')) {
                    window.location.href = `index-producto.html?id=${producto.id}&seccion=mujer`;
                }
            });

            // Agregar eventos hover para miniaturas
            if (hasMiniaturas) {
                const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);
                const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
                
                thumbnails.forEach(thumbnail => {
                    thumbnail.addEventListener('click', (e) => {
                        e.stopPropagation();
                        mainImage.src = thumbnail.src;
                    });
                    
                    thumbnail.addEventListener('mouseenter', () => {
                        mainImage.src = thumbnail.src;
                    });
                });
            }

            contenedorCarrusel.appendChild(productoDiv);
        });
    }).catch(err => console.error("Error al importar productos:", err));
});

/*-------------------------NOVEDAD HOMBRE CARRUSEL ---------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const contenedorCarrusel = document.querySelector('.carrusel-container-hombre');
    
    import('/js/hombreProductos.js').then(module => {
        const productosHombre = module.productosHombre;
        const productosNovedad = productosHombre.filter(producto => 
            producto.etiqueta?.toLowerCase() === "novedad"
        );

        productosNovedad.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-novedad-hombre');
            
            // Verificar si hay miniaturas disponibles
            const hasMiniaturas = producto.miniaturas && producto.miniaturas.length > 0;
            
            productoDiv.innerHTML = `
                <div class="product-container-carrusel">
                    <div class="product-image-carrusel">
                        <img id="mainImage-${producto.id}" src="${producto.imagen[0]}" 
                             alt="${producto.nombre}" class="main-product-image">
                        ${hasMiniaturas ? `
                        <div class="product-thumbnails">
                            ${producto.miniaturas.map((miniatura, index) => `
                                <img src="${miniatura.src}" alt="Miniatura ${index + 1}" 
                                     class="thumbnail-image"
                                     data-product-id="${producto.id}">
                            `).join('')}
                        </div>` : ''}
                    </div>
                    <div class="product-info-carrusel">
                        <p>$${producto.precio.toLocaleString()}</p>
                        <h3>${producto.nombre}</h3> 
                    </div>
                </div>
            `;

            // Evento click para redirección
            productoDiv.addEventListener('click', (e) => {
                if (!e.target.classList.contains('thumbnail-image')) {
                    window.location.href = `index-producto.html?id=${producto.id}&seccion=hombre`;
                }
            });

            // Agregar eventos hover para miniaturas
            if (hasMiniaturas) {
                const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);
                const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
                
                thumbnails.forEach(thumbnail => {
                    thumbnail.addEventListener('click', (e) => {
                        e.stopPropagation();
                        mainImage.src = thumbnail.src;
                    });
                    
                    thumbnail.addEventListener('mouseenter', () => {
                        mainImage.src = thumbnail.src;
                    });
                });
            }

            contenedorCarrusel.appendChild(productoDiv);
        });
    }).catch(err => console.error("Error al importar productos:", err));
});



