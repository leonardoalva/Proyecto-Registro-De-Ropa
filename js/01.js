class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProductos(Producto) {
        this.productos.push(Producto);
    }

    generarTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    mostrarListado() {
        for (let index = 0; index < this.productos.length; index++) {
            const producto = this.productos[index];
            console.log(`${producto.nombre}-$${producto.precio}`);
        }
    }


}




let carrito1 = new Carrito();
let inicio = prompt('ingrese opcion \n 1) agregar productos \n 2) mostrar carrito\n 3) generar total \n 4) finalizar ');
inicio = Number(inicio);


while ((inicio >= 1) && (inicio <= 4)) {

    if (inicio === 1) {
        // pido datos del producto agregar 
        let nuevoNombre = prompt('ingrese nombre del producto\n o escriba ESQ para salir \n ');
        let nuevoPrecio = Number(prompt('ingrese el precio del producto'));
        // si el producto no tiene nombre frena el programa
        // si el precio nose ingresa o es null se le asiga cero para que no modifique el total de la lista
        while (nuevoNombre !== 'ESQ') {
            if (isNaN(nuevoPrecio) || nuevoPrecio === null) {
                nuevoPrecio = 0;
            }
            // se crea el producto y se agrega a la lista
            let nuevoProducto = new Producto(nuevoNombre, nuevoPrecio);
            carrito1.agregarProductos(nuevoProducto);

            // se vuelve a preguntar para evaluar nombre y precio nuevamente
            nuevoNombre = prompt('ingrese nombre del producto o escriba ESQ para salir');
            nuevoPrecio = Number(prompt('ingrese el precio del producto'));
        }
    }

    if (inicio === 2) {
        carrito1.mostrarListado();
        alert('lista generada- podra verla al finalizar el programa');
        inicio = prompt('ingrese opcion \n 1) agregar productos \n 2) mostrar carrito\n 3) generar total \n 4) finalizar ');
        inicio = Number(inicio);
    }

    if (inicio === 3) {
        carrito1.generarTotal();
        console.log(`total :$` + carrito1.generarTotal());
        alert('total exitoso- podra verlo al finalizar el programa');
    }
}

alert('muchas gracias vuelva prontos');