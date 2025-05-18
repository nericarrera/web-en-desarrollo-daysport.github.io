
export  const productosMujer = [
        
    {
    id: "mujer-1",
    nombre: "Remera Modal Soft",
    etiqueta: "novedad",
    precio: 12000,
    categoria: "remeras",
    seccion: "mujer",
    temporada: "verano",
    descripcion: "Remera de modal soft, cuello redondo suave y cómoda, ideal para días de verano.",
    imagen: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg"],
    
    miniaturas: [
       {src: "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg", hover:""},
        
    ],
    variantes: [
        { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106"},
        { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106"},
        { color: "negro", talla: "XL", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106"},
        { color: "negro", talla: "XXL", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106"},
        { color: "celeste", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        { color: "celeste", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        { color: "celeste", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        { color: "celeste", talla: "XL", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        { color: "celeste", talla: "XXL", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
    ],
    imagenColores: {
        celeste: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg",
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg"
            
        ],
        negro: [
            "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg",
            
            
        ]
    }
},

    {
        id: "mujer-2",
        nombre: "Calza Nike Pro",
        etiqueta: "",
        precio: 16000,
        categoria: "calzas",
        seccion: "mujer",
        temporada: "media estacion",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg"],
        
        miniaturas: [
           {src: "img/mujer/calzas/calza-nike-pro-gris-1.jpeg", hover:""}, 
           {src: "img/mujer/calzas/calza-nike-pro-neg-1.jpeg", hover:""}
        ],
        variantes: [
            { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
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
        precio: 35000,
        categoria: "camperas",
        seccion: "mujer",
        temporada: "media estacion",
        descripcion: "Campera deportiva entallada, excelente calidad para realizar entrenamientos o uso urbano.",
        imagen: ["img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg"], // Imagen principal para el carrusel
        
        miniaturas: [
            {src:"img/mujer/camperas-deportivas/campera-deportiva-nike-1.jpeg", hover:""},
            {src: "img/mujer/camperas-deportivas/campera-deportiva-nike-2.jpeg", hover:"" },
            {src: "img/mujer/camperas-deportivas/campera-deportiva-nike-3.jpeg", hover:""},
        ], // Miniaturas para el carrusel
        variantes: [
            { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
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
        etiqueta: "",
        precio: 9000, 
        categoria: "remeras",
        seccion: "mujer",
        temporada: "verano", 
        descripcion: "Blusa de lino, liviana comoda y frezca.",
        imagen: ["img/mujer/remeras-lino/blusalino-negro-1.jpeg"],
       
        miniaturas: [ 
            {src: "img/mujer/remeras-lino/blusalino-negro-1.jpeg", hover:""}

        ], 
        variantes: [
            { color: "negro", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/remeras-lino/blusalino-negro-1.jpeg",                
            ],
           
        }
    },

    { id: "mujer-5", 
        nombre: "Calza Nike Radeon",
        etiqueta: "", 
        precio: 13500, 
        categoria: "calzas", 
        seccion: "mujer",
        temporada: "verano",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-nike-radeon-1.jpeg"], 
        
        miniaturas: [ 
            {src:"img/mujer/calzas/calza-nike-radeon-1.jpeg"},
        ],
        variantes: [
            { color: "negro", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
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
            {src: "img/mujer/calzas/calza-nike-grofada-1.jpeg"}

        ],
        variantes: [
            { color: "negro", talla: "S", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
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
        nombre: "Calza nike Speak", 
        etiqueta: "",
        precio: 13500, 
        categoria: "calzas", 
        seccion: "mujer",
        temporada: "verano",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-nike-speak-1.jpeg"], 
        
        miniaturas: [ 
            {src:"img/mujer/calzas/calza-nike-speak-1.jpeg"}

        ],
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
        etiqueta: "",
        precio: 13500, 
        categoria: "calzas",
        seccion: "mujer",
        temporada: "invierno",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.", 
        imagen: ["img/mujer/calzas/calza-nike-fluor-1.jpeg", "img/mujer/calzas/calza-nike-fluor-2.jpeg"], 
       
        miniaturas: [ 
            {src:"img/mujer/calzas/calza-nike-fluor-2.jpeg"}

        ],
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
        etiqueta: "",
        precio: 13500, 
        categoria: "calzas", 
        seccion: "mujer",
        temporada: "verano",
        descripcion: "Calza deportiva excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/calzas/calza-adidas-original-1.jpeg"], 
        
        miniaturas: [ 
            {src: "img/mujer/calzas/calza-adidas-original-1.jpeg"}
        ],
        variantes: [
            { color: "negro", talla: "M", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "multicolor", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],        
        imagenColores: { // Imágenes específicas por color para la página de producto
            negro: [
                "img/mujer/calzas/calza-adidas-original-1.jpeg"
                
            ],
        }
    },

    { id: "mujer-10", 
        nombre: "Buzos bordados Algodon", 
        etiqueta: "novedad",
        precio: 35000, 
        categoria: "buzos", 
        seccion: "mujer",
        temporada: "invierno",
        descripcion: "Buzos de algodon frizados, bordados excelente calidad con capucha.",
        imagen: ["img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-beige1.jpeg"], 
        
        miniaturas: [ 
            {src: "img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-celeste1.jpeg", hover:"img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-verdelimon1.jpeg"},
            {src: "img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-verdelimon1.jpeg", hover:""},
            {src: "img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-rosaviejo1.jpeg", hover:"img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-celeste1.jpeg"},

        ],
        variantes: [
            { color: "beige", talla: "L", stock: 0, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "celeste", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "verde", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],        
        imagenColores: { // Imágenes específicas por color para la página de producto
            beige: [
                "img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-beige1.jpeg"
            ],
            celeste: [
                "img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-celeste1.jpeg"
            ],
            verde: [
                "img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-verdelimon1.jpeg"
            ],
            rosa: [
                "img/mujer/buzos-algodon/buzo-algodon-bordado-concapucha-rosaviejo1.jpeg"
            ],
        }
    },

    { id: "mujer-11", 
        nombre: "Campera Gap", 
        etiqueta: "novedad",
        precio: 35000, 
        categoria: "campera", 
        seccion: "mujer",
        temporada: "invierno",
        descripcion: "Campera de algodon frizado, excelente calidad con capucha.",
        imagen: ["img/mujer/camperas-algodon/campera-gap-algodon-blanca1.jpeg"], 
       
        miniaturas: [ 
            {src: "img/mujer/camperas-algodon/campera-gap-algodon-blanca1.jpeg", hover:""},
            {src: "img/mujer/camperas-algodon/campera-gap-algodon-grisme1.jpeg", hover:""},
            {src: "img/mujer/camperas-algodon/campera-gap-algodon-neg1.jpeg", hover:""},
            {src: "img/mujer/camperas-algodon/campera-gap-algodon-rosbb1.jpeg", hover:""},
            {src: "img/mujer/camperas-algodon/campera-gap-algodon-veragu1.jpeg", hover:""},

        ],
        variantes: [
            { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "beige", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "blanco", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],        
        imagenColores: { // Imágenes específicas por color para la página de producto
            beige: [

            ],
            negro: [
                "img/mujer/camperas-algodon/campera-gap-algodon-neg1.jpeg"
            ],
            rosa: [
                "img/mujer/camperas-algodon/campera-gap-algodon-rosbb1.jpeg"
            ],
            blanco: [
                "img/mujer/camperas-algodon/campera-gap-algodon-blanca1.jpeg"
            ],
        }
        
    },

    { 
        id: "mujer-12", 
        nombre: "Campera Chaleco Puffer con piel", 
        etiqueta: "novedad",
        precio: 70000, 
        categoria: "campera", 
        seccion: "mujer",
        temporada: "invierno",
        descripcion: "Campera con chaleco interior con piel puffer, capucha desmontable.",
        imagen: ["img/mujer/camperas-chaleco/camperachaleco-lacoste-beige1.jpeg"], 
       
        miniaturas: [ 
            {src: "img/mujer/camperas-chaleco/camperachaleco-lacoste-beige1.jpeg", hover:"img/mujer/camperas-chaleco/camperachaleco-lacoste-beige2.jpeg"},
            {src: "img/mujer/camperas-chaleco/camperachaleco-lacoste-blanco1.jpeg", hover:"img/mujer/camperas-chaleco/camperachaleco-lacoste-blanco2.jpeg"},
            {src: "img/mujer/camperas-chaleco/camperachaleco-lacoste-negro1.jpeg", hover:"img/mujer/camperas-chaleco/camperachaleco-lacoste-negro2.jpeg"},
            {src: "img/mujer/camperas-chaleco/camperachaleco-lacoste-verdemilitar1.jpeg", hover:"img/mujer/camperas-chaleco/camperachaleco-lacoste-verdemilitar2.jpeg"},

        ],
        
        variantes: [
            { color: "beige", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "blanco", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "negro", talla: "M", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "verde", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" }
        ],        
        imagenColores: { // Imágenes específicas por color para la página de producto
            beige: [
                "img/mujer/camperas-chaleco/camperachaleco-lacoste-beige1.jpeg",
                "img/mujer/camperas-chaleco/camperachaleco-lacoste-beige2.jpeg",
                
            ],
            blanco: [
                "img/mujer/camperas-chaleco/camperachaleco-lacoste-blanco1.jpeg",
                "img/mujer/camperas-chaleco/camperachaleco-lacoste-blanco2.jpeg",
            ],
            negro: [
                "img/mujer/camperas-chaleco/camperachaleco-lacoste-negro1.jpeg"
            ],
            rosa: [
                "img/mujer/camperas-chaleco/camperachaleco-lacoste-rosa1.jpeg"
            ],
            verde: [
                "img/mujer/camperas-chaleco/camperachaleco-lacoste-verdemilitar1.jpeg"
            ],
        }
        
    },

   {
     id: "mujer-13",
        nombre: "Conjunto Deportivo Lycra Nike",
        etiqueta: "",
        precio: 45000,
        categoria: "conjuntos",
        seccion: "mujer",
        temporada: "media estacion",
        descripcion: "Conjunto deportivo excelente calidad, ideal para realizar deporte de alto rendimiento.",
        imagen: ["img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-gris1.jpeg"],
        
        miniaturas: [
           {src: "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-gris0.jpeg", hover:"img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-gris1.jpeg"}, 
          {src: "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-celeste0.jpeg", hover:"img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-celeste1.jpeg"},
          {src: "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-lila0.jpeg", hover:"img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-lila1.jpeg"},
        {src: "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-rosa0.jpeg", hover:"img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-rosa1.jpeg"},
        ],
        variantes: [
            { color: "gris", talla: "XXL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "gris", talla: "XL", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "rosa", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "violeta", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "celeste", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
            { color: "celeste", talla: "L", stock: 1, pecho: "100-104", cintura: "86-90", cadera: "102-106" },
        ],
        imagenColores: { // Imágenes específicas por color para la página de producto
            gris: [
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-gris0.jpeg",
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-gris1.jpeg",
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-lila1.jpeg",
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-rosa1.jpeg"
            ],
            celeste: [
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-celeste0.jpeg",
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-celeste1.jpeg"
            ],
            violeta: [
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-lila0.jpeg",
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-lila1.jpeg"
            ],
            rosa: [
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-rosa0.jpeg",
                "img/mujer/conjuntos-deportivos-lycra/conjuntonikelycra-rosa1.jpeg"
            ],
        }  

    }

    
];
