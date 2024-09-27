/* Modelo de carrito de compra */
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;