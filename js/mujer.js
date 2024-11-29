
/*-------------FILTRO MUJER----------------*/

document.addEventListener('DOMContentLoaded', () => {
    const mujerProductsGrid = document.querySelector('.mujer-products-grid');
    const filterButtons = document.querySelectorAll('.mujer-filter-button');

    const productosMujer = [
        { 
            id: 1, 
            nombre: "Remera Modal Soft", 
            precio: 7500, 
            categoria: "remeras", 
            imagen: ["img/mujer/remera-modal-soft-cuelloR/front.jpeg", "img/mujer/remera-modal-soft-cuelloR/back.jpeg"], 
            miniaturas: ["img/mujer/remera-modal-soft-cuelloR/blue.jpeg", "img/mujer/remera-modal-soft-cuelloR/red.jpeg"],
            etiqueta: "Novedades"
        },
        { 
            id: 2, 
            nombre: "Blusa de Lino", 
            precio: 8500, 
            categoria: "remeras", 
            imagen: ["img/mujer/blusa-lino/front.jpeg", "img/mujer/blusa-lino/back.jpeg"], 
            miniaturas: ["img/mujer/blusa-lino/black.jpeg", "img/mujer/blusa-lino/white.jpeg"],
            etiqueta: ""
        },
        { 
            id: 3, 
            nombre: "Campera Deportiva Nike", 
            precio: 23000, 
            categoria: "camperas", 
            imagen: ["img/mujer/camperas-deportivas/campera-nike-front.jpeg", "img/mujer/camperas-deportivas/campera-nike-back.jpeg"], 
            miniaturas: ["img/mujer/camperas-deportivas/black.jpeg", "img/mujer/camperas-deportivas/white.jpeg"],
            etiqueta: "Novedades"
        }
    ];

    function mostrarProductos(categoria = "all") {
        mujerProductsGrid.innerHTML = "";

        const productosFiltrados = productosMujer.filter(producto => 
            categoria === "all" || producto.categoria === categoria
        );

        productosFiltrados.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('mujer-product-card');

            productoDiv.innerHTML = `
                <div class="product-container-mujer">
                    <div class="product-image-mujer">
                        <img id="mainImage-${producto.id}" 
                            src="${producto.imagen[0]}" 
                            alt="${producto.nombre}" 
                            class="main-product-image">
                        <div class="product-thumbnails hidden-thumbnails">
                            ${producto.miniaturas.map((img, index) => `
                                <img src="${img}" 
                                    alt="Miniatura ${index + 1}" 
                                    class="thumbnail-image" 
                                    data-main-image-id="mainImage-${producto.id}">
                            `).join('')}
                        </div>
                    </div>
                    <div class="product-details-mujer">
                        <p class="mujer-product-price">$${producto.precio.toLocaleString()}</p>
                        <p class="mujer-product-name">${producto.nombre}</p>
                        <p class="mujer-product-categoria">${producto.categoria}</p>
                        <p class="mujer-product-etiqueta">${producto.etiqueta}</p>
                    </div>
                </div>
            `;

            const mainImage = productoDiv.querySelector(`#mainImage-${producto.id}`);

            // Hover en la imagen principal
            const productImageContainer = productoDiv.querySelector('.product-image-mujer');
            productImageContainer.addEventListener('mouseover', () => {
                mainImage.src = producto.imagen[1]; // Cambiar a imagen de hover
            });

            productImageContainer.addEventListener('mouseout', () => {
                mainImage.src = producto.imagen[0]; // Volver a imagen inicial
            });

            // Hover en las miniaturas
            const thumbnails = productoDiv.querySelectorAll('.thumbnail-image');
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('mouseover', () => {
                    mainImage.src = thumbnail.src; // Cambiar a la miniatura
                });

                thumbnail.addEventListener('mouseout', () => {
                    mainImage.src = producto.imagen[0]; // Volver a imagen inicial
                });
            });

            mujerProductsGrid.appendChild(productoDiv);
        });
    }

    // Cambiar productos según el filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const categoria = button.getAttribute('data-filter');
            mostrarProductos(categoria);
        });
    });

    // Mostrar todos los productos inicialmente
    mostrarProductos();


    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const categoria = button.getAttribute('data-filter');
            mostrarProductos(categoria);
        });
    });

    if (filterDropdownToggle && filterOverlay) {
        filterDropdownToggle.addEventListener('click', () => {
            filterOverlay.classList.add('show');
            filterOverlay.style.display = 'block';
        });
    }

    if (closeFilterButton) {
        closeFilterButton.addEventListener('click', () => {
            filterOverlay.classList.remove('show');
            setTimeout(() => {
                filterOverlay.style.display = 'none';
            }, 300);
        });
    }

    applyFiltersButton.addEventListener('click', () => {
        const selectedCategory = document.querySelector('.mujer-filter-button.active').getAttribute('data-filter');
        const selectedColors = Array.from(colorCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());
        const selectedSizes = Array.from(sizeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toUpperCase());

        mostrarProductos(selectedCategory, selectedColors, selectedSizes);

        filterOverlay.classList.remove('show');
        setTimeout(() => {
            filterOverlay.style.display = 'none';
        }, 300);
    });

    clearFiltersButton.addEventListener('click', () => {
        sortRadios.forEach(radio => (radio.checked = false));
        colorCheckboxes.forEach(checkbox => (checkbox.checked = false));
        sizeCheckboxes.forEach(checkbox => (checkbox.checked = false));

        mostrarProductos();
    });

    actualizarContadores();
    });

  

/*----------------------MENU DESPLEGABLE COLPASIBLES--------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const collapsibleSections = document.querySelectorAll('.collapsible-section');

    collapsibleSections.forEach((section, index) => {
        const toggleButton = section.querySelector('.collapsible-toggle');
        const content = section.querySelector('.collapsible-content');

        if (toggleButton && content) {
            console.log(`Configurando despliegue en la sección de filtro número ${index + 1}`);

            toggleButton.addEventListener('click', () => {
                // Alternar visibilidad
                content.style.display = content.style.display === 'none' ? 'block' : 'none';

                // Alternar símbolo de desplegar/cerrar
                const symbol = toggleButton.querySelector('span');
                symbol.textContent = content.style.display === 'block' ? '▼' : '▲';
                console.log(`Contenido de la sección ${index + 1} ahora está ${content.style.display === 'none' ? 'oculto' : 'visible'}`);
            });
        } else {
            console.warn(`Faltan elementos (toggle o contenido) en la sección de filtro número ${index + 1}.`);
        }
    });

    console.log("Scripts cargados correctamente. Verifica si el filtro funciona como se espera.");
});

/*----------------FILTRO DESPLEGABLE---------------------*/
console.log(`Filtrando productos por categoría: ${categoria}`);
console.log(productosFiltrados);