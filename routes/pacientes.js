
const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const { registrarPaciente } = require('../services/procedimientos');

// CREATE - Registrar paciente
router.post('/', async (req, res) => {
    try {
        const paciente = await registrarPaciente(req.body);
        res.status(201).json(paciente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ - Consultar todos los pacientes
router.get('/', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ - Consultar paciente por ID
router.get('/:id', async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }
        res.json(paciente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE - Actualizar paciente
router.put('/:id', async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!paciente) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }
        res.json(paciente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Eliminar paciente
router.delete('/:id', async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(
            req.params.id
        );
        if (!paciente) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }
        res.json({ mensaje: 'Paciente eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
