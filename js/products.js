
/*------------------------------------------------------------------------*/

function toggleSizeChart(event) {
    event.preventDefault();  // Evita que el enlace recargue la página
    const modal = document.getElementById('sizeChartModal');
    modal.classList.toggle('hidden');
}

const relatedGallery = document.querySelector('.related-products-gallery');
const prevRelatedArrow = document.getElementById('prevRelatedArrow');
const nextRelatedArrow = document.getElementById('nextRelatedArrow');

prevRelatedArrow.addEventListener('click', () => {
    relatedGallery.scrollBy({ left: -200, behavior: 'smooth' });
});

nextRelatedArrow.addEventListener('click', () => {
    relatedGallery.scrollBy({ left: 200, behavior: 'smooth' });
});

/*----------------------------------------------------------------------------------------------------*/



 /*--------------------BUSCADOR DE PRODUCTO---------------*/

 

  /*-------------------DETALLE DE PRODUCTO-------------- */

  // Obtiene el ID del producto desde la URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Simulación de productos (puedes reemplazar estos datos con tu base de datos real)
const products = [
    {
        
            id: "mujer-1",
            nombre: "Remera Modal Soft",
            precio: 8000,
            categoria: "remeras",
            seccion: "mujer",
            temporada: "verano",
            imagen: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg", "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg"],
            miniaturas: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg", "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg"],
            hoverImagenes: ["img/mujer/remera-modal-soft-cuelloR/hover1.jpeg"],

            etiqueta: "novedad",
            variantes: [
                { color: "celeste", talla: "M", stock: 1 },
            ]
        },

        {
            id: "mujer-2",
            nombre: "Calza Nike Pro",
            precio: 13500,
            categoria: "calzas",
            seccion: "mujer",
            temporada: "verano",
            imagen: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg", "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"],
            miniaturas: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg", "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"],
            hoverImagenes: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "L", stock: 1 },
                { color: "gris", talla: "L", stock: 1 }
            ]
        },

        { id: "mujer-3",
            nombre: "Campera Deportiva Nike",
            precio: 13500,
            categoria: "camperas",
            seccion: "mujer",
            temporada: "media estacion",
            imagen: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg"],
            hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"],
            miniaturas: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "M", stock: 1 },
                { color: "negro", talla: "L", stock: 1 },
                { color: "negro", talla: "XL", stock: 0}
            ] 
        },
            
        { id: "mujer-4", 
            nombre: "Blusa de Lino", 
            precio: 9000, 
            categoria: "remeras",
            seccion: "mujer",
            temporada: "verano", 
            imagen: ["img/mujer/remeras-lino/blusalino-negro-1.jpeg"], 
            hoverImagenes: [],
            miniaturas: ["img/mujer/remeras-lino/blusalino-negro-1.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "XL", stock: 1 },
            ] 
        },

        { id: "mujer-5", 
            nombre: "Calza Nike Radeon", 
            precio: 13500, 
            categoria: "calzas", 
            seccion: "mujer",
            temporada: "verano",
            imagen: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"], 
            hoverImagenes: [],
            miniaturas: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 0 },
                { color: "gris", talla: "M", stock: 0 }
            ] 
        },

        { id: "mujer-7", 
            nombre: "Calza Nike Grofada", 
            precio: 15000, 
            categoria: "calzas", 
            seccion: "mujer",
            temporada: "verano",
            imagen: ["img/mujer/calzas/calza-nike-grofada-1.jpeg"], 
            hoverImagenes: [],
            miniaturas: ["img/mujer/calzas/calza-nike-grofada-1.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 0 },
                { color: "gris", talla: "M", stock: 0 }
            ] 
        },
        { id: "mujer-8", 
            nombre: "Calza Nike Speak", 
            precio: 13500, 
            categoria: "calzas", 
            seccion: "mujer",
            temporada: "verano",
            imagen: ["img/mujer/calzas/calza-nike-speak-1.jpeg"], 
            hoverImagenes: [],
            miniaturas: ["img/mujer/calzas/calza-nike-speak-1.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "S", stock: 0 },
                { color: "gris", talla: "M", stock: 0 }
            ] 
        },
        { id: "mujer-9", 
            nombre: "Calza Nike Fluorecent", 
            precio: 13500, 
            categoria: "calzas",
            seccion: "mujer",
            temporada: "invierno", 
            imagen: ["img/mujer/calzas/calza-nike-fluor-1.jpeg", "img/mujer/calzas/calza-nike-fluor-2.jpeg"], 
            hoverImagenes: [],
            miniaturas: ["img/mujer/calzas/calza-nike-fluor-2.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "rosa", talla: "L", stock: 1 },
                { color: "rosa", talla: "XL", stock: 1 }
            ] 
        },
        { id: "mujer-10", 
            nombre: "Calza Adidas Original", 
            precio: 13500, 
            categoria: "calzas", 
            seccion: "mujer",
            temporada: "verano",
            imagen: ["img/mujer/calzas/calza-adidas-original-1.jpeg"], 
            hoverImagenes: [],
            miniaturas: ["img/mujer/calzas/calza-adidas-original-1.jpeg"],
            etiqueta: "novedad",
            variantes: [
                { color: "negro", talla: "M", stock: 1 },
                { color: "multicolor", talla: "M", stock: 1 }
            ]
            
        },
   
];

/*--------------------------------------------------------- */

/*----------------------CODIGO REDIRECCION MUJER----------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        alert("Producto no especificado.");
        window.location.href = 'index.html';
        return;
    }

    const product = productosMujer.find(p => p.id === productId);
    

    if (product) {
        // Mostrar título, precio y descripción
        document.querySelector('#product-title').textContent = product.nombre;
        document.querySelector('#product-price').textContent = `$${product.precio.toLocaleString()}`;
        document.querySelector('#product-description').textContent = product.descripcion || 'Descripción no disponible';
    

        // Mostrar colores únicos como miniaturas
        const coloresContainer = document.querySelector('#product-colors');
        coloresContainer.innerHTML = '<h3>Colores disponibles:</h3>';

        const coloresUnicos = [...new Set(product.variantes.map(variant => variant.color))];
        coloresUnicos.forEach(color => {
            const colorThumbnail = document.createElement('img');
            colorThumbnail.src = product.imagenColores[color][0]; // Primera imagen del color
            colorThumbnail.alt = `Color ${color}`;
            colorThumbnail.classList.add('color-thumbnail');
            colorThumbnail.dataset.color = color;

            // Cambiar fotos y talles al seleccionar un color
            colorThumbnail.addEventListener('click', () => {
                actualizarGaleria(product, color);
                actualizarTalles(product, color);
            });

            coloresContainer.appendChild(colorThumbnail);
        });

        // Mostrar imágenes y talles del primer color por defecto
        const colorInicial = coloresUnicos[0];
        actualizarGaleria(product, colorInicial);
        actualizarTalles(product, colorInicial);

        console.log("Producto encontrado:", product); // Depuración
    } else {
        alert("Producto no encontrado.");
        window.location.href = 'index.html';
    }
});

// Función para actualizar las imágenes según el color seleccionado
function actualizarGaleria(product, color) {
    const gallery = document.querySelector('.product-gallery');
    gallery.innerHTML = ''; // Limpiar galería

    const imagenesColor = product.imagenColores[color];
    if (imagenesColor) {
        imagenesColor.forEach((imgSrc, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = `${product.nombre} - Vista ${index + 1}`;
            imgElement.classList.add('product-image');
            gallery.appendChild(imgElement);
        });
    } else {
        console.error(`No se encontraron imágenes para el color: ${color}`);
    }
}

/*---------------------ACTUALIZAR TALLES -----------------*/

function actualizarTalles(product, color) {
    const tallesContainer = document.querySelector('#product-sizes');
    tallesContainer.innerHTML = '<h3>Selecciona tu talla:</h3>';

    const tallesFiltrados = product.variantes.filter(variant => variant.color === color);
    let talleSeleccionado = null; // Variable para guardar el talle seleccionado

    tallesFiltrados.forEach(variant => {
        const sizeButton = document.createElement('button');
        sizeButton.textContent = `${variant.talla} (${variant.stock} disponibles)`;
        sizeButton.disabled = variant.stock === 0; // Deshabilitar si no hay stock
        sizeButton.classList.add('size-btn');

        // Evento para seleccionar el talle
        sizeButton.addEventListener('click', () => {
            // Remover la clase "selected" de todos los botones
            const botones = tallesContainer.querySelectorAll('.size-btn');
            botones.forEach(boton => boton.classList.remove('selected'));

        });

        sizeButton.addEventListener('click', () => {
            talleSeleccionado = variant.talla; // Guardar el talle seleccionado
            console.log(`Talle seleccionado: ${talleSeleccionado}`); // Depuración
        });

        tallesContainer.appendChild(sizeButton);
    });

    return talleSeleccionado;
}

/*-----------BOTON AGREGAR AL CARRITO------------*/

document.addEventListener('DOMContentLoaded', () => {
    const botonAgregarCarrito = document.querySelector('.btn-add-to-cart3');

    botonAgregarCarrito.addEventListener('click', () => {
        console.log('Botón "Agregar al carrito" clickeado'); // Depuración
        if (!talleSeleccionado) {
            alert('Por favor selecciona un talle antes de continuar.');
            return;
        }

        const productoSeleccionado = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            color: product.variantes[0].color,
            talla: talleSeleccionado,
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

