const express = require('express');
const router = express.Router();
const productController = require("../controllers/product");
const multer = require("multer");
const path = require('path');
const verifyToken = require('../middlewares/authMiddleware')

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombra la imagen con la fecha actual
    }
});

// Crear instancia de Multer con la configuración
const upload = multer({
    storage: storage

});
//Ruta para obtener los productos
router.get('/test', productController.testProduct);
router.post('/create', verifyToken, upload.single('image'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;
