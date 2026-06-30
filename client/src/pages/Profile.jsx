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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
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

  // "none" is mutually exclusive with all other options in the same group
  const handleCheckbox = (field, value) => {
    setForm((prev) => {
      const current = prev[field];

      if (value === "none") {
        // selecting "none" clears everything else, toggling it off clears the field
        return { ...prev, [field]: current.includes("none") ? [] : ["none"] };
      }

      // selecting any real option removes "none" if present
      const withoutNone = current.filter((item) => item !== "none");
      const updated = withoutNone.includes(value)
        ? withoutNone.filter((item) => item !== value)
        : [...withoutNone, value];

      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/profile`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSuccess("Profile saved successfully ✅");
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save profile. Please try again."
      );
    }
  };

  const renderGroup = (label, field, options) => (
    <>
      <label style={styles.label}>{label}</label>
      <div style={styles.checkboxGroup}>
        <label style={{ ...styles.checkboxLabel, ...styles.noneLabel }}>
          <input
            type="checkbox"
            checked={form[field].includes("none")}
            onChange={() => handleCheckbox(field, "none")}
          />{" "}
          None
        </label>
        {options.map((opt) => (
          <label key={opt} style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={form[field].includes(opt)}
              onChange={() => handleCheckbox(field, opt)}
            />{" "}
            {opt}
          </label>
        ))}
      </div>
    </>
  );

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

          {renderGroup("Health Goals", "health_goals",
            ["lose weight", "build muscle", "eat healthier", "manage diabetes", "manage hypertension"])}

          {renderGroup("Dietary Preferences",