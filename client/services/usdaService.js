const axios = require('axios');

const searchFood = async (query) => {
  const apiKey = process.env.USDA_API_KEY;

  const response = await axios.get(
    `https://api.nal.usda.gov/fdc/v1/foods/search`,
    { params: { query, api_key: apiKey, pageSize: 5 } }
  );

  const foods = response.data.foods;
  if (!foods || foods.length === 0) return null;

  return foods.map((food) => {
    const nutrients = {};
    (food.foodNutrients || []).forEach((n) => {
      if (n.nutrientName === 'Energy') nutrients.calories = n.value;
      if (n.nutrientName === 'Protein') nutrients.protein = n.value;
      if (n.nutrientName === 'Carbohydrate, by difference') nutrients.carbs = n.value;
      if (n.nutrientName === 'Total lipid (fat)') nutrients.fat = n.value;
      if (n.nutrientName === 'Fiber, total dietary') nutrients.fiber = n.value;
      if (n.nutrientName === 'Sodium, Na') nutrients.sodium = n.value;
    });
    return {
      id: food.fdcId,
      name: food.description,
      brand: food.brandOwner || 'Generic',
      source: 'usda',
      match_type: 'exact',
      confidence_score: 0.95,
      nutrients,
    };
  });
};

module.exports = { searchFood };