
export  const productosMujer = [
        
    {
    id: "mujer-1",
    nombre: "Remera Modal Soft",
    precio: 8000,
    categoria: "remeras",
    seccion: "mujer",
    temporada: "verano",
    descripcion: "Remera de cuello redondo suave y cómoda, ideal para días de verano.",
    imagen: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg"],
    miniaturas: [
       {src: "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg" },
       {src: "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg"},
        
    ],
    hoverImagenes: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg"], // Hover en el carrusel
    variantes: [
        { color: "celeste", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        { color: "negro", talla: "L", stock: 2, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
    ],
    imagenColores: {
        celeste: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
        ],
        negro: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg",
        ]
    }
},

    {
        id: "mujer-2",
        nombre: "Calza Nike Pro",
        etiqueta: "novedad",
        precio: 14000,
        categoria: "calzas",
        seccion: "mujer",
        temporada: "verano",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg", "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"],
        miniaturas: [
           {src: "img/mujer/calzas/calza-nike-pro-gris-1.jpeg"}, 
           {src: "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"},
        ],
        hoverImagenes: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"], // Hover en el carrusel
        variantes: [
            { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"
            ],
            gris: [
                "img/mujer/calzas/calza-nike-pro-gris-1.jpeg"
            ],
        }
    },

    { id: "mujer-3",
        nombre: "Campera Deportiva Nike",
        etiqueta: "novedad",
        precio: 30000,
        categoria: "camperas",
        seccion: "mujer",
        temporada: "media estacion",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"], // Imagen principal para el carrusel
        miniaturas: [
            {src:"img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg"},
                {src: "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg"},
                    {src: "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"},
        ], // Miniaturas para el carrusel
        hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"], // Hover en el carrusel
        variantes: [
            { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"
            ],
            rosa: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg"
            ],
            gris: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg"
            ],
        }
    },
        
    { id: "mujer-4", 
        nombre: "Blusa de Lino", 
        etiqueta: "novedad",
        precio: 9000, 
        categoria: "remeras",
        seccion: "mujer",
        temporada: "verano", 
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/remeras-lino/blusalino-negro-1.jpeg", ],
        miniaturas: [ 
            {src: "img/mujer/remeras-lino/blusalino-negro-1.jpeg"},

        ], 
        hoverImagenes: ["img/mujer/remeras-lino/blusalino-negro-1.jpeg"],
        variantes: [
            { color: "negro", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/remeras-lino/blusalino-negro-1.jpeg",
                "img/mujer/remeras-lino/blusalino-negro-1.jpeg",
                
            ],
           
        }
    },

    { id: "mujer-5", 
        nombre: "Calza Nike Radeon",
        etiqueta: "novedad", 
        precio: 13500, 
        categoria: "calzas", 
        seccion: "mujer",
        temporada: "verano",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"], 
        miniaturas: [ 
            {src:"img/mujer/calzas/calza-nike-radeon-1.jpeg"},

        ],
        hoverImagenes: [],
        variantes: [
            { color: "negro", talla: "S", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],       
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/calzas/calza-nike-radeon-1.jpeg"
            ],
            gris: [
                "img/mujer/calzas/calza-nike-radeon-1.jpeg"
            ],
           
        }
    },

    { id: "mujer-6", 
        nombre: "Calza Nike Grofada",
        etiqueta: "novedad", 
        precio: 15000, 
        categoria: "calzas", 
        seccion: "mujer",
        temporada: "verano",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-nike-grofada-1.jpeg"], 
        miniaturas: [ 
            {src: "img/mujer/calzas/calza-nike-grofada-1.jpeg"},

        ],
        hoverImagenes: [],
        variantes: [
            { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],        
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/calzas/calza-nike-grofada-1.jpeg"
                
            ],
            gris: [
                "img/mujer/calzas/calza-nike-grofada-1.jpeg"

            ],
        }
    },

    {   
        id: "mujer-7", 
        nombre: "Calza Nike Speak", 
        etiqueta: "novedad",
        precio: 13500, 
        categoria: "calzas", 
        seccion: "mujer",
        temporada: "verano",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-nike-speak-1.jpeg"], 
        miniaturas: [ 
            {src:"img/mujer/calzas/calza-nike-speak-1.jpeg"},

        ],
        hoverImagenes: [],
        variantes: [
            { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],        
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/calzas/calza-nike-speak-1.jpeg"
            ],
            gris: [
                "img/mujer/calzas/calza-nike-speak-1.jpeg"

            ],
        }
    },
    { id: "mujer-8", 
        nombre: "Calza Nike Fluorecent", 
        etiqueta: "novedad",
        precio: 13500, 
        categoria: "calzas",
        seccion: "mujer",
        temporada: "invierno",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.", 
        imagen: ["img/mujer/calzas/calza-nike-fluor-1.jpeg", "img/mujer/calzas/calza-nike-fluor-2.jpeg"], 
        miniaturas: [ 
            {src:"img/mujer/calzas/calza-nike-fluor-2.jpeg"},

        ],
        hoverImagenes: [],
        variantes: [
            { color: "rosa", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            rosa: [
                "img/mujer/calzas/calza-nike-fluor-1.jpeg"
            ],
          
        } 
    },

    { id: "mujer-9", 
        nombre: "Calza Adidas Original", 
        etiqueta: "novedad",
        precio: 13500, 
        categoria: "calzas", 
        seccion: "mujer",
        temporada: "verano",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-adidas-original-1.jpeg"], 
        miniaturas: [ 
            {src: "img/mujer/calzas/calza-adidas-original-1.jpeg"},
        ],
        hoverImagenes: [],
        variantes: [
            { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "multicolor", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],        
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/calzas/calza-adidas-original-1.jpeg"
                
            ],
        }
        
    },
    
];
