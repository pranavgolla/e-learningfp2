import React, { useEffect } from "react";
import { useNavigate as useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
// import "./index.css";

const Header = () => {
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("swpjwt");
    if (!token) {
      history("/login");
    }
  }, [history]);

  const handleLogout = () => {
    // Clear authentication tokens
    Cookies.remove("swpjwt");
    Cookies.remove("user");
    history("/login");
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome to the Home Page!</h2>
          <p className="welcome-text">
            This is where you'll find all the exciting features of our application.
          </p>
        </div>
        
        <div className="navigation">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <button className="logout-button" onClick={handleLogout} >Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
