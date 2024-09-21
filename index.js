const express = require('express');
require('dotenv').config();

// Importar rutas y conexión a la DB
const connectDB = require('./src/config/database');
const routes = require('./src/routes/routes'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', routes);

// Configuración del servidor
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Conexión a la base de datos
connectDB();