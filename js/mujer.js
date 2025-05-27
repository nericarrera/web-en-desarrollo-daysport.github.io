/*-------MOSTRAR PRODUCTOS DE MUJER CON PAGINACIÓN Y FILTRADO POR URL------------------*/
import { productosMujer } from '/js/mujerProductos.js';

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    const filterButtons = document.querySelectorAll('.mujer-filter-button');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterOverlay = document.querySelector('.filter-overlay');
    const closeFilterButton = document.querySelector('.close-filter');
    const applyFiltersButton = document.getElementById('apply-filters');
    const clearFiltersButton = document.getElementById('mujer-clear-filters');
    const colorCheckboxes = document.querySelectorAll('input[name="mujer-color"]');
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    const sortRadios = document.querySelectorAll('input[name="sort"]');
    
    // Variables de estado
    let currentPage = 1;
    const productsPerPage = 8;
    let currentFilters = {
        categoria: "all",
        colores: [],
        talles: [],
        orden: ""
    };

    // 1. Procesar parámetros de URL al cargar
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaURL = urlParams.get('categoria');
    
    if (categoriaURL) {
        currentFilters.categoria = categoriaURL;
        const buttonToActivate = document.querySelector(`.mujer-filter-button[data-filter="${categoriaURL}"]`);
        if (buttonToActivate) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            buttonToActivate.classList.add('active');
        }
    }

    // 2. Funciones principales
    function obtenerProductosNovedad() {
        return productosMujer.filter(producto => producto.etiqueta.toLowerCase() === "novedad");
    }

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

        colorCheckboxes.forEach(checkbox => {
            const color = checkbox.value.toLowerCase();
            const count = colorCounts[color] || 0;
            const itemCount = checkbox.parentElement.querySelector('.item-count');
            if (itemCount) itemCount.textContent = `(${count})`;
        });

        sizeCheckboxes.forEach(checkbox => {
            const talla = checkbox.value.toUpperCase();
            const count = tallaCounts[talla] || 0;
            const itemCount = checkbox.parentElement.querySelector('.item-count');
            if (itemCount) itemCount.textContent = `(${count})`;
        });
    }

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

    function mostrarProductos() {
        loadingSpinner.classList.remove('hidden');
        loadMoreBtn.disabled = true;

        const productosFiltrados = filtrarProductos();
        const productosOrdenados = ordenarProductos(productosFiltrados);
        const endIndex = currentPage * productsPerPage;
        const productosAMostrar = productosOrdenados.slice(0, endIndex);

        renderizarProductos(productosAMostrar);

        loadMoreBtn.classList.toggle('hidden', endIndex >= productosOrdenados.length);
        loadingSpinner.classList.add('hidden');
        loadMoreBtn.disabled = false;
    }

    function renderizarProductos(productos) {
        mujerProductsGrid.innerHTML = productos.map(producto => {
            const miniaturasHTML = producto.miniaturas?.map((miniatura, index) => `
                <img src="${miniatura.src}" alt="Miniatura ${index + 1}" 
                     class="thumbnail-image" 
                     data-main-image-id="mainImage-${producto.id}"
                     data-hover="${miniatura.hover}">
            `).join('') || '';

            return `
                <div class="mujer-product-card">
                    <div class="product-container-mujer">
                        <a href="index-producto.html?id=${producto.id}" class="product-link">
                            <div class="product-image-mujer">
                                <img id="mainImage-${producto.id}" src="${producto.imagen[0]}" alt="${producto.nombre}" class="main-product-image">
                                <div class="product-thumbnails hidden-thumbnails">${miniaturasHTML}</div>
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
                </div>
            `;
        }).join('');

        // Configurar eventos hover después de renderizar
        document.querySelectorAll('.mujer-product-card').forEach(productoDiv => {
            const id = productoDiv.querySelector('.main-product-image').id.split('-')[1];
            const producto = productos.find(p => p.id === id);
            if (!producto) return;

            const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);
            const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
            let activeThumbnail = null;

            const resetMainImage = () => {
                if (!activeThumbnail) {
                    mainImage.src = producto.imagen[0];
                } else {
                    mainImage.src = activeThumbnail.src;
                }
            };

            mainImage.addEventListener('mouseenter', () => {
                if (!activeThumbnail && producto.hoverImagenes?.length) {
                    mainImage.src = producto.hoverImagenes[0];
                }
            });

            mainImage.addEventListener('mouseleave', resetMainImage);

            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('mouseenter', () => {
                    mainImage.src = thumbnail.src;
                    activeThumbnail = thumbnail;
                    
                    const hoverImage = thumbnail.dataset.hover;
                    if (hoverImage) {
                        const originalSrc = thumbnail.src;
                        thumbnail.addEventListener('mouseenter', () => mainImage.src = hoverImage);
                        thumbnail.addEventListener('mouseleave', () => mainImage.src = originalSrc);
                    }
                });

                thumbnail.addEventListener('mouseleave', () => {
                    if (![...thumbnails].some(thumb => thumb.matches(':hover'))) {
                        activeThumbnail = null;
                        resetMainImage();
                    }
                });
            });
        });
    }

    // 3. Event Listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilters.categoria = button.dataset.filter;
            currentPage = 1;
            history.pushState({}, '', `?categoria=${currentFilters.categoria}`);
            mostrarProductos();
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        mostrarProductos();
        setTimeout(() => loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    });

    if (filterDropdownToggle) {
        filterDropdownToggle.addEventListener('click', () => {
            filterOverlay.classList.add('show');
            filterOverlay.style.display = 'block';
        });
    }

    if (closeFilterButton) {
        closeFilterButton.addEventListener('click', () => {
            filterOverlay.classList.remove('show');
            setTimeout(() => filterOverlay.style.display = 'none', 300);
        });
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            currentFilters.colores = Array.from(colorCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value.toLowerCase());
            
            currentFilters.talles = Array.from(sizeCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value.toUpperCase());
            
            currentFilters.orden = Array.from(sortRadios)
                .find(radio => radio.checked)?.value || "";
            
            currentPage = 1;
            mostrarProductos();
            filterOverlay.classList.remove('show');
            setTimeout(() => filterOverlay.style.display = 'none', 300);
        });
    }

    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', () => {
            colorCheckboxes.forEach(cb => cb.checked = false);
            sizeCheckboxes.forEach(cb => cb.checked = false);
            sortRadios.forEach(radio => radio.checked = false);
            
            currentFilters = {
                categoria: "all",
                colores: [],
                talles: [],
                orden: ""
            };
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.mujer-filter-button[data-filter="all"]').classList.add('active');
            
            currentPage = 1;
            history.pushState({}, '', window.location.pathname);
            mostrarProductos();
        });
    }

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


