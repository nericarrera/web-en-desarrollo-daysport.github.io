

export const productosHombre = [
        
    { id: "hombre-1",
        nombre: "Buzo Algodon",
        etiqueta: "novedad",
        precio: 25000,
        categoria: "buzos",
        seccion: "hombre",
        temporada: "invierno",
        descripcion: "Buzo de algodon frizado, cuello redondo liso, para usar en cualquier ocasion",
        imagen: ["img/hombre/buzos/buzo-lacoste-azulfran-1.jpeg"],
        imagenesDetalle: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
         ],
        miniaturas: [
        ],
        hoverImagenes: ["img/hombre/buzos/buzo-lacoste-azulfran-1.jpeg"], // Hover en el carrusel
        variantes: [
            { color: "azul", talla: "XXL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106"},
        ],
        imagenColores: {
            azul: [
                "img/hombre/buzos/buzo-lacoste-azulfran-1.jpeg",
            ],
        }
    },

    {
        id: "hombre-2",
        nombre: "Campera TNF combinada Puffer",
        etiqueta: "novedad",
        precio: 65000,
        categoria: "camperas",
        seccion: "hombre",
        temporada: "invierno",
        descripcion: "Campera Puffer combinada, con capucha para usar en cualquier ocasion, ideal para el invierno, logo bordado",
        imagen: ["img/hombre/Camperas/camperas-abrigo/campera-tnf-combinada-blanconegro1.jpeg"],
        imagenesDetalle: [
            "img/hombre/Camperas/camperas-abrigo/campera-tnf-combinada-blanconegro3.jpeg",
            "img/hombre/Camperas/camperas-abrigo/campera-tnf-combinada-blanconegro4.jpeg",
         ],
        miniaturas: [
            {src: "img/hombre/Camperas/camperas-abrigo/campera-tnf-combinada-blanconegro1.jpeg", hover:""},
            {src: "img/hombre/Camperas/camperas-abrigo/campera-tnf-combinada-grisnegro1.jpeg", hover:""},
        ],
        hoverImagenes: ["img/hombre/Camperas/camperas-abrigo/campera-tnf-combinada-blanconegro2.jpeg"                        
        ], // Hover en el carrusel
        variantes: [
            { color: "blanco", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106"},
            { color: "gris", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106"},
        ],
        imagenColores: {
            blanco: [
                "img/hombre/Camperas/camperas-abrigo/campera-tnf-combinada-blanconegro1.jpeg",
                ],
            gris: [
                "img/hombre/Camperas/camperas-abrigo/campera-tnf-combinada-grisnegro1.jpeg",
            ],
        }
    },

    { id: "hombre-3",
        nombre: "Campera Puffer Boss",
        etiqueta: "novedad",
        precio: 13500,
        categoria: "camperas",
        seccion: "hombre",
        temporada: "invierno",
        imagen: ["img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-neg-viol-1.jpeg"], // Imagen principal para el carrusel
        imagenesDetalle: [
            "img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-blan-neg-1.jpeg",
            "img/hombre/camperas/camperas-abrigo/campera-abrigo-militar-neg-1.jpeg",
         ],
        hoverImagenes: ["img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-neg-viol-2.jpeg"], // Hover en el carrusel
        miniaturas: [
            {src: "img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-neg-viol-1.jpeg", hover:""},
            { src: "img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-blan-neg-1.jpeg", hover:""},
            { src: "img/hombre/camperas/camperas-abrigo/campera-abrigo-militar-neg-1.jpeg", hover:""},
        ], // Miniaturas para el carrusel
        variantes: [
            { color: "violeta", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "blanco", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "verde", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            violeta: [
                "img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-neg-viol-1.jpeg",
            ],
            blanco: [
                "img/hombre/camperas/camperas-abrigo/campera-abrigo-boss-blan-neg-1.jpeg",
            ],
            verde: [
                "img/hombre/camperas/camperas-abrigo/campera-abrigo-militar-neg-1.jpeg",
            ]
        }
    },
        
    { id: "hombre-4", 
        nombre: "Conjunto tech Nike",
        etiqueta: "novedad", 
        precio: 70000, 
        categoria: "conjuntos",
        seccion: "hombre",
        temporada: "invierno", 
        imagen: ["img/hombre/conjuntos/conjunto-tech-campera-negro1.jpeg"], 
        imagenesDetalle: [
            "img/hombre/conjuntos/conjunto-tech-campera-negro2.jpeg",
            "img/hombre/conjuntos/conjunto-tech-campera-negro3.jpeg",
         ],
        hoverImagenes: ["img/hombre/conjuntos/conjunto-tech-campera-negro2.jpeg"],
        miniaturas: [
            {src: "img/hombre/conjuntos/conjunto-tech-campera-negro1.jpeg", hover:""},
            {src: "img/hombre/conjuntos/conjunto-tech-campera-gris1.jpeg", hover:""},
            {src: "img/hombre/conjuntos/conjunto-tech-campera-blanco1.jpeg", hover:""},
            {src: "img/hombre/conjuntos/conjunto-tech-campera-beige1.jpeg", hover:""},
        ],
        variantes: [
            { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "blanco", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "beige", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/hombre/conjuntos/conjunto-tech-campera-negro1.jpeg"
            ],
            blanco: [
                "img/hombre/conjuntos/conjunto-tech-campera-blanco1.jpeg",              
            ],
            gris: [
                "img/hombre/conjuntos/conjunto-tech-campera-gris1.jpeg",                
            ],
            beige: [
                "img/hombre/conjuntos/conjunto-tech-campera-beige1.jpeg"

            ],
        }
    },

    { id: "hombre-5", 
        nombre: "Calza Nike Radeon",
        etiqueta: "novedad",
        precio: 13500, 
        categoria: "calzas", 
        seccion: "hombre",
        temporada: "verano",
        imagen: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"], 
        imagenesDetalle: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
         ],
        hoverImagenes: [],
        miniaturas: [
            {src: "img/mujer/calzas/calza-nike-radeon-1.jpeg", hover:""}
        ],
        
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

    {   
        id: "hombre-6", 
        nombre: "Calza Nike Grofada",
        etiqueta: "novedad",
        precio: 15000, 
        categoria: "calzas", 
        seccion: "hombre",
        temporada: "verano",
        imagen: ["img/mujer/calzas/calza-nike-grofada-1.jpeg"], 
        imagenesDetalle: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
         ],
        hoverImagenes: [],
        miniaturas: [
            {src: "img/mujer/calzas/calza-nike-grofada-1.jpeg", hover:""}],
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
    { id: "hombre-7", 
        nombre: "Calza Nike Speak", 
        etiqueta: "novedad",
        precio: 13500, 
        categoria: "calzas", 
        seccion: "hombre",
        temporada: "verano",
        imagen: ["img/mujer/calzas/calza-nike-speak-1.jpeg"], 
        imagenesDetalle: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
         ],
        hoverImagenes: [],
        miniaturas: [
            {src: "img/mujer/calzas/calza-nike-speak-1.jpeg", hover:""}
        ],
        
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
    { id: "hombre-8", 
        nombre: "Calza Nike Fluorecent", 
        etiqueta: "novedad",
        precio: 13500, 
        categoria: "calzas",
        seccion: "hombre",
        temporada: "invierno", 
        imagen: ["img/mujer/calzas/calza-nike-fluor-1.jpeg", "img/mujer/calzas/calza-nike-fluor-2.jpeg"], 
        imagenesDetalle: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
         ],
        hoverImagenes: [],
        miniaturas: [
            {src: "img/mujer/calzas/calza-nike-fluor-2.jpeg", hover:""}
        ],
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
    { 
        id: "hombre-9", 
        nombre: "Calza Adidas Original", 
        etiqueta: "novedad",
        precio: 13500, 
        categoria: "calzas", 
        seccion: "hombre",
        temporada: "verano",
        imagen: ["img/mujer/calzas/calza-adidas-original-1.jpeg"], 
        imagenesDetalle: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
         ],
        hoverImagenes: [],
        miniaturas: [
            {src: "img/mujer/calzas/calza-adidas-original-1.jpeg", hover:""}
        ],
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