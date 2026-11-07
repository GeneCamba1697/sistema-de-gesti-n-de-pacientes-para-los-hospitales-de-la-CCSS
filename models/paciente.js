
const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    identificacion: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    telefono: String,
    direccion: String,
    tipoSangre: String,
    alergias: [String],
    antecedentes: [String]
}, {
    timestamps: true,
    collection: 'pacientes'
});

module.exports = mongoose.model('Paciente', pacienteSchema);
