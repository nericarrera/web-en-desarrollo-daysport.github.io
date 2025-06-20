// Función para obtener el parámetro de búsqueda
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) || '';
}

const query = getQueryParam('query').toLowerCase();

// Importa los productos de todas las secciones
Promise.all([
  import('./mujerProductos.js'),
  import('./hombreProductos.js'),
  import('./accesoriosProductos.js'),
  import('./niñosProductos.js'),

]).then(([mujerModule, hombreModule, niñosModule, accesoriosModule]) => {
  // Une todos los productos en un solo array
  const productos = [
    ...(mujerModule.productosMujer || []),
    ...(hombreModule.productosHombre || []),
    ...(niñosModule.productosNiños || []),
    ...(accesoriosModule.productosAccesorios || []),
  ];

  // Filtra los productos por nombre, descripción o categoría
  const resultados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(query) ||
    (producto.descripcion && producto.descripcion.toLowerCase().includes(query)) ||
    (producto.categoria && producto.categoria.toLowerCase().includes(query))
  );

  // Muestra los resultados
  const contenedor = document.getElementById('resultados-busqueda');
  if (contenedor) {
    if (resultados.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron productos.</p>';
    } else {
      contenedor.innerHTML = resultados.map(prod => `
        <div class="producto">
          <img src="${prod.imagen[0]}" alt="${prod.nombre}">
          <h3>${prod.nombre}</h3>
          <p>${prod.descripcion || ''}</p>
          <p>$${prod.precio}</p>
        </div>
      `).join('');
    }
  }
});