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

    // Limpiar contenedores antes de agregar contenido
    zoomContainer.innerHTML = '';
    thumbnailsContainer.innerHTML = '';
    tallesContainer.innerHTML = '<h3>Talles disponibles:</h3>';

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

    // Mostrar miniaturas
    if (product.miniaturas && product.miniaturas.length > 0) {
        product.miniaturas.forEach((miniatura, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = miniatura.src;
            thumbnail.alt = `Miniatura ${index + 1}`;
            thumbnail.classList.add('thumbnail-image');
            thumbnail.addEventListener('click', () => {
                // Cambiar la imagen principal al hacer clic en la miniatura
                image.src = miniatura.src;
                image.classList.remove('zoomed'); // Desactivar zoom al cambiar la imagen
                isZoomed = false; // Restaurar estado del zoom
                zoomContainer.style.cursor = 'zoom-in'; // Restaurar cursor
            });
            thumbnailsContainer.appendChild(thumbnail);
        });
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
                // Actualizar la imagen principal con la del color seleccionado
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
                    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
                    sizeButton.classList.add('selected');

                    // Aquí puedes manejar la lógica para agregar al carrito
                    console.log(`Talle seleccionado: ${variant.talla}, Stock: ${variant.stock}`);
                });

                tallesContainer.appendChild(sizeButton);
            });
        } else {
            tallesContainer.innerHTML += '<p>No hay talles disponibles para este color.</p>';
        }
    }

    // Mostrar talles disponibles para el primer color por defecto
    if (product.variantes && product.variantes.length > 0) {
        const primerColor = product.variantes[0].color;
        actualizarTalles(product, primerColor);
    }



    // Función para actualizar talles
    function actualizarTalles(product, color) {
        const tallesContainer = document.getElementById('product-sizes-mujer');
        tallesContainer.innerHTML = '<h3>Talles disponibles:</h3>';
        const variantesFiltradas = product.variantes.filter(v => v.color === color);

        if (variantesFiltradas.length > 0) {
            variantesFiltradas.forEach(variant => {
                const sizeButton = document.createElement('button');
                sizeButton.textContent = `${variant.talla} (${variant.stock})`;
                sizeButton.disabled = variant.stock === 0;
                sizeButton.classList.add('size-btn');

                sizeButton.addEventListener('click', () => {
                    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
                    sizeButton.classList.add('selected');
                });

                tallesContainer.appendChild(sizeButton);
            });
        } else {
            tallesContainer.innerHTML += '<p>No hay talles disponibles para este color.</p>';
        }
    }


    // Mostrar imágenes según el color seleccionado
    function mostrarImagenesColor(product, color) {
        if (product.imagenColores && product.imagenColores[color]) {
            const imagenesColor = product.imagenColores[color];
            gallery.innerHTML = '';
            thumbnailsContainer.innerHTML = '';

            const mainImage = document.createElement('img');
            mainImage.src = imagenesColor[0];
            mainImage.alt = `${product.nombre} - ${color}`;
            mainImage.classList.add('main-product-image');
            gallery.appendChild(mainImage);

            imagenesColor.forEach(imgSrc => {
                const thumbnail = document.createElement('img');
                thumbnail.src = imgSrc;
                thumbnail.classList.add('thumbnail-image');
                thumbnail.addEventListener('click', () => {
                    mainImage.src = imgSrc;
                });
                thumbnailsContainer.appendChild(thumbnail);
            });
        } else {
            gallery.innerHTML = '<p style="color: red;">No hay imágenes disponibles para este color.</p>';
        }
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

