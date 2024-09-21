const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

// Importar las rutas
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

/* Llamar los archivos de rutas de cada entidad */
/* http://localhost:3006/api/auth/signup */
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;