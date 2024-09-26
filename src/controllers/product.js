const ProductModel = require('../models/ProductModel');

// Método de prueba
exports.testProduct = async (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde el controlador product"
    });
}

// Crear productos
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Verificar si se ha subido una imagen
        if (!req.file) {
            return res.status(400).json({ message: 'Imagen requerida' });
        }

        // Obtener la ruta de la imagen cargada
        const imageUrl = req.file.path;

        // Validar que todos los campos estén presentes
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Crear un nuevo producto con la imagen incluida
        const newProduct = new ProductModel({
            name,
            description,
            price,
            category,
            stock,
            image: imageUrl  // Agregar la imagen al producto
        });

        // Guardar el producto en la base de datos
        await newProduct.save();

        // Devolver la respuesta con el producto creado
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findById(productId).populate('category');

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const productId = req.params.id;

        // Verificar si se ha subido una nueva imagen
        let imageUrl = req.file ? req.file.path : undefined;

        // Validar que el producto existe
        let product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualizar el producto
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        if (imageUrl) {
            product.image = imageUrl;
        }

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Validar que el producto existe
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Eliminar el producto
        await ProductModel.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};
