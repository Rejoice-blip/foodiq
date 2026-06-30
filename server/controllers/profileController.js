const pool = require('../db/db');

// SAVE OR UPDATE PROFILE
const saveProfile = async (req, res) => {
  const user_id = req.user.id;
  const {
    age,
    gender,
    weight_kg,
    height_cm,
    health_goals,
    dietary_preferences,
    allergies,
    medical_conditions,
  } = req.body;

  try {
    // Check if profile already exists
    const existing = await pool.query(
      'SELECT * FROM health_profiles WHERE user_id = $1',
      [user_id]
    );

    if (existing.rows.length > 0) {
      // Update existing profile
      await pool.query(
        `UPDATE health_profiles SET age=$1, gender=$2, weight_kg=$3, height_cm=$4,
        health_goals=$5, dietary_preferences=$6, allergies=$7, medical_conditions=$8,
        updated_at=NOW() WHERE user_id=$9`,
        [age, gender, weight_kg, height_cm, health_goals,
        dietary_preferences, allergies, medical_conditions, user_id]
      );
    } else {
      // Create new profile
      await pool.query(
        `INSERT INTO health_profiles (user_id, age, gender, weight_kg, height_cm,
        health_goals, dietary_preferences, allergies, medical_conditions)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [user_id, age, gender, weight_kg, height_cm, health_goals,
        dietary_preferences, allergies, medical_conditions]
      );
    }

    res.json({ message: 'Profile saved successfully ✅' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET PROFILE
const getProfile = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM health_profiles WHERE user_id = $1',
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { saveProfile, getProfile };
