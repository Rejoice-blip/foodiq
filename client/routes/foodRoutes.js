const express = require('express');
const router = express.Router();
const { search, getFoodDetail } = require('../controllers/foodController');
const protect = require('../middleware/authMiddleware');

// Search food (protected)
router.get('/search', protect, search);

// Get food detail (protected)
router.get('/:id', protect, getFoodDetail);

module.exports = router;