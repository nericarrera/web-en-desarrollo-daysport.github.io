
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');
    const products = document.querySelectorAll('.product-card');
  
    // Alternar la visibilidad del menú desplegable
    filterDropdownToggle.addEventListener('click', () => {
      filterDropdown.classList.toggle('show');
    });
  
    // Filtrar productos al cambiar los filtros
    filterDropdown.addEventListener('change', applyFilters);
  
    function applyFilters() {
      const selectedColor = document.getElementById('color').value;
      const selectedTalla = document.getElementById('talla').value;
  
      products.forEach(product => {
        const productColor = product.getAttribute('data-color');
        const productTalla = product.getAttribute('data-talla');
  
        // Comprobamos si el producto coincide con los filtros seleccionados
        const matchesColor = selectedColor === "" || productColor === selectedColor;
        const matchesTalla = selectedTalla === "" || productTalla === selectedTalla;
  
        if (matchesColor && matchesTalla) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    }
  });
  /*---------------------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');
  
    filterDropdownToggle.addEventListener('click', () => {
      filterDropdown.classList.toggle('show');
    });
  });
