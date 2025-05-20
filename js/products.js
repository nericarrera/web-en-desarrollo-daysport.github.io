// Importar los productos (asegúrate de que la ruta sea correcta)

import { productosMujer } from '/js/mujerProductos.js';
import { productosHombre } from '/js/hombreProductos.js';
import { productosNiños } from '/js/niñosProductos.js';
import { productosAccesorios } from '/js/accesoriosProductos.js';

// Variable global para la imagen principal
let image;

// Obtener el ID del producto desde la URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Función para mostrar/ocultar la guía de talles
function toggleSizeGuide() {
    const guide = document.getElementById('size-guide');
    guide.classList.toggle('size-guide-hidden');
}

// Función para llenar la tabla con datos del producto actual
function llenarTablaMedidas(product) {
    const tableBody = document.getElementById('sizeGuideTableBody');
    tableBody.innerHTML = '';
    
    if (!product?.variantes || product.variantes.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No hay información de talles disponible</td></tr>';
        return;
    }
    
    // Agrupar talles únicos para evitar duplicados
    const tallesUnicos = [...new Set(product.variantes.map(v => v.talla))];
    
    tallesUnicos.forEach(talle => {
        // Encontrar la primera variante con este talle
        const variante = product.variantes.find(v => v.talla === talle);
        if (variante) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${talle}</td>
                <td>${variante.pecho || 'N/A'}</td>
                <td>${variante.cintura || 'N/A'}</td>
                <td>${variante.cadera || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        }
    });

     // Configurar la guía de talles (AGREGA ESTO AL FINAL DE mostrarDetallesProducto)
    llenarTablaMedidas(product);
    
    // Event listeners para la guía de talles
    document.getElementById('show-size-guide')?.addEventListener('click', toggleSizeGuide);
    document.querySelector('.close-size-guide')?.addEventListener('click', toggleSizeGuide);
}


// Función para mostrar los detalles del producto
function mostrarDetallesProducto(product) {
    if (!product) {
        console.error('Producto no encontrado');
        alert('Producto no encontrado. Redirigiendo a la página principal...');
        window.location.href = 'index.html';
        return;
    }

    // Mostrar el título, precio y descripción
    document.getElementById('product-title').textContent = product.nombre;
    document.getElementById('product-price').textContent = `$${product.precio.toLocaleString()}`;
    document.getElementById('product-description').textContent = product.descripcion || 'Descripción no disponible';

    // Referencias a los contenedores
    const zoomContainer = document.querySelector('.zoom-container');
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    const tallesContainer = document.getElementById('product-sizes');
    const quantityContainer = document.getElementById('quantity-container');
    const quantityInput = document.getElementById('quantity');
    const coloresContainer = document.getElementById('product-colors');

    // Limpiar contenedores antes de agregar contenido
    zoomContainer.innerHTML = '';
    thumbnailsContainer.innerHTML = '';
    tallesContainer.innerHTML = '<h3>Talles disponibles:</h3>';
    coloresContainer.innerHTML = '<h3>Colores disponibles:</h3>';
    quantityContainer.classList.add('hidden');

    // Mostrar la imagen principal
    image = document.createElement('img');
    image.src = product.imagen[0];
    image.alt = product.nombre;
    image.classList.add('main-product-image');
    zoomContainer.appendChild(image);

    // Configuración del zoom
    let isZoomed = false;
    let offsetX, offsetY;

    function handleZoom(event) {
        if (isZoomed) {
            const rect = zoomContainer.getBoundingClientRect();
            offsetX = (event.clientX - rect.left) / rect.width * 100;
            offsetY = (event.clientY - rect.top) / rect.height * 100;
            image.style.transformOrigin = `${offsetX}% ${offsetY}%`;
        }
    }

    image.addEventListener('click', () => {
        isZoomed = !isZoomed;
        image.classList.toggle('zoomed');
        zoomContainer.style.cursor = isZoomed ? 'grab' : 'zoom-in';
    });

    zoomContainer.addEventListener('mousemove', handleZoom);

    // Función para mostrar miniaturas
    function mostrarMiniaturas(imagenes) {
        thumbnailsContainer.innerHTML = '';
        
        imagenes.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imgSrc;
            thumbnail.alt = `Miniatura ${index + 1}`;
            thumbnail.classList.add('thumbnail-image');
            
            thumbnail.addEventListener('click', () => {
                image.src = imgSrc;
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // Mostrar colores disponibles
    if (product.variantes && product.variantes.length > 0) {
        const coloresUnicos = [...new Set(product.variantes.map(v => v.color))];
        let primerColor = null;

        coloresUnicos.forEach(color => {
            const colorButton = document.createElement('button');
            colorButton.classList.add('color-btn');
            colorButton.setAttribute('data-color', color);

            if (product.imagenColores && product.imagenColores[color]) {
                const colorImage = document.createElement('img');
                colorImage.src = product.imagenColores[color][0];
                colorImage.alt = color;
                colorImage.classList.add('color-image');
                colorButton.appendChild(colorImage);
                
                if (!primerColor) primerColor = color;
            } else {
                colorButton.style.backgroundColor = color;
                colorButton.style.width = '50px';
                colorButton.style.height = '50px';
            }

            colorButton.addEventListener('click', () => {
                // Remover selección previa
                document.querySelectorAll('.color-btn').forEach(btn => {
                    btn.classList.remove('selected-color');
                });
                
                // Marcar color seleccionado
                colorButton.classList.add('selected-color');
                
                if (product.imagenColores && product.imagenColores[color]) {
                    // Cambiar imagen principal
                    image.src = product.imagenColores[color][0];
                    
                    // Mostrar miniaturas (todas las imágenes del color)
                    mostrarMiniaturas(product.imagenColores[color]);
                }
                
                actualizarTalles(product, color);
            });

            coloresContainer.appendChild(colorButton);
        });

        // Seleccionar primer color por defecto
        if (primerColor) {
            coloresContainer.querySelector('.color-btn').click();
        }
    } else {
        coloresContainer.innerHTML += '<p>No hay colores disponibles.</p>';
        // Mostrar miniaturas con imágenes generales si no hay colores
        if (product.imagenesDetalle && product.imagenesDetalle.length > 0) {
            mostrarMiniaturas([product.imagen[0], ...product.imagenesDetalle]);
        }
    }

    // Función para actualizar talles
    function actualizarTalles(product, color) {
        tallesContainer.innerHTML = '<h3>Talles disponibles:</h3>';
        const variantesFiltradas = product.variantes.filter(v => v.color === color);

        if (variantesFiltradas.length > 0) {
            variantesFiltradas.forEach(variant => {
                const sizeButton = document.createElement('button');
                sizeButton.textContent = `${variant.talla} (${variant.stock})`;
                sizeButton.disabled = variant.stock === 0;
                sizeButton.classList.add('size-btn');

                sizeButton.addEventListener('click', () => {
                    if (sizeButton.classList.contains('selected')) {
                        sizeButton.classList.remove('selected');
                        quantityContainer.classList.add('hidden');
                    } else {
                        document.querySelectorAll('.size-btn').forEach(btn => {
                            btn.classList.remove('selected');
                        });
                        sizeButton.classList.add('selected');
                        quantityContainer.classList.remove('hidden');
                        quantityInput.max = variant.stock;

                        quantityInput.addEventListener('change', () => {
                            const cantidad = parseInt(quantityInput.value, 10);
                            if (cantidad > variant.stock) {
                                alert(`No hay suficiente stock. Solo quedan ${variant.stock} unidades.`);
                                quantityInput.value = variant.stock;
                            }
                        });
                    }
                });

                tallesContainer.appendChild(sizeButton);
            });
        } else {
            tallesContainer.innerHTML += '<p>No hay talles disponibles para este color.</p>';
        }
    }
}



// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    let product = productosMujer.find(p => p.id === productId) || 
                 productosHombre.find(p => p.id === productId) || 
                 productosNiños.find(p => p.id === productId) || 
                 productosAccesorios.find(p => p.id === productId);

    if (product) {
        mostrarDetallesProducto(product);
    } else {
        console.error('Producto no encontrado');
        alert('Producto no encontrado. Redirigiendo a la página principal...');
        window.location.href = 'index.html';
    }
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


// Configurar la guía de talles
llenarTablaMedidas(product);

// Event listeners para la guía de talles
document.getElementById('show-size-guide')?.addEventListener('click', toggleSizeGuide);
document.querySelector('.close-size-guide')?.addEventListener('click', toggleSizeGuide);




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