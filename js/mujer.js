

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

    const productosMujer = [
        {
            id: 1,
            nombre: "Remera Modal Soft",
            precio: 7500,
            categoria: "remeras",
            imagen: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg", "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg"],
            miniaturas: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg", "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg"],
            hoverImagenes: ["img/mujer/remera-modal-soft-cuelloR/hover1.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "celeste", talla: "S", stock: 3 },
                { color: "rojo", talla: "M", stock: 0 }, // Sin stock
                { color: "azul", talla: "L", stock: 5 }
            ]
        },

        {
            id: 2,
            nombre: "Calza Nike Pro",
            precio: 13500,
            categoria: "calzas",
            imagen: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg", "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"],
            miniaturas: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg", "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"],
            hoverImagenes: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ]
        },

        { id: 3,
            nombre: "Campera Deportiva NIke",
            precio: 13500,
            categoria: "camperas",
            imagen: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg"],
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ] 
        },
            
        { id: 4, 
            nombre: "Blusa de Lino", 
            precio: 8500, 
            categoria: "remeras", 
            imagen: ["img/mujer/remeras-lino/blusalino-negro-1.jpeg"], 
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ] 
        },

        { id: 5, 
            nombre: "Campera Deportiva Nike", 
            precio: 23000, 
            categoria: "camperas", 
            imagen: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-4.jpeg"], 
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ] 
        },
        { id: 6, 
            nombre: "Calza Nike Radeon", 
            precio: 13500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"], 
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ] 
        },
        { id: 7, 
            nombre: "Calza Nike Grofada", 
            precio: 16500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-nike-grofada-1.jpeg"], 
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ] 
        },
        { id: 8, 
            nombre: "Calza Nike Speak", 
            precio: 13500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-nike-speak-1.jpeg"], 
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ] 
        },
        { id: 9, 
            nombre: "Calza Nike Fluorecent", 
            precio: 13500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-nike-fluor-1.jpeg", "img/mujer/calzas/calza-nike-fluor-2.jpeg"], 
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ] 
        },
        { id: 10, 
            nombre: "Calza Adidas Original", 
            precio: 13500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-adidas-original-1.jpeg"], 
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 2 },
                { color: "gris", talla: "M", stock: 1 }
            ] 
        },
        
    ];


    /*----------------CONTADORES------------------------------- */

    function actualizarContadores() {
        const colorCounts = {};
        const tallaCounts = {};
    
        productosMujer.forEach(producto => {
            // Verifica si el producto tiene color y talla definidos
            if (producto.color) {
                const color = producto.color.toLowerCase();
                colorCounts[color] = (colorCounts[color] || 0) + 1;
            }
    
            if (producto.talla) {
                const talla = producto.talla.toUpperCase();
                tallaCounts[talla] = (tallaCounts[talla] || 0) + 1;
            }
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
  /*----------------------------------------------- */

  /*----------------------------MOSTRAR PRODUCTOS------------------------- */
  
function mostrarProductos(categoria = "all", color = [], talla = [], ordenar = "") {
    console.log(`Filtrando por categoría: ${categoria}`);
    // Lógica de filtrado
    mujerProductsGrid.innerHTML = ""; // Limpiar el grid antes de renderizar


    if (!Array.isArray(productosMujer)) {
        console.error('Error: productosMujer no es un array. Verifica su inicialización.');
        return; // Salir si no es un array válido
    }

    let productosFiltrados = productosMujer.filter(producto => {
        const matchesCategoria = categoria === "all" || producto.categoria === categoria;
        const matchesColor = color.length === 0 || 
            (producto.color && color.some(c => producto.color.toLowerCase().includes(c)));
        const matchesTalla = talla.length === 0 || 
            (producto.talla && talla.some(t => producto.talla.toUpperCase().includes(t)));

        return matchesCategoria && matchesColor && matchesTalla;
    });

    // Renderizar productos filtrados
    productosFiltrados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('mujer-product-card');

        productoDiv.innerHTML = `
            <div class="product-container-mujer">
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
                <div class="product-details-mujer">
                    <p class="mujer-product-price">$${producto.precio.toLocaleString()}</p>
                    <p class="mujer-product-name">${producto.nombre}</p>
                    <p class="mujer-product-categoria">${producto.categoria}</p>
                    <p class="mujer-product-etiqueta">${producto.etiqueta}</p>
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

    clearFiltersButton.addEventListener('click', () => {
        sortRadios.forEach(radio => (radio.checked = false));
        colorCheckboxes.forEach(checkbox => (checkbox.checked = false));
        sizeCheckboxes.forEach(checkbox => (checkbox.checked = false));

        mostrarProductos();
    });

    actualizarContadores();

    mostrarProductos("all");
    });

/*-----------------FILTRAR PRODUCTOS NOVEDAD----------------- */

const categoria = button.getAttribute('data-filter');
if (!categoria) {
    console.error('Categoría no encontrada.');
    return;
}


function obtenerProductosNovedad() {
    return productosMujer.filter(producto => producto.etiqueta && producto.etiqueta.toLowerCase() === "novedades");
}

// Llamada a la función y depuración
console.log("Productos Novedades:", obtenerProductosNovedad());


import { productosMujer } from './exp-products.js';

console.log("Productos Mujer:", productosMujer);

function mostrarProductosMujer() {
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    if (!mujerProductsGrid) {
        console.error("El contenedor de productos mujer no existe en el DOM.");
        return;
    }

    mujerProductsGrid.innerHTML = productosMujer.map(producto => `
        <div class="mujer-product-card">
            <img src="${producto.imagen[0]}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p>$${producto.precio.toLocaleString()}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', mostrarProductosMujer);


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

/*----------------FILTRO DESPLEGABLE---------------------*/
console.log(`Filtrando productos por categoría: ${categoria}`);
console.log(productosFiltrados);


/*----------------------------------------------------------------*/

const myElement = document.querySelector('.mi-clase');
if (myElement) {
  myElement.addEventListener('click', () => {
    console.log('¡Evento añadido!');
  });
}

