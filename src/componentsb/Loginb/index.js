import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPageb = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to hold error message
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("swpjwtb");
    if (jwtToken) {
      navigate("/homeb");
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/admin/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const jwt = data.token;
        Cookies.set("swpjwtb", jwt);
        Cookies.set("owner", email);

        navigate("/homeb");
      } else {
        if (response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError("Login failed. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const onClickRegisterForm = () => {
    navigate("/");
  };

  // Enhanced inline styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
      border: "2px solid #D6BD98",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      maxWidth: "450px",
      margin: "50px auto",
      backgroundColor: "#40534C",
      color: "#D6BD98",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    formGroup: {
      marginBottom: "20px",
      width: "100%",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold",
      display: "block",
    },
    input: {
      padding: "12px",
      border: "1px solid #677D6A",
      borderRadius: "5px",
      width: "100%",
      fontSize: "16px",
      color: "#1A3636",
      backgroundColor: "#FFFFFF",
      transition: "border-color 0.3s ease",
    },
    errorMessage: {
      color: "#FF4D4D",
      marginBottom: "20px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "30px",
      width: "100%",
    },
    submitButton: {
      padding: "12px 20px",
      backgroundColor: "#677D6A",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      flex: 1,
      marginRight: "10px",
    },
    submitButtonHover: {
      backgroundColor: "#D6BD98",
    },
    registerButton: {
      padding: "12px 20px",
      backgroundColor: "#1A3636",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      flex: 1,
    },
    registerButtonHover: {
      backgroundColor: "#677D6A",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login Page</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={styles.input}
            aria-label="Email Address"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={styles.input}
            aria-label="Password"
          />
        </div>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <div style={styles.buttonGroup}>
          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
          >
            Login
          </button>
          <button
            type="button"
            onClick={onClickRegisterForm}
            style={styles.registerButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.registerButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.registerButton.backgroundColor)}
          >
            Register Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPageb;
