const express = require('express');
const router = express.Router();
const { saveProfile, getProfile } = require('../controllers/profileController');
const protect = require('../middleware/authMiddleware');

// Save or update profile (protected)
router.post('/', protect, saveProfile);

// Get profile (protected)
router.get('/', protect, getProfile);

module.exports = router;