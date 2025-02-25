

// Importar los productos (asegúrate de que la ruta sea correcta)
import { productosMujer } from '/js/mujerProductos.js';

// Obtener el ID del producto desde la URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
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

    // Limpiar contenedores antes de agregar contenido
    zoomContainer.innerHTML = '';
    thumbnailsContainer.innerHTML = '';
    tallesContainer.innerHTML = '<h3>Talles disponibles:</h3>';
    quantityContainer.classList.add('hidden'); // Ocultar el contador inicialmente

     // Mostrar la imagen principal
     const image = document.createElement('img');
     image.src = product.imagen[0]; // Primera imagen por defecto
     image.alt = product.nombre;
     image.classList.add('main-product-image');
     zoomContainer.appendChild(image);
 
     // Variables para el zoom y desplazamiento
     let isZoomed = false;
     let offsetX, offsetY;
 
     // Función para calcular el desplazamiento del zoom
     function handleZoom(event) {
         if (isZoomed) {
             const rect = zoomContainer.getBoundingClientRect();
             const mouseX = event.clientX - rect.left;
             const mouseY = event.clientY - rect.top;
 
             // Calcular el desplazamiento basado en la posición del mouse
             offsetX = (mouseX / rect.width) * 100;
             offsetY = (mouseY / rect.height) * 100;
 
             // Aplicar el desplazamiento
             image.style.transformOrigin = `${offsetX}% ${offsetY}%`;
         }
     }

     
    // Activar/desactivar zoom al hacer clic
    image.addEventListener('click', () => {
        isZoomed = !isZoomed;
        image.classList.toggle('zoomed');

        if (isZoomed) {
            zoomContainer.style.cursor = 'grab'; // Cambiar cursor al hacer zoom
        } else {
            zoomContainer.style.cursor = 'zoom-in'; // Restaurar cursor al desactivar zoom
        }
    });

    // Mover el zoom al mover el mouse
    zoomContainer.addEventListener('mousemove', handleZoom);
 

    // Función para mostrar imágenes en zoom-container y miniaturas
    function mostrarImagenes(imagenes) {
        // Limpiar contenedores
        zoomContainer.innerHTML = '';
        thumbnailsContainer.innerHTML = '';

        // Mostrar imágenes en zoom-container
        imagenes.forEach((imagenSrc, index) => {
            const image = document.createElement('img');
            image.src = imagenSrc;
            image.alt = `Imagen ${index + 1}`;
            image.classList.add('main-product-image');
            zoomContainer.appendChild(image);

            // Agregar funcionalidad de zoom
            image.addEventListener('click', () => {
                image.classList.toggle('zoomed');
            });
        });

        // Mostrar miniaturas
        imagenes.forEach((imagenSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imagenSrc;
            thumbnail.alt = `Miniatura ${index + 1}`;
            thumbnail.classList.add('thumbnail-image');
            thumbnail.addEventListener('click', () => {
                // Cambiar la imagen principal al hacer clic en la miniatura
                const mainImages = document.querySelectorAll('.main-product-image');
                mainImages.forEach((img, i) => {
                    img.src = imagenSrc; // Cambiar todas las imágenes principales
                });
            });
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // Mostrar imágenes iniciales (primer color por defecto)
    const primerColor = product.variantes[0].color;
    if (product.imagenColores && product.imagenColores[primerColor]) {
        mostrarImagenes(product.imagenColores[primerColor]);
    }

    // Mostrar colores disponibles
    const coloresContainer = document.getElementById('product-colors');
    coloresContainer.innerHTML = '<h3>Colores disponibles:</h3>';
    if (product.variantes && product.variantes.length > 0) {
        const coloresUnicos = [...new Set(product.variantes.map(v => v.color))]; // Eliminar colores duplicados
        coloresUnicos.forEach(color => {
            const colorButton = document.createElement('button');
            colorButton.classList.add('color-btn');
            colorButton.setAttribute('data-color', color);

            if (product.imagenColores && product.imagenColores[color]) {
                const colorImage = document.createElement('img');
                colorImage.src = product.imagenColores[color][0]; // Usar la primera imagen del color
                colorImage.alt = color;
                colorImage.classList.add('color-image');
                colorButton.appendChild(colorImage);
            } else {
                colorButton.style.backgroundColor = color; // Mostrar un cuadro de color
                colorButton.style.width = '50px';
                colorButton.style.height = '50px';
            }

            colorButton.addEventListener('click', () => {
                // Actualizar las imágenes y miniaturas con las del color seleccionado
                if (product.imagenColores && product.imagenColores[color]) {
                    image.src = product.imagenColores[color][0];
                    image.classList.remove('zoomed'); // Desactivar zoom al cambiar la imagen
                    isZoomed = false; // Restaurar estado del zoom
                    zoomContainer.style.cursor = 'zoom-in'; // Restaurar cursor
                }
                

                // Actualizar los talles disponibles para el color seleccionado
                actualizarTalles(product, color);
            });

            coloresContainer.appendChild(colorButton);
        });
    } else {
        coloresContainer.innerHTML += '<p>No hay colores disponibles.</p>';
    }

    // Función para actualizar los talles disponibles
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
                    // Si el talle ya está seleccionado, deseleccionarlo
                    if (sizeButton.classList.contains('selected')) {
                        sizeButton.classList.remove('selected');
                        quantityContainer.classList.add('hidden'); // Ocultar el contador
                    } else {
                        // Deseleccionar todos los talles
                        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
                        // Seleccionar el talle actual
                        sizeButton.classList.add('selected');

                        // Mostrar el contador de cantidad
                        quantityContainer.classList.remove('hidden');
                        quantityInput.max = variant.stock; // Establecer el máximo según el stock disponible

                        // Manejar la lógica para agregar al carrito
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

    // Mostrar talles disponibles para el primer color por defecto
    if (product.variantes && product.variantes.length > 0) {
        actualizarTalles(product, primerColor);
    }
}


// Llamar a la función para mostrar los detalles del producto
document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    const product = productosMujer.find(p => p.id === productId);
    mostrarDetallesProducto(product);
});



/*--------------------------------------------------*/



/*----------- "AGREGAR AL CARRITO" ------------*/






























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

/*----------------------------------------------------------------------------- */

