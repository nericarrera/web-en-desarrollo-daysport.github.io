
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    const filterButtons = document.querySelectorAll('.mujer-filter-button');
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');
    const applyFiltersButton = document.getElementById('apply-filters');
  
    // Array de productos para la sección Mujer
    const productosMujer = [
      {
        id: 1,
        nombre: "Remera Modal Soft",
        precio: 7500,
        categoria: "remeras",
        imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 1.jpg",
        color: "celeste",
        talla: "XL",
        etiqueta: "nuevo"
      },
      {
        id: 2,
        nombre: "Remera Modal Soft",
        precio: 7500,
        categoria: "remeras",
        imagen: "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 2.jpg",
        color: "Negro",
        talla: "L",
        etiqueta: "novedades"
      },
      // Añade más productos
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
      filterDropdown.classList.toggle('show');
    });
  
    // Aplicar filtros adicionales
    applyFiltersButton.addEventListener('click', () => {
      const selectedColor = document.getElementById('color').value;
      const selectedTalla = document.getElementById('talla').value;
      const activeCategoryButton = document.querySelector('.mujer-filter-button.active');
      const categoria = activeCategoryButton ? activeCategoryButton.getAttribute('data-filter') : "all";
      mostrarProductos(categoria, selectedColor, selectedTalla);
      filterDropdown.classList.remove('show'); // Ocultar el menú de filtros
    });
  
    // Mostrar todos los productos al cargar la página
    mostrarProductos();
  });
  /*---------------------------------------------------------------------------- */

  /*---------------------MENU DESPLEGABLE FILTRAR Y ORDENAR---------- */
 
