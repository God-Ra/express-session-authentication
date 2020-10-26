const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard');

router.get('/', dashboardController.check_auth, dashboardController.dashboard_show);

module.exports = router;