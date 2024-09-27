const Cart = require('../models/CartModel'); // El modelo del carrito
const Order = require('../models/OrderModel'); // El modelo de orden de compra

// Crear una orden de compra a partir del carrito
exports.createOrderFromCart = async (req, res) => {
    try {
        // Consultar el carrito del comprador autenticado (buyer)
        const { buyer } = req.body;
        //console.log(buyer);
        const cart = await Cart.findOne({ buyer: buyer }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'El carrito de compras está vacío' });
        }

        // Crear la orden de compra con los productos del carrito
        const newOrder = new Order({
            buyer: buyer, // Usamos el campo 'buyer' ahora
            products: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalPrice: cart.totalPrice,
            status: 'pending'
        });

        const savedOrder = await newOrder.save();

        // Vaciar el carrito de compras
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear la orden de compra', error });
    }
};

// Consultar una orden de compra por ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('buyer').populate('products.product');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar la orden', error });
    }
};


// Consultar todas las órdenes de compra de un comprador (buyer)
exports.getOrdersByBuyer = async (req, res) => {
    try {
        const { buyer } = req.params;
        console.log(buyer);
        const orders = await Order.find({ buyer: buyer }).populate('products.product');

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No hay órdenes para este comprador' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar las órdenes', error });
    }
};

// Editar una orden de compra por ID
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('products.product');

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la orden', error });
    }
};


// Eliminar una orden de compra por ID
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json({ message: 'Orden eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la orden', error });
    }
};
