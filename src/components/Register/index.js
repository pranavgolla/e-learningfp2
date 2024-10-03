import React, { useState, useEffect } from "react";
import { useNavigate as useHistory } from "react-router-dom";
import Cookies from "js-cookie";
// import "./index.css"; // Ensure this is the correct path to your CSS file

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    const jwtToken = Cookies.get("swpjwt");
    if (jwtToken) {
      history("/home");
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
        "http://localhost:4001/user-register/add-user-register",
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

  return (
    <div className="register-containerb">
      <h2 className="register-headingb">User Register Form</h2>
      <form onSubmit={handleSubmit} className="register-formb">
        <div className="form-groupb">
          <label htmlFor="name" className="form-labelb">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-inputb"
            aria-label="Name"
          />
        </div>
        <div className="form-groupb">
          <label htmlFor="phone" className="form-labelb">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-inputb"
            aria-label="Phone"
          />
        </div>
        <div className="form-groupb">
          <label htmlFor="email" className="form-labelb">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-inputb"
            aria-label="Email Address"
          />
        </div>
        <div className="form-groupb">
          <label htmlFor="password" className="form-labelb">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-inputb"
            aria-label="Password"
          />
        </div>
        <div className="button-groupb">
          <button type="submit" className="submit-buttonb">Submit</button>
          <button type="button" onClick={onClickLogin} className="login-buttonb">
            Login Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
