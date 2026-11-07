
/*
 * Sistema de Gestión de Pacientes CCSS
 * Base de datos: gestion_pacientes_ccss
 * Cursores para recorrer registros
 */

// Seleccionar base de datos
db = db.getSiblingDB("gestion_pacientes_ccss");

// CURSOR 1: Recorrer todos los pacientes
print("===== LISTADO DE PACIENTES =====");

const cursorPacientes = db.pacientes.find({});

while (cursorPacientes.hasNext()) {
    const paciente = cursorPacientes.next();

    print("Identificación: " + paciente.identificacion);
    print("Nombre: " + paciente.nombre + " " + paciente.apellidos);
    print("--------------------------");
}

// CURSOR 2: Recorrer consultas realizadas
print("===== CONSULTAS REALIZADAS =====");

const cursorConsultas = db.consultas.find({
    estado: "Realizada"
});

while (cursorConsultas.hasNext()) {
    const consulta = cursorConsultas.next();

    print("Motivo: " + consulta.motivo);
    print("Estado: " + consulta.estado);
    print("--------------------------");
}

// CURSOR 3: Recorrer pacientes ordenados por apellido
print("===== PACIENTES ORDENADOS =====");

const cursorOrdenado = db.pacientes.find({})
        .sort({apellidos: 1});

while (cursorOrdenado.hasNext()) {
    const paciente = cursorOrdenado.next();

    print(paciente.apellidos + ", " + paciente.nombre);
}
