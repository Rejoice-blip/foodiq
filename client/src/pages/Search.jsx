import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alerts, setAlerts] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError("");
    setResults([]);
    setAlerts({});

    try {
      const res = await axios.get(
        `http://localhost:5000/api/food/search?q=${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(res.data.results);
    } catch (err) {
      setError("No food found. Try a different search.");
    } finally {
      setLoading(false);
    }
  };

  const checkAlerts = async (food) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/alerts/check",
        { food_name: food.name, nutrients: food.nutrients },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlerts((prev) => ({ ...prev, [food.id]: res.data.alerts }));
    } catch (err) {
      console.error("Alert check failed", err);
    }
  };

  const concernColor = (concern) => {
    if (concern === "high") return "#E53935";
    if (concern === "moderate") return "#F9A825";
    if (concern === "low") return "#2D9B6F";
    return "#6B7280";
  };

  const confidenceLabel = (score) => {
    if (score >= 0.9) return "✅ Verified match";
    if (score >= 0.7) return "🟡 Likely match";
    return "⚪ Estimated match";
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.logo}>🥗 FoodIQ</h1>
        <button style={styles.backBtn} onClick={() => navigate("/home")}>
          ← Back
        </button>
      </div>

      <div style={styles.content}>
        <h2 style={styles.title}>Search Food & Drinks</h2>
        <form onSubmit={handleSearch} style={styles.searchBox}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="🔍 e.g. rice, apple, milk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button style={styles.searchBtn} type="submit">
            Search
          </button>
        </form>
        {loading && <p style={styles.info}>Searching...</p>}
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.results}>
          {results.map((food, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.foodName}>{food.name}</h3>
              <p style={styles.brand}>Brand: {food.brand}</p>
              {food.confidence_score != null && (
                <span style={styles.confidenceBadge}>
                  {confidenceLabel(food.confidence_score)}
                </span>
              )}

              <div style={styles.nutrients}>
                {food.nutrients?.calories != null && food.nutrients.calories > 0 && (
                  <span style={styles.nutrient}>🔥 {food.nutrients.calories} kcal</span>
                )}
                {food.nutrients?.protein != null && food.nutrients.protein > 0 && (
                  <span style={styles.nutrient}>🥩 {food.nutrients.protein}g protein</span>
                )}
                {food.nutrients?.carbs != null && food.nutrients.carbs > 0 && (
                  <span style={styles.nutrient}>🍞 {food.nutrients.carbs}g carbs</span>
                )}
                {food.nutrients?.fat != null && food.nutrients.fat > 0 && (
                  <span style={styles.nutrient}>🧈 {food.nutrients.fat}g fat</span>
                )}
                {food.nutrients?.sugar != null && food.nutrients.sugar > 0 && (
                  <span style={styles.nutrient}>🍬 {food.nutrients.sugar}g sugar</span>
                )}
                {food.nutrients?.fiber != null && food.nutrients.fiber > 0 && (
                  <span style={styles.nutrient}>🌿 {food.nutrients.fiber}g fiber</span>
                )}
                {food.nutrients?.sodium != null && food.nutrients.sodium > 0 && (
                  <span style={styles.nutrient}>🧂 {food.nutrients.sodium}mg sodium</span>
                )}
                {!food.nutrients?.calories && !food.nutrients?.protein && !food.nutrients?.carbs && (
                  <span style={{ color: "#6B7280", fontSize: "13px" }}>No nutrient data available</span>
                )}
              </div>

              {food.ingredients && food.ingredients.length > 0 && (
                <div style={styles.ingredientsSection}>
                  <h4 style={styles.ingredientsTitle}>🧪 Ingredients Explained</h4>
                  {food.ingredients.map((ing, i) => (
                    <div key={i} style={styles.ingredientRow}>
                      <span
                        style={{
                          ...styles.concernDot,
                          backgroundColor: concernColor(ing.concern),
                        }}
                      ></span>
                      <div>
                        <p style={styles.ingredientName}>{ing.name}</p>
                        <p style={styles.ingredientExplanation}>{ing.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {food.alternatives && (
                <div style={styles.alternativesSection}>
                  <h4 style={styles.alternativesTitle}>💡 Smarter Alternatives</h4>
                  <p style={styles.alternativesReason}>
                    Because this food is {food.alternatives.reason}, consider:
                  </p>
                  <div style={styles.alternativesList}>
                    {food.alternatives.suggestions.map((suggestion, i) => (
                      <div key={i} style={styles.alternativeChip}>{suggestion}</div>
                    ))}
                  </div>
                </div>
              )}

              <button style={styles.alertBtn} onClick={() => checkAlerts(food)}>
                Check Health Alerts
              </button>

              {alerts[food.id] && (
                <div style={styles.alertBox}>
                  {alerts[food.id].length === 0 ? (
                    <p style={styles.safeMsg}>✅ This food looks safe for your health profile!</p>
                  ) : (
                    alerts[food.id].map((alert, i) => (
                      <p key={i} style={styles.alertMsg}>{alert.message}</p>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#F9FAFB" },
  navbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 32px", backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  logo: { color: "#2D9B6F", fontSize: "24px", margin: 0 },
  backBtn: {
    padding: "8px 16px", backgroundColor: "#fff", color: "#2D9B6F",
    border: "1px solid #2D9B6F", borderRadius: "8px", cursor: "pointer", fontSize: "14px",
  },
  content: { maxWidth: "700px", margin: "40px auto", padding: "0 16px" },
  title: { color: "#1E2A2A", fontSize: "24px", marginBottom: "24px", textAlign: "center" },
  searchBox: { display: "flex", gap: "8px", marginBottom: "32px" },
  searchInput: {
    flex: 1, padding: "14px", borderRadius: "8px",
    border: "1px solid #ddd", fontSize: "16px",
  },
  searchBtn: {
    padding: "14px 24px", backgroundColor: "#2D9B6F", color: "#fff",
    border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer",
  },
  info: { textAlign: "center", color: "#6B7280" },
  error: { textAlign: "center", color: "#E53935" },
  results: { display: "flex", flexDirection: "column", gap: "16px" },
  card: {
    backgroundColor: "#fff", padding: "20px", borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  foodName: { color: "#1E2A2A", fontSize: "18px", marginBottom: "4px" },
  brand: { color: "#6B7280", fontSize: "14px", marginBottom: "8px" },
  confidenceBadge: {
    display: "inline-block", backgroundColor: "#F3F4F6", color: "#374151",
    padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600",
    marginBottom: "12px",
  },
  nutrients: { display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" },
  nutrient: {
    backgroundColor: "#F0FDF4", color: "#2D9B6F", padding: "6px 12px",
    borderRadius: "20px", fontSize: "13px", fontWeight: "600",
  },
  ingredientsSection: {
    marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #F0F0F0",
  },
  ingredientsTitle: {
    color: "#1E2A2A", fontSize: "15px", marginBottom: "12px",
  },
  ingredientRow: {
    display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px",
  },
  concernDot: {
    width: "10px", height: "10px", borderRadius: "50%", marginTop: "5px", flexShrink: 0,
  },
  ingredientName: {
    color: "#1E2A2A", fontSize: "14px", fontWeight: "600", margin: "0 0 2px 0", textTransform: "capitalize",
  },
  ingredientExplanation: {
    color: "#6B7280", fontSize: "13px", margin: 0, lineHeight: "1.4",
  },
  alternativesSection: {
    marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #F0F0F0",
  },
  alternativesTitle: {
    color: "#1E2A2A", fontSize: "15px", marginBottom: "6px",
  },
  alternativesReason: {
    color: "#6B7280", fontSize: "13px", marginBottom: "10px",
  },
  alternativesList: {
    display: "flex", flexDirection: "column", gap: "8px",
  },
  alternativeChip: {
    backgroundColor: "#F0FDF4", color: "#1E2A2A", padding: "10px 14px",
    borderRadius: "8px", fontSize: "13px", border: "1px solid #D1FAE5",
  },
  alertBtn: {
    padding: "8px 16px", backgroundColor: "#FFF7ED", color: "#EA580C",
    border: "1px solid #EA580C", borderRadius: "8px", cursor: "pointer",
    fontSize: "14px", marginTop: "8px",
  },
  alertBox: {
    marginTop: "12px", padding: "12px", backgroundColor: "#FFF7ED",
    borderRadius: "8px", border: "1px solid #FED7AA",
  },
  alertMsg: { color: "#EA580C", margin: "4px 0", fontSize: "14px" },
  safeMsg: { color: "#2D9B6F", margin: "4px 0", fontSize: "14px" },
};