
        const prevArrow = document.getElementById('prevArrow');
        const nextArrow = document.getElementById('nextArrow');
        const img = document.querySelector('.imgcard');
        const images = ['img/mujer/calza-nike2.png', 'img/calza-nike2.png', 'img/calza-nike2.png']; // Ruta de las imágenes

        let currentImageIndex = 0;

        // Función para mostrar la siguiente imagen
        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            img.src = images[currentImageIndex];
        }

        // Función para mostrar la imagen anterior
        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            img.src = images[currentImageIndex];
        }

        // Event listeners para las flechas
        prevArrow.addEventListener('click', showPrevImage);
        nextArrow.addEventListener('click', showNextImage);
