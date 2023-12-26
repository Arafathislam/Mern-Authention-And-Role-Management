
var express = require('express');
var ReceiptController = require('../../controllers/receipt/receiptController.js');
var router = express.Router();

// Receipt Routes
router.get('/', ReceiptController.getAllReceipt);
router.post('/create', ReceiptController.createReceipt);
router.get('/:id', ReceiptController.getSingleReceipt);
router.post('/date', ReceiptController.getRecieptByDate);

module.exports = router;
