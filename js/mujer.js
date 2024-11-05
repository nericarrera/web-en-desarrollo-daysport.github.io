
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
  const mujerProductsGrid = document.querySelector('.mujer-products-grid');
  const filterButtons = document.querySelectorAll('.mujer-filter-button');
  const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
  const filterOverlay = document.querySelector('.filter-overlay');
  const closeFilterButton = document.querySelector('.close-filter');
  const applyFiltersButton = document.getElementById('apply-filters');
  const collapsibleSections = document.querySelectorAll('.collapsible-section');

  const productosMujer = [
      { id: 1, nombre: "Remera Modal Soft", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 1.jpeg", color: "celeste", talla: "XL", etiqueta: "nuevo" },
      { id: 2, nombre: "Remera Modal Soft", precio: 7500, categoria: "remeras", imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 2.jpeg", color: "Negro", talla: "L", etiqueta: "novedades" },
  ];

  // Función para mostrar productos
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

  // Cerrar el filtro al hacer clic fuera de la barra lateral
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

  // Configuración de las secciones colapsables
  collapsibleSections.forEach((section, index) => {
      const toggleButton = section.querySelector('.collapsible-toggle');
      const content = section.querySelector('.collapsible-content');

      if (toggleButton && content) {
          toggleButton.addEventListener('click', () => {
              content.classList.toggle('hidden');
              const symbol = toggleButton.querySelector('span');
              symbol.textContent = content.classList.contains('hidden') ? '▼' : '▲';
          });
      } else {
          console.warn(`No se encontraron los elementos completos (toggle y contenido) en la sección de filtro número ${index + 1}.`);
      }
  });

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

          if (filterOverlay) {
              filterOverlay.classList.remove('show');
              setTimeout(() => {
                  filterOverlay.style.display = 'none';
              }, 300);
          }
      });
  } else {
      console.error("Botón de aplicar filtros no encontrado.");
  }

  // Verificación de elementos adicionales del filtro
  const elementosFiltro = document.querySelectorAll('.filter-options input');
  if (elementosFiltro.length === 0) {
      console.warn("Elementos de filtro adicional no encontrados. Verifica que los inputs de filtro estén correctamente definidos.");
  } else {
      elementosFiltro.forEach((elemento, index) => {
          console.log(`Elemento de filtro encontrado en posición ${index + 1}:`, elemento);
      });
  }

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
                content.classList.toggle('hidden'); // Alterna la visibilidad del contenido
                
                // Cambia el símbolo de despliegue (▲ o ▼)
                const symbol = toggleButton.querySelector('span');
                symbol.textContent = content.classList.contains('hidden') ? '▼' : '▲';
            });
        } else {
            console.warn(`No se encontraron los elementos completos (toggle y contenido) en la sección de filtro número ${index + 1}.`);
        }
    });

    console.log("Scripts cargados correctamente. Verifica si el filtro funciona como se espera.");
});