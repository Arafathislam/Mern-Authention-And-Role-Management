var express = require('express');
var SaleController = require('../../controllers/sales/salesController.js');
var router = express.Router();

// Sales Routes
router.get('/', SaleController.getAllSale);
router.post('/addsale', SaleController.addSale);
router.get('/:id', SaleController.getSingleSale);
router.post('/dailySale', SaleController.getDailySale);
router.post('/monthlySale', SaleController.getMonthlySale);
router.post('/createProductSale', SaleController.createProductSale);
router.post('/getProductSale', SaleController.getProductSale);
router.post('/createDailySale', SaleController.createDailySale);

module.exports = router;
