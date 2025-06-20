
// Buscador general (escritorio)
const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');
if (searchInput && searchBtn) {
  searchBtn.addEventListener('click', function() {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `buscador.html?query=${encodeURIComponent(query)}`;
    }
  });
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `buscador.html?query=${encodeURIComponent(query)}`;
      }
    }
  });
}

// Buscador mobile
const searchInputMobile = document.getElementById('search-input-mobile');
const searchBtnMobile = document.querySelector('.search-btn-mobile');
if (searchInputMobile && searchBtnMobile) {
  searchBtnMobile.addEventListener('click', function() {
    const query = searchInputMobile.value.trim();
    if (query) {
      window.location.href = `buscador.html?query=${encodeURIComponent(query)}`;
    }
  });
  searchInputMobile.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const query = searchInputMobile.value.trim();
      if (query) {
        window.location.href = `buscador.html?query=${encodeURIComponent(query)}`;
      }
    }
  });
}


// Menú Responsive
document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const hamburger = document.querySelector('.hamburger');
  const menuContainer = document.querySelector('.menu-container');
  const menuItems = document.querySelectorAll('.menu-li');
  const searchToggle = document.getElementById('search-toggle');
  const searchContainer = document.querySelector('.search-container');
  const cartIcon = document.getElementById('cart-icon');
  const cartDropdown = document.getElementById('cart-dropdown');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const userIcon = document.getElementById('user-icon');
  const userDropdown = document.querySelector('.user-dropdown');

  // MOBILE: variables para buscador mobile
  const searchToggleMobile = document.getElementById('search-toggle-mobile');
  const searchContainerMobile = document.querySelector('.search-container-mobile');

  // Menú Hamburguesa
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    menuContainer.classList.toggle('active');
    // Cerrar otros elementos abiertos al abrir el menú
    if (this.classList.contains('active')) {
      searchContainer.classList.remove('active');
      cartDropdown.classList.remove('show');
      userDropdown.style.opacity = '0';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Submenús en móvil
  menuItems.forEach(item => {
    const link = item.querySelector('.menu-li-a');
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        item.classList.toggle('active');
        // Cerrar otros submenús
        menuItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
      }
    });
  });

  // Búsqueda ESCRITORIO
  if (searchToggle && searchContainer) {
    searchToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      searchContainer.classList.toggle('active');
      // Cerrar otros elementos
      cartDropdown.classList.remove('show');
      userDropdown.style.opacity = '0';
    });
  }

  // Búsqueda MOBILE
  if (searchToggleMobile && searchContainerMobile) {
    searchToggleMobile.addEventListener('click', function(e) {
      e.stopPropagation();
      searchContainerMobile.classList.toggle('active');
      // Cierra otros menús si es necesario
    });

    // Cierra el buscador mobile al hacer clic fuera
    document.addEventListener('click', function() {
      searchContainerMobile.classList.remove('active');
    });

    // Evita que el clic dentro del buscador lo cierre
    searchContainerMobile.addEventListener('click', e => e.stopPropagation());
  }
  
  // Carrito
  cartIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    cartDropdown.classList.toggle('show');
    
    // Cerrar otros elementos
    searchContainer.classList.remove('active');
    userDropdown.style.opacity = '0';
  });
  
  cartCloseBtn.addEventListener('click', function() {
    cartDropdown.classList.remove('show');
  });
  
  // Usuario
  userIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    const isVisible = userDropdown.style.opacity === '1';
    userDropdown.style.opacity = isVisible ? '0' : '1';
    userDropdown.style.visibility = isVisible ? 'hidden' : 'visible';
    userDropdown.style.transform = isVisible ? 'translateY(10px)' : 'translateY(0)';
    
    // Cerrar otros elementos
    searchContainer.classList.remove('active');
    cartDropdown.classList.remove('show');
  });
  
  // Cerrar menús al hacer clic fuera
  document.addEventListener('click', function() {
    searchContainer.classList.remove('active');
    cartDropdown.classList.remove('show');
    userDropdown.style.opacity = '0';
    userDropdown.style.visibility = 'hidden';
    userDropdown.style.transform = 'translateY(10px)';
  });
  
  // Evitar que el clic en los menús los cierre
  searchContainer.addEventListener('click', e => e.stopPropagation());
  cartDropdown.addEventListener('click', e => e.stopPropagation());
  userDropdown.addEventListener('click', e => e.stopPropagation());
  
  // Cerrar menú al hacer clic en un enlace (excepto en móvil)
  const navLinks = document.querySelectorAll('.menu-li-a:not(.menu-li-a[href="#"])');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth > 1024) {
        hamburger.classList.remove('active');
        menuContainer.classList.remove('active');
      }
    });
  });
  
  // Efecto de scroll en el nav
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.querySelector('.nav').style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
      document.querySelector('.nav').style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
  });
  
  // Cerrar menú al redimensionar si pasa a desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      hamburger.classList.remove('active');
      menuContainer.classList.remove('active');
      menuItems.forEach(item => item.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });
  
  // Banner Slider
  const track = document.querySelector('.banner-track');
  if (track) {
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
      nextVideo.currentTime = 0;
      nextVideo.play();
      nextVideo.addEventListener('ended', changeSlide, { once: true });
    }

    // Iniciar el carrusel con el primer video
    const firstVideo = slides[0].querySelector('video');
    firstVideo.play();
    firstVideo.addEventListener('ended', changeSlide, { once: true });
  }
  
  // Modales del menú
  document.querySelectorAll('.menu-li').forEach(menuItem => {
    menuItem.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        document.body.style.overflow = 'hidden';
        // Forzar el scroll al inicio del modal
        const modal = menuItem.querySelector('.modal-menu');
        if (modal) {
          modal.scrollTop = 0;
        }
      }
    });
    
    menuItem.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        document.body.style.overflow = '';
      }
    });
  });
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



