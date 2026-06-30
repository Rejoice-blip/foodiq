const { searchFood } = require('../services/usdaService');
const pool = require('../db/db');

// SEARCH FOOD
const search = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Please provide a search query' });
  }

  try {
    // Check cache first
    const cached = await pool.query(
      'SELECT * FROM food_cache WHERE LOWER(food_name) = LOWER($1)',
      [q]
    );
if (cached.rows.length > 0) {
  const formatted = cached.rows.map((row) => ({
    id: row.id,
    external_id: row.external_id,
    name: row.food_name,
    brand: row.brand || 'Generic',
    source: row.source,
    match_type: row.match_type,
    confidence_score: row.confidence_score,
    nutrients: typeof row.nutrition_data === 'string'
      ? JSON.parse(row.nutrition_data)
      : row.nutrition_data,
  }));
  return res.json({ source: 'cache', results: formatted });
}
    // Fetch from USDA
    const results = await searchFood(q);

    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'No food found for that search' });
    }

    // Cache the results
    for (const food of results) {
      await pool.query(
        `INSERT INTO food_cache (food_name, external_id, source, nutrition_data, match_type, confidence_score)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`,
        [food.name, food.id.toString(), food.source,
         JSON.stringify(food.nutrients), food.match_type, food.confidence_score]
      );
    }

    res.json({ source: 'usda', results });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET FOOD DETAIL
const getFoodDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM food_cache WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { search, getFoodDetail };
