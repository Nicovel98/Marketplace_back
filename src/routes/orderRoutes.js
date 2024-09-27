const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const verifyToken = require('../middlewares/authMiddleware');

// Ruta para obtener todas las Ordenes de compra
//router.get('/test', categoryController.testCategory);
router.post('/create', verifyToken, orderController.createOrderFromCart);
router.get('/:id', verifyToken, orderController.getOrderById);
router.get('/:buyer', verifyToken, orderController.getOrdersByBuyer);
router.patch('/:id', verifyToken, orderController.updateOrder);
router.delete('/:id', verifyToken, orderController.deleteOrder);

module.exports = router;