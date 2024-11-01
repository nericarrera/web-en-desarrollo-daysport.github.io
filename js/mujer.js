
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', function() {
    // Array de productos específicos para la sección Mujer
    const products = [
      {
        id: 1,
        name: "Calza Deportiva Mujer",
        price: 7000,
        category: "calzas",
        images: ["img/mujer/calza1.jpg"],
        colors: ["Negro", "Rosa"],
        sizes: ["S", "M", "L"],
        status: "Nuevo"
      },
      {
        id: 2,
        name: "Remera Deportiva Mujer",
        price: 4500,
        category: "remeras",
        images: ["img/mujer/remera1.jpg"],
        colors: ["Blanco", "Gris"],
        sizes: ["M", "L", "XL"],
        status: ""
      },
      // Añade más productos según sea necesario
    ];
  
    // Elemento donde se mostrarán los productos
    const productsGrid = document.querySelector('.products-grid');
  
    // Función para mostrar los productos
    function displayProducts(productsToShow) {
      productsGrid.innerHTML = ''; // Limpiar el grid antes de mostrar los productos
  
      productsToShow.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.setAttribute('data-id', product.id);
        productDiv.setAttribute('data-category', product.category);
        productDiv.setAttribute('data-price', product.price);
        productDiv.setAttribute('data-color', product.colors.join(','));
        productDiv.setAttribute('data-size', product.sizes.join(','));
  
        // Imagen principal del producto
        const mainImage = document.createElement('img');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        mainImage.className = 'product-image';
  
        // Redirige a la página de producto cuando se hace clic en la imagen principal
        mainImage.addEventListener('click', function() {
          window.location.href = `index-producto.html?id=${product.id}`;
        });
  
        // Nombre del producto
        const productName = document.createElement('p');
        productName.className = 'product-name';
        productName.textContent = product.name;
  
        // Precio del producto
        const productPrice = document.createElement('p');
        productPrice.className = 'product-price';
        productPrice.textContent = `$${product.price.toLocaleString()}`;
  
        // Añadir los elementos al contenedor del producto
        productDiv.appendChild(mainImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
  
        productsGrid.appendChild(productDiv);
      });
    }
  
    // Mostrar los productos al cargar la página
    displayProducts(products);
  
    // Función para aplicar filtros (por ahora solo filtra por categoría, se pueden añadir más)
    function applyFilters() {
      const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
      let filteredProducts = products;
  
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
      }
  
      displayProducts(filteredProducts);
    }
  
    // Escuchar cambios en los filtros y aplicar los filtros
    document.querySelectorAll('input[name="category"]').forEach(input => {
      input.addEventListener('change', applyFilters);
    });
  });

  /*---------------------------------------------------------------------------- */
