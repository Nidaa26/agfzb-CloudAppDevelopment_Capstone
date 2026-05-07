import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "", firstName: "", lastName: "", email: "", password: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/djangoapp/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (data.status === "Authenticated") {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => window.location.replace("/"), 1500);
      } else {
        setMessage(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1.5px solid #dde", fontSize: "0.95rem", boxSizing: "border-box"
  };
  const labelStyle = {
    display: "block", fontWeight: 600, color: "#333", marginBottom: "6px", fontSize: "0.9rem"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", padding: "48px 40px", width: "100%", maxWidth: "480px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "8px" }}>🚗</div>
          <h2 style={{ color: "#1a3c6e", fontWeight: 700, margin: 0 }}>Cars Dealership</h2>
          <p style={{ color: "#888", marginTop: "6px" }}>Create your account</p>
        </div>

        {message && (
          <div style={{
            background: message.includes("successful") ? "#d4edda" : "#f8d7da",
            color: message.includes("successful") ? "#155724" : "#721c24",
            padding: "12px 16px", borderRadius: "8px", marginBottom: "20px"
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Username *</label>
            <input type="text" name="username" value={formData.username}
              onChange={handleChange} placeholder="Choose a username" required style={inputStyle} />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>First Name *</label>
            <input type="text" name="firstName" value={formData.firstName}
              onChange={handleChange} placeholder="Your first name" required style={inputStyle} />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Last Name *</label>
            <input type="text" name="lastName" value={formData.lastName}
              onChange={handleChange} placeholder="Your last name" required style={inputStyle} />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Email Address *</label>
            <input type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="your@email.com" required style={inputStyle} />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={labelStyle}>Password *</label>
            <input type="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="Create a strong password" required style={inputStyle} />
          </div>

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "12px", background: "#1a3c6e", color: "white",
            border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1
          }}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#888", fontSize: "0.88rem" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#1a3c6e", fontWeight: 600, textDecoration: "none" }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
