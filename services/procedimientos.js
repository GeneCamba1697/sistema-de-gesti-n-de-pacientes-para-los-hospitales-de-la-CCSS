
/*
 * Sistema de Gestión de Pacientes CCSS
 * Lógica de negocio equivalente a procedimientos
 * Base de datos: MongoDB
 */

const mongoose = require('mongoose');
const Paciente = require('../models/Paciente');
const Consulta = require('../models/Consulta');

// PROCEDIMIENTO 1: Registrar paciente
async function registrarPaciente(datos) {
    const existente = await Paciente.findOne({
        identificacion: datos.identificacion
    });

    if (existente) {
        throw new Error('El paciente ya está registrado');
    }

    const paciente = new Paciente(datos);
    return await paciente.save();
}

// PROCEDIMIENTO 2: Registrar consulta médica
async function registrarConsulta(datos) {
    if (!mongoose.isValidObjectId(datos.pacienteId)) {
        throw new Error('ID de paciente inválido');
    }

    const paciente = await Paciente.findById(datos.pacienteId);

    if (!paciente) {
        throw new Error('El paciente no existe');
    }

    const consulta = new Consulta(datos);
    return await consulta.save();
}

// PROCEDIMIENTO 3: Resumen de consultas por estado
async function resumenConsultas() {
    return await Consulta.aggregate([
        {
            $group: {
                _id: '$estado',
                total: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
}

module.exports = {
    registrarPaciente,
    registrarConsulta,
    resumenConsultas
};
