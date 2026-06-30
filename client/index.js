const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const foodRoutes = require('./routes/foodRoutes');
const alertRoutes = require('./routes/alertRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/alerts', alertRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'FoodIQ API is running ✅' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});