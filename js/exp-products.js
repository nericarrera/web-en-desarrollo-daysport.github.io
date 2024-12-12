
/*-----------------EXP-PRODUCTOS----------------- */

export const productosMujer = [
    {
        id: 1,
        nombre: "Remera Modal Soft",
        precio: 7500,
        categoria: "remeras",
        imagen: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg", "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg"],
        miniaturas: ["img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-1.jpeg", "img/mujer/remera-modal-soft/remera-modal-soft-cuelloR-2.jpeg"],
        hoverImagenes: ["img/mujer/remera-modal-soft-cuelloR/hover1.jpeg"],
        etiqueta: "Novedades",
        variantes: [
            { color: "celeste", talla: "S", stock: 3 },
            { color: "rojo", talla: "M", stock: 0 }, // Sin stock
            { color: "azul", talla: "L", stock: 5 }
        ]
    },
 
    {
        id: 2,
        nombre: "Calza Nike Pro",
        precio: 13500,
        categoria: "calzas",
        imagen: ["img/mujer/calzas/calza-nike-pro-gris-1.jpeg"],
        etiqueta: "Novedad",
        variantes: [{ color: "negro", talla: "S", stock: 2 }]
    },
    // Otros productos...
];

