// Slide automático para el banner
let currentIndex = 0;
const track = document.querySelector('.banner-track');
const slides = document.querySelectorAll('.banner-slide');

function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(changeSlide, 25000);  // Cambia cada 25 segundos

/* Flechas para mover las tarjetas (cards) en la sección 1 */
const cardWrapper = document.querySelector('.card-wrapper');
const nextArrow = document.getElementById('nextArrow');
const prevArrow = document.getElementById('prevArrow');

let scrollAmount = 0;
const scrollStep = 200; // Ajusta este valor según sea necesario

function updateDimensions() {
    const containerWidth = cardWrapper.offsetWidth;
    const totalScrollWidth = cardWrapper.scrollWidth;
    const maxScrollAmount = totalScrollWidth - containerWidth;
    return maxScrollAmount;
}

nextArrow.addEventListener('click', function(event) {
    event.preventDefault();
    const maxScrollAmount = updateDimensions();
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
window.addEventListener('resize', updateDimensions); // Recalcula al cambiar el tamaño de la ventana

// Carrito de compras - funciones globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Cargar carrito desde LocalStorage
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');

// Mostrar u ocultar el carrito
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
    localStorage.setItem('cart', JSON.stringify(cart));  // Guardar en LocalStorage
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
    updateCart();  // Actualizar el carrito después de eliminar
}

// Enlazar botones "Agregar al carrito" para cada producto
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

// Filtro de productos
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

// Filtros de género, categoría y precio
document.addEventListener('DOMContentLoaded', function() {
    const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-display');
    const products = document.querySelectorAll('.product');
    
    function filterProducts() {
        const selectedGenders = Array.from(genderCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const selectedCategories = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const selectedPrice = parseInt(priceRange.value);

        products.forEach(product => {
            const productGender = product.getAttribute('data-gender');
            const productCategory = product.getAttribute('data-category');
            const productPrice = parseInt(product.getAttribute('data-price')) || 0;

            const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(productGender);
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
            const priceMatch = productPrice <= selectedPrice;

            if (genderMatch && categoryMatch && priceMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Actualizar el valor del precio en tiempo real
    priceRange.addEventListener('input', function() {
        priceValue.textContent = `$${priceRange.value}`;
        filterProducts();
    });

    // Escuchar los cambios en los filtros
    genderCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
    categoryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
});

// Productos dinámicos
document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: "Campera Hombre Liviana", gender: "hombre", category: "campera-liviana", price: 3500, image: "img/hombre/campera-liviana/campera1.jpg", detailsPage: "product1.html" },
        { id: 2, name: "Remera Mujer", gender: "mujer", category: "remeras", price: 2000, image: "img/mujer/remera/remera1.jpg", detailsPage: "product2.html" },
        // Añade más productos según necesites...
    ];

    function displayProducts(productsToShow) {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';  // Limpiar antes de agregar

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

    // Mostrar todos los productos inicialmente
    displayProducts(products);

    // Filtrar productos
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

    document.querySelectorAll('input[name="gender"], input[name="category"], #price-range').forEach(input => {
        input.addEventListener('change', filterProducts);
    });

    // Mostrar productos filtrados al cargar la página
    filterProducts();
});
