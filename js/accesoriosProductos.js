
export const productosAccesorios = [
        
    {
        id: "accesorios-1",
        nombre: "Campera Boss",
        precio: 50000,
        categoria: "camperas",
        seccion: "accesorios",
        temporada: "invierno",
        descripcion: "Campera de Invierno Puffer abrigada combinada.",
        imagen: ["img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-neg-viol-1.jpeg"],
        miniaturas: ["img/hombre/Camperas/camperas-abrigo/campera-abrigo-boss-blan-neg-1.jpeg", "img/hombre/Camperas/camperas-abrigo/campera-abrigo-boss-militar-neg-1.jpeg"],
        hoverImagenes: ["img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-neg-viol-2.jpeg"],
        etiqueta: "novedad",
        variantes: [
            { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "verde", talla: "L", stock: 2, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "blanco", talla: "L", stock: 2, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro : [
                "img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-neg-viol-1.jpeg"
                
            ],
            verde: [
                "img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-militar-neg-1.jpeg"
                
            ],
            blanco: [
                "img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-blan-neg-1.jpeg"
            ],

        }
    },

    {
        id: "accesorios-2",
        nombre: "Calza Nike Pro",
        precio: 13500,
        categoria: "calzas",
        seccion: "accesorios",
        temporada: "verano",
        descripcion: "Campera deportiva de alta calidad con diseño moderno y detalles únicos.",
        imagen: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg", "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"],
        miniaturas: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg", "img/mujer/calzas/calza-nike-pro-neg-1.jpeg"],
        hoverImagenes: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"],
        etiqueta: "novedad",
        variantes: [
            { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/calzas/calza-nike-pro-gris-1.jpeg",
            ],
            gris: [
                "img/mujer/calzas/calza-nike-pro-gris-1.jpeg",
            ],
        }
    },

    { id: "accesorios-3",
        nombre: "Campera Deportiva Nike",
        precio: 13500,
        categoria: "camperas",
        seccion: "accesorios",
        temporada: "media estacion",
        imagen: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg"], // Imagen principal para el carrusel
        hoverImagenes: ["img/mujer/camperas-deportivas/campera-deportiva-nike-5.jpeg"], // Hover en el carrusel
        miniaturas: [
            "img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg",
            "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg",
            "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"
        ], // Miniaturas para el carrusel
        etiqueta: "novedad",
        variantes: [
            { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg",
            ],
            rosa: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg",
            ],
            gris: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg",
            ]
        }
    },
        
    { id: "accesorios-4", 
        nombre: "Blusa de Lino", 
        precio: 9000, 
        categoria: "remeras",
        seccion: "accesorios",
        temporada: "verano", 
        imagen: ["img/mujer/remeras-lino/blusalino-negro-1.jpeg"], 
        hoverImagenes: [],
        miniaturas: ["img/mujer/remeras-lino/blusalino-negro-1.jpeg"],
        etiqueta: "novedad",
        variantes: [
            { color: "negro", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-detalle.jpeg"
            ],
            rojo: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-detalle.jpeg"
            ],
            azul: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-detalle.jpeg"
            ]
        }
    },

    { id: "accesorios-5", 
        nombre: "Calza Nike Radeon", 
        precio: 13500, 
        categoria: "calzas", 
        seccion: "accesorios",
        temporada: "verano",
        imagen: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"], 
        hoverImagenes: [],
        miniaturas: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"],
        etiqueta: "novedad",
        variantes: [
            { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-detalle.jpeg"
            ],
            rojo: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-detalle.jpeg"
            ],
            azul: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-detalle.jpeg"
            ]
        }
    },

    { id: "accesorios-6", 
        nombre: "Calza Nike Grofada", 
        precio: 15000, 
        categoria: "calzas", 
        seccion: "accesorios",
        temporada: "verano",
        imagen: ["img/mujer/calzas/calza-nike-grofada-1.jpeg"], 
        hoverImagenes: [],
        miniaturas: ["img/mujer/calzas/calza-nike-grofada-1.jpeg"],
        etiqueta: "novedad",
        variantes: [
            { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-detalle.jpeg"
            ],
            rojo: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-detalle.jpeg"
            ],
            azul: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-detalle.jpeg"
            ]
        }
    },
    { id: "accesorios-7", 
        nombre: "Calza Nike Speak", 
        precio: 13500, 
        categoria: "calzas", 
        seccion: "accesorios",
        temporada: "verano",
        imagen: ["img/mujer/calzas/calza-nike-speak-1.jpeg"], 
        hoverImagenes: [],
        miniaturas: ["img/mujer/calzas/calza-nike-speak-1.jpeg"],
        etiqueta: "novedad",
        variantes: [
            { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-detalle.jpeg"
            ],
            rojo: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-detalle.jpeg"
            ],
            azul: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-detalle.jpeg"
            ]
        }
    },
    { id: "accesorios-8", 
        nombre: "Calza Nike Fluorecent", 
        precio: 13500, 
        categoria: "calzas",
        seccion: "accesorios",
        temporada: "invierno", 
        imagen: ["img/mujer/calzas/calza-nike-fluor-1.jpeg", "img/mujer/calzas/calza-nike-fluor-2.jpeg"], 
        hoverImagenes: [],
        miniaturas: ["img/mujer/calzas/calza-nike-fluor-2.jpeg"],
        etiqueta: "novedad",
        variantes: [
            { color: "rosa", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-detalle.jpeg"
            ],
            rojo: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-detalle.jpeg"
            ],
            azul: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-detalle.jpeg"
            ]
        } 
    },
    { id: "accesorios-9", 
        nombre: "Calza Adidas Original", 
        precio: 13500, 
        categoria: "mochilas", 
        seccion: "accesorios",
        temporada: "verano",
        imagen: ["img/mujer/calzas/calza-adidas-original-1.jpeg"], 
        hoverImagenes: [],
        miniaturas: ["img/mujer/calzas/calza-adidas-original-1.jpeg"],
        etiqueta: "novedad",
        variantes: [
            { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "multicolor", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-negro-detalle.jpeg"
            ],
            rojo: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-rojo-detalle.jpeg"
            ],
            azul: [
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-frente.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-espalda.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-costado.jpeg",
                "img/mujer/camperas-deportivas/campera-deportiva-nike-azul-detalle.jpeg"
            ]
        }
        
    },
    
];