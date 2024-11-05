
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
  const mujerProductsGrid = document.querySelector('.mujer-products-grid');
  const filterButtons = document.querySelectorAll('.mujer-filter-button');
  const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
  const filterDropdown = document.querySelector('.filter-dropdown');
  const applyFiltersButton = document.getElementById('apply-filters');
  const filterOverlay = document.querySelector('.filter-overlay');
  const closeFilterButton = document.querySelector('.close-filter');

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
  if (filterDropdownToggle && filterDropdown) {
      filterDropdownToggle.addEventListener('click', () => {
          filterDropdown.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar el menú
      });
  } else {
      console.error("Elementos de filtro adicional no encontrados.");
  }

  // Aplicar filtros adicionales
  if (applyFiltersButton) {
      applyFiltersButton.addEventListener('click', () => {
          const selectedColorElement = document.getElementById('color');
          const selectedTallaElement = document.getElementById('talla');
          const selectedColor = selectedColorElement ? selectedColorElement.value : "";
          const selectedTalla = selectedTallaElement ? selectedTallaElement.value : "";

          const activeCategoryButton = document.querySelector('.mujer-filter-button.active');
          const categoria = activeCategoryButton ? activeCategoryButton.getAttribute('data-filter') : "all";
          mostrarProductos(categoria, selectedColor, selectedTalla);

          if (filterDropdown) filterDropdown.classList.remove('show'); // Ocultar el menú de filtros después de aplicar
      });
  } else {
      console.error("Botón de aplicar filtros no encontrado.");
  }

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

  filterOverlay.addEventListener('click', (e) => {
      if (e.target === filterOverlay) {
          filterOverlay.classList.remove('show');
          setTimeout(() => {
              filterOverlay.style.display = 'none';
          }, 300);
      }
  });

  // Habilitar colapsables en secciones del filtro
  const collapsibleSections = document.querySelectorAll('.collapsible-section');
  collapsibleSections.forEach(section => {
      const toggleButton = section.querySelector('.collapsible-toggle');
      const content = section.querySelector('.collapsible-content');
      
      if (toggleButton && content) {
          toggleButton.addEventListener('click', () => {
              content.classList.toggle('hidden');
              const symbol = toggleButton.querySelector('span');
              symbol.textContent = content.classList.contains('hidden') ? '▼' : '▲';
          });
      }
  });

  // Mostrar todos los productos al cargar la página
  mostrarProductos();
});
  /*---------------------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    const filterButtons = document.querySelectorAll('.mujer-filter-button');
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterOverlay = document.querySelector('.filter-overlay');
    const closeFilterButton = document.querySelector('.close-filter');
    const applyFiltersButton = document.getElementById('apply-filters');
    const collapsibleSections = document.querySelectorAll('.collapsible-section');

    if (!filterDropdownToggle) console.error("Elemento '.filter-dropdown-toggle' no encontrado.");
    if (!filterOverlay) console.error("Elemento '.filter-overlay' no encontrado.");
    if (!closeFilterButton) console.error("Elemento '.close-filter' no encontrado.");
    if (!applyFiltersButton) console.error("Elemento '#apply-filters' no encontrado.");
    if (collapsibleSections.length === 0) console.warn("Secciones colapsables no encontradas.");

    // Mostrar y ocultar el menú lateral
    filterDropdownToggle?.addEventListener('click', () => {
        filterOverlay.classList.add('show');
        filterOverlay.style.display = 'block';
    });

    closeFilterButton?.addEventListener('click', () => {
        filterOverlay.classList.remove('show');
        setTimeout(() => {
            filterOverlay.style.display = 'none';
        }, 300);
    });

    filterOverlay?.addEventListener('click', (e) => {
        if (e.target === filterOverlay) {
            filterOverlay.classList.remove('show');
            setTimeout(() => {
                filterOverlay.style.display = 'none';
            }, 300);
        }
    });

    // Secciones colapsables en el filtro
    collapsibleSections.forEach(section => {
        const toggleButton = section.querySelector('.collapsible-toggle');
        const content = section.querySelector('.collapsible-content');
        
        if (toggleButton && content) {
            toggleButton.addEventListener('click', () => {
                content.classList.toggle('hidden');
                const symbol = toggleButton.querySelector('span');
                symbol.textContent = content.classList.contains('hidden') ? '▼' : '▲';
            });
        } else {
            console.warn("Sección colapsable o contenido no encontrado en:", section);
        }
    });

    console.log("Se cargaron los scripts correctamente. Verifica si el filtro funciona como se espera.");
});

/*-------------------------FILTRO DESPLEGABLE------------------ */

  /*---------------------------------------- */

 