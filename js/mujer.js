
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
        { id: 1, nombre: "Remera Modal Soft", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 1.jpeg", color: "celeste", talla: "XL", etiqueta: "nuevo" },
        { id: 2, nombre: "Remera Modal Soft", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 2.jpeg", color: "negro", talla: "L", etiqueta: "novedades" },
        { id: 3, nombre: "Remera Modal viscosa", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-viscosa-cuelloR/remera-modal-viscosa-cuelloR 1.jpeg", color: "blanco", talla: "L", etiqueta: "novedades" },
        // Agrega más productos según sea necesario
    ];

    // Función para contar productos por color y talla
    function actualizarContadores() {
        const colorCounts = {};
        const tallaCounts = {};

        // Contar productos por color y talla
        productosMujer.forEach(producto => {
            const color = producto.color.toLowerCase();
            const talla = producto.talla.toUpperCase();

            colorCounts[color] = (colorCounts[color] || 0) + 1;
            tallaCounts[talla] = (tallaCounts[talla] || 0) + 1;
        });

        // Actualizar contadores en el HTML para colores
        colorCheckboxes.forEach(checkbox => {
            const color = checkbox.value.toLowerCase();
            const count = colorCounts[color] || 0;
            const itemCount = checkbox.parentElement.querySelector('.item-count');
            if (itemCount) {
                itemCount.textContent = `(${count})`;
            }
        });

        // Actualizar contadores en el HTML para tallas
        sizeCheckboxes.forEach(checkbox => {
            const talla = checkbox.value.toUpperCase();
            const count = tallaCounts[talla] || 0;
            const itemCount = checkbox.parentElement.querySelector('.item-count');
            if (itemCount) {
                itemCount.textContent = `(${count})`;
            }
        });
    }

    // Llamar a la función para inicializar los contadores
    actualizarContadores();

    // Función para mostrar productos
    function mostrarProductos(categoria = "all", color = [], talla = [], ordenar = "") {
        mujerProductsGrid.innerHTML = ""; // Limpiar el grid
    
        let productosFiltrados = productosMujer.filter(producto => {
            const matchesCategoria = categoria === "all" || producto.categoria === categoria;
            const matchesColor = color.length === 0 || color.includes(producto.color.toLowerCase());
            const matchesTalla = talla.length === 0 || talla.includes(producto.talla.toUpperCase());
            return matchesCategoria && matchesColor && matchesTalla;
        });
    
        // Ordenar los productos si se selecciona una opción
        if (ordenar === "price-asc") {
            productosFiltrados.sort((a, b) => a.precio - b.precio);
        } else if (ordenar === "price-desc") {
            productosFiltrados.sort((a, b) => b.precio - a.precio);
        }
    
        productosFiltrados.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('mujer-product-card');
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p class="mujer-product-price">$${producto.precio.toLocaleString()}</p>
                <p class="mujer-product-name">${producto.nombre}</p>`;
            mujerProductsGrid.appendChild(productoDiv);
        });
    }
    
    // Cambiar filtro por categoría
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const categoria = button.getAttribute('data-filter');
            mostrarProductos(categoria);
        });
    });

    // Mostrar y ocultar el filtro lateral
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

    // Aplicar filtros seleccionados
    applyFiltersButton.addEventListener('click', () => {
        const selectedCategory = document.querySelector('.mujer-filter-button.active').getAttribute('data-filter');
        const selectedColors = Array.from(colorCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());
        const selectedSizes = Array.from(sizeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toUpperCase());

        mostrarProductos(selectedCategory, selectedColors, selectedSizes);

        // Cerrar el filtro lateral después de aplicar
        filterOverlay.classList.remove('show');
        setTimeout(() => {
            filterOverlay.style.display = 'none';
        }, 300);
    });

    // Limpiar todos los filtros seleccionados
    clearFiltersButton.addEventListener('click', () => {
        sortRadios.forEach(radio => (radio.checked = false));
        colorCheckboxes.forEach(checkbox => (checkbox.checked = false));
        sizeCheckboxes.forEach(checkbox => (checkbox.checked = false));

        mostrarProductos(); // Muestra todos los productos nuevamente
    });

    // Inicializar contadores de colores y tallas cuando la página se carga
    actualizarContadores();
});


  /*---------------------------------------- */

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

/*----------------FILTRO DESPLEGABLE--------------------- */
