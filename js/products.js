
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

// Zoom en las imágenes del producto
document.querySelectorAll('.zoom-container').forEach(container => {
    let isZoomed = false;
    let startX, startY;

    container.addEventListener('click', function (e) {
        const img = this.querySelector('img, video');
        const rect = this.getBoundingClientRect();

        if (!isZoomed) {
            isZoomed = true;
            img.style.transform = 'scale(2)';
            this.style.cursor = 'zoom-out';
            startX = e.pageX - rect.left;
            startY = e.pageY - rect.top;
        } else {
            isZoomed = false;
            img.style.transform = 'scale(1)';
            img.style.left = '0';
            img.style.top = '0';
            this.style.cursor = 'zoom-in';
        }
    });

    container.addEventListener('mousemove', function (e) {
        if (!isZoomed) return;

        const img = this.querySelector('img, video');
        const rect = this.getBoundingClientRect();

        const mouseX = e.pageX - rect.left;
        const mouseY = e.pageY - rect.top;

        const moveX = ((mouseX / rect.width) * 300 - 150);
        const moveY = ((mouseY / rect.height) * 300 - 150);

        const maxTranslateX = Math.max(0, (img.getBoundingClientRect().width - rect.width) / 8);
        const maxTranslateY = Math.max(0, (img.getBoundingClientRect().height - rect.height) / 8);

        const translateX = Math.min(maxTranslateX, Math.max(-maxTranslateX, moveX));
        const translateY = Math.min(maxTranslateY, Math.max(-maxTranslateY, moveY));

        img.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
        img.style.cursor = 'zoom-out';
    });

    container.addEventListener('mouseenter', function () {
        this.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
    });

    container.addEventListener('mouseleave', function () {
        if (isZoomed) {
            this.style.cursor = 'zoom-out';
        }
    });
});
/*----------------------------------------------------------------------*/

 /*--------------------BUSCADOR DE PRODUCTO---------------*/
 document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // 'id' como string

    // Buscar el producto en el array de productos
    const product = productosMujer.find(p => p.id === productId); // Comparar como cadena

    if (product) {
        // Actualizar el título del producto
        document.querySelector('.product-title').textContent = product.nombre;
        // Actualizar el precio del producto
        document.querySelector('.product-price').textContent = `$${product.precio.toLocaleString()}`;
        // Actualizar los detalles del producto
        document.querySelector('.product-details').textContent = `Categoría: ${product.categoria}`;
        // Actualizar los talles disponibles
        const sizeOptions = document.querySelector('.size-options');
        sizeOptions.innerHTML = ''; // Limpiar los talles antes de agregarlos
        product.variantes.forEach(size => {
            const sizeBtn = document.createElement('button');
            sizeBtn.classList.add('size-btn');
            sizeBtn.textContent = size.talla;
            sizeOptions.appendChild(sizeBtn);
        });

        // Actualizar las imágenes
        const gallery = document.querySelector('.product-gallery');
        gallery.innerHTML = '';  // Limpiar la galería antes de agregar las nuevas imágenes
        product.imagen.forEach(imageSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.alt = product.nombre;
            imgElement.classList.add('zoom-img');
            gallery.appendChild(imgElement);
        });
    } else {
        // Si no se encuentra el producto, muestra un mensaje de error o redirige al usuario
        alert('Producto no encontrado');
        window.location.href = 'index.html'; // Redirigir a la página principal si no se encuentra el producto
    }
});
  
 
  /*----------------MOSTRAR EL PRODUCTO DE LA PAGINA INDEX------------ */

  document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del producto desde la URL
    const productId = getProductIdFromURL();
  
    // Buscar el producto en el array de productos
    const product = products.find(p => p.id === productId);  // El ID ya es string, no lo parses
  
    if (product) {
      // Actualizar el título del producto
      document.querySelector('.product-title').textContent = product.name;
  
      // Actualizar el precio del producto
      document.querySelector('.product-price').textContent = `$${product.price.toLocaleString()}`;
  
      // Actualizar los detalles del producto
      document.querySelector('.product-details').textContent = `Categoría: ${product.category}`;
  
      // Actualizar los talles disponibles
      const sizeOptions = document.querySelector('.size-options');
      sizeOptions.innerHTML = ''; // Limpiar los talles antes de agregarlos
      product.size.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.classList.add('size-btn');
        sizeBtn.textContent = size;
        sizeOptions.appendChild(sizeBtn);
      });
  
      // Actualizar las imágenes
      const gallery = document.querySelector('.product-gallery');
      gallery.innerHTML = '';  // Limpiar la galería antes de agregar las nuevas imágenes
      product.images.forEach(imageSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.alt = product.name;
        imgElement.classList.add('zoom-img');
        gallery.appendChild(imgElement);
      });
  
      // Agregar un video si lo tienes, o lo puedes ocultar si no
      const videoElement = document.querySelector('video');
      if (!product.video) {
        videoElement.style.display = 'none'; // Oculta el video si no hay uno disponible
      }
    } else {
      // Si no se encuentra el producto, muestra un mensaje de error o redirige al usuario
      alert('Producto no encontrado');
      window.location.href = 'index.html'; // Redirigir a la página principal si no se encuentra el producto
    }
  });

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
        document.querySelector('#product-title').textContent = product.nombre;
        document.querySelector('#product-price').textContent = `$${product.precio.toLocaleString()}`;
        document.querySelector('#product-description').textContent = product.descripcion || 'Descripción no disponible';

        // Cargar colores
        const coloresContainer = document.querySelector('#product-colors');
        coloresContainer.innerHTML = '<h3>Colores disponibles:</h3>';
        product.variantes.forEach(variant => {
            const colorElement = document.createElement('span');
            colorElement.textContent = variant.color;
            coloresContainer.appendChild(colorElement);
        });

        // Cargar talles
        const tallesContainer = document.querySelector('#product-sizes');
        tallesContainer.innerHTML = '';
        product.variantes.forEach(variant => {
            const sizeElement = document.createElement('button');
            sizeElement.textContent = `${variant.talla} (${variant.stock} disponibles)`;
            sizeElement.disabled = variant.stock === 0;
            tallesContainer.appendChild(sizeElement);
        });

        // Cargar imágenes
        const gallery = document.querySelector('.product-gallery');
        gallery.innerHTML = '';
        product.imagen.forEach(imgSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = product.nombre;
            imgElement.classList.add('zoom-img');
            gallery.appendChild(imgElement);
        });
    } else {
        alert("Producto no encontrado.");
        window.location.href = 'index.html';
    }
});

/*--------------------------------------------------------------------------- */

/*---------------CODIGO DE SECCION MUJER------------*/
function getProductDetailsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const seccion = params.get('seccion');
    const temporada = params.get('temporada'); // Opcional

    return { id: parseInt(id), seccion, temporada };
}

/*--------------------------------------------------------------- */


// Función para cargar detalles del producto
function cargarDetallesProducto(producto) {
    document.querySelector('#product-title').textContent = producto.nombre;
    document.querySelector('#product-price').textContent = `$${producto.precio.toLocaleString()}`;
    document.querySelector('#product-description').textContent = producto.descripcion || 'Descripción no disponible';

    // Cargar imágenes
    const gallery = document.querySelector('.product-gallery');
    gallery.innerHTML = '';
    producto.imagen.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = producto.nombre;
        img.classList.add('zoom-img');
        gallery.appendChild(img);
    });

    // Cargar colores
    const colores = document.querySelector('#product-colors');
    colores.innerHTML = '<h3>Colores disponibles:</h3>';
    producto.variantes.forEach(variant => {
        const colorItem = document.createElement('span');
        colorItem.textContent = variant.color;
        colores.appendChild(colorItem);
    });

    // Cargar talles
    const talles = document.querySelector('#product-sizes');
    talles.innerHTML = '';
    producto.variantes.forEach(variant => {
        const sizeBtn = document.createElement('button');
        sizeBtn.classList.add('size-btn');
        sizeBtn.textContent = `${variant.talla} (${variant.stock} disponibles)`;
        sizeBtn.disabled = variant.stock === 0;
        talles.appendChild(sizeBtn);
    });
}

// Lógica principal
document.addEventListener('DOMContentLoaded', () => {
    const { id, seccion } = getProductDetailsFromURL();

    // Seleccionar la lista de productos según la sección
    let productos;
    switch (seccion) {
        case 'mujer':
            productos = productosMujer;
            break;
        // Agrega más secciones según sea necesario
        default:
            alert('Sección desconocida o no definida');
            return;
    }

    const producto = productos.find(p => p.id === id);

    if (producto) {
        cargarDetallesProducto(producto);
    } else {
        alert('Producto no encontrado');
        window.location.href = 'index.html';
    }
});


const productId = params.get('id');
console.log("ID del producto desde la URL: ", productId); // Verifica que el ID sea correcto

const product = productosMujer.find(p => p.id === productId);
console.log("Producto encontrado: ", product); // Verifica si el producto se encuentra






























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

