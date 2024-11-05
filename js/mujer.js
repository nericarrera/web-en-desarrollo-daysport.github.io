
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
  const mujerProductsGrid = document.querySelector('.mujer-products-grid');
  const filterButtons = document.querySelectorAll('.mujer-filter-button');
  const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
  const filterOverlay = document.querySelector('.filter-overlay');
  const closeFilterButton = document.querySelector('.close-filter');
  const applyFiltersButton = document.getElementById('apply-filters');
  const collapsibleSections = document.querySelectorAll('.collapsible-section');

  // Productos de ejemplo
  const productosMujer = [
      { id: 1, nombre: "Remera Modal Soft", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 1.jpeg", color: "celeste", talla: "XL", etiqueta: "nuevo" },
      { id: 2, nombre: "Remera Modal Soft", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 2.jpeg", color: "negro", talla: "L", etiqueta: "novedades" },
      // Añadir más productos si es necesario
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

 