/*-------MOSTRAR PRODUCTOS DE MUJER CON PAGINACIÓN------------------*/
import { productosMujer } from '/js/mujerProductos.js';

document.addEventListener('DOMContentLoaded', () => {
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    const filterButtons = document.querySelectorAll('.mujer-filter-button');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    // Variables de paginación
    let currentPage = 1;
    const productsPerPage = 8; // Ajusta según necesidad
    let currentProducts = [];
    let currentFilters = {
        categoria: "all",
        colores: [],
        talles: [],
        orden: ""
    };

    // Función para obtener productos con la etiqueta "novedad"
    function obtenerProductosNovedad() {
        return productosMujer.filter(producto => producto.etiqueta.toLowerCase() === "novedad");
    }

    // Función para actualizar contadores
    function actualizarContadores() {
        const colorCounts = {};
        const tallaCounts = {};

        productosMujer.forEach(producto => {
            producto.variantes.forEach(vari => {
                if (vari.color) {
                    const color = vari.color.toLowerCase();
                    colorCounts[color] = (colorCounts[color] || 0) + (vari.stock > 0 ? 1 : 0);
                }
                if (vari.talla) {
                    const talla = vari.talla.toUpperCase();
                    tallaCounts[talla] = (tallaCounts[talla] || 0) + (vari.stock > 0 ? 1 : 0);
                }
            });
        });

        document.querySelectorAll('input[name="mujer-color"]').forEach(checkbox => {
            const color = checkbox.value.toLowerCase();
            const count = colorCounts[color] || 0;
            const itemCount = checkbox.parentElement.querySelector('.item-count');
            if (itemCount) {
                itemCount.textContent = `(${count})`;
            }
        });

        document.querySelectorAll('input[name="size"]').forEach(checkbox => {
            const talla = checkbox.value.toUpperCase();
            const count = tallaCounts[talla] || 0;
            const itemCount = checkbox.parentElement.querySelector('.item-count');
            if (itemCount) {
                itemCount.textContent = `(${count})`;
            }
        });
    }

    // Función para filtrar productos
    function filtrarProductos() {
        return productosMujer.filter(producto => {
            const matchesCategoria = currentFilters.categoria === "all" || producto.categoria === currentFilters.categoria;
            const matchesColor = currentFilters.colores.length === 0 || 
                producto.variantes.some(vari => currentFilters.colores.includes(vari.color.toLowerCase()));
            const matchesTalla = currentFilters.talles.length === 0 || 
                producto.variantes.some(vari => currentFilters.talles.includes(vari.talla.toUpperCase()));

            return matchesCategoria && matchesColor && matchesTalla;
        });
    }

    // Función para ordenar productos
    function ordenarProductos(productos) {
        if (currentFilters.orden === "price-asc") {
            return [...productos].sort((a, b) => a.precio - b.precio);
        } else if (currentFilters.orden === "price-desc") {
            return [...productos].sort((a, b) => b.precio - a.precio);
        } else if (currentFilters.orden === "novedades") {
            return [...productos].sort((a, b) => (b.etiqueta === "novedad") - (a.etiqueta === "novedad"));
        }
        return productos;
    }

    // Función para mostrar productos (con paginación)
    function mostrarProductos() {
        loadingSpinner.classList.remove('hidden');
        loadMoreBtn.disabled = true;

        // Filtrar y ordenar
        const productosFiltrados = filtrarProductos();
        const productosOrdenados = ordenarProductos(productosFiltrados);
        
        // Calcular productos a mostrar
        const startIndex = 0; // Siempre mostramos desde el inicio al cambiar filtros
        const endIndex = currentPage * productsPerPage;
        const productosAMostrar = productosOrdenados.slice(0, endIndex);

        // Renderizar productos
        mujerProductsGrid.innerHTML = "";
        renderizarProductos(productosAMostrar);

        // Mostrar u ocultar botón "Mostrar más"
        if (endIndex >= productosOrdenados.length) {
            loadMoreBtn.classList.add('hidden');
        } else {
            loadMoreBtn.classList.remove('hidden');
        }

        loadingSpinner.classList.add('hidden');
        loadMoreBtn.disabled = false;
    }

    // Función para renderizar productos
    function renderizarProductos(productos) {
        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('mujer-product-card');

            productoDiv.innerHTML = `
                <div class="product-container-mujer">
                    <a href="index-producto.html?id=${producto.id}" class="product-link">
                        <div class="product-image-mujer">
                            <img id="mainImage-${producto.id}" src="${producto.imagen[0]}" alt="${producto.nombre}" class="main-product-image">
                            <div class="product-thumbnails hidden-thumbnails">
                                ${producto.miniaturas ? producto.miniaturas.map((miniatura, index) => `
                                    <img src="${miniatura.src}" alt="Miniatura ${index + 1}" 
                                         class="thumbnail-image" 
                                         data-main-image-id="mainImage-${producto.id}"
                                         data-hover="${miniatura.hover}">
                                `).join('') : ''}
                            </div>
                        </div>
                    </a>
                    <div class="product-details-mujer">
                        <p class="mujer-product-price">$${producto.precio.toLocaleString()}</p>
                        <p class="mujer-product-name">${producto.nombre}</p>
                        <p class="mujer-product-categoria">${producto.categoria}</p>
                        <p class="mujer-product-etiqueta">${producto.etiqueta}</p>
                        <a href="index-producto.html?id=${producto.id}" class="btn-ver-detalles"></a>
                    </div>
                </div>
            `;

            // Configurar eventos hover (igual que antes)
            const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);
            const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
            let activeThumbnail = null;

            mainImage.addEventListener('mouseenter', () => {
                if (!activeThumbnail && producto.hoverImagenes && producto.hoverImagenes.length > 0) {
                    mainImage.src = producto.hoverImagenes[0];
                }
            });

            mainImage.addEventListener('mouseleave', () => {
                if (!activeThumbnail) {
                    mainImage.src = producto.imagen[0];
                } else {
                    mainImage.src = activeThumbnail.src;
                }
            });

            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('mouseenter', () => {
                    mainImage.src = thumbnail.src;
                    activeThumbnail = thumbnail;
                    
                    const hoverImage = thumbnail.getAttribute('data-hover');
                    if (hoverImage) {
                        mainImage.addEventListener('mouseenter', () => {
                            mainImage.src = hoverImage;
                        });
                        
                        mainImage.addEventListener('mouseleave', () => {
                            mainImage.src = thumbnail.src;
                        });
                    }
                });

                thumbnail.addEventListener('mouseleave', () => {
                    const isHoveringAnyThumbnail = [...thumbnails].some(thumb => {
                        return thumb.matches(':hover');
                    });
                    
                    if (!isHoveringAnyThumbnail) {
                        activeThumbnail = null;
                        mainImage.src = producto.imagen[0];
                        
                        mainImage.onmouseenter = null;
                        mainImage.onmouseleave = null;
                        
                        if (producto.hoverImagenes && producto.hoverImagenes.length > 0) {
                            mainImage.addEventListener('mouseenter', () => {
                                mainImage.src = producto.hoverImagenes[0];
                            });
                            
                            mainImage.addEventListener('mouseleave', () => {
                                mainImage.src = producto.imagen[0];
                            });
                        }
                    }
                });
            });
            
            mujerProductsGrid.appendChild(productoDiv);
        });
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilters.categoria = button.getAttribute('data-filter');
            currentPage = 1; // Resetear paginación al cambiar filtros
            mostrarProductos();
        });
    });

    // Evento para el botón "Mostrar más"
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        mostrarProductos();
        
        // Scroll suave hacia abajo
        setTimeout(() => {
            loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    // Inicialización
    actualizarContadores();
    mostrarProductos();
});


/*----------------------MENU DESPLEGABLE COLPASIBLES--------------- */

document.addEventListener('DOMContentLoaded', () => {
    const collapsibleSections = document.querySelectorAll('.collapsible-section');

    collapsibleSections.forEach((section, index) => {
        const toggleButton = section.querySelector('.collapsible-toggle');
        const content = section.querySelector('.collapsible-content');

        if (toggleButton && content) {
            console.log(`Configurando despliegue en la sección de filtro número ${index + 1}`);

            toggleButton.addEventListener('click', () => {
                // Alternar visibilidad
                content.style.display = content.style.display === 'none' ? 'block' : 'none';

                toggleButton.addEventListener('click', () => {
                    content.style.transition = 'max-height 0.3s ease';
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });

                // Alternar símbolo de desplegar/cerrar
                const symbol = toggleButton.querySelector('span');
                symbol.textContent = content.style.display === 'block' ? '▼' : '▲';
                console.log(`Contenido de la sección ${index + 1} ahora está ${content.style.display === 'none' ? 'oculto' : 'visible'}`);
            });
        } else {
            console.warn(`Faltan elementos (toggle o contenido) en la sección de filtro número ${index + 1}.`);
        }
    });

    console.log("Scripts cargados correctamente. Verifica si el filtro funciona como se espera.");
});


