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
 document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del producto desde la URL
    const productId = getProductIdFromURL();
  
    // Buscar el producto en el array de productos
    const product = products.find(p => p.id === parseInt(productId));
  
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

  /*----------------------------------------------------------*/

 
  /*----------------MOSTRAR EL PRODUCTO DE LA PAGINA INDEX------------ */
  document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del producto desde la URL
    const productId = getProductIdFromURL();
  
    // Buscar el producto en el array de productos
    const product = products.find(p => p.id === parseInt(productId));
  
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
        id: 1,
        name: "Remera modal viscosa - cuello en V",
        price: 7500,
        description: "Remera de cuello en V suave al tacto.",
        images: [
            "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 2.jpeg",
            "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 3.jpeg"
        ],
        colors: ["Rosa", "Gris", "Negro"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        status: "Nuevo"
    },
    {
        id: 2,
        name: "Bermuda Cargo Nike",
        price: 25000,
        description: "Bermuda cómoda de Nike ideal para verano.",
        images: [
            "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 1.jpeg",
            "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 2.jpeg"
        ],
        colors: ["Beige", "Tostado", "Negro"],
        sizes: ["M", "L", "XL"],
        status: ""
    },
    {
        id: 3,
        name: "Remera Modal Soft",
        price: 7500,
        description: "Remera modal suave para un uso cómodo.",
        images: [
            "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 1.jpeg",
            "img/mujer/remera-modal-soft-cuelloR/remera-modal-soft-cuelloR 2.jpeg"
        ],
        colors: ["Celeste", "Negro"],
        sizes: ["S", "M", "L", "XL"],
        status: "Nuevo"
    }
];

// Cargar el producto en la página de producto
document.addEventListener('DOMContentLoaded', function () {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id == productId);

    if (product) {
        // Actualiza el título, precio y descripción
        document.querySelector('.product-title3').textContent = product.name;
        document.querySelector('.product-price3').textContent = `$${product.price.toLocaleString()}`;
        document.querySelector('.product-details3').textContent = product.description;

        // Galería de imágenes y miniaturas
        const gallery = document.querySelector('.product-gallery');
        gallery.innerHTML = '';  // Limpiar la galería
        product.images.forEach((imageSrc, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.alt = `Vista ${index + 1}`;
            imgElement.classList.add('zoom-img');
            gallery.appendChild(imgElement);
        });

        // Colores disponibles
        const colorsContainer = document.querySelector('.product-colors3');
        colorsContainer.innerHTML = '<h3>Colores</h3>';
        product.colors.forEach(color => {
            const colorElement = document.createElement('span');
            colorElement.textContent = color;
            colorsContainer.appendChild(colorElement);
        });

        // Talles disponibles
        const sizeOptions = document.querySelector('.size-options');
        sizeOptions.innerHTML = '';  // Limpiar los talles antes de agregarlos
        product.sizes.forEach(size => {
            const sizeBtn = document.createElement('button');
            sizeBtn.classList.add('size-btn');
            sizeBtn.textContent = size;
            sizeOptions.appendChild(sizeBtn);
        });

        // Mostrar estado si existe
        if (product.status) {
            const productStatus = document.createElement('p');
            productStatus.classList.add('product-status3');
            productStatus.textContent = product.status;
            document.querySelector('.product-details-section').appendChild(productStatus);
        }
    } else {
        // Redirigir si no se encuentra el producto
        alert('Producto no encontrado');
        window.location.href = 'index.html';
    }
});

// Tabla de talles (modal)
function toggleSizeChart(event) {
    event.preventDefault();
    const sizeChartModal = document.getElementById('sizeChartModal');
    sizeChartModal.classList.toggle('hidden');
}

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