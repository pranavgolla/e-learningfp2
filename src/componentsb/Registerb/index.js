import React, { useState, useEffect } from "react";
import { useNavigate as useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const RegisterFormb = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    const jwtToken = Cookies.get("swpjwtb");
    if (jwtToken) {
      history("/homeb");
    }
  }, [history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4001/admin-register/add-adminregistration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Form data submitted successfully");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        history("/login");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onClickLogin = () => {
    history("/login");
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
    inputFocus: {
      borderColor: "#D6BD98",
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
    loginButton: {
      padding: "12px 20px",
      backgroundColor: "#1A3636",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      flex: 1,
    },
    loginButtonHover: {
      backgroundColor: "#677D6A",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Register Form</h2>
      <form className="register-formb" onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.buttonGroup}>
          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClickLogin}
            style={styles.loginButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.loginButton.backgroundColor)}
          >
            Login Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterFormb;
