const alternativesDictionary = require('../data/alternativesDictionary');

// Decides if a food needs alternatives based on its nutrient profile,
// then finds matching suggestions from the dictionary
const getAlternatives = (foodName, nutrients) => {
  const nameLower = (foodName || '').toLowerCase();
  const reasons = [];

  // Check nutrient-based reasons first
  if (nutrients?.sugar > 15) {
    reasons.push('high in sugar');
  }
  if (nutrients?.sodium > 400) {
    reasons.push('high in sodium');
  }
  if (nutrients?.fat > 20) {
    reasons.push('high in fat');
  }
  if (nutrients?.calories > 500) {
    reasons.push('high in calories');
  }

  // Find a matching keyword category
  const matchedCategory = alternativesDictionary.find((entry) =>
    entry.keywords.some((keyword) => nameLower.includes(keyword))
  );

  // If no nutrient concern AND no keyword match, no alternatives needed
  if (reasons.length === 0 && !matchedCategory) {
    return null;
  }

  // If we matched a category, use its alternatives
  if (matchedCategory) {
    return {
      reason: matchedCategory.triggerReason,
      suggestions: matchedCategory.alternatives,
    };
  }

  // Otherwise, give a generic suggestion based on the nutrient reason
  return {
    reason: reasons.join(', '),
    suggestions: [
      'Look for a version with less sugar, sodium, or fat',
      'Try a smaller portion size',
      'Pair with a vegetable or fiber-rich side to balance the meal',
    ],
  };
};

module.exports = { getAlternatives };