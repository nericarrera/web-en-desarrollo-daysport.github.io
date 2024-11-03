
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    const filterButtons = document.querySelectorAll('.mujer-filter-button');
  
    // Array de productos para la sección Mujer
    const productosMujer = [
      {
        id: 1,
        nombre: "Buzo Deportivo",
        precio: 15000,
        categoria: "buzos",
        imagen: "img/mujer/buzo-deportivo.jpg",
        etiqueta: "nuevo"
      },
      {
        id: 2,
        nombre: "Calzas de Entrenamiento",
        precio: 12000,
        categoria: "calzas",
        imagen: "img/mujer/calzas-entrenamiento.jpg",
        etiqueta: "novedades"
      },
      // Añade más productos con el formato adecuado
    ];
  
    // Función para mostrar los productos
    function mostrarProductos(categoria = "all") {
      mujerProductsGrid.innerHTML = ""; // Limpiar contenedor
  
      const productosFiltrados = categoria === "all"
        ? productosMujer
        : productosMujer.filter(producto => producto.categoria === categoria);
  
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
  
    // Evento de filtro por categoría
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const categoria = button.getAttribute('data-filter');
        mostrarProductos(categoria);
      });
    });
  
    // Mostrar todos los productos al cargar la página
    mostrarProductos();
  });
  /*---------------------------------------------------------------------------- */

  /*---------------------MENU DESPLEGABLE FILTRAR Y ORDENAR---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');

    // Toggle del menú desplegable de filtros adicionales
    filterDropdownToggle.addEventListener('click', () => {
        filterDropdown.classList.toggle('show');
    });

    // Aplicar filtros adicionales
    const applyFilters = () => {
        const selectedColor = document.getElementById('color').value;
        const selectedTalla = document.getElementById('talla').value;
        
        document.querySelectorAll('.product-card').forEach(product => {
            const productColor = product.getAttribute('data-color');
            const productTalla = product.getAttribute('data-talla');

            // Comprobar si el producto coincide con los filtros seleccionados
            const matchesColor = selectedColor === "" || productColor === selectedColor;
            const matchesTalla = selectedTalla === "" || productTalla === selectedTalla;

            if (matchesColor && matchesTalla) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    };

    // Aplicar los filtros al cambiar la selección
    document.getElementById('color').addEventListener('change', applyFilters);
    document.getElementById('talla').addEventListener('change', applyFilters);
});

  /*-------------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');
  
    filterDropdownToggle.addEventListener('click', () => {
      filterDropdown.classList.toggle('show');
    });
  });
