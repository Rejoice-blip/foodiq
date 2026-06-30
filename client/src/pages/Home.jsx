import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.logo}>🥗 FoodIQ</h1>
        <div style={styles.navLinks}>
          <button style={styles.profileBtn} onClick={() => navigate("/profile")}>
            My Profile
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
      <div style={styles.content}>
        <h2 style={styles.welcome}>
          Welcome, {user?.email} 👋
        </h2>
        <p style={styles.subtitle}>
          What are you eating today?
        </p>
        <div style={styles.searchBox}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="🔍 Search food or drink..."
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/search");
            }}
          />
          <button style={styles.searchBtn} onClick={() => navigate("/search")}>
            Search
          </button>
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
  navLinks: { display: "flex", gap: "12px" },
  profileBtn: {
    padding: "8px 16px", backgroundColor: "#2D9B6F", color: "#fff",
    border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px",
  },
  logoutBtn: {
    padding: "8px 16px", backgroundColor: "#fff", color: "#E53935",
    border: "1px solid #E53935", borderRadius: "8px", cursor: "pointer", fontSize: "14px",
  },
  content: {
    maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "0 16px",
  },
  welcome: { color: "#1E2A2A", fontSize: "28px", marginBottom: "8px" },
  subtitle: { color: "#6B7280", fontSize: "18px", marginBottom: "32px" },
  searchBox: { display: "flex", gap: "8px" },
  searchInput: {
    flex: 1, padding: "14px", borderRadius: "8px",
    border: "1px solid #ddd", fontSize: "16px",
  },
  searchBtn: {
    padding: "14px 24px", backgroundColor: "#2D9B6F", color: "#fff",
    border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer",
  },
};