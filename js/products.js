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

/*--------ID DE PAGINA PRINCIPAL ---------- */
// Función para obtener los parámetros de la URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');  // Obtiene el valor del parámetro 'id'
  }

  /*------------------------------------------------------------------------- */

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

  /*-------------------DETALLE DE PRODUCTO-------------- */
  const products = [
    {
      id: 1,
      name: "Remera modal viscosa - cuello en V",
      price: 7500,
      gender: "mujer",
      category: "remeras",
      size: ["S", "M", "L", "XL"],
      images: ["img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 2.jpeg", "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 3.jpeg", "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 4.jpeg", "img/mujer/remeras-modal-viscosa-cuelloV/remera modal viscosa 5.jpeg"],
      colors: ["Rosa", "Gris", "Negro", "Verde oliva"],
      status: "Nuevo"
    },
    {
      id: 2,
      name: "Bermuda Cargo Nike",
      price: 25000,
      gender: "hombre",
      category: "bermudas",
      size: ["M", "L", "XL"],
      images: ["img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 1.jpeg", "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 2.jpeg", "img/hombre/bermudas-cargo-nike/bermuda-cargo-nike 3.jpeg"],
      colors: ["Beige", "Tostado", "Negro"],
      status: ""
    },
    // Agrega más productos aquí...
  ];

  /*---------------- */

// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro "producto" de la URL
    var params = new URLSearchParams(window.location.search);
    var producto = params.get("producto");

    // Cambiar el contenido dinámicamente dependiendo del producto
    if (producto === "campera-puffer") {
        document.querySelector(".product-title").textContent = "CAMPERA PUFFER TNF";
        document.querySelector(".product-price").textContent = "$60.000";
        document.querySelector("#mainImage").src = "img/hombre/Camperas de Abrigo/WhatsApp Image 2024-04-30 at 15.56.00 (2).jpeg";
    } else if (producto === "conjunto-tech-premium") {
        document.querySelector(".product-title").textContent = "Conjunto Tech Premium";
        document.querySelector(".product-price").textContent = "$60.000";
        document.querySelector("#mainImage").src = "img/hombre/conjuntos/WhatsApp Image 2024-07-06 at 22.29.24 (1)-fotor-2024070717438.png";
    }
    // Puedes agregar más casos para otros productos...
});

window.addEventListener('scroll', function () {
    const sidebar = document.querySelector('.product-details-sidebar');
    const footer = document.querySelector('footer'); // Asumiendo que el footer tiene esta etiqueta
    const sidebarTop = sidebar.offsetTop;
    const footerTop = footer.offsetTop;
    const windowScroll = window.scrollY;
    const sidebarHeight = sidebar.offsetHeight;
    const footerHeight = footer.offsetHeight;
    
    // Limite inferior (donde se debe detener)
    const limit = footerTop - sidebarHeight;
    
    // Guardar el valor de "right" o "left" original del contenedor
    const sidebarRight = window.innerWidth - sidebar.getBoundingClientRect().right + 'px';

    if (windowScroll >= sidebarTop && windowScroll <= limit) {
        // Si el scroll está en el área entre el inicio del sidebar y el footer
        sidebar.style.position = 'fixed';
        sidebar.style.top = '10px'; // Puedes ajustar este valor
        sidebar.style.right = sidebarRight; // Mantener la posición a la derecha
    } else if (windowScroll > limit) {
        // Si el scroll supera el límite (para evitar que se solape con el footer)
        sidebar.style.position = 'absolute';
        sidebar.style.top = limit + 'px';
        sidebar.style.right = '0px'; // Vuelve a la posición original al detenerse
    } else {
        // Si el scroll está arriba del contenedor, lo ponemos de nuevo en su posición original
        sidebar.style.position = 'static';
    }
});


document.querySelectorAll('.zoom-container').forEach(container => {
    let isZoomed = false;
    let startX, startY;

    // Clic para hacer zoom
    container.addEventListener('click', function (e) {
        const img = this.querySelector('img, video');
        const rect = this.getBoundingClientRect();

        if (!isZoomed) {
            isZoomed = true;
            this.classList.add('zoomed');
            img.style.transform = 'scale(2)';  // Zoom al 200%
            this.style.cursor = 'zoom-out';  // Cambia a la lupa de zoom out
            startX = e.pageX - rect.left;
            startY = e.pageY - rect.top;
        } else {
            isZoomed = false;
            this.classList.remove('zoomed');
            img.style.transform = 'scale(1)';  // Vuelve al tamaño original
            img.style.left = '0';
            img.style.top = '0';
            this.style.cursor = 'zoom-in';  // Cambia a la lupa de zoom in
        }
    });

    // Movimiento del mouse para hacer scroll en la imagen cuando está en zoom
    container.addEventListener('mousemove', function (e) {
        if (!isZoomed) return;

        const img = this.querySelector('img, video');
        const rect = this.getBoundingClientRect();

        // Posición del mouse relativa al contenedor
        const mouseX = e.pageX - rect.left;
        const mouseY = e.pageY - rect.top;

        // Obtener el tamaño de la imagen
        const imgRect = img.getBoundingClientRect();

        // Calcular cuánto puede moverse la imagen sin salirse del contenedor
        const moveX = ((mouseX / rect.width) * 300 - 150);  // Mayor sensibilidad de movimiento
        const moveY = ((mouseY / rect.height) * 300 - 150);

        // Limitar el movimiento para que no se salga del borde
        const maxTranslateX = Math.max(0, (imgRect.width - rect.width) / 8);  
        const maxTranslateY = Math.max(0, (imgRect.height - rect.height) / 8);

        // Aplicar el límite de movimiento asegurando que no se vea fuera del borde
        const translateX = Math.min(maxTranslateX, Math.max(-maxTranslateX, moveX));
        const translateY = Math.min(maxTranslateY, Math.max(-maxTranslateY, moveY));

        // Mover la imagen dentro de los límites
        img.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
        img.style.cursor = 'zoom-out';  // Cambia el cursor a lupa mientras esté en zoom
    });

    // Cambiar el cursor a lupa cuando esté dentro del contenedor en estado de zoom
    container.addEventListener('mouseenter', function () {
        this.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';  // Muestra la lupa correctamente
    });

    // Cambiar el cursor a lupa incluso al salir del área de zoom
    container.addEventListener('mouseleave', function () {
        if (isZoomed) {
            this.style.cursor = 'zoom-out';  // Se mantiene el cursor de lupa al salir del área
        }
    });
});


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
