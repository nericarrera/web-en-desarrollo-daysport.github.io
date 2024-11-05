
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
  const mujerProductsGrid = document.querySelector('.mujer-products-grid');
  const filterButtons = document.querySelectorAll('.mujer-filter-button');
  const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
  const filterDropdown = document.querySelector('.filter-dropdown');
  const applyFiltersButton = document.getElementById('apply-filters');
  const filterOverlay = document.querySelector('.filter-overlay');

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

  // Mostrar todos los productos al cargar la página
  mostrarProductos();
});
  /*---------------------------------------------------------------------------- */


/*-------------------------FILTRO DESPLEGABLE------------------ */
document.addEventListener('DOMContentLoaded', () => {
  // Selección de elementos y verificación de su existencia antes de usarlos
  const filterOverlay = document.querySelector('.filter-overlay');
  const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
  const closeFilterButton = document.querySelector('.close-filter');
  const applyFiltersButton = document.getElementById('apply-filters');
  const mujerProductsGrid = document.querySelector('.mujer-products-grid');

  if (filterDropdownToggle && filterOverlay) {
      // Mostrar el filtro en el lado derecho
      filterDropdownToggle.addEventListener('click', () => {
          filterOverlay.classList.add('show');
          filterOverlay.style.display = 'block';
      });
  }

  if (closeFilterButton) {
      // Cerrar el filtro al hacer clic en el botón de cerrar
      closeFilterButton.addEventListener('click', () => {
          filterOverlay.classList.remove('show');
          setTimeout(() => {
              filterOverlay.style.display = 'none';
          }, 300);
      });
  }

  if (filterOverlay) {
      // Cerrar el filtro al hacer clic fuera de la barra lateral
      filterOverlay.addEventListener('click', (e) => {
          if (e.target === filterOverlay) {
              filterOverlay.classList.remove('show');
              setTimeout(() => {
                  filterOverlay.style.display = 'none';
              }, 300);
          }
      });
  }

  // Funcionalidad de secciones colapsables
  const collapsibleSections = document.querySelectorAll('.collapsible-section');

  collapsibleSections.forEach(section => {
      const toggleButton = section.querySelector('.collapsible-toggle');
      const content = section.querySelector('.collapsible-content');

      if (toggleButton && content) {
          toggleButton.addEventListener('click', () => {
              section.classList.toggle('active');
              content.classList.toggle('hidden');

              // Cambiar el símbolo de desplegar/cerrar
              const symbol = toggleButton.querySelector('span');
              symbol.textContent = section.classList.contains('active') ? '▲' : '▼';
          });
      } else {
          console.error("Elemento 'collapsible-toggle' o 'collapsible-content' no encontrado en la sección:", section);
      }
  });

  // Aplicar filtros al hacer clic en "Aplicar"
  if (applyFiltersButton) {
      applyFiltersButton.addEventListener('click', () => {
          const selectedColor = document.querySelector('[name="color"]:checked')?.value || "";
          const selectedTalla = document.querySelector('[name="size"]:checked')?.value || "";
          mostrarProductos("all", selectedColor, selectedTalla);
          filterOverlay.classList.remove('show');
          setTimeout(() => {
              filterOverlay.style.display = 'none';
          }, 300);
      });
  }
});

// Función para mostrar productos (asegúrate de tenerla en el código)
function mostrarProductos(categoria = "all", color = "", talla = "") {
  // Implementación de la lógica de filtrado y despliegue de productos
}
  /*---------------------------------------- */

  toggleButton.addEventListener('click', () => 
    { section.classList.toggle('active'); 
      content.classList.toggle('hidden'); 
      console.log('Sección activa:', section.classList.contains('active')); 
      console.log('Contenido oculto:', content.classList.contains('hidden')); 
    });