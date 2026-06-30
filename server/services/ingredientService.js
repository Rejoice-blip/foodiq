const ingredientDictionary = require('../data/ingredientDictionary');

const parseIngredients = (ingredientText) => {
  if (!ingredientText) return [];
  return ingredientText
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.length > 0);
};

const explainIngredients = (ingredientText) => {
  const ingredients = parseIngredients(ingredientText);

  // Sort dictionary keys longest-first so multi-word phrases
  // (e.g. "ascorbic acid") are checked before short words (e.g. "sodium")
  const sortedKeys = Object.keys(ingredientDictionary).sort(
    (a, b) => b.length - a.length
  );

  return ingredients.map((ingredient) => {
    // Try exact match first
    let match = ingredientDictionary[ingredient];

    if (!match) {
      const words = ingredient
        .replace(/[().%]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

      const foundKey = sortedKeys.find((key) => {
        if (key.includes(' ')) {
          return ingredient.includes(key);
        }
        return words.includes(key);
      });

      if (foundKey) match = ingredientDictionary[foundKey];
    }

    return {
      name: ingredient,
      explanation: match ? match.explanation : 'No explanation available for this ingredient.',
      concern: match ? match.concern : 'unknown',
    };
  });
};

module.exports = { explainIngredients };