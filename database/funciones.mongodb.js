
/*
 * Sistema de Gestión de Pacientes CCSS
 * Base de datos: gestion_pacientes_ccss
 * Funciones para consultar información
 */

// Seleccionar la base de datos
db = db.getSiblingDB("gestion_pacientes_ccss");

// FUNCIÓN 1: Contar pacientes registrados
function contarPacientes() {
    return db.pacientes.countDocuments({});
}

// FUNCIÓN 2: Contar consultas por estado
function contarConsultasPorEstado(estado) {
    return db.consultas.countDocuments({
        estado: estado
    });
}

// FUNCIÓN 3: Buscar paciente por identificación
function buscarPaciente(identificacion) {
    return db.pacientes.findOne({
        identificacion: identificacion
    });
}

// FUNCIÓN 4: Contar consultas de un paciente
function contarConsultasPaciente(pacienteId) {
    return db.consultas.countDocuments({
        pacienteId: ObjectId(pacienteId)
    });
}

// PRUEBAS DE LAS FUNCIONES

print("Total de pacientes:", contarPacientes());

print("Consultas realizadas:",
    contarConsultasPorEstado("Realizada"));

print("Consultas programadas:",
    contarConsultasPorEstado("Programada"));

print("Consultas canceladas:",
    contarConsultasPorEstado("Cancelada"));

print("Buscar paciente de prueba:");
printjson(buscarPaciente("TEST-001"));
