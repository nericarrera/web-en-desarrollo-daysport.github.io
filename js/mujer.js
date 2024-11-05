
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    const filterButtons = document.querySelectorAll('.mujer-filter-button');
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');
    const applyFiltersButton = document.getElementById('apply-filters');

    const productosMujer = [
        {
            id: 1,
            nombre: "Remera Modal Soft",
            precio: 7500,
            categoria: "remeras",
            imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 1.jpeg",
            color: "celeste",
            talla: "XL",
            etiqueta: "nuevo"
        },
        {
            id: 2,
            nombre: "Remera Modal Soft",
            precio: 7500,
            categoria: "remeras",
            imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 2.jpeg",
            color: "Negro",
            talla: "L",
            etiqueta: "novedades"
        },
        // Añadir más productos según sea necesario
    ];

    // Función para mostrar los productos
    function mostrarProductos(categoria = "all", color = "", talla = "") {
        mujerProductsGrid.innerHTML = ""; // Limpiar el grid de productos

        const productosFiltrados = productosMujer.filter(producto => {
            const matchesCategoria = categoria === "all" || producto.categoria === categoria;
            const matchesColor = !color || producto.color === color;
            const matchesTalla = !talla || producto.talla === talla;
            return matchesCategoria && matchesColor && matchesTalla;
        });

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

    // Cambiar filtro por categoría
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const categoria = button.getAttribute('data-filter');
            mostrarProductos(categoria);
        });
    });

    // Mostrar y ocultar el menú de filtros adicionales
    filterDropdownToggle.addEventListener('click', () => {
        filterDropdown.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar el menú
    });

    // Aplicar filtros adicionales
    applyFiltersButton.addEventListener('click', () => {
        const selectedColor = document.getElementById('color').value;
        const selectedTalla = document.getElementById('talla').value;
        const activeCategoryButton = document.querySelector('.mujer-filter-button.active');
        const categoria = activeCategoryButton ? activeCategoryButton.getAttribute('data-filter') : "all";
        mostrarProductos(categoria, selectedColor, selectedTalla);
        filterDropdown.classList.remove('show'); // Ocultar el menú de filtros después de aplicar
    });

    // Mostrar todos los productos al cargar la página
    mostrarProductos();
});
  /*---------------------------------------------------------------------------- */


/*-------------------------FILTRO DESPLEGABLE------------------ */
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar y ocultar el filtro al hacer clic en el botón "Filtrar y Ordenar"
  const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
  const filterOverlay = document.querySelector('.filter-overlay');
  const closeFilterButton = document.querySelector('.close-filter');

  filterDropdownToggle.addEventListener('click', () => {
      filterOverlay.classList.add('show');
      filterOverlay.style.display = 'block';
  });

  closeFilterButton.addEventListener('click', () => {
      filterOverlay.classList.remove('show');
      setTimeout(() => {
          filterOverlay.style.display = 'none';
      }, 300);
  });

  // Cerrar el filtro al hacer clic fuera de la barra lateral
  filterOverlay.addEventListener('click', (e) => {
      if (e.target === filterOverlay) {
          filterOverlay.classList.remove('show');
          setTimeout(() => {
              filterOverlay.style.display = 'none';
          }, 300);
      }
  });

  // Configuración de secciones colapsables
  const collapsibleSections = document.querySelectorAll('.collapsible-section');

  collapsibleSections.forEach(section => {
      const toggleButton = section.querySelector('.collapsible-toggle');
      const content = section.querySelector('.collapsible-content');

      if (toggleButton) {
          toggleButton.addEventListener('click', () => {
              // Alterna la visibilidad del contenido
              content.classList.toggle('hidden');
              section.classList.toggle('active');

              // Cambiar el símbolo desplegable
              const symbol = toggleButton.querySelector('span');
              symbol.textContent = section.classList.contains('active') ? '▲' : '▼';
          });
      }
  });
});

  /*---------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    const collapsibleSections = document.querySelectorAll('.collapsible-section');

    collapsibleSections.forEach(section => {
        const toggleButton = section.querySelector('.collapsible-toggle');
        const content = section.querySelector('.collapsible-content');

        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                console.log("Clic detectado en:", toggleButton.textContent);
                content.classList.toggle('hidden');
                
                const symbol = toggleButton.querySelector('span');
                symbol.textContent = content.classList.contains('hidden') ? '▼' : '▲';
            });
        } else {
            console.error("No se encontró 'collapsible-toggle' en:", section);
        }
    });
});
