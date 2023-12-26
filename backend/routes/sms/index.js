var express = require('express');
var SMSController = require('../../controllers/sms/smsController');
var router = express.Router();

// Product Routes
router.post('/',SMSController.sendSmsClient );



module.exports = router;
