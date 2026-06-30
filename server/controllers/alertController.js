const pool = require('../db/db');

const checkAlerts = async (req, res) => {
  const user_id = req.user.id;
  const { food_name, nutrients } = req.body;

  try {
    const profileResult = await pool.query(
      'SELECT * FROM health_profiles WHERE user_id = $1',
      [user_id]
    );

    if (profileResult.rows.length === 0) {
      return res.json({ alerts: [] });
    }

    const profile = profileResult.rows[0];
    const conditions = profile.medical_conditions || [];
    const goals = profile.health_goals || [];
    const alerts = [];

    // Lactose intolerance - flag all dairy
    if (conditions.includes('lactose intolerance')) {
      const dairyWords = ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'dairy', 'whey', 'lactose'];
      const isDairy = dairyWords.some(word => food_name.toLowerCase().includes(word));
      if (isDairy) {
        alerts.push({
          type: 'warning',
          message: `⚠️ "${food_name}" contains dairy — not recommended for lactose intolerance`,
        });
      }
    }

    // Diabetes - check sugar and carbs
    if (conditions.includes('diabetes')) {
      if (nutrients.sugar > 10) {
        alerts.push({
          type: 'warning',
          message: `⚠️ High sugar (${nutrients.sugar}g) — not recommended for diabetes`,
        });
      }
      if (nutrients.carbs > 45) {
        alerts.push({
          type: 'warning',
          message: `⚠️ High carbs (${nutrients.carbs}g) — monitor intake for diabetes`,
        });
      }
    }

    // Hypertension - check sodium
    if (conditions.includes('hypertension') && nutrients.sodium > 400) {
      alerts.push({
        type: 'warning',
        message: `⚠️ High sodium (${nutrients.sodium}mg) — not recommended for hypertension`,
      });
    }

    // High cholesterol - check fat
    if (conditions.includes('high cholesterol') && nutrients.fat > 20) {
      alerts.push({
        type: 'warning',
        message: `⚠️ High fat (${nutrients.fat}g) — not recommended for high cholesterol`,
      });
    }

    // Weight loss - check calories
    if (goals.includes('lose weight') && nutrients.calories > 500) {
      alerts.push({
        type: 'info',
        message: `ℹ️ High calorie food (${nutrients.calories} kcal) — consider a smaller portion`,
      });
    }

    // Save alerts
    for (const alert of alerts) {
      await pool.query(
        `INSERT INTO health_alerts (user_id, alert_type, message) VALUES ($1, $2, $3)`,
        [user_id, alert.type, alert.message]
      );
    }

    res.json({ alerts });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { checkAlerts };