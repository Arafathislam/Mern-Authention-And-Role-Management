var express = require('express');
var DashboardController = require('../../controllers/dashboard/dashboardController.js');
var router = express.Router();

// Product Routes
router.get('/', DashboardController.getAllDashboard);



module.exports = router;
