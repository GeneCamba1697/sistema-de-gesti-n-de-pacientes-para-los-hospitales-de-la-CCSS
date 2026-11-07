
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Consulta = require('../models/Consulta');
const Paciente = require('../models/Paciente');
const {registrarConsulta} = require('../services/procedimientos');

// CREATE: registrar consulta
router.post('/', async (req, res) => {
    try {
        const existe = await Paciente.exists({
            _id: req.body.pacienteId
        });

        if (!existe) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }

        const consulta = await registrarConsulta(req.body);
        res.status(201).json(consulta);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// READ: listar consultas
router.get('/', async (req, res) => {
    try {
        const consultas = await Consulta.find()
                .populate('pacienteId', 'nombre apellidos identificacion');

        res.json(consultas);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// READ: consultar por ID
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                mensaje: 'ID inválido'
            });
        }

        const consulta = await Consulta.findById(req.params.id)
                .populate('pacienteId', 'nombre apellidos');

        if (!consulta) {
            return res.status(404).json({
                mensaje: 'Consulta no encontrada'
            });
        }

        res.json(consulta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// UPDATE: actualizar consulta
router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                mensaje: 'ID inválido'
            });
        }

        if (req.body.pacienteId) {
            const existe = await Paciente.exists({
                _id: req.body.pacienteId
            });

            if (!existe) {
                return res.status(404).json({
                    mensaje: 'Paciente no encontrado'
                });
            }
        }

        const consulta = await Consulta.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new : true, runValidators: true}
        );

        if (!consulta) {
            return res.status(404).json({
                mensaje: 'Consulta no encontrada'
            });
        }

        res.json(consulta);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// DELETE: eliminar consulta
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                mensaje: 'ID inválido'
            });
        }

        const consulta = await Consulta.findByIdAndDelete(
                req.params.id
                );

        if (!consulta) {
            return res.status(404).json({
                mensaje: 'Consulta no encontrada'
            });
        }

        res.json({
            mensaje: 'Consulta eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;

