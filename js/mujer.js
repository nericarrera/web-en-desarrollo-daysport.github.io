
/*-------MOSTRAR PRODUCTOS DE MUJER IMPORTACION------------------*/

import { productosMujer } from '/js/mujerProductos.js';

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const product = productosMujer.find(p => p.id === productId);

document.addEventListener('DOMContentLoaded', () => {
    console.log("Cargando página Mujer...");
    console.log("Productos disponibles:", productosMujer);
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');

    if (!mujerProductsGrid) {
        console.error("No se encontró el contenedor de productos.");
        return;
    }

    // Mostrar productos
    productosMujer.forEach(producto => {
        console.log("Renderizando producto:", producto.nombre);
    });
});

/**---------- **/

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



    /*----------------CONTADORES------------------------------- */

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
  
    actualizarContadores();
 

  /*----------------------------MOSTRAR PRODUCTOS------------------------- */
  
  function mostrarProductos(categoria = "all", coloresSeleccionados = [], tallesSeleccionados = [], orden = "") {
    console.log(`Filtrando por categoría: ${categoria}, colores: ${coloresSeleccionados}, talles: ${tallesSeleccionados}, orden: ${orden}`);
    mujerProductsGrid.innerHTML = ""; // Limpiar el grid antes de renderizar

    if (!Array.isArray(productosMujer)) {
        console.error('Error: productosMujer no es un array. Verifica su inicialización.');
        return;
    }

    // Filtrar productos
    let productosFiltrados = productosMujer.filter(producto => {
        const matchesCategoria = categoria === "all" || producto.categoria === categoria;
        const matchesColor = coloresSeleccionados.length === 0 || 
            producto.variantes.some(vari => coloresSeleccionados.includes(vari.color.toLowerCase()));
        const matchesTalla = tallesSeleccionados.length === 0 || 
            producto.variantes.some(vari => tallesSeleccionados.includes(vari.talla.toUpperCase()));

        return matchesCategoria && matchesColor && matchesTalla;
    });

    // Ordenar productos
    if (orden === "price-asc") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === "price-desc") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    } else if (orden === "novedades") {
        productosFiltrados.sort((a, b) => (b.etiqueta === "novedad") - (a.etiqueta === "novedad"));
    }

    // Renderizar productos filtrados
    productosFiltrados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('mujer-product-card');

        productoDiv.innerHTML = `
            <div class="product-container-mujer">
                <a href="index-producto.html?id=${producto.id}" class="product-link">
                    <div class="product-image-mujer">
                        <img id="mainImage-${producto.id}" src="${producto.imagen[0]}" alt="${producto.nombre}" class="main-product-image">
                        <div class="product-thumbnails hidden-thumbnails">
                            ${producto.miniaturas ? producto.miniaturas.map((img, index) => `
                                <img src="${img}" alt="Miniatura ${index + 1}" 
                                     class="thumbnail-image" 
                                     data-main-image-id="mainImage-${producto.id}">
                            `).join('') : ''}
                        </div>
                    </div>
                </a>
                <div class="product-details-mujer">
                    <p class="mujer-product-price">$${producto.precio.toLocaleString()}</p>
                    <p class="mujer-product-name">${producto.nombre}</p>
                    <p class="mujer-product-categoria">${producto.categoria}</p>
                    <p class="mujer-product-etiqueta">${producto.etiqueta}</p>
                    <a href="index-producto.html?id=${producto.id}" class="btn-ver-detalles">Ver detalles</a>
                </div>
            </div>
        `;

        const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);
        let selectedImage = producto.imagen[0];
        let isInsideProduct = false;

        // Manejo del hover en miniaturas
        const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('mouseover', () => {
                selectedImage = thumbnail.src;
                mainImage.src = selectedImage;
            });
        });

        // Detectar entrada y salida del producto
        productoDiv.addEventListener('mouseover', () => {
            isInsideProduct = true;
        });

        productoDiv.addEventListener('mouseout', () => {
            isInsideProduct = false;
            setTimeout(() => {
                if (!isInsideProduct) {
                    mainImage.src = producto.imagen[0];
                }
            }, 100);
        });

        mujerProductsGrid.appendChild(productoDiv);
    });
}


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
                console.log(`Contenido de la sección ${index + 1} ahora está ${content.style.display === 'none' ? 'oculto' : 'visible'}`);
            });
        } else {
            console.warn(`Faltan elementos (toggle o contenido) en la sección de filtro número ${index + 1}.`);
        }
    });

    console.log("Scripts cargados correctamente. Verifica si el filtro funciona como se espera.");
});


 /*-------------BOTON DE FILTRO--------------------- */

 filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover la clase activa de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Agregar la clase activa al botón clicado
        button.classList.add('active');

        // Obtener la categoría desde el atributo data-filter
        const categoria = button.getAttribute('data-filter');

        // Verificar si la categoría es válida
        if (!categoria) {
            console.error('Categoría no encontrada en el botón clicado.');
            return;
        }

        // Mostrar depuración
        console.log('Categoría seleccionada:', categoria);

        // Llamar a la función mostrarProductos con la categoría
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







