import { productosAccesorios } from '/js/accesoriosProductos.js';

document.addEventListener('DOMContentLoaded', () => {
    const accesoriosProductsGrid = document.querySelector('.accesorios-products-grid');
    const filterButtons = document.querySelectorAll('.accesorios-filter-button');
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterOverlay = document.querySelector('.filter-overlay');
    const closeFilterButton = document.querySelector('.close-filter');
    const applyFiltersButton = document.getElementById('apply-filters');
    const clearFiltersButton = document.getElementById('accesorios-clear-filters');
    const colorCheckboxes = document.querySelectorAll('input[name="accesorios-color"]');
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    const sortRadios = document.querySelectorAll('input[name="sort"]');
    
    // Variables para paginación
    const productsPerPage = 8;
    let currentPage = 1;
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.textContent = 'Mostrar más';
    loadMoreBtn.id = 'load-more-btn';
    loadMoreBtn.classList.add('load-more-btn');
    loadMoreBtn.style.display = 'none';
    
    // Insertar el botón después del grid
    accesoriosProductsGrid.insertAdjacentElement('afterend', loadMoreBtn);

    // Función para obtener productos con la etiqueta "novedad"
    function obtenerProductosNovedad() {
        return productosAccesorios.filter(producto => producto.etiqueta.toLowerCase() === "novedad");
    }

    // Hacer los datos y funciones disponibles en el ámbito global
    window.productosAccesorios = productosAccesorios;
    window.obtenerProductosNovedad = obtenerProductosNovedad;

    // Función para actualizar contadores
    function actualizarContadores() {
        const colorCounts = {};
        const tallaCounts = {};

        productosAccesorios.forEach(producto => {
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
            if (itemCount) {
                itemCount.textContent = `(${count})`;
            }
        });

        sizeCheckboxes.forEach(checkbox => {
            const talla = checkbox.value.toUpperCase();
            const count = tallaCounts[talla] || 0;
            const itemCount = checkbox.parentElement.querySelector('.item-count');
            if (itemCount) {
                itemCount.textContent = `(${count})`;
            }
        });
    }

    // Función para mostrar productos (MODIFICADA para paginación)
    function mostrarProductos(categoria = "all", coloresSeleccionados = [], tallesSeleccionados = [], orden = "", resetPagination = true) {
        if (resetPagination) {
            currentPage = 1;
            accesoriosProductsGrid.innerHTML = ""; // Solo limpiamos si es un nuevo filtro
        }
    
        let productosFiltrados = productosAccesorios.filter(producto => {
            const matchesCategoria = categoria === "all" || producto.categoria === categoria;
            const matchesColor = coloresSeleccionados.length === 0 || 
                producto.variantes.some(vari => coloresSeleccionados.includes(vari.color.toLowerCase()));
            const matchesTalla = tallesSeleccionados.length === 0 || 
                producto.variantes.some(vari => tallesSeleccionados.includes(vari.talla.toUpperCase()));
    
            return matchesCategoria && matchesColor && matchesTalla;
        });
    
        if (orden === "price-asc") {
            productosFiltrados.sort((a, b) => a.precio - b.precio);
        } else if (orden === "price-desc") {
            productosFiltrados.sort((a, b) => b.precio - a.precio);
        } else if (orden === "novedades") {
            productosFiltrados.sort((a, b) => (b.etiqueta === "novedad") - (a.etiqueta === "novedad"));
        }
    
        // Calcular productos a mostrar
        const startIndex = 0;
        const endIndex = currentPage * productsPerPage;
        const productosAMostrar = productosFiltrados.slice(startIndex, endIndex);
    
        // Renderizar solo los productos nuevos (no limpiar el grid si es paginación)
        renderizarProductos(productosAMostrar);
    
        // Mostrar u ocultar botón "Mostrar más"
        loadMoreBtn.style.display = endIndex >= productosFiltrados.length ? 'none' : 'block';
    }

    // Función para renderizar productos (similar a la original pero sin limpiar el grid)
    function renderizarProductos(productos) {
        productos.forEach(producto => {
            // Verificar si el producto ya está renderizado
            if (document.getElementById(`mainImage-${producto.id}`)) {
                return;
            }
            
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('accesorios-product-card');
    
            productoDiv.innerHTML = `
                <div class="product-container-accesorios">
                    <a href="index-producto.html?id=${producto.id}" class="product-link">
                        <div class="product-image-accesorios">
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
                    <div class="product-details-accesorios">
                        <p class="accesorios-product-price">$${producto.precio.toLocaleString()}</p>
                        <p class="accesorios-product-name">${producto.nombre}</p>
                        <p class="accesorios-product-categoria">${producto.categoria}</p>
                        <p class="accesorios-product-etiqueta">${producto.etiqueta}</p>
                        <a href="index-producto.html?id=${producto.id}" class="btn-ver-detalles"></a>
                    </div>
                </div>
            `;
    
            const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);
            const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
    
            // Variable para almacenar la miniatura seleccionada
            let selectedThumbnail = null;
    
            // Hover en la imagen principal
            if (producto.hoverImagenes && producto.hoverImagenes.length > 0) {
                const hoverImage = producto.hoverImagenes[0];
    
                mainImage.addEventListener('mouseover', () => {
                    if (!selectedThumbnail) {
                        mainImage.src = hoverImage;
                    }
                });
    
                mainImage.addEventListener('mouseout', () => {
                    if (!selectedThumbnail) {
                        mainImage.src = producto.imagen[0];
                    }
                });
            }
    
            // Hover en las miniaturas
            thumbnails.forEach(thumbnail => {
                const hoverImage = thumbnail.getAttribute('data-hover');
    
                thumbnail.addEventListener('mouseover', () => {
                    mainImage.src = thumbnail.src;
                    selectedThumbnail = thumbnail;
    
                    if (hoverImage) {
                        mainImage.addEventListener('mouseover', () => {
                            mainImage.src = hoverImage;
                        });
    
                        mainImage.addEventListener('mouseout', () => {
                            mainImage.src = thumbnail.src;
                        });
                    }
                });
    
                thumbnail.addEventListener('mouseout', () => {
                    selectedThumbnail = null;
                    mainImage.src = producto.imagen[0];
    
                    if (hoverImage) {
                        mainImage.removeEventListener('mouseover', () => {
                            mainImage.src = hoverImage;
                        });
    
                        mainImage.removeEventListener('mouseout', () => {
                            mainImage.src = thumbnail.src;
                        });
                    }
                });
            });
            
            accesoriosProductsGrid.appendChild(productoDiv);
        });
    }

    // Event listeners (MODIFICADOS para paginación)
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const categoria = button.getAttribute('data-filter');
            mostrarProductos(categoria, [], [], "", true);
        });
    });

    // Evento para el botón "Mostrar más"
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        mostrarProductos(
            document.querySelector('.accesorios-filter-button.active')?.getAttribute('data-filter') || "all",
            Array.from(colorCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase()),
            Array.from(sizeCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toUpperCase()),
            Array.from(sortRadios).find(r => r.checked)?.value || "",
            false
        );
        
        // Desplazamiento suave al botón
        setTimeout(() => {
            loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    if (filterDropdownToggle && filterOverlay) {
        filterDropdownToggle.addEventListener('click', () => {
            filterOverlay.classList.add('show');
            filterOverlay.style.display = 'block';
        });
    }

    if (closeFilterButton) {
        closeFilterButton.addEventListener('click', () => {
            filterOverlay.classList.remove('show');
            setTimeout(() => {
                filterOverlay.style.display = 'none';
            }, 300);
        });
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            const selectedCategory = document.querySelector('.accesorios-filter-button.active')?.getAttribute('data-filter') || "all";
            const selectedColors = Array.from(colorCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value.toLowerCase());
            const selectedSizes = Array.from(sizeCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value.toUpperCase());
            const selectedSort = Array.from(sortRadios).find(r => r.checked)?.value || "";

            mostrarProductos(selectedCategory, selectedColors, selectedSizes, selectedSort, true);
            
            filterOverlay.classList.remove('show');
            setTimeout(() => {
                filterOverlay.style.display = 'none';
            }, 300);
        });
    }

    clearFiltersButton.addEventListener('click', () => {
        sortRadios.forEach(radio => (radio.checked = false));
        colorCheckboxes.forEach(checkbox => (checkbox.checked = false));
        sizeCheckboxes.forEach(checkbox => (checkbox.checked = false));
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.accesorios-filter-button[data-filter="all"]').classList.add('active');

        mostrarProductos("all", [], [], "", true);
    });

    // Inicialización
    actualizarContadores();
    mostrarProductos("all", [], [], "", true);
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

                // Alternar símbolo de desplegar/cerrar
                const symbol = toggleButton.querySelector('span');
                symbol.textContent = content.style.display === 'block' ? '▼' : '▲';

                // Alternar altura máxima para la animación
                content.style.transition = 'max-height 0.3s ease';
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }

                console.log(`Contenido de la sección ${index + 1} ahora está ${content.style.display === 'none' ? 'oculto' : 'visible'}`);
            });
        } else {
            console.warn(`Faltan elementos (toggle o contenido) en la sección de filtro número ${index + 1}.`);
        }
    });

    console.log("Scripts cargados correctamente. Verifica si el filtro funciona como se espera.");
});