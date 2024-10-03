import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import './index.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("swpjwt");
    if (jwtToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/user/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        const jwt = data.token;
        Cookies.set("swpjwt", jwt);
        Cookies.set("user", email);
        navigate("/home");
      } else {
        setError("Invalid email or password");
        console.error("Authentication failed");
      }
    } catch (error) {
      setError("Error during authentication");
      console.error("Error during authentication:", error);
    }
  };

  const onClickRegisterForm = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">User Login Page</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="form-input"
            aria-label="Email Address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="form-input"
            aria-label="Password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          <button type="submit" className="submit-button">Login</button>
          <button type="button" onClick={onClickRegisterForm} className="register-button">
            Register Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
