
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
  const mujerProductsGrid = document.querySelector('.mujer-products-grid');
  const filterButtons = document.querySelectorAll('.mujer-filter-button');
  const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
  const filterOverlay = document.querySelector('.filter-overlay');
  const closeFilterButton = document.querySelector('.close-filter');
  const applyFiltersButton = document.getElementById('apply-filters');
  const collapsibleSections = document.querySelectorAll('.collapsible-section');

  // Lista de productos de ejemplo
  const productosMujer = [
      { id: 1, nombre: "Remera Modal Soft", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 1.jpeg", color: "celeste", talla: "XL", etiqueta: "nuevo" },
      { id: 2, nombre: "Remera Modal Soft", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 2.jpeg", color: "negro", talla: "L", etiqueta: "novedades" },
      // Añade más productos si es necesario
  ];

  // Variables para filtros seleccionados
  let selectedCategory = "all";
  let selectedColor = "";
  let selectedTalla = "";

  // Función para mostrar productos filtrados
  function mostrarProductos(categoria = "all", color = "", talla = "") {
      mujerProductsGrid.innerHTML = ""; // Limpiar el grid de productos

      const productosFiltrados = productosMujer.filter(producto => {
          const matchesCategoria = categoria === "all" || producto.categoria === categoria;
          const matchesColor = !color || producto.color.toLowerCase() === color.toLowerCase();
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

  // Filtro horizontal: Cambiar categoría
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          selectedCategory = button.getAttribute('data-filter');
          mostrarProductos(selectedCategory, selectedColor, selectedTalla);
      });
  });

  // Mostrar y ocultar el modal de filtros adicionales
  if (filterDropdownToggle && filterOverlay) {
      filterDropdownToggle.addEventListener('click', () => {
          filterOverlay.classList.toggle('show');
          filterOverlay.style.display = filterOverlay.classList.contains('show') ? 'block' : 'none';
      });
  }

  // Cerrar el filtro lateral con el botón 'X' o al hacer clic fuera del modal
  if (closeFilterButton) {
      closeFilterButton.addEventListener('click', () => {
          filterOverlay.classList.remove('show');
          setTimeout(() => {
              filterOverlay.style.display = 'none';
          }, 300);
      });
  }
  if (filterOverlay) {
      filterOverlay.addEventListener('click', (e) => {
          if (e.target === filterOverlay) {
              filterOverlay.classList.remove('show');
              setTimeout(() => {
                  filterOverlay.style.display = 'none';
              }, 300);
          }
      });
  }

  // Aplicar filtros adicionales al hacer clic en el botón "Aplicar filtros"
  if (applyFiltersButton) {
      applyFiltersButton.addEventListener('click', () => {
          const selectedOrder = document.querySelector('input[name="sort"]:checked')?.value;
          selectedColor = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.value)[0] || "";
          selectedTalla = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(cb => cb.value)[0] || "";

          // Ordenar los productos si es necesario
          if (selectedOrder === 'price-asc') {
              productosMujer.sort((a, b) => a.precio - b.precio);
          } else if (selectedOrder === 'price-desc') {
              productosMujer.sort((a, b) => b.precio - a.precio);
          }

          mostrarProductos(selectedCategory, selectedColor, selectedTalla); // Mostrar productos filtrados
          filterOverlay.classList.remove('show'); // Cerrar el modal de filtro
          setTimeout(() => {
              filterOverlay.style.display = 'none';
          }, 300);
      });
  }

  // Configuración de las secciones colapsables en el modal
  collapsibleSections.forEach((section) => {
      const toggleButton = section.querySelector('.collapsible-toggle');
      const content = section.querySelector('.collapsible-content');

      toggleButton.addEventListener('click', () => {
          content.classList.toggle('hidden');
          const symbol = toggleButton.querySelector('span');
          symbol.textContent = content.classList.contains('hidden') ? '▼' : '▲';
      });
  });

  // Mostrar todos los productos al cargar la página
  mostrarProductos();
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
                symbol.textContent = content.style.display === 'none' ? '▼' : '▲';
                console.log(`Contenido de la sección ${index + 1} ahora está ${content.style.display === 'none' ? 'oculto' : 'visible'}`);
            });
        } else {
            console.warn(`Faltan elementos (toggle o contenido) en la sección de filtro número ${index + 1}.`);
        }
    });

    console.log("Scripts cargados correctamente. Verifica si el filtro funciona como se espera.");
});

/*----------------FILTRO DESPLEGABLE--------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const mujerProductsGrid = document.querySelector('.mujer-products-grid');
  const filterButtons = document.querySelectorAll('.mujer-filter-button');
  const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
  const filterOverlay = document.querySelector('.filter-overlay');
  const closeFilterButton = document.querySelector('.close-filter');
  const applyFiltersButton = document.getElementById('apply-filters');
  const collapsibleSections = document.querySelectorAll('.collapsible-section');

  // Mostrar/Ocultar el modal de filtro al hacer clic en "FILTRAR Y ORDENAR"
  if (filterDropdownToggle && filterOverlay) {
      filterDropdownToggle.addEventListener('click', () => {
          filterOverlay.classList.toggle('show');
          filterOverlay.style.display = filterOverlay.classList.contains('show') ? 'block' : 'none';
      });
  }

  // Cerrar el modal de filtro al hacer clic en la 'X' o al hacer clic fuera del modal
  if (closeFilterButton) {
      closeFilterButton.addEventListener('click', () => {
          filterOverlay.classList.remove('show');
          setTimeout(() => {
              filterOverlay.style.display = 'none';
          }, 300);
      });
  }
  if (filterOverlay) {
      filterOverlay.addEventListener('click', (e) => {
          if (e.target === filterOverlay) {
              filterOverlay.classList.remove('show');
              setTimeout(() => {
                  filterOverlay.style.display = 'none';
              }, 300);
          }
      });
  }

  // Configuración de secciones colapsables dentro del modal
  collapsibleSections.forEach((section) => {
      const toggleButton = section.querySelector('.collapsible-toggle');
      const content = section.querySelector('.collapsible-content');
      toggleButton.addEventListener('click', () => {
          content.classList.toggle('hidden');
          const symbol = toggleButton.querySelector('span');
          symbol.textContent = content.classList.contains('hidden') ? '▼' : '▲';
      });
  });

  // Función para aplicar filtros (simple ejemplo)
  applyFiltersButton.addEventListener('click', () => {
      // Puedes agregar la lógica de filtros aquí si lo necesitas
      filterOverlay.classList.remove('show');
      setTimeout(() => {
          filterOverlay.style.display = 'none';
      }, 300);
  });
});