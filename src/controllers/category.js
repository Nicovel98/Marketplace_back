const CategoryModel = require("../models/CategoryModel");

// Método de prueba
exports.testCategory = async (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde el controlador category"
    });
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingName = await CategoryModel.findOne({ name });
        if (existingName) {
            return res.status(400).json({ message: 'La categoría ya existe' });
        }
        if (!name || !description) {
            return res.status(400).json({ message: 'Los campos nombre y descripción son obligatorios' });
        }
        const newCategory = new CategoryModel(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría', error });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la categoría', error });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name && !description) {
            return res.status(400).json({ message: 'Los campos nombre y descripción son obligatorios' });
        }
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
};