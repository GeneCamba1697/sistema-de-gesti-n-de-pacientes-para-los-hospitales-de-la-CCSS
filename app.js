
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use(express.static('public'));

const pacientesRoutes = require('./routes/pacientes');
app.use('/api/pacientes', pacientesRoutes);

const consultasRoutes = require('./routes/consultas');
app.use('/api/consultas', consultasRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Sistema de Gestión de Pacientes CCSS');
});

async function iniciarServidor() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Conexión exitosa a MongoDB');
        console.log('Base de datos: gestion_pacientes_ccss');

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error de conexión:', error.message);
        process.exit(1);
    }
}

iniciarServidor();
