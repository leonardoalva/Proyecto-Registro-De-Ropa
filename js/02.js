class Paciente {
    constructor(nombre, apellido, email, edad, raza, especie, sexo, castrado, profesional, celular, estudio, fecha) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.edad = edad;
        this.raza = raza;
        this.especie = especie;
        this.sexo = sexo;
        this.castrado = castrado;
        this.profesional = profesional;
        this.celular = celular;
        this.estudio = estudio;
        this.fecha = fecha;
    }
}

class Dia {
    constructor() {
        this.pacientes = this.cargarPacientes();
    }

    cargarPacientes() {
        try {
            const pacientesGuardados = localStorage.getItem('dia');
            return pacientesGuardados ? JSON.parse(pacientesGuardados) : [];
        } catch (error) {
            console.error('Error al cargar pacientes:', error);
            return [];
        }
    }

    agregarPaciente(paciente) {
        this.pacientes.push(paciente);
        this.guardarPacientes();
    }

    guardarPacientes() {
        try {
            localStorage.setItem('dia', JSON.stringify(this.pacientes));
        } catch (error) {
            console.error('Error al guardar pacientes:', error);
        }
    }

    mostrarListado() {
        if (this.pacientes.length === 0) {
            return "No hay pacientes registrados.";
        }
        return this.pacientes.map(paciente => `
            <div class="paciente">
                <p><strong>Nombre:</strong> ${paciente.nombre}</p>
                <p><strong>Apellido:</strong> ${paciente.apellido}</p>
                <p><strong>Email:</strong> ${paciente.email}</p>
                <p><strong>Edad:</strong> ${paciente.edad}</p>
                <p><strong>Raza:</strong> ${paciente.raza}</p>
                <p><strong>Especie:</strong> ${paciente.especie}</p>
                <p><strong>Sexo:</strong> ${paciente.sexo}</p>
                <p><strong>Castrado:</strong> ${paciente.castrado}</p>
                <p><strong>Profesional:</strong> ${paciente.profesional}</p>
                <p><strong>Celular:</strong> ${paciente.celular}</p>
                <p><strong>Estudio:</strong> ${paciente.estudio}</p>
                <p><strong>Fecha:</strong> ${paciente.fecha}</p>
                <hr>
            </div>
        `).join('');
    }

    mostrarUltimoAgregado() {
        if (this.pacientes.length === 0) {
            return "No hay pacientes registrados.";
        }
        const paciente = this.pacientes[this.pacientes.length - 1];
        return `
            <div class="paciente">
                <p><strong>Último paciente agregado:</strong></p>
                <p><strong>Nombre:</strong> ${paciente.nombre}</p>
                <p><strong>Apellido:</strong> ${paciente.apellido}</p>
                <p><strong>Email:</strong> ${paciente.email}</p>
                <p><strong>Edad:</strong> ${paciente.edad}</p>
                <p><strong>Raza:</strong> ${paciente.raza}</p>
                <p><strong>Especie:</strong> ${paciente.especie}</p>
                <p><strong>Sexo:</strong> ${paciente.sexo}</p>
                <p><strong>Castrado:</strong> ${paciente.castrado}</p>
                <p><strong>Profesional:</strong> ${paciente.profesional}</p>
                <p><strong>Celular:</strong> ${paciente.celular}</p>
                <p><strong>Estudio:</strong> ${paciente.estudio}</p>
                <p><strong>Fecha:</strong> ${paciente.fecha}</p>
            </div>
        `;
    }

    buscarPacientePorId(id) {
        return this.pacientes.find((paciente, index) => index === id);
    }

    actualizarPaciente(id, campo, nuevoValor) {
        if (id >= 0 && id < this.pacientes.length) {
            this.pacientes[id][campo] = nuevoValor;
            this.guardarPacientes();
            return true;
        }
        return false;
    }
    mostrarListado() {
        if (this.pacientes.length === 0) {
            return "No hay pacientes registrados.";
        }
        return this.pacientes.map((paciente, index) => `
            <div class="paciente" data-id="${index}">
                <p><strong>Nombre:</strong> <span class="editable" data-field="nombre">${paciente.nombre}</span></p>
                <p><strong>Apellido:</strong> <span class="editable" data-field="apellido">${paciente.apellido}</span></p>
                <p><strong>Email:</strong> <span class="editable" data-field="email">${paciente.email}</span></p>
                <p><strong>Edad:</strong> <span class="editable" data-field="edad">${paciente.edad}</span></p>
                <p><strong>Raza:</strong> <span class="editable" data-field="raza">${paciente.raza}</span></p>
                <p><strong>Especie:</strong> <span class="editable" data-field="especie">${paciente.especie}</span></p>
                <p><strong>Sexo:</strong> <span class="editable" data-field="sexo">${paciente.sexo}</span></p>
                <p><strong>Castrado:</strong> <span class="editable" data-field="castrado">${paciente.castrado}</span></p>
                <p><strong>Profesional:</strong> <span class="editable" data-field="profesional">${paciente.profesional}</span></p>
                <p><strong>Celular:</strong> <span class="editable" data-field="celular">${paciente.celular}</span></p>
                <p><strong>Estudio:</strong> <span class="editable" data-field="estudio">${paciente.estudio}</span></p>
                <p><strong>Fecha:</strong> <span class="editable" data-field="fecha">${paciente.fecha}</span></p>
                <button class="editar-btn" style="width:50%" data-id="${index}">Editar</button>
                <hr>
            </div>
        `).join('');
    }

    buscarPorNombreApellido(nombre, apellido) {
        const nombreBusqueda = nombre.toLowerCase();
        const apellidoBusqueda = apellido.toLowerCase();

        return this.pacientes.filter(paciente =>
            paciente.nombre.toLowerCase().includes(nombreBusqueda) &&
            paciente.apellido.toLowerCase().includes(apellidoBusqueda)
        );
    }

    buscarPorFecha(fecha) {
        return this.pacientes.filter(paciente => 
            paciente.fecha === fecha
        );
    }
}


// Crear instancia global de Dia
const dia = new Dia();

// Función para agregar paciente desde el formulario
function agregarPaciente() {
    // Validación básica
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();

    if (!nombre || !apellido) {
        alert('Nombre y apellido son campos obligatorios');
        return;
    }

    const email = document.getElementById('email').value.trim();
    const celular = document.getElementById('celular').value.trim();
    const edad = document.getElementById('edad').value.trim();
    const especie = document.getElementById('especie').value;
    const estudio = document.getElementById('estudio').value;
    const fecha = document.getElementById('fecha').value;
    const sexo = document.getElementById('sexo').value;
    const raza = document.getElementById('raza').value.trim();
    const castrado = document.querySelector('input[name="castrado"]:checked')?.value || 'No';
    const profesional = document.getElementById('profesional').value;

    const paciente = new Paciente(
        nombre, apellido, email, edad, raza,
        especie, sexo, castrado, profesional, celular, estudio, fecha
    );

    dia.agregarPaciente(paciente);

    // Limpiar formulario
    document.getElementById('formularioPaciente').reset();

    // Mostrar feedback al usuario
    alert('Paciente agregado correctamente');
}

// Función para mostrar listado
function mostrarListado() {
    const listado = document.getElementById('listadoDePacientes');
    listado.innerHTML = dia.mostrarListado();
}

// Función para mostrar último agregado
function mostrarUltimoAgregado() {
    const listado = document.getElementById('listadoDePacientes');
    listado.innerHTML = dia.mostrarUltimoAgregado();
}

function habilitarEdicion(pacienteId, campo) {
    const pacienteElement = document.querySelector(`.paciente[data-id="${pacienteId}"]`);
    const campoElement = pacienteElement.querySelector(`[data-field="${campo}"]`);

    const valorActual = campoElement.textContent;
    campoElement.innerHTML = `
        <input type="text" value="${valorActual}" class="edit-input">
        <button style="width:45%; margin-bot:10px" class="guardar-btn">Guardar</button>
        <button style="width:45%" class="cancelar-btn">Cancelar</button>
    `;

    // Guardar al hacer click
    pacienteElement.querySelector('.guardar-btn').addEventListener('click', () => {
        const nuevoValor = pacienteElement.querySelector('.edit-input').value;
        dia.actualizarPaciente(pacienteId, campo, nuevoValor);
        mostrarListado();
    });

    // Cancelar edición
    pacienteElement.querySelector('.cancelar-btn').addEventListener('click', () => {
        mostrarListado();
    });
}

// Función para manejar la edición de pacientes
function manejarEdicion() {
    document.getElementById('listadoDePacientes').addEventListener('click', (event) => {
        if (event.target.classList.contains('editar-btn')) {
            const pacienteId = parseInt(event.target.getAttribute('data-id'));
            const campo = prompt("¿Qué campo deseas editar? (nombre, apellido, email, edad, raza, especie, sexo, castrado, profesional, celular, estudio, fecha)");

            if (campo && Object.keys(new Paciente()).includes(campo)) {
                habilitarEdicion(pacienteId, campo);
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

    // Opcional: Permitir buscar al presionar Enter
    document.getElementById('buscarNombre').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') buscarPaciente();
    });
    document.getElementById('buscarApellido').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') buscarPaciente();
    document.getElementById('buscarFecha').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') buscarPorFecha();
        });
    });
});


// buscar por nombre y apellido //
function buscarPaciente() {
    const nombre = document.getElementById('buscarNombre').value.trim();
    const apellido = document.getElementById('buscarApellido').value.trim();

    if (!nombre && !apellido) {
        alert('Por favor ingrese al menos un nombre o apellido para buscar');
        return;
    }

    const pacientesEncontrados = dia.buscarPorNombreApellido(nombre, apellido);
    mostrarResultadosBusqueda(pacientesEncontrados);
}
function mostrarResultadosBusqueda(pacientes) {
    const listado = document.getElementById('listadoDePacientes');

    if (pacientes.length === 0) {
        listado.innerHTML = "No se encontraron pacientes con esos criterios.";
        return;
    }

    listado.innerHTML = pacientes.map(paciente => `
        <div class="paciente">
            <p><strong>Nombre:</strong> ${paciente.nombre}</p>
            <p><strong>Apellido:</strong> ${paciente.apellido}</p>
            <p><strong>Email:</strong> ${paciente.email}</p>
            <p><strong>Edad:</strong> ${paciente.edad}</p>
            <p><strong>Raza:</strong> ${paciente.raza}</p>
            <p><strong>Especie:</strong> ${paciente.especie}</p>
            <p><strong>Sexo:</strong> ${paciente.sexo}</p>
            <p><strong>Castrado:</strong> ${paciente.castrado}</p>
            <p><strong>Profesional:</strong> ${paciente.profesional}</p>
            <p><strong>Celular:</strong> ${paciente.celular}</p>
            <p><strong>Estudio:</strong> ${paciente.estudio}</p>
            <p><strong>Fecha:</strong> ${paciente.fecha}</p>
            <hr>
        </div>
    `).join('');
}

// Función para buscar por fecha
function buscarPorFecha() {
    const fecha = document.getElementById('buscarFecha').value.trim();
    
    if (!fecha) {
        alert('Por favor ingrese una fecha para buscar');
        return;
    }

    const pacientesEncontrados = dia.buscarPorFecha(fecha);
    mostrarResultadosBusqueda(pacientesEncontrados);
}
