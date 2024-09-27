const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

// Importar las rutas
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');

/* Ruta principal para acceder a todas las rutas protegidas */

/* Llamar los archivos de rutas de cada entidad */
/* http://localhost:3006/api/auth/signup */
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);

module.exports = router;