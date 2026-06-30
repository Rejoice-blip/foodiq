const express = require('express');
const router = express.Router();
const { checkAlerts } = require('../controllers/alertController');
const protect = require('../middleware/authMiddleware');

// Check alerts for a food (protected)
router.post('/check', protect, checkAlerts);

module.exports = router;