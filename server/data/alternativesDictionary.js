// Maps food categories/keywords to healthier alternative suggestions.
// Each entry checks if the food name contains the keyword, then suggests alternatives.
const alternativesDictionary = [
  {
    keywords: ["soda", "cola", "soft drink", "pop"],
    triggerReason: "high sugar soft drink",
    alternatives: [
      "Sparkling water with a splash of fruit juice",
      "Unsweetened iced tea",
      "Diet or zero-sugar version of the same drink",
    ],
  },
  {
    keywords: ["candy", "chocolate bar", "gummy", "sweets"],
    triggerReason: "high sugar candy",
    alternatives: [
      "Dark chocolate (70%+ cocoa)",
      "Dried fruit (in moderation)",
      "Fresh fruit like grapes or berries",
    ],
  },
  {
    keywords: ["chips", "crisps", "fries"],
    triggerReason: "high sodium/fat snack",
    alternatives: [
      "Air-popped popcorn",
      "Roasted chickpeas",
      "Baked vegetable chips",
    ],
  },
  {
    keywords: ["white bread", "white rice"],
    triggerReason: "low fiber refined grain",
    alternatives: [
      "Whole wheat bread",
      "Brown rice or quinoa",
      "Whole grain pasta",
    ],
  },
  {
    keywords: ["ice cream", "milkshake"],
    triggerReason: "high sugar/fat dessert",
    alternatives: [
      "Frozen yogurt",
      "Banana 'nice cream' (blended frozen banana)",
      "Greek yogurt with fruit",
    ],
  },
  {
    keywords: ["bacon", "sausage", "processed meat", "hot dog"],
    triggerReason: "high sodium processed meat",
    alternatives: [
      "Grilled chicken breast",
      "Turkey bacon",
      "Plant-based sausage alternative",
    ],
  },
  {
    keywords: ["butter", "margarine"],
    triggerReason: "high saturated fat",
    alternatives: [
      "Avocado spread",
      "Olive oil (for cooking)",
      "Light/reduced-fat butter alternative",
    ],
  },
  {
    keywords: ["milk", "cream", "cheese", "yogurt"],
    triggerReason: "dairy product",
    alternatives: [
      "Lactose-free milk",
      "Almond, oat, or soy milk",
      "Coconut yogurt (for lactose-intolerant users)",
    ],
  },
  {
    keywords: ["energy drink"],
    triggerReason: "high sugar/caffeine stimulant drink",
    alternatives: [
      "Green tea",
      "Black coffee (in moderation)",
      "Sparkling water with citrus",
    ],
  },
  {
    keywords: ["cereal", "frosted", "sugary cereal"],
    triggerReason: "high sugar breakfast cereal",
    alternatives: [
      "Plain oatmeal with fresh fruit",
      "Whole grain cereal with no added sugar",
      "Greek yogurt with nuts and berries",
    ],
  },
  {
    keywords: ["cake", "pastry", "donut", "cookie"],
    triggerReason: "high sugar baked good",
    alternatives: [
      "Homemade oat-based energy bites",
      "Fruit salad",
      "A small portion with reduced-sugar recipe",
    ],
  },
  {
    keywords: ["fried chicken", "fried"],
    triggerReason: "deep-fried high fat food",
    alternatives: [
      "Grilled or baked chicken",
      "Air-fried version of the same food",
      "Oven-roasted alternative",
    ],
  },
];

module.exports = alternativesDictionary;