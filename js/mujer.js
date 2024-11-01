
/*-------------FILTRO MUJER----------------*/


  /*---------------------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    const filterDropdownToggle = document.querySelector('.filter-dropdown-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');
  
    filterDropdownToggle.addEventListener('click', () => {
      filterDropdown.classList.toggle('show');
    });
  });
