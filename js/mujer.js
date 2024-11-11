
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

    // Función para contar los productos por color
    function contarColores() {
        const colorCounts = {};

        productosMujer.forEach(producto => {
            const color = producto.color.toLowerCase();
            colorCounts[color] = (colorCounts[color] || 0) + 1;
        });

        colorCheckboxes.forEach(checkbox => {
            const color = checkbox.value.toLowerCase();
            const count = colorCounts[color] || 0;
            const label = checkbox.nextSibling;
            label.textContent = `${label.textContent.trim().split(' ')[0]} (${count})`;
        });
    }

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
                <p class="mujer-product-name">${producto.nombre}</p>
                <p class="mujer-product-price">$${producto.precio.toLocaleString()}</p>
            `;
            mujerProductsGrid.appendChild(productoDiv);
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

        const selectedSort = Array.from(sortRadios)
            .find(radio => radio.checked)?.value || "";

        mostrarProductos(selectedCategory, selectedColors, selectedSizes, selectedSort);

        // Cerrar el filtro lateral después de aplicar
        filterOverlay.classList.remove('show');
        setTimeout(() => {
            filterOverlay.style.display = 'none';
        }, 300);
    });

    // Limpiar todos los filtros seleccionados
    clearFiltersButton.addEventListener
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
