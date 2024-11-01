
/*-------------FILTRO MUJER----------------*/
document.addEventListener('DOMContentLoaded', function() {
    // Array de productos específicos para la sección Mujer
    const productosMujer = [
      {
        id: 1,
        name: "Remera modal viscosa con cuello en V",
        price: 7500,
        gender: "mujer",
        category: "remeras",
        images: ["img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 2.jpeg"],
        colors: ["Rosa", "Gris", "Negro"],
        status: "Nuevo",
        sizes: ["S", "M", "L", "XL", "XXL"]
      },
      {
        id: 2,
        name: "Campera Rompeviento Puma",
        price: 35000,
        gender: "mujer",
        category: "camperas",
        images: ["img/mujer/campera-rompeviento/campera-rompeviento-puma.jpeg"],
        colors: ["Negro", "Rosa"],
        status: "",
        sizes: ["S", "M", "L", "XL"]
      },
      // Puedes seguir añadiendo productos de la misma forma
    ];
  
    // Seleccionar el contenedor de productos de mujer
    const productsGridMujer = document.querySelector('.mujer-products-grid');
  
    // Función para mostrar los productos en la cuadrícula
    function displayProductsMujer(products) {
      productsGridMujer.innerHTML = ''; // Limpiar productos existentes
  
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'mujer-product-card';
        productDiv.setAttribute('data-id', product.id);
        productDiv.setAttribute('data-price', product.price);
        productDiv.setAttribute('data-gender', product.gender);
        productDiv.setAttribute('data-category', product.category);
        productDiv.setAttribute('data-color', product.colors.join(','));
        productDiv.setAttribute('data-size', product.sizes.join(','));
  
        // Imagen principal
        const mainImage = document.createElement('img');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        mainImage.className = 'mujer-product-image';
  
        // Redirige a la página de producto cuando se haga clic en la imagen principal
        mainImage.addEventListener('click', function() {
            window.location.href = `index-producto.html?id=${product.id}`;
        });
  
        // Precio
        const productPrice = document.createElement('p');
        productPrice.className = 'mujer-product-price';
        productPrice.textContent = `$${product.price.toLocaleString()}`;
  
        // Nombre del producto
        const productName = document.createElement('p');
        productName.className = 'mujer-product-name';
        productName.textContent = product.name;
  
        // Añadir elementos al contenedor del producto
        productDiv.appendChild(mainImage);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productName);
  
        // Añadir el producto a la cuadrícula
        productsGridMujer.appendChild(productDiv);
      });
    }
  
    // Mostrar todos los productos al cargar la página
    displayProductsMujer(productosMujer);
  });

  /*---------------------------------------------------------------------------- */
