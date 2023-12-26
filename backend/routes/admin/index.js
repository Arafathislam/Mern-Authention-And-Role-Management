var express = require('express');
var AdminMonitorController = require('../../controllers/admin/adminController.js');
var checkAdminAuth = require('../../middleware/admin.js');

var router = express.Router();

// Product Routes
router.get('/monitor',AdminMonitorController.getAllUserMonitor);
router.get('/details',AdminMonitorController.getAllUser);
router.get('/delete/:id',AdminMonitorController.deleteUser);
router.post('/',AdminMonitorController.adminLogin);
router.post('/register/psw/screct',AdminMonitorController.addAdmin);
router.post('/cnpsw', checkAdminAuth, AdminMonitorController.changePassword);






module.exports = router;
