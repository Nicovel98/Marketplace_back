const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); // Importar el controlador
const verifyToken = require('../middlewares/authMiddleware'); // Importar el middleware de autenticación


// Rutas protegidas con middleware `verifyToken`
router.post('/', verifyToken, userController.createUser);
router.get('/', verifyToken, userController.getUsers);  // Obtener todos los usuarios (solo usuarios autenticados)
router.get('/:id', verifyToken, userController.getUserById);  // Obtener un usuario por ID (solo usuarios autenticados)
router.patch('/:id', verifyToken, userController.updateUser);  // Actualizar un usuario por ID (solo usuarios autenticados)
router.delete('/:id', verifyToken, userController.deleteUser);  // Eliminar un usuario por ID (solo usuarios autenticados)

module.exports = router;
