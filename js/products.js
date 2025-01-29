
  /*-------------------DETALLE DE PRODUCTO-------------- */

  import { productosMujer } from '/js/mujerProductos.js';

  import { productosMujer } from '/js/mujerProductos.js';

  function getProductIdFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
      const productId = getProductIdFromURL();
      const product = productosMujer.find(p => p.id === productId);
  
      if (!product) {
          alert('Producto no encontrado.');
          window.location.href = 'index.html';
          return;
      }
  
      console.log("Producto encontrado:", product);
  
      // Mostrar datos principales
      document.querySelector('#product-title').textContent = product.nombre;
      document.querySelector('#product-price').textContent = `$${product.precio.toLocaleString()}`;
      document.querySelector('#product-description').textContent = product.descripcion || 'Descripción no disponible';
  
      // Contenedor de galería e imágenes
      const gallery = document.querySelector('.zoom-container');
      const thumbnailsContainer = document.querySelector('.product-thumbnails');
      const coloresContainer = document.querySelector('#product-colors');
      const tallesContainer = document.querySelector('#product-sizes');
  
      // Verificar que hay imágenes en `imagenColores`
      if (!product.imagenColores || Object.keys(product.imagenColores).length === 0) {
          console.error("No hay imágenes disponibles para este producto.");
          gallery.innerHTML = '<p style="color: red;">No hay imágenes disponibles.</p>';
          return;
      }
  
      // Obtener primer color disponible
      let selectedColor = Object.keys(product.imagenColores)[0];
      if (!selectedColor || !product.imagenColores[selectedColor]) {
          console.error("No se encontró un color válido con imágenes.");
          return;
      }
  
      // Mostrar imágenes del color inicial
      mostrarImagenesColor(product, selectedColor);
      actualizarTalles(product, selectedColor);
  
      // Crear botones de selección de color
      coloresContainer.innerHTML = '<h3>Colores disponibles:</h3>';
      Object.keys(product.imagenColores).forEach(color => {
          const colorButton = document.createElement('button');
          colorButton.classList.add('color-btn');
          colorButton.setAttribute('data-color', color);
          colorButton.textContent = color;
          coloresContainer.appendChild(colorButton);
  
          colorButton.addEventListener('click', function () {
              selectedColor = this.getAttribute('data-color');
              mostrarImagenesColor(product, selectedColor);
              actualizarTalles(product, selectedColor);
          });
      });
  
      function mostrarImagenesColor(product, color) {
          gallery.innerHTML = ''; // Limpiar galería antes de agregar nuevas imágenes
          thumbnailsContainer.innerHTML = ''; // Limpiar miniaturas
  
          const imagenesColor = product.imagenColores[color];
  
          if (!imagenesColor || imagenesColor.length === 0) {
              console.error(`No hay imágenes para el color ${color}`);
              gallery.innerHTML = '<p style="color: red;">No hay imágenes disponibles.</p>';
              return;
          }
  
          // Imagen principal
          const mainImage = document.createElement('img');
          mainImage.src = imagenesColor[0];
          mainImage.alt = `${product.nombre} - ${color}`;
          mainImage.classList.add('zoom-img');
          gallery.appendChild(mainImage);
  
          // Miniaturas
          imagenesColor.forEach(imgSrc => {
              const thumbnail = document.createElement('img');
              thumbnail.src = imgSrc;
              thumbnail.classList.add('thumbnail-image');
              thumbnail.addEventListener('click', () => {
                  mainImage.src = imgSrc;
              });
              thumbnailsContainer.appendChild(thumbnail);
          });
      }
  
      function actualizarTalles(product, color) {
          tallesContainer.innerHTML = '';
          const variantesFiltradas = product.variantes.filter(variant => variant.color === color);
  
          variantesFiltradas.forEach(variant => {
              const sizeButton = document.createElement('button');
              sizeButton.textContent = `${variant.talla} (${variant.stock})`;
              sizeButton.disabled = variant.stock === 0;
              sizeButton.classList.add('size-btn');
  
              sizeButton.addEventListener('click', () => {
                  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
                  sizeButton.classList.add('selected');
                  console.log(`Talle seleccionado: ${variant.talla}`);
              });
  
              tallesContainer.appendChild(sizeButton);
          });
      }
  });
  
  /*----------- BOTÓN "AGREGAR AL CARRITO" ------------*/
  
  document.addEventListener('DOMContentLoaded', () => {
      const botonAgregarCarrito = document.querySelector('.btn-add-to-cart3');
  
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

