
const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
    pacienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    motivo: {
        type: String,
        required: true
    },
    diagnosticos: [String],
    prescripciones: [{
        medicamento: String,
        dosis: String,
        frecuencia: String
    }],
    observaciones: String,
    estado: {
        type: String,
        enum: ['Programada', 'Realizada', 'Cancelada'],
        default: 'Programada'
    }
}, {
    timestamps: true,
    collection: 'consultas'
});

module.exports = mongoose.model('Consulta', consultaSchema);

