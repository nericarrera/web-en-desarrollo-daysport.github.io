/*--------BANNER--------*/

let currentIndex = 0;
const track = document.querySelector('.banner-track');
const slides = document.querySelectorAll('.banner-slide');

function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(changeSlide, 25000);  // Cambia cada 25 segundos

/*-------------BANNER---------------*/

/*-----flechas para mover las cards - 1er seccion------- */

const cardWrapper = document.querySelector('.card-wrapper');
const nextArrow = document.getElementById('nextArrow');
const prevArrow = document.getElementById('prevArrow');

let scrollAmount = 0;
const scrollStep = 200; // Ajusta este valor según sea necesario

function updateDimensions() {
    containerWidth = cardWrapper.offsetWidth;
    totalScrollWidth = cardWrapper.scrollWidth;
    maxScrollAmount = totalScrollWidth - containerWidth;
}

updateDimensions(); // Inicializa las dimensiones

nextArrow.addEventListener('click', function(event) {
    event.preventDefault();
    scrollAmount += scrollStep;
    if (scrollAmount > maxScrollAmount) {
        scrollAmount = maxScrollAmount;
    }
    cardWrapper.style.transform = `translateX(-${scrollAmount}px)`;
});

prevArrow.addEventListener('click', function(event) {
    event.preventDefault();
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    cardWrapper.style.transform = `translateX(-${scrollAmount}px)`;
});

window.addEventListener('load', updateDimensions);
// Asegúrate de llamar a updateDimensions si se agregan o eliminan tarjetas dinámicamente
window.addEventListener('resize', updateDimensions); // Recalcula en caso de cambio de tamaño de ventana


/*------------CARRITO------------*/

// Variables globales para el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Cargar carrito desde LocalStorage
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');

// Mostrar u ocultar el carrito al hacer clic en el ícono del carrito
cartIcon.addEventListener('click', () => {
  if (cart.length === 0) {
      alert("El carrito está vacío.");
  } else {
      cartDropdown.classList.toggle('cart-dropdown-hidden');  // Mostrar/ocultar el carrito
  }
});

// Actualizar la interfaz del carrito
function updateCart() {
  cartItemsList.innerHTML = '';  // Limpiar la lista del carrito
  let total = 0;

  // Si no hay productos en el carrito
  if (cart.length === 0) {
      cartItemsList.innerHTML = '<p>El carrito está vacío.</p>';
  } else {
      cart.forEach((item, index) => {
          total += parseFloat(item.price);
          const li = document.createElement('li');
          li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Eliminar</button>`;
          cartItemsList.appendChild(li);
      });
  }

  cartCount.innerText = cart.length;  // Actualizar el contador
  cartTotal.innerText = `$${total.toFixed(2)}`;  // Mostrar el total
  localStorage.setItem('cart', JSON.stringify(cart));  // Guardar el carrito en LocalStorage
}

// Añadir productos al carrito
function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  updateCart();
  alert('Producto añadido al carrito!');
}

// Eliminar productos del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();  // Actualizar la lista de productos en el carrito
}

// Enlazar los botones de "Agregar al carrito" para cada producto
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
      const productName = e.target.getAttribute('data-product');
      const productPrice = e.target.getAttribute('data-price');
      addToCart(productName, productPrice);
  });
});

// Cargar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  updateCart();  // Actualizar el carrito al cargar la página
});

/*-------------CARRITO-----------------*/

/*-------------FUNCION DE FILTRO------------*/
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  const products = document.querySelectorAll('.product');

  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();

    products.forEach(product => {
      const productName = product.getAttribute('data-name').toLowerCase();
      const productGender = product.getAttribute('data-gender').toLowerCase();
      const productCategory = product.getAttribute('data-category').toLowerCase();

      if (productName.includes(searchTerm) || productGender.includes(searchTerm) || productCategory.includes(searchTerm)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterProducts);
});



document.addEventListener('DOMContentLoaded', function() {
  const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
  const priceRange = document.getElementById('price');
  const priceValue = document.getElementById('price-value');
  const products = document.querySelectorAll('.product');
  const menuLinks = document.querySelectorAll('.menu-li-a, .submenu-item a');
  const searchInput = document.getElementById('search');
  const clearFiltersButton = document.getElementById('clear-filters');

  // Función para asignar eventos a los botones
  function assignButtonEvents() {
    const agregarButtons = document.querySelectorAll('.btn-agregar-filtro');
    const comprarButtons = document.querySelectorAll('.btn-comprar-filtro');

    agregarButtons.forEach(button => {
      button.removeEventListener('click', handleAddToCart);  // Remover eventos antiguos
      button.addEventListener('click', handleAddToCart);
    });

    comprarButtons.forEach(button => {
      button.removeEventListener('click', handleBuyNow);  // Remover eventos antiguos
      button.addEventListener('click', handleBuyNow);
    });
  }

  // Funciones para manejar clics
  function handleAddToCart() {
    alert('Producto agregado al carrito');
  }

  function handleBuyNow() {
    alert('Producto comprado');
  }

  function filterProducts() {
    const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(cb => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const selectedPrice = parseInt(document.getElementById('price').value);

    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productGender = product.getAttribute('data-gender');
        const productCategory = product.getAttribute('data-category');
        const productPrice = parseInt(product.getAttribute('data-price')) || 0;

        const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(productGender);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
        const priceMatch = productPrice <= selectedPrice;

        if (genderMatch && categoryMatch && priceMatch) {
            product.style.display = 'block';  // Mostrar producto
        } else {
            product.style.display = 'none';   // Ocultar producto
        }
    });
}

// Escuchar los cambios en los filtros
document.querySelectorAll('input[name="gender"], input[name="category"], #price').forEach(input => {
    input.addEventListener('change', filterProducts);
});

// Llamar a filterProducts al cargar la página para mostrar los productos iniciales
document.addEventListener('DOMContentLoaded', filterProducts);


/*-------------FUNCION DE FILTRO------------*/

/*-------------FUNCION LIMPIAR FILTRO------------*/

  // Función para limpiar filtros
  function clearFilters() {
    genderCheckboxes.forEach(checkbox => checkbox.checked = false);
    categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
    sizeCheckboxes.forEach(checkbox => checkbox.checked = false);
    priceRange.value = priceRange.max;
    priceValue.textContent = `$${priceRange.value}`;
    if (searchInput) searchInput.value = '';
    filterProducts();
  }

  // Escuchar los cambios en los filtros
  genderCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  categoryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  sizeCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  priceRange.addEventListener('input', function() {
    priceValue.textContent = `$${priceRange.value}`;
    filterProducts();
  });
  if (searchInput) searchInput.addEventListener('input', filterProducts);
  clearFiltersButton.addEventListener('click', clearFilters);

  // Filtrar productos al hacer clic en los enlaces del menú
  menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const filterValue = link.getAttribute('data-filter');
      if (filterValue) {
        document.querySelector(`input[value="${filterValue}"]`).checked = true;
        filterProducts();
      }
    });
  });

  // Inicializar mostrando todos los productos
  filterProducts();
});



document.addEventListener('DOMContentLoaded', function() {
  const filters = document.querySelectorAll('.filter-option input');
  const clearButton = document.getElementById('clear-filters');
  const productCards = document.querySelectorAll('.product');

  filters.forEach(filter => {
    filter.addEventListener('change', updateFilters);
  });

  clearButton.addEventListener('click', clearFilters);

  function updateFilters() {
    const selectedFilters = Array.from(filters)
      .filter(filter => filter.checked)
      .map(filter => filter.value);

    productCards.forEach(card => {
      const cardGender = card.getAttribute('data-gender');
      const cardCategory = card.getAttribute('data-category');

      if (selectedFilters.includes(cardGender) || selectedFilters.includes(cardCategory)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function clearFilters() {
    filters.forEach(filter => {
      filter.checked = false;
    });
    productCards.forEach(card => {
      card.style.display = 'block';
    });
  }
});

/*-------------FUNCION LIMPIAR FILTRO------------*/

/*------------MINIATURAS PRODUCTO------------ */
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', function () {
    const mainImage = document.querySelector('.main-image');
    mainImage.src = this.src;  // Cambiar la imagen principal al hacer clic en la miniatura
  });
});

/*-------------FUNCION AGREGAR PRODUCTOS------------*/

document.addEventListener('DOMContentLoaded', function() {
  const products = [
    {
      id: 1,
      name: "OPT 4 INCH L",
      gender: "mujer",
      category: "training",
      price: 58999,
      image: "img/principal.jpg",  // Imagen principal
      thumbnails: [
        "img/color1.jpg",
        "img/color2.jpg",
        "img/color3.jpg"
      ],  // Miniaturas adicionales
      detailsPage: "product1.html"
    },
      { 
          id: 2, 
          name: "Remera Mujer", 
          gender: "mujer", 
          category: "remeras", 
          price: 2000, 
          image: "img/mujer/remera/remera1.jpg", 
          detailsPage: "product2.html" 
      },
      { 
        id: 3, 
        name: "Campera Hombre Liviana", 
        gender: "hombre", 
        category: "campera-liviana", 
        price: 3500, 
        image: "img/hombre/campera-liviana/campera1.jpg", 
        detailsPage: "product1.html"
    },
    { 
        id: 4, 
        name: "Remera Mujer", 
        gender: "mujer", 
        category: "remeras", 
        price: 2000, 
        image: "img/mujer/remera/remera1.jpg", 
        detailsPage: "product2.html" 
    },
      // Añade más productos según necesites...
  ];

   function displayProducts(productsToShow) {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = ''; // Limpiar el grid antes de agregar productos

        productsToShow.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.setAttribute('data-gender', product.gender);
            productDiv.setAttribute('data-category', product.category);
            productDiv.setAttribute('data-price', product.price);

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.addEventListener('click', () => {
                window.location.href = product.detailsPage;
            });

            const productInfo = document.createElement('div');
            productInfo.className = 'product-inf';

            const productName = document.createElement('p');
            productName.className = 'product-nombre';
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.className = 'product-precio';
            productPrice.textContent = `$${product.price.toLocaleString()}`;

            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'container-product-btn';

            const addButton = document.createElement('button');
            addButton.className = 'btn-agregar-filtro';
            addButton.textContent = 'Agregar';
            addButton.addEventListener('click', () => {
                addToCart(product.name, product.price);
            });

            const buyButton = document.createElement('button');
            buyButton.className = 'btn-comprar-filtro';
            buyButton.textContent = 'Comprar';
            buyButton.addEventListener('click', () => {
                window.location.href = product.detailsPage;
            });

            buttonsContainer.appendChild(addButton);
            buttonsContainer.appendChild(buyButton);

            productInfo.appendChild(productName);
            productInfo.appendChild(productPrice);
            productInfo.appendChild(buttonsContainer);

            productDiv.appendChild(img);
            productDiv.appendChild(productInfo);

            productsGrid.appendChild(productDiv);
        });
    }

    // Muestra todos los productos inicialmente
    displayProducts(products);

    function displayProducts(productsToShow) {
      const productsGrid = document.querySelector('.products-grid');
      productsGrid.innerHTML = ''; // Limpiar el grid antes de agregar productos

      productsToShow.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product';
          productDiv.setAttribute('data-gender', product.gender);
          productDiv.setAttribute('data-category', product.category);
          productDiv.setAttribute('data-price', product.price);

          const img = document.createElement('img');
          img.src = product.image;
          img.alt = product.name;
          img.addEventListener('click', () => {
              window.location.href = product.detailsPage;
          });

          const productInfo = document.createElement('div');
          productInfo.className = 'product-inf';

          const productName = document.createElement('p');
          productName.className = 'product-nombre';
          productName.textContent = product.name;

          const productPrice = document.createElement('p');
          productPrice.className = 'product-precio';
          productPrice.textContent = `$${product.price.toLocaleString()}`;

          const buttonsContainer = document.createElement('div');
          buttonsContainer.className = 'container-product-btn';

          const addButton = document.createElement('button');
          addButton.className = 'btn-agregar-filtro';
          addButton.textContent = 'Agregar';
          addButton.addEventListener('click', () => {
              addToCart(product.name, product.price);
          });

          const buyButton = document.createElement('button');
          buyButton.className = 'btn-comprar-filtro';
          buyButton.textContent = 'Comprar';
          buyButton.addEventListener('click', () => {
              window.location.href = product.detailsPage;
          });

          buttonsContainer.appendChild(addButton);
          buttonsContainer.appendChild(buyButton);

          productInfo.appendChild(productName);
          productInfo.appendChild(productPrice);
          productInfo.appendChild(buttonsContainer);

          productDiv.appendChild(img);
          productDiv.appendChild(productInfo);

          productsGrid.appendChild(productDiv);
      });
  }

  // Muestra todos los productos inicialmente
  displayProducts(products);

  /*-------------FUNCION AGREGAR PRODUCTOS------------*/

  /*-------------FUNCION FILTROS DE CRITERIOS------------*/

  // Filtrar productos al seleccionar criterios
  function filterProducts() {
      const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(cb => cb.value);
      const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
      const selectedPrice = parseInt(document.getElementById('price-range').value);

      const filteredProducts = products.filter(product => {
          const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(product.gender);
          const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
          const priceMatch = product.price <= selectedPrice;

          return genderMatch && categoryMatch && priceMatch;
      });

      displayProducts(filteredProducts);
  }

  // Escuchar cambios en los filtros
  document.querySelectorAll('input[name="gender"], input[name="category"], #price-range').forEach(input => {
      input.addEventListener('change', filterProducts);
  });

  // Filtrar productos al cargar la página
  filterProducts();
});

    // Filtrar productos al seleccionar criterios
    function filterProducts() {
        const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(cb => cb.value);
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
        const selectedPrice = parseInt(document.getElementById('price-range').value);

        const filteredProducts = products.filter(product => {
            const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(product.gender);
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const priceMatch = product.price <= selectedPrice;

            return genderMatch && categoryMatch && priceMatch;
        });

        displayProducts(filteredProducts);
    }

    // Escuchar cambios en los filtros
    document.querySelectorAll('input[name="gender"], input[name="category"], #price-range').forEach(input => {
        input.addEventListener('change', filterProducts);
    });




  // Resto del código (filtros y renderizado) permanece igual
  // Actualizar los filtros cuando se seleccionan los checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const filterType = this.name; // Puede ser 'gender', 'category', o 'size'
      const filterValue = this.value;

      if (this.checked) {
        filters[filterType].push(filterValue);
      } else {
        filters[filterType] = filters[filterType].filter(value => value !== filterValue);
      }

      updateProducts();
    });
  });

  /*-------------FUNCION FILTROS DE CRITERIOS------------*/

  function updateProducts() {
    const filteredProducts = products.filter(product => {
      const matchGender = filters.gender.length ? filters.gender.includes(product.gender) : true;
      const matchCategory = filters.category.length ? filters.category.includes(product.category) : true;
      const matchSize = filters.size.length ? filters.size.includes(product.size) : true;

      return matchGender && matchCategory && matchSize;
    });

    // Renderiza los productos filtrados con imagen, nombre y precio
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = ''; // Limpiar

    if (filteredProducts.length === 0) {
      productsGrid.textContent = "No se encontraron productos.";
    } else {
      filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const productName = document.createElement('product-nombre');
        productName.textContent = product.name;

        const productPrice = document.createElement('product-precio');
        productPrice.textContent = `$${product.price}`;

        productDiv.appendChild(img);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);

        productsGrid.appendChild(productDiv);
      });
    }
  }

 /*-------------FUNCION DESPLIEGE DE CHECKBOX FILTROS------------*/

document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todos los headers que se usan para togglear
  const toggleHeaders = document.querySelectorAll('.toggle-header');

  toggleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = header.getAttribute('data-target');
      const target = document.getElementById(targetId);
      
      if (target) {
        // Alternar la clase "active" para mostrar/ocultar contenido
        target.classList.toggle('active');
        
        // Alternar la clase "expanded" para rotar la flecha
        header.classList.toggle('expanded');
      }
    });
  });
});

/*-------------------------*/

 
function filterProducts() {
  // Lógica de filtrado...

  // Reasignar eventos a los botones después de actualizar la visibilidad
  const agregarButtons = document.querySelectorAll('.btn-agregar-filtro');
  const comprarButtons = document.querySelectorAll('.btn-comprar-filtro');

  agregarButtons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Producto agregado al carrito');
    });
  });

  comprarButtons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Producto comprado');
    });
  });
}

// Llamar a filterProducts cada vez que se haga un cambio
filterProducts();

// Variables para el input de precio y para mostrar el valor seleccionado
const priceRangeInput = document.getElementById('price-range');
const priceDisplay = document.getElementById('price-display');

// Actualizar el valor del rango en tiempo real
priceRangeInput.addEventListener('input', function() {
  const selectedPrice = parseInt(priceRangeInput.value);
  priceDisplay.textContent = `$${selectedPrice.toLocaleString()}`;  // Formatear con comas (ej: 10,000)
  filterProducts();  // Aplicar el filtro en tiempo real
});


// Función para filtrar los productos por el valor del rango de precios
function filterProducts() {
  const selectedPrice = parseInt(priceRangeInput.value);
  
  const products = document.querySelectorAll('.product');  // Asegúrate de que los productos tengan la clase 'product'

  products.forEach(product => {
    const productPrice = parseInt(product.getAttribute('data-price'));

    // Mostrar solo productos cuyo precio sea menor o igual al valor seleccionado
    if (productPrice <= selectedPrice) {
      product.style.display = 'block';  // Mostrar producto
    } else {
      product.style.display = 'none';   // Ocultar producto
    }
  });
}

// Llamar a filterProducts al cargar la página para que se aplique el filtro inicial
filterProducts();



let currentPosition = 0;
const productWrapper = document.querySelector('.product-wrapper');
const productCards = document.querySelectorAll('.product-card');
const cardWidth = productCards[0].offsetWidth + 15; // Ancho de cada tarjeta + el espacio (gap)
const totalWidth = cardWidth * productCards.length; // Ancho total de todas las tarjetas

// Manejadores para flechas del product-wrapper
document.getElementById('nextProductArrow').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    // Mover hacia la derecha
    if (currentPosition > -(totalWidth - productWrapper.offsetWidth)) {
        currentPosition -= cardWidth;
        productWrapper.style.transform = `translateX(${currentPosition}px)`;
    }
});

document.getElementById('prevProductArrow').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    // Mover hacia la izquierda
    if (currentPosition < 0) {
        currentPosition += cardWidth;
        productWrapper.style.transform = `translateX(${currentPosition}px)`;
    }
});


/* -----------BOTON PARA AGREGAR AL CARRITO--------------*/
// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los botones con clase "btn-agregar"
    var botones = document.querySelectorAll(".btn-agregar");

    // Añadir evento de clic a cada botón
    botones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            // Obtener el producto del atributo data-producto
            var producto = boton.getAttribute("data-producto");

            // Redirigir a la página de producto correspondiente
            window.location.href = "index-producto.html?producto=" + producto;
        });
    });
});


