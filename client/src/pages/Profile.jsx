import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight_kg: "",
    height_cm: "",
    health_goals: [],
    dietary_preferences: [],
    allergies: [],
    medical_conditions: [],
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data;
        setForm({
          age: p.age || "",
          gender: p.gender || "",
          weight_kg: p.weight_kg || "",
          height_cm: p.height_cm || "",
          health_goals: p.health_goals || [],
          dietary_preferences: p.dietary_preferences || [],
          allergies: p.allergies || [],
          medical_conditions: p.medical_conditions || [],
        });
      } catch (err) {
        console.log("No existing profile yet");
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log("Submitting profile:", form);
    console.log("Token:", token);

    try {
      const res = await axios.post("http://localhost:5000/api/profile", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Save response:", res.data);
      setSuccess("Profile saved successfully ✅");
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      console.error("Save profile error:", err);
      console.error("Error response:", err.response);
      setError(
        err.response?.data?.message || "Failed to save profile. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🥗 FoodIQ</h1>
        <h2 style={styles.title}>My Health Profile</h2>
        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>

          <label style={styles.label}>Age</label>
          <input style={styles.input} type="number" name="age"
            value={form.age} onChange={handleChange} placeholder="e.g. 25" />

          <label style={styles.label}>Gender</label>
          <select style={styles.input} name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label style={styles.label}>Weight (kg)</label>
          <input style={styles.input} type="number" name="weight_kg"
            value={form.weight_kg} onChange={handleChange} placeholder="e.g. 70" />

          <label style={styles.label}>Height (cm)</label>
          <input style={styles.input} type="number" name="height_cm"
            value={form.height_cm} onChange={handleChange} placeholder="e.g. 175" />

          <label style={styles.label}>Health Goals</label>
          <div style={styles.checkboxGroup}>
            {["lose weight", "build muscle", "eat healthier", "manage diabetes", "manage hypertension"].map((goal) => (
              <label key={goal} style={styles.checkboxLabel}>
                <input type="checkbox" checked={form.health_goals.includes(goal)}
                  onChange={() => handleCheckbox("health_goals", goal)} /> {goal}
              </label>
            ))}
          </div>

          <label style={styles.label}>Dietary Preferences</label>
          <div style={styles.checkboxGroup}>
            {["vegetarian", "vegan", "gluten-free", "dairy-free", "halal", "kosher"].map((pref) => (
              <label key={pref} style={styles.checkboxLabel}>
                <input type="checkbox" checked={form.dietary_preferences.includes(pref)}
                  onChange={() => handleCheckbox("dietary_preferences", pref)} /> {pref}
              </label>
            ))}
          </div>

          <label style={styles.label}>Allergies</label>
          <div style={styles.checkboxGroup}>
            {["peanuts", "dairy", "gluten", "eggs", "shellfish", "soy"].map((allergy) => (
              <label key={allergy} style={styles.checkboxLabel}>
                <input type="checkbox" checked={form.allergies.includes(allergy)}
                  onChange={() => handleCheckbox("allergies", allergy)} /> {allergy}
              </label>
            ))}
          </div>

          <label style={styles.label}>Medical Conditions</label>
          <div style={styles.checkboxGroup}>
            {["diabetes", "hypertension", "high cholesterol", "celiac disease", "lactose intolerance"].map((condition) => (
              <label key={condition} style={styles.checkboxLabel}>
                <input type="checkbox" checked={form.medical_conditions.includes(condition)}
                  onChange={() => handleCheckbox("medical_conditions", condition)} /> {condition}
              </label>
            ))}
          </div>

          <button style={styles.button} type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#F9FAFB", padding: "32px 16px" },
  card: { backgroundColor: "#fff", padding: "40px", borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", maxWidth: "500px", margin: "0 auto" },
  logo: { textAlign: "center", color: "#2D9B6F", fontSize: "28px", marginBottom: "8px" },
  title: { textAlign: "center", color: "#1E2A2A", marginBottom: "24px" },
  label: { display: "block", color: "#1E2A2A", fontWeight: "600", marginBottom: "6px", marginTop: "16px" },
  input: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd",
    fontSize: "16px", boxSizing: "border-box", marginBottom: "8px" },
  checkboxGroup: { display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "8px" },
  checkboxLabel: { color: "#6B7280", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" },
  button: { width: "100%", padding: "14px", backgroundColor: "#2D9B6F", color: "#fff",
    border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", marginTop: "24px" },
  success: { color: "#2D9B6F", textAlign: "center", marginBottom: "16px" },
  error: { color: "#E53935", textAlign: "center", marginBottom: "16px" },
};