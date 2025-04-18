// Importar los productos
import { productosMujer } from '/js/mujerProductos.js';
import { productosHombre } from '/js/hombreProductos.js';
import { productosNiños } from '/js/niñosProductos.js';
import { productosAccesorios } from '/js/accesoriosProductos.js';

// Variables globales
let currentProduct = null;
let selectedColor = null;
let selectedSize = null;
let currentImages = [];
let mainImageIndex = 0;

// Obtener ID del producto desde la URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Buscar producto en todas las categorías
function findProductById(id) {
    return productosMujer.find(p => p.id === id) ||
           productosHombre.find(p => p.id === id) ||
           productosNiños.find(p => p.id === id) ||
           productosAccesorios.find(p => p.id === id);
}

// Mostrar detalles del producto
function mostrarDetallesProducto(product) {
    if (!product) {
        alert('Producto no encontrado. Redirigiendo...');
        window.location.href = 'index.html';
        return;
    }

    currentProduct = product;
    
    // Mostrar información básica
    document.getElementById('product-title').textContent = product.nombre;
    document.getElementById('product-price').textContent = `$${product.precio.toLocaleString()}`;
    document.getElementById('product-description').textContent = product.descripcion || 'Descripción no disponible';

    // Configurar galería de imágenes
    setupImageGallery(product);
    
    // Configurar selectores de color
    setupColorOptions(product);
    
    // Configurar tabla de talles
    setupSizeChart(product);
    
    // Configurar botones
    setupButtons();
}

// Configurar galería de imágenes
function setupImageGallery(product) {
    const zoomContainer = document.querySelector('.zoom-container');
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    
    // Limpiar contenedores
    zoomContainer.innerHTML = '';
    thumbnailsContainer.innerHTML = '';
    
    // Determinar imágenes a mostrar (usar imagenesDetalle si existen)
    currentImages = product.imagenesDetalle || product.imagen;
    if (!currentImages || currentImages.length === 0) return;
    
    // Crear imagen principal
    const mainImg = document.createElement('img');
    mainImg.src = currentImages[0];
    mainImg.alt = product.nombre;
    mainImg.classList.add('main-product-image');
    mainImg.id = 'main-product-image';
    zoomContainer.appendChild(mainImg);
    
    // Crear miniaturas
    currentImages.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imgSrc;
        thumbnail.alt = `Miniatura ${index + 1}`;
        thumbnail.classList.add('thumbnail');
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Configurar zoom
    setupImageZoom(mainImg);
}

// Actualizar imagen principal
function updateMainImage(index) {
    const mainImg = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    mainImg.src = currentImages[index];
    mainImageIndex = index;
    
    // Actualizar miniatura activa
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Configurar zoom de imagen
function setupImageZoom(imageElement) {
    let isZoomed = false;
    
    imageElement.addEventListener('click', () => {
        isZoomed = !isZoomed;
        imageElement.classList.toggle('zoomed', isZoomed);
    });
    
    imageElement.addEventListener('mousemove', (e) => {
        if (isZoomed) {
            const rect = imageElement.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 100;
            const y = (e.clientY - rect.top) / rect.height * 100;
            imageElement.style.transformOrigin = `${x}% ${y}%`;
        }
    });
}

// Configurar opciones de color
function setupColorOptions(product) {
    const colorsContainer = document.getElementById('product-colors');
    colorsContainer.innerHTML = '';
    
    const uniqueColors = [...new Set(product.variantes.map(v => v.color))];
    if (uniqueColors.length === 0) return;
    
    // Seleccionar primer color por defecto
    selectedColor = uniqueColors[0];
    
    uniqueColors.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.classList.add('color-btn');
        colorBtn.dataset.color = color;
        
        // Mostrar imagen del color si está disponible
        if (product.imagenColores && product.imagenColores[color]) {
            const colorImg = document.createElement('img');
            colorImg.src = product.imagenColores[color][0];
            colorImg.alt = color;
            colorBtn.appendChild(colorImg);
        } else {
            colorBtn.style.backgroundColor = getColorCode(color);
            colorBtn.textContent = color;
        }
        
        colorBtn.addEventListener('click', () => {
            selectedColor = color;
            updateSizeOptions(product);
            
            // Actualizar imágenes si hay diferentes por color
            if (product.imagenColores && product.imagenColores[color]) {
                currentImages = product.imagenColores[color];
                updateMainImage(0);
            }
        });
        
        colorsContainer.appendChild(colorBtn);
    });
    
    // Actualizar talles para el color seleccionado
    updateSizeOptions(product);
}

// Actualizar opciones de talles
function updateSizeOptions(product) {
    const sizesContainer = document.getElementById('product-sizes');
    sizesContainer.innerHTML = '';
    
    if (!selectedColor) return;
    
    const sizeVariants = product.variantes.filter(v => v.color === selectedColor);
    const uniqueSizes = [...new Set(sizeVariants.map(v => v.talla))];
    
    uniqueSizes.forEach(size => {
        const variant = sizeVariants.find(v => v.talla === size);
        const sizeBtn = document.createElement('button');
        sizeBtn.classList.add('size-btn');
        sizeBtn.textContent = size;
        sizeBtn.disabled = variant.stock <= 0;
        
        if (variant.stock <= 0) {
            sizeBtn.title = 'Sin stock';
            sizeBtn.classList.add('out-of-stock');
        }
        
        sizeBtn.addEventListener('click', () => {
            selectedSize = size;
            document.querySelectorAll('.size-btn').forEach(btn => 
                btn.classList.remove('selected'));
            sizeBtn.classList.add('selected');
            
            // Mostrar selector de cantidad
            document.getElementById('quantity-container').classList.remove('hidden');
            document.getElementById('quantity').max = variant.stock;
        });
        
        sizesContainer.appendChild(sizeBtn);
    });
}

// Configurar tabla de talles
function setupSizeChart(product) {
    const tableBody = document.getElementById('sizeChartTableBody');
    tableBody.innerHTML = '';
    
    // Agrupar variantes por talla
    const sizeGroups = {};
    product.variantes.forEach(variant => {
        if (!sizeGroups[variant.talla]) {
            sizeGroups[variant.talla] = {
                pecho: variant.pecho,
                cintura: variant.cintura,
                cadera: variant.cadera,
                stock: variant.stock
            };
        }
    });
    
    // Llenar tabla
    Object.entries(sizeGroups).forEach(([size, data]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${size}</td>
            <td>${data.pecho}</td>
            <td>${data.cintura}</td>
            <td>${data.cadera}</td>
            <td>${data.stock > 0 ? 'Disponible' : 'Agotado'}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Configurar botones
function setupButtons() {
    document.querySelector('.btn-add-to-cart').addEventListener('click', addToCartHandler);
    document.querySelector('.btn-buy-now').addEventListener('click', buyNowHandler);
}

// Manejador para agregar al carrito
function addToCartHandler() {
    if (!validateSelection()) return;
    
    const variant = currentProduct.variantes.find(v => 
        v.color === selectedColor && v.talla === selectedSize
    );
    
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    const productToAdd = {
        id: currentProduct.id,
        name: currentProduct.nombre,
        price: currentProduct.precio,
        image: currentImages[mainImageIndex],
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
    };
    
    addToCart(productToAdd);
    alert('Producto añadido al carrito');
}

// Manejador para comprar ahora
function buyNowHandler() {
    if (!validateSelection()) return;
    
    addToCartHandler();
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 500);
}

// Validar selección de color y talle
function validateSelection() {
    if (!selectedColor) {
        alert('Por favor selecciona un color');
        return false;
    }
    
    if (!selectedSize) {
        alert('Por favor selecciona un talle');
        return false;
    }
    
    return true;
}

// Función auxiliar para códigos de color
function getColorCode(colorName) {
    const colors = {
        'negro': '#000000',
        'blanco': '#FFFFFF',
        'rojo': '#FF0000',
        'azul': '#0000FF',
        'verde': '#008000',
        'amarillo': '#FFFF00',
        'rosa': '#FFC0CB',
        'gris': '#808080',
        'celeste': '#87CEEB'
    };
    
    return colors[colorName.toLowerCase()] || '#CCCCCC';
}

// Toggle para la tabla de talles
function toggleSizeChart(event) {
    event.preventDefault();
    const modal = document.getElementById('sizeChartModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    const product = findProductById(productId);
    mostrarDetallesProducto(product);
});

/*----------- "AGREGAR AL CARRITO" ------------*/
document.querySelector('.btn-add-to-cart').addEventListener('click', () => {
    console.log('Botón "Agregar al carrito" clickeado'); // Depuración

    // Obtener los datos del producto
    const productTitle = document.getElementById('product-title').textContent;
    const productPriceText = document.getElementById('product-price').textContent.replace('$', '');
    const productPrice = parseFloat(productPriceText); // Convertir el precio a número

    // Verificar que el precio sea un número válido
    if (isNaN(productPrice)) {
        console.error('El precio no es un número válido:', productPriceText);
        alert('Error: El precio del producto no es válido.');
        return;
    }

    const productImageElement = document.querySelector('.main-product-image'); // Elemento de la imagen

    // Verificar que el elemento de la imagen exista
    if (!productImageElement) {
        console.error('El elemento de la imagen no se encontró.');
        alert('Error: No se pudo obtener la imagen del producto.');
        return;
    }

    const productImage = productImageElement.src; // Obtener la URL de la imagen

    // Obtener el color seleccionado
    const selectedColor = document.querySelector('.color-btn.selected')?.getAttribute('data-color') || 'Sin color';

    // Obtener el talle seleccionado
    const selectedSize = document.querySelector('.size-btn.selected')?.textContent || 'Sin talle';

    // Obtener la cantidad seleccionada
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;

    // Verificar que se haya seleccionado un talle
    if (selectedSize === 'Sin talle') {
        alert('Por favor, selecciona un talle antes de continuar.');
        return;
    }

    // Crear el objeto del producto
    const product = {
        name: productTitle,
        price: productPrice, // Precio convertido a número
        image: productImage,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity // Cantidad seleccionada
    };

    console.log('Producto a agregar:', product); // Depuración

    // Agregar el producto al carrito
    addToCart(product);
});





/*----------------COMENTARIOS EN LA DESCRIPCION DE PRODUCTO-------------- */

// Simula una carga de comentarios desde un servidor o base de datos
const comments = [
    { user: 'Usuario1', text: '¡Excelente producto! Lo recomiendo.', rating: 5 },
    { user: 'Usuario2', text: 'La calidad es increíble, mejor de lo que esperaba.', rating: 4 }
];

// Función para agregar los comentarios al DOM
function loadComments() {
    const commentsList = document.getElementById('comments-list');
    comments.forEach(comment => {
        const commentElement = document.createElement('li');
        commentElement.innerHTML = `<strong>${comment.user}</strong>: ${comment.text} <span>(${comment.rating} ★)</span>`;
        commentsList.appendChild(commentElement);
    });
}

// Cargar los comentarios automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', loadComments);

// Capturar el formulario y escuchar el evento de envío
const commentForm = document.getElementById('comment-form');

commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener los valores del formulario
    const commentText = document.getElementById('comment').value;
    const commentRating = document.getElementById('rating').value;

    // Validar que el comentario no esté vacío
    if (commentText === '') {
        alert('Por favor, escribe un comentario.');
        return;
    }

    // Crear un nuevo comentario y agregarlo a la lista
    const commentsList = document.getElementById('comments-list');
    const newComment = document.createElement('li');
    newComment.innerHTML = `<strong>UsuarioNuevo</strong>: ${commentText} <span>(${commentRating} ★)</span>`;
    commentsList.appendChild(newComment);

    // Limpiar el formulario
    commentForm.reset();
});

// Ejemplo para cargar comentarios desde una API simulada
function loadCommentsFromAPI() {
    fetch('https://mi-api.com/comments')  // Simula la llamada a tu backend
        .then(response => response.json())
        .then(data => {
            const commentsList = document.getElementById('comments-list');
            data.forEach(comment => {
                const commentElement = document.createElement('li');
                commentElement.innerHTML = `<strong>${comment.user}</strong>: ${comment.text} <span>(${comment.rating} ★)</span>`;
                commentsList.appendChild(commentElement);
            });
        });
}