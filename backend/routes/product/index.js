var express = require('express');
var ProductController = require('../../controllers/product/productController.js');
var router = express.Router();

// Product Routes
router.get('/', ProductController.getAllProduct);
router.post('/create', ProductController.createProduct);
router.get('/:id', ProductController.getSingleProduct);
router.post('/update/:id', ProductController.updateProduct);
router.get('/delete/:id', ProductController.deleteProduct);


module.exports = router;
