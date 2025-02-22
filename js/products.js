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
    document.getElementById('product-title-mujer').textContent = product.nombre;
    document.getElementById('product-price-mujer').textContent = `$${product.precio.toLocaleString()}`;
    document.getElementById('product-description-mujer').textContent = product.descripcion || 'Descripción no disponible';

    // Referencias a los contenedores
    const zoomContainer = document.querySelector('.zoom-container');
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    const tallesContainer = document.getElementById('product-sizes-mujer');
    const quantityContainer = document.getElementById('quantity-container');
    const quantityInput = document.getElementById('quantity');

    // Limpiar contenedores antes de agregar contenido
    zoomContainer.innerHTML = '';
    thumbnailsContainer.innerHTML = '';
    tallesContainer.innerHTML = '<h3>Talles disponibles:</h3>';
    quantityContainer.classList.add('hidden'); // Ocultar el contador inicialmente

    // Función para agregar zoom y desplazamiento a una imagen
    function agregarZoomYDesplazamiento(imagen, contenedor) {
        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;

        // Ajustar el tamaño de la imagen al hacer zoom
        imagen.addEventListener('click', () => {
            if (imagen.classList.contains('zoomed')) {
                // Desactivar zoom
                imagen.classList.remove('zoomed');
                imagen.style.transform = 'scale(1)';
                imagen.style.cursor = 'pointer';
                contenedor.style.overflow = 'hidden'; // Restaurar el overflow del contenedor
            } else {
                // Activar zoom
                imagen.classList.add('zoomed');
                imagen.style.transform = 'scale(2)'; // Aumentar el zoom x2
                imagen.style.cursor = 'grab';
                contenedor.style.overflow = 'auto'; // Permitir desplazamiento dentro del contenedor
            }
        });

        // Iniciar arrastre
        imagen.addEventListener('mousedown', (e) => {
            if (imagen.classList.contains('zoomed')) {
                isDragging = true;
                startX = e.pageX - contenedor.offsetLeft;
                startY = e.pageY - contenedor.offsetTop;
                scrollLeft = contenedor.scrollLeft;
                scrollTop = contenedor.scrollTop;
                imagen.style.cursor = 'grabbing';
            }
        });

        // Detener arrastre
        imagen.addEventListener('mouseup', () => {
            isDragging = false;
            if (imagen.classList.contains('zoomed')) {
                imagen.style.cursor = 'grab';
            }
        });

        // Mover la imagen durante el arrastre
        imagen.addEventListener('mousemove', (e) => {
            if (!isDragging || !imagen.classList.contains('zoomed')) return;
            e.preventDefault();
            const x = e.pageX - contenedor.offsetLeft;
            const y = e.pageY - contenedor.offsetTop;
            const walkX = (x - startX) * 2; // Ajustar la velocidad del arrastre
            const walkY = (y - startY) * 2;
            contenedor.scrollLeft = scrollLeft - walkX;
            contenedor.scrollTop = scrollTop - walkY;
        });

        // Restablecer el cursor al salir del contenedor
        imagen.addEventListener('mouseleave', () => {
            isDragging = false;
            if (imagen.classList.contains('zoomed')) {
                imagen.style.cursor = 'grab';
            }
        });
    }

    // Función para mostrar imágenes en zoom-container y miniaturas
    function mostrarImagenes(imagenes) {
        // Limpiar contenedores
        zoomContainer.innerHTML = '';
        thumbnailsContainer.innerHTML = '';

        // Mostrar imágenes en zoom-container
        imagenes.forEach((imagenSrc, index) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper');

            const image = document.createElement('img');
            image.src = imagenSrc;
            image.alt = `Imagen ${index + 1}`;
            image.classList.add('main-product-image');

            // Agregar zoom y desplazamiento
            agregarZoomYDesplazamiento(image, zoomContainer);

            imageWrapper.appendChild(image);
            zoomContainer.appendChild(imageWrapper);
        });

        // Mostrar miniaturas
        imagenes.forEach((imagenSrc, index) => {
            const thumbnailWrapper = document.createElement('div');
            thumbnailWrapper.classList.add('thumbnail-wrapper');

            const thumbnail = document.createElement('img');
            thumbnail.src = imagenSrc;
            thumbnail.alt = `Miniatura ${index + 1}`;
            thumbnail.classList.add('thumbnail-image');

            // Agregar zoom y desplazamiento a las miniaturas
            agregarZoomYDesplazamiento(thumbnail, thumbnailsContainer);

            thumbnailWrapper.appendChild(thumbnail);
            thumbnailsContainer.appendChild(thumbnailWrapper);
        });
    }

    // Mostrar imágenes iniciales (primer color por defecto)
    const primerColor = product.variantes[0].color;
    if (product.imagenColores && product.imagenColores[primerColor]) {
        mostrarImagenes(product.imagenColores[primerColor]);
    }

    // Mostrar colores disponibles
    const coloresContainer = document.getElementById('product-colors-mujer');
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
                    mostrarImagenes(product.imagenColores[color]);
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



/*----------- BOTÓN "AGREGAR AL CARRITO" ------------*/
document.addEventListener('DOMContentLoaded', () => {
    const botonAgregarCarrito = document.querySelector('.btn-add-to-cart-mujer');

    botonAgregarCarrito.addEventListener('click', () => {
        console.log('Botón "Agregar al carrito" clickeado');

        const selectedSize = document.querySelector('.size-btn.selected');
        if (!selectedSize) {
            alert('Por favor selecciona un talle antes de continuar.');
            return;
        }

        const productId = getProductIdFromURL();
        const product = productosMujer.find(p => p.id === productId);

        const productoSeleccionado = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            color: document.querySelector('.color-btn.selected')?.getAttribute('data-color') || product.variantes[0].color,
            talla: selectedSize.textContent.split(" ")[0], // Extraer solo la talla
            cantidad: 1,
            imagen: product.imagen[0]
        };

        agregarAlCarrito(productoSeleccionado);
    });
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

/*----------------------------------------------------------------------------- */

