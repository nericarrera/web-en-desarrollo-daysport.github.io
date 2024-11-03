
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
    const filterOverlay = document.querySelector('.filter-overlay');
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const closeFilterButton = document.querySelector('.close-filter');
    const applyFiltersButton = document.getElementById('apply-filters');
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');

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
        // Agrega más productos según sea necesario
    ];

    // Función para mostrar los productos filtrados
    function mostrarProductos(categoria = "all", color = "", talla = "") {
        mujerProductsGrid.innerHTML = "";
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

    // Mostrar y ocultar el filtro lateral
    filterDropdownToggle.addEventListener('click', () => {
        filterOverlay.classList.toggle('show');
        filterOverlay.style.display = filterOverlay.classList.contains('show') ? 'block' : 'none';
    });

    // Cerrar el filtro al hacer clic en el botón de cerrar o fuera del área de filtro
    closeFilterButton.addEventListener('click', () => {
        filterOverlay.classList.remove('show');
        setTimeout(() => {
            filterOverlay.style.display = 'none';
        }, 300);
    });

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
        
        toggleButton.addEventListener('click', () => {
            content.classList.toggle('hidden');
            toggleButton.querySelector('span').textContent = content.classList.contains('hidden') ? '▼' : '▲';
        });
    });

    // Aplicar filtros al hacer clic en "Aplicar"
    applyFiltersButton.addEventListener('click', () => {
        const selectedColor = document.querySelector('[name="color"]:checked')?.value || "";
        const selectedTalla = document.querySelector('[name="size"]:checked')?.value || "";
        mostrarProductos("all", selectedColor, selectedTalla);
        filterOverlay.classList.remove('show');
        setTimeout(() => {
            filterOverlay.style.display = 'none';
        }, 300);
    });

    // Mostrar todos los productos al cargar la página
    mostrarProductos();
});

  /*---------------------------------------------------------------------------- */


/*-------------------------FILTRO DESPLEGABLE------------------ */
document.addEventListener('DOMContentLoaded', () => {
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterOverlay = document.querySelector('.filter-overlay');
    const closeFilterButton = document.querySelector('.close-filter');
  
    // Mostrar el filtro en el lado derecho al hacer clic en "Filtrar y Ordenar"
    filterDropdownToggle.addEventListener('click', () => {
      filterOverlay.classList.add('show');
      filterOverlay.style.display = 'block';
    });
  
    // Cerrar el filtro al hacer clic en el botón de cerrar
    closeFilterButton.addEventListener('click', () => {
      filterOverlay.classList.remove('show');
      setTimeout(() => {
        filterOverlay.style.display = 'none';
      }, 300); // Espera el tiempo de la transición antes de ocultar
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
  });

  /*-------------FILTRO OPCIONES DESPLEGABLES-------------*/
  document.addEventListener('DOMContentLoaded', () => {
    const collapsibleSections = document.querySelectorAll('.collapsible-section');
  
    collapsibleSections.forEach(section => {
      const toggleButton = section.querySelector('.collapsible-toggle');
      const content = section.querySelector('.collapsible-content');
  
      if (toggleButton) { // Verificamos si toggleButton existe
        toggleButton.addEventListener('click', () => {
          section.classList.toggle('active'); // Alterna la clase "active" en la sección
  
          // Cambiar el símbolo de desplegar/cerrar
          const symbol = toggleButton.querySelector('span');
          symbol.textContent = section.classList.contains('active') ? '▲' : '▼';
        });
      } else {
        console.error("Elemento 'collapsible-toggle' no encontrado en:", section);
      }
    });
  });
  