const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const verifyToken = require('../middlewares/authMiddleware');

// Ruta para obtener el carrtio de compra
router.get('/:buyerId', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/remove', cartController.removeFromCart);
router.post('/clear', cartController.clearCart);

module.exports = router;