class Producto {
    constructor(linea, producto, descripcion, precio) {
        this.linea = linea;
        this.producto = producto;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

class ProductosTotal {
    constructor() {
        this.productos = this.cargarProductos();
    }

    cargarProductos() {
        try {
            const productosGuardados = localStorage.getItem('productos');
            return productosGuardados ? JSON.parse(productosGuardados) : [];
        } catch (error) {
            console.error('Error al cargar productos:', error);
            return [];
        }
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.guardarProductos();
    }

    guardarProductos() {
        try {
            localStorage.setItem('productos', JSON.stringify(this.productos));
        } catch (error) {
            console.error('Error al guardar productos:', error);
        }
    }

    mostrarListado() {
        if (this.productos.length === 0) {
            return "No hay productos registrados.";
        }
        return this.productos.map((producto, index) => `
            <div class="producto" data-id="${index}">
                <p><strong>Linea:</strong> <span class="editable" data-field="linea">${producto.linea}</span></p>
                <p><strong>Producto:</strong> <span class="editable" data-field="producto">${producto.producto}</span></p>
                <p><strong>Descripcion:</strong> <span class="editable" data-field="descripcion">${producto.descripcion}</span></p>
                <p><strong>Precio:</strong> <span class="editable" data-field="precio">${producto.precio}</span></p>
                <div style="display: flex; flex-direction:column; width: 50%; margin: 0 auto;">
                    <button class="editar-btn" style="text-align:center; border-radius:10px;" data-id="${index}">Editar</button>
                </div>
            </div>
        `).join('');
    }

    mostrarUltimoAgregado() {
        if (this.productos.length === 0) {
            return "No hay productos registrados.";
        }
        const producto = this.productos[this.productos.length - 1];
        return `
            <div class="producto">
                <p><strong>Último producto agregado:</strong></p>
                <p><strong>Linea:</strong> ${producto.linea}</p>
                <p><strong>Producto:</strong> ${producto.producto}</p>
                <p><strong>Descripcion:</strong> ${producto.descripcion}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
            </div>
        `;
    }

    actualizarProducto(id, campo, nuevoValor) {
        if (id >= 0 && id < this.productos.length) {
            this.productos[id][campo] = nuevoValor;
            this.guardarProductos();
            return true;
        }
        return false;
    }

    mostrarListado() {
        if (this.productos.length === 0) {
            return "No hay pacientes registrados.";
        }
        return this.productos.map((producto, index) => `
            <div class="producto" data-id="${index}">
                <p><strong>linea:</strong> <span class="editable" data-field="linea">${producto.linea}</span></p>
                <p><strong>Producto:</strong> <span class="editable" data-field="producto">${producto.producto}</span></p>
                <p><strong>Descripcion:</strong> <span class="editable" data-field="descripcion">${producto.descripcion}</span></p>
                <p><strong>precio:</strong> <span class="editable" data-field="precio">${producto.precio}</span></p>
                <div style="display: flex; flex-direction:column; width: 50%; margin: 0 auto;"><button class="editar-btn" style="text-align:center; border-radius:10px;" data-id="${index}">Editar</button>
                </div>
            </div>
        `).join('');
    }

}


// Crear instancia global
const productos = new ProductosTotal(); // Con mayúscula

function agregarProducto() {
    const linea = document.getElementById('linea').value.trim();
    const producto = document.getElementById('producto').value.trim();

    if (!linea || !producto) {
        alert('Linea y Producto son campos obligatorios');
        return;
    }

    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = document.getElementById('precio').value;

    const productoNuevo = new Producto(
        linea, producto, descripcion, precio
    );

    productos.agregarProducto(productoNuevo); // Usar la instancia 'productos'
    document.getElementById('formularioAgregar').reset();
    alert('Producto agregado correctamente');
}





// Función para mostrar listado
function mostrarListado() {
    const listado = document.getElementById('listadoDeProductos');
    listado.innerHTML = productos.mostrarListado();
}

// Función para mostrar último agregado
function mostrarUltimoAgregado() {
    const listado = document.getElementById('listadoDeProductos');
    listado.innerHTML = productos.mostrarUltimoAgregado();
}

function habilitarEdicion(productoId, campo) {
    const productoElement = document.querySelector(`.producto[data-id="${productoId}"]`);
    const campoElement = productoElement.querySelector(`[data-field="${campo}"]`);

    const valorActual = campoElement.textContent;
    campoElement.innerHTML = `
        <input type="text" value="${valorActual}" class="edit-input">
        <button class="guardar-btn">Guardar Cambios</button>
        <button class="cancelar-btn">Cancelar</button>
    `;

    // Guardar al hacer click
    productoElement.querySelector('.guardar-btn').addEventListener('click', () => {
        const nuevoValor = productoElement.querySelector('.edit-input').value;
        productos.actualizarProducto(productoId, campo, nuevoValor);

        mostrarListado();
    });

    // Cancelar edición
    productoElement.querySelector('.cancelar-btn').addEventListener('click', () => {
        mostrarListado();
    });
}

// Función para manejar la edición de productos
function manejarEdicion() {
    document.getElementById('listadoDeProductos').addEventListener('click', (event) => {
        if (event.target.classList.contains('editar-btn')) {
            const productoId = parseInt(event.target.getAttribute('data-id'));
            const campo = prompt("¿Qué campo deseas editar? (linea, producto, descripcion, precio)");

            if (campo && Object.keys(new Producto()).includes(campo)) {
                habilitarEdicion(productoId, campo);
            } else {
                alert("Campo no válido");
            }
        }
    });
}

// Inicializar el manejador de eventos al cargar la página  //
document.addEventListener('DOMContentLoaded', function () {
    mostrarListado();
    manejarEdicion();
});



function mostrarResultadosBusqueda(productos) {
    const listado = document.getElementById('listadoDeProductos');
    if (productos.length === 0) {
        listado.innerHTML = "No se encontraron productos con esos criterios.";
        return;
    }

    listado.innerHTML = productos.map(producto => `
        <div class="producto">
            <p><strong>Linea:</strong> ${producto.linea}</p>
            <p><strong>Producto:</strong> ${producto.producto}</p>
            <p><strong>Descripcion:</strong> ${producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <hr>
        </div>
    `).join('');
}


function limpiarListado() {
    const listado = document.getElementById('listadoDeProductos');
    listado.innerHTML = "";
}