
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
            {
                color: "celeste", talla: "L", stock: 1, pecho: "88-92", cintura: "76-80", cadera: "92-96"},
            {
                color: "negro", talla: "L", stock: 1, pecho: "93-97", cintura: "81-85", cadera: "97-101"}
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
            {
                color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106"},
            {
                color: "gris",  talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106"}
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
                { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
                { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
                { color: "negro", talla: "XL", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106"}
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
                { color: "negro", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
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
                { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
                { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
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
                { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
                { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
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
                { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
                { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
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
                { color: "rosa", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
                { color: "rosa", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
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
                { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
                { color: "multicolor", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
            ]
            
        },
   
];

/*--------------------------------------------------------- */

/*----------------------CODIGO REDIRECCION MUJER----------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Captura el id de la URL

    if (!productId) {
        alert("Producto no especificado.");
        window.location.href = 'index.html'; // Redirige si no hay id
        return;
    }

    const product = productosMujer.find(p => p.id === productId); // Busca el producto

    if (product) {
        console.log("Producto encontrado:", product); // Depuración

        // Título, precio y descripción
        const productTitle = document.querySelector('#product-title');
        const productPrice = document.querySelector('#product-price');
        const productDescription = document.querySelector('#product-description');
        

        // Galería de imágenes
        const gallery = document.querySelector('.product-gallery .zoom-container');
        gallery.innerHTML = ''; // Limpiar cualquier contenido previo
        product.imagen.forEach(imgSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = product.nombre;
            imgElement.classList.add('zoom-img');
            gallery.appendChild(imgElement);
        });

        // Miniaturas
        const thumbnailsContainer = document.querySelector('#product-thumbnails');
        thumbnailsContainer.innerHTML = ''; // Limpiar miniaturas previas
        product.miniaturas.forEach(thumbnailSrc => {
            const thumbnail = document.createElement('img');
            thumbnail.src = thumbnailSrc;
            thumbnail.alt = `${product.nombre} - Miniatura`;
            thumbnail.classList.add('thumbnail-image');

            thumbnail.addEventListener('click', () => {
                document.querySelector('.zoom-img').src = thumbnailSrc; // Cambiar la imagen principal
            });

            thumbnailsContainer.appendChild(thumbnail);
        });

        // Colores disponibles
        const coloresContainer = document.querySelector('#product-colors');
        coloresContainer.innerHTML = '<h3>Colores:</h3>'; // Agregar título
        const coloresUnicos = [...new Set(product.variantes.map(variant => variant.color))];
        coloresUnicos.forEach(color => {
            const colorThumbnail = document.createElement('span');
            colorThumbnail.textContent = color;
            colorThumbnail.classList.add('color-thumbnail');
            colorThumbnail.style.backgroundColor = color; // Usar el color como fondo si es válido

            colorThumbnail.addEventListener('click', () => {
                actualizarTalles(product, color); // Actualizar talles disponibles
            });

            coloresContainer.appendChild(colorThumbnail);
        });

        // Talles disponibles
        actualizarTalles(product, coloresUnicos[0]); // Mostrar talles del primer color
    } else {
        alert("Producto no encontrado.");
        window.location.href = 'index.html';
    }
});

// Función para actualizar talles según el color seleccionado
function actualizarTalles(product, color) {
    const tallesContainer = document.querySelector('#product-sizes');
    tallesContainer.innerHTML = ''; // Limpiar contenido previo

    const tallesFiltrados = product.variantes.filter(variant => variant.color === color);
    tallesFiltrados.forEach(variant => {
        const tallaBtn = document.createElement('button');
        tallaBtn.textContent = `${variant.talla} (${variant.stock} disponibles)`;
        tallaBtn.classList.add('size-btn');
        tallaBtn.disabled = variant.stock === 0; // Deshabilitar si no hay stock

        tallaBtn.addEventListener('click', () => {
            // Destacar el talle seleccionado
            const botones = tallesContainer.querySelectorAll('.size-btn');
            botones.forEach(boton => boton.classList.remove('selected'));
            tallaBtn.classList.add('selected');
        });

        tallesContainer.appendChild(tallaBtn);
    });
}

/*---------------------ACTUALIZAR TALLES -----------------*/

function actualizarTalles(product, color) {
    const tallesContainer = document.querySelector('#product-sizes');
    tallesContainer.innerHTML = '<h3>Selecciona tu talla:</h3>';

    const tallesFiltrados = product.variantes.filter(variant => variant.color === color);

    tallesFiltrados.forEach(variant => {
        const sizeButton = document.createElement('button');
        sizeButton.textContent = `${variant.talla} (${variant.stock} disponibles)`;
        sizeButton.disabled = variant.stock === 0;
        sizeButton.classList.add('size-btn');

        sizeButton.addEventListener('click', () => {
            // Remover la clase "selected" de todos los botones
            const botones = tallesContainer.querySelectorAll('.size-btn');
            botones.forEach(boton => boton.classList.remove('selected'));

            // Agregar la clase "selected" al botón actual
            sizeButton.classList.add('selected');
            talleSeleccionado = variant.talla; // Actualizar la variable global
            console.log(`Talle seleccionado: ${talleSeleccionado}`);
        });

        tallesContainer.appendChild(sizeButton);
    });
}

/*----------------ACTUALIZAR TABLA DE TALLES -------------- */

function actualizarTablaDeTalles(product, color) {
    const sizeChartTable = document.querySelector('#sizeChartTable tbody');
    if (!sizeChartTable) {
        console.error("No se encontró la tabla de talles.");
        return;
    }

    // Limpiar filas existentes
    sizeChartTable.innerHTML = '';

    // Filtrar variantes por el color seleccionado
    const variantesFiltradas = product.variantes.filter(variant => variant.color === color);

    // Llenar la tabla con las variantes filtradas
    variantesFiltradas.forEach(variant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${variant.talla}</td>
            <td>${variant.pecho || 'N/A'}</td>
            <td>${variant.cintura || 'N/A'}</td>
            <td>${variant.cadera || 'N/A'}</td>
        `;
        sizeChartTable.appendChild(row);
    });
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

