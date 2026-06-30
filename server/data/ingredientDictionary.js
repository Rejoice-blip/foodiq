// A dictionary of common food ingredients and their plain-language explanations
const ingredientDictionary = {
  "sugar": {
    explanation: "A sweetener that adds energy (calories) but no nutrients. High intake is linked to weight gain and diabetes risk.",
    concern: "moderate",
  },
  "high fructose corn syrup": {
    explanation: "A cheap, highly processed sweetener made from corn. Linked to obesity and metabolic issues when consumed often.",
    concern: "high",
  },
  "salt": {
    explanation: "Used to enhance flavor and preserve food. Too much can raise blood pressure over time.",
    concern: "moderate",
  },
  "sodium": {
    explanation: "A mineral found in salt. High sodium intake is linked to high blood pressure and heart disease.",
    concern: "moderate",
  },
  "monosodium glutamate": {
    explanation: "Also known as MSG — a flavor enhancer. Generally recognized as safe, though some people are sensitive to it.",
    concern: "low",
  },
  "msg": {
    explanation: "Short for monosodium glutamate — a flavor enhancer. Generally safe, though some people are sensitive to it.",
    concern: "low",
  },
  "artificial flavor": {
    explanation: "Lab-created compounds that mimic natural tastes. Generally considered safe, but offer no nutritional value.",
    concern: "low",
  },
  "natural flavor": {
    explanation: "Flavoring derived from real plant or animal sources, though it's often a small, lab-processed amount.",
    concern: "low",
  },
  "caramel color": {
    explanation: "A brown coloring agent used in sodas and sauces. Some forms have been linked to health concerns in large amounts.",
    concern: "moderate",
  },
  "red 40": {
    explanation: "An artificial food dye. Some studies link it to hyperactivity in children, though it's approved for use.",
    concern: "moderate",
  },
  "yellow 5": {
    explanation: "An artificial food dye, also called tartrazine. Some people report sensitivity reactions.",
    concern: "moderate",
  },
  "yellow 6": {
    explanation: "An artificial food dye used for orange/yellow coloring. Considered safe in small amounts.",
    concern: "low",
  },
  "blue 1": {
    explanation: "An artificial food dye. Considered safe by regulators, though some prefer to avoid synthetic dyes.",
    concern: "low",
  },
  "sodium benzoate": {
    explanation: "A preservative that prevents mold and bacteria growth. Considered safe in regulated amounts.",
    concern: "low",
  },
  "potassium sorbate": {
    explanation: "A common preservative that stops mold and yeast from growing in food.",
    concern: "low",
  },
  "bha": {
    explanation: "Butylated hydroxyanisole — a preservative that prevents fats from going rancid. Some studies raise long-term safety questions.",
    concern: "high",
  },
  "bht": {
    explanation: "Butylated hydroxytoluene — a preservative similar to BHA. Some studies raise long-term safety questions.",
    concern: "high",
  },
  "partially hydrogenated oil": {
    explanation: "A source of trans fat, which raises bad cholesterol and increases heart disease risk. Largely banned in many countries.",
    concern: "high",
  },
  "trans fat": {
    explanation: "An artificial fat linked to heart disease. Health experts recommend avoiding it entirely.",
    concern: "high",
  },
  "palm oil": {
    explanation: "A common vegetable oil high in saturated fat. Also raises environmental concerns due to deforestation.",
    concern: "moderate",
  },
  "vegetable oil": {
    explanation: "A general term for oils extracted from plants, used for cooking and frying. Nutritional quality varies by source.",
    concern: "low",
  },
  "corn syrup": {
    explanation: "A sweetener made from corn starch. Adds calories with little nutritional benefit.",
    concern: "moderate",
  },
  "dextrose": {
    explanation: "A simple sugar derived from corn, often used as a sweetener or filler.",
    concern: "moderate",
  },
  "maltodextrin": {
    explanation: "A starch-based thickener and filler. It raises blood sugar quickly despite not tasting very sweet.",
    concern: "moderate",
  },
  "carrageenan": {
    explanation: "A thickener derived from seaweed, used to improve texture in dairy and plant-based products.",
    concern: "low",
  },
  "xanthan gum": {
    explanation: "A thickening agent made through fermentation. Considered safe and commonly used in gluten-free products.",
    concern: "low",
  },
  "guar gum": {
    explanation: "A plant-based thickener used to improve texture. Generally considered safe.",
    concern: "low",
  },
  "lecithin": {
    explanation: "An emulsifier that helps mix oil and water-based ingredients smoothly. Usually derived from soy or sunflower.",
    concern: "low",
  },
  "soy lecithin": {
    explanation: "An emulsifier derived from soybeans. Helps blend ingredients smoothly. May be a concern for soy allergies.",
    concern: "low",
  },
  "whey protein": {
    explanation: "A protein derived from milk during cheese-making. A common source of dairy protein, but contains lactose traces.",
    concern: "low",
  },
  "casein": {
    explanation: "The main protein found in milk. Common in dairy products and protein supplements.",
    concern: "low",
  },
  "gluten": {
    explanation: "A protein found in wheat, barley, and rye. Must be avoided by people with celiac disease or gluten sensitivity.",
    concern: "moderate",
  },
  "citric acid": {
    explanation: "A natural acid found in citrus fruits, used to add tartness and act as a preservative.",
    concern: "low",
  },
  "ascorbic acid": {
    explanation: "The scientific name for Vitamin C. Often added as a preservative and nutrient booster.",
    concern: "low",
  },
  "potassium benzoate": {
    explanation: "A preservative similar to sodium benzoate, used to prevent mold and bacteria growth.",
    concern: "low",
  },
  "calcium propionate": {
    explanation: "A preservative commonly used in bread to prevent mold growth.",
    concern: "low",
  },
  "aspartame": {
    explanation: "An artificial sweetener much sweeter than sugar with virtually no calories. Considered safe by regulators, though debated.",
    concern: "moderate",
  },
  "sucralose": {
    explanation: "An artificial sweetener, also known as Splenda. Has no calories and is considered safe in normal amounts.",
    concern: "low",
  },
  "stevia": {
    explanation: "A natural, zero-calorie sweetener derived from the stevia plant. Generally considered a healthier sugar alternative.",
    concern: "low",
  },
  "carbonated water": {
    explanation: "Water infused with carbon dioxide gas, giving drinks their fizz. Has no nutritional impact on its own.",
    concern: "low",
  },
  "modified food starch": {
    explanation: "Starch that's been chemically altered to improve texture and shelf life. Generally considered safe.",
    concern: "low",
  },
  "enriched flour": {
    explanation: "Wheat flour with some nutrients added back after processing removed them. Less nutritious than whole grain flour.",
    concern: "low",
  },
  "whole wheat flour": {
    explanation: "Flour made from the entire wheat grain, retaining fiber and nutrients. A healthier choice than refined flour.",
    concern: "low",
  },
};

module.exports = ingredientDictionary;