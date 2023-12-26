var express = require('express');
var StockController = require('../../controllers/stock/stockController.js');
var router = express.Router();

// Stock Routes
router.get('/', StockController.getAllStock);
router.get('/:id', StockController.getSingleStock);
router.post('/add', StockController.addStock);

module.exports = router;
