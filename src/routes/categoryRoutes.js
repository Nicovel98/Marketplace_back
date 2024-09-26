const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const verifyToken = require('../middlewares/authMiddleware');

// Ruta para obtener todas las categorías
router.get('/test', categoryController.testCategory);
router.post('/create', verifyToken, categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.patch('/:id', verifyToken, categoryController.updateCategory);
router.delete('/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;