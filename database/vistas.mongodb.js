
/*
 * Sistema de Gestión de Pacientes CCSS
 * Base de datos: gestion_pacientes_ccss
 * Vistas para consultar información
 */

// Seleccionar la base de datos
db = db.getSiblingDB("gestion_pacientes_ccss");

// VISTA 1: Información básica de pacientes
// Muestra los datos generales sin información clínica.

if (!db.getCollectionInfos({name: "vista_pacientes"}).length) {
    db.createView(
        "vista_pacientes",
        "pacientes",
        [
            {
                $project: {
                    _id: 0,
                    identificacion: 1,
                    nombre: 1,
                    apellidos: 1,
                    sexo: 1,
                    telefono: 1
                }
            }
        ]
    );
}

// VISTA 2: Consultas médicas por paciente
// Relaciona las consultas con los pacientes.

if (!db.getCollectionInfos({name: "vista_consultas"}).length) {
    db.createView(
        "vista_consultas",
        "consultas",
        [
            {
                $lookup: {
                    from: "pacientes",
                    localField: "pacienteId",
                    foreignField: "_id",
                    as: "paciente"
                }
            },
            {
                $unwind: "$paciente"
            },
            {
                $project: {
                    _id: 0,
                    fecha: 1,
                    motivo: 1,
                    estado: 1,
                    nombrePaciente: {
                        $concat: [
                            "$paciente.nombre",
                            " ",
                            "$paciente.apellidos"
                        ]
                    }
                }
            }
        ]
    );
}

// PRUEBAS DE LAS VISTAS

print("VISTA DE PACIENTES:");
db.vista_pacientes.find().forEach(printjson);

print("VISTA DE CONSULTAS:");
db.vista_consultas.find().forEach(printjson);
