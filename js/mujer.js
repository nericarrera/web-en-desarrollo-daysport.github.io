/*-------MOSTRAR PRODUCTOS DE MUJER IMPORTACION------------------*/
import { productosMujer } from '/js/mujerProductos.js';

/*-------------FILTRO MUJER----------------*/

document.addEventListener('DOMContentLoaded', () => {
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    const filterButtons = document.querySelectorAll('.mujer-filter-button');
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterOverlay = document.querySelector('.filter-overlay');
    const closeFilterButton = document.querySelector('.close-filter');
    const applyFiltersButton = document.getElementById('apply-filters');
    const clearFiltersButton = document.getElementById('mujer-clear-filters');
    const colorCheckboxes = document.querySelectorAll('input[name="mujer-color"]');
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    const sortRadios = document.querySelectorAll('input[name="sort"]');

    // Función para obtener productos con la etiqueta "novedad"
    function obtenerProductosNovedad() {
        return productosMujer.filter(producto => producto.etiqueta.toLowerCase() === "novedad");
    }

    // Hacer los datos y funciones disponibles en el ámbito global
    window.productosMujer = productosMujer;
    window.obtenerProductosNovedad = obtenerProductosNovedad;

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

    // Función para mostrar productos
    function mostrarProductos(categoria = "all", coloresSeleccionados = [], tallesSeleccionados = [], orden = "") {
        mujerProductsGrid.innerHTML = "";
    
        let productosFiltrados = productosMujer.filter(producto => {
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
    
        productosFiltrados.forEach(producto => {
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
    
            // Dentro de mostrarProductos(), reemplaza la parte de los eventos de hover con esto:

const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);
const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');

// Estado para rastrear la miniatura activa
let activeThumbnail = null;

// Hover en imagen principal (solo si no hay miniatura activa)
mainImage.addEventListener('mouseenter', () => {
    if (!activeThumbnail && producto.hoverImagenes && producto.hoverImagenes.length > 0) {
        mainImage.src = producto.hoverImagenes[0];
    }
});

mainImage.addEventListener('mouseleave', () => {
    if (!activeThumbnail) {
        mainImage.src = producto.imagen[0];
    } else {
        // Si hay miniatura activa, vuelve a esa imagen
        mainImage.src = activeThumbnail.src;
    }
});

// Eventos para miniaturas
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mouseenter', () => {
        // Cambiar imagen principal
        mainImage.src = thumbnail.src;
        activeThumbnail = thumbnail;
        
        // Cambiar hover para mostrar la versión alternativa
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
        // Restaurar eventos normales cuando el cursor sale de todas las miniaturas
        const isHoveringAnyThumbnail = [...thumbnails].some(thumb => {
            return thumb.matches(':hover');
        });
        
        if (!isHoveringAnyThumbnail) {
            activeThumbnail = null;
            mainImage.src = producto.imagen[0];
            
            // Restaurar hover original
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
            const categoria = button.getAttribute('data-filter');
            mostrarProductos(categoria);
        });
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
            const selectedCategory = document.querySelector('.mujer-filter-button.active').getAttribute('data-filter');
            const selectedColors = Array.from(colorCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value.toLowerCase());
            const selectedSizes = Array.from(sizeCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value.toUpperCase());

            mostrarProductos(selectedCategory, selectedColors, selectedSizes);

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

        mostrarProductos();
    });

    actualizarContadores();
    mostrarProductos("all");
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


