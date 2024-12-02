
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

        {  id: 1,
            nombre: "Remera Modal Soft",
            precio: 7500,
            categoria: "remeras",
            imagen: ["img/mujer/remera-modal-soft-cuelloR/front.jpeg", "img/mujer/remera-modal-soft-cuelloR/back.jpeg"],
            miniaturas: ["img/mujer/remera-modal-soft-cuelloR/blue.jpeg", "img/mujer/remera-modal-soft-cuelloR/red.jpeg"],
            etiqueta: "novedades",
            variantes: [
                { color: "celeste", talla: "XL", stock: 1 },
                { color: "blanco", talla: "M", stock: 1 },
                { color: "negro", talla: "L", stock: 0 }, // Sin stock
            ]
        },

        { id: 2,
            nombre: "Calza Nike Pro",
            precio: 13500,
            categoria: "calzas",
            imagen: ["img/mujer/calzas/calza-nike-pro-neg-1.jpeg", "img/mujer/calzas/calza-nike-pro-gris-1.jpeg"],
            miniaturas: ["img/mujer/calzas/mini1.jpeg", "img/mujer/calzas/mini2.jpeg"],
            etiqueta: "",
            variantes: [
                { color: "negro", talla: "L", stock: 1 },
                { color: "gris", talla: "M", stock: 1 },
            ]
        },

        { id: 3,
            nombre: "Campera Deportiva NIke",
            precio: 13500,
            categoria: "camperas",
            imagen: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg"],
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            color: "negro",
            talla: "S",
            etiqueta: "novedades" },
    
        
        { id: 4, 
            nombre: "Blusa de Lino", 
            precio: 8500, 
            categoria: "remeras", 
            imagen: ["img/mujer/remeras-lino/blusalino-negro 1.jpeg"], 
            color: "negro", 
            talla: "XL", 
            etiqueta: "" 
        },

        { id: 5, 
            nombre: "Campera Deportiva Nike", 
            precio: 23000, 
            categoria: "camperas", 
            imagen: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-4.jpeg"], 
            color: "negro", 
            talla: "S", 
            etiqueta: "" 
        },
        { id: 6, 
            nombre: "Calza Nike Radeon", 
            precio: 13500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"], 
            color: "negro", 
            talla: "S",  
            etiqueta: "novedades" 
        },
        { id: 7, 
            nombre: "Calza Nike Grofada", 
            precio: 16500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-nike-grofada-1.jpeg"], 
            color: "negro", 
            talla: "S",  
            etiqueta: "novedades" 
        },
        { id: 8, 
            nombre: "Calza Nike Speak", 
            precio: 13500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-nike-speak-1.jpeg"], 
            color: "negro", 
            talla: "S",  
            etiqueta: "novedades" 
        },
        { id: 9, 
            nombre: "Calza Nike Fluorecent", 
            precio: 13500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-nike-fluor-1.jpeg", "img/mujer/calzas/calza-nike-fluor-2.jpeg"], 
            color: "fucsia", 
            talla: "XL",  
            etiqueta: "novedades" 
        },
        { id: 10, 
            nombre: "Calza Adidas Original", 
            precio: 13500, 
            categoria: "calzas", 
            imagen: ["img/mujer/calzas/calza-adidas-original-1.jpeg"], 
            color: "negro", 
            talla: "M",  
            etiqueta: " " 
        },
    ];


    /*----------------CONTADORES------------------------------- */

    // Función para contar productos por color y talla
    function actualizarContadores() {
        const colorCounts = {};
        const tallaCounts = {};

        productosMujer.forEach(producto => {
            const color = producto.color.toLowerCase();
            const talla = producto.talla.toUpperCase();

            colorCounts[color] = (colorCounts[color] || 0) + 1;
            tallaCounts[talla] = (tallaCounts[talla] || 0) + 1;
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

  // **Función para mostrar productos en el grid**
  function mostrarProductos(categoria = "all", color = [], talla = [], ordenar = "") {
    mujerProductsGrid.innerHTML = ""; // Limpiar el grid

    // **Filtrar productos según categoría, color, talla y stock**
    let productosFiltrados = productosMujer.filter(producto => {
        const tieneStock = producto.variantes.some(v => v.stock > 0);
        if (!tieneStock) return false;

        const matchesCategoria = categoria === "all" || producto.categoria === categoria;
        const matchesColor = color.length === 0 || producto.variantes.some(v => color.includes(v.color));
        const matchesTalla = talla.length === 0 || producto.variantes.some(v => talla.includes(v.talla));

        return matchesCategoria && matchesColor && matchesTalla;
    });

    // Ordenar los productos si se selecciona una opción
    if (ordenar === "price-asc") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenar === "price-desc") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    // Mostrar los productos filtrados
    productosFiltrados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('mujer-product-card');
        
            // Renderiza el producto
            productoDiv.innerHTML = `
            <div class="product-container-mujer">
                <div class="product-image-mujer">
                    <img id="mainImage-${producto.id}" src="${producto.imagen[0]}" alt="${producto.nombre}" class="main-product-image">
                    <div class="product-thumbnails hidden-thumbnails">
                        ${producto.miniaturas.map((img, index) => `
                            <img src="${img}" alt="Miniatura ${index + 1}" 
                                class="thumbnail-image" 
                                data-main-image-id="mainImage-${producto.id}">
                        `).join('')}
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
            let selectedImage = producto.imagen[0]; // Mantener la última miniatura seleccionada
            let isInsideProduct = false; // Estado para saber si el mouse está dentro del producto
        
            // Hover en las miniaturas
            const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
            if (thumbnails.length > 0) {
                thumbnails.forEach(thumbnail => {
                    thumbnail.addEventListener('mouseover', () => {
                        selectedImage = thumbnail.src; // Actualizar a la miniatura actual
                        mainImage.src = selectedImage; // Cambiar la imagen principal
                    });
                });
            }
        
            // Detectar entrada al área del producto
            productoDiv.addEventListener('mouseover', () => {
                isInsideProduct = true; // El mouse está dentro del producto
            });
        
            // Detectar salida del área del producto
            productoDiv.addEventListener('mouseout', () => {
                isInsideProduct = false; // El mouse salió del producto
                setTimeout(() => {
                    if (!isInsideProduct) {
                        mainImage.src = producto.imagen[0]; // Restaurar imagen inicial
                        selectedImage = producto.imagen[0]; // Resetear a la inicial
                    }
                }, 100); // Esperar un pequeño tiempo para detectar si realmente salió
            });
        
            mujerProductsGrid.appendChild(productoDiv);
        });
    }

     // **Inicializar la vista mostrando todos los productos**
     mostrarProductos("all");

      // **Agregar eventos a los botones del filtro**
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const categoria = button.getAttribute('data-filter');
            mostrarProductos(categoria);
        });
    });

    // **Eventos para el botón de ordenar**
    applyFiltersButton.addEventListener('click', () => {
        const selectedCategory = document.querySelector('.mujer-filter-button.active').getAttribute('data-filter');
        const selectedColors = Array.from(colorCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        const selectedSizes = Array.from(sizeCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toUpperCase());

        mostrarProductos(selectedCategory, selectedColors, selectedSizes);
    });

    clearFiltersButton.addEventListener('click', () => {
        sortRadios.forEach(radio => (radio.checked = false));
        colorCheckboxes.forEach(cb => (cb.checked = false));
        sizeCheckboxes.forEach(cb => (cb.checked = false));

        mostrarProductos("all");
    });


    /*-----------REDUCIR STOCK------------------------- */
    function reducirStock(productoId, color, talla) {
        const producto = productosMujer.find(p => p.id === productoId);
        if (producto) {
            const variante = producto.variantes.find(v => v.color === color && v.talla === talla);
            if (variante && variante.stock > 0) {
                variante.stock -= 1; // Reduce el stock
                console.log(`Stock actualizado: ${variante.stock}`);
            } else {
                console.log("Este producto está agotado.");
            }
        }
    }
    
    // Ejemplo de uso
    reducirStock(1, "celeste", "XL");

       

    /*-------------BOTON DE FILTRO--------------------- */

    
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