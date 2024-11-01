
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', () => {
    // Array de productos para la sección 'Mujer'
    const products = [
        {
            id: 1,
            name: "Campera Negra",
            price: 15000,
            talla: "M",
            color: "negro",
            categoria: "camperas",
            imageUrl: "img/mujer/campera1.jpg",
            status: "nuevo"
        },
        {
            id: 2,
            name: "Remera Blanca",
            price: 5000,
            talla: "S",
            color: "blanco",
            categoria: "remeras",
            imageUrl: "img/mujer/remera1.jpg",
            status: "nuevo"
        },
        // Agrega más productos con las propiedades necesarias
    ];

    const productsGrid = document.querySelector('.products-grid');
    const filterButtons = document.querySelectorAll('.filter-button');

    // Función para mostrar productos según la categoría
    function displayProducts(filter) {
        productsGrid.innerHTML = ''; // Limpiar productos actuales

        const filteredProducts = products.filter(product => {
            return filter === 'all' || product.categoria === filter || (filter === 'novedades' && product.status === 'nuevo');
        });

        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-card');
            productDiv.setAttribute('data-color', product.color);
            productDiv.setAttribute('data-talla', product.talla);
            productDiv.setAttribute('data-category', product.categoria);

            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <p>${product.name}</p>
                <p>$${product.price.toLocaleString()}</p>
            `;

            // Redirige a la página de producto al hacer clic en el producto
            productDiv.addEventListener('click', () => {
                window.location.href = `index-producto.html?id=${product.id}`;
            });

            productsGrid.appendChild(productDiv);
        });
    }

    // Mostrar todos los productos al cargar la página
    displayProducts('all');

    // Configurar el filtro de categorías
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            displayProducts(filter);
        });
    });
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
