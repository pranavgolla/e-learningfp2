import React from 'react'
import { useNavigate as useHistory } from "react-router-dom";
import Cookies from "js-cookie"

const Header = () => {
    const history = useHistory();

    const handleLogout = () => {
        Cookies.remove("swpjwtb");
        Cookies.remove("owner");
        history("/login");
      };

    // const containerStyle = {
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     padding: "20px",
    //     backgroundColor: "#F9F9F9",
    //     minHeight: "100vh",
    //   };
    
      const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "10px 20px",
        backgroundColor: "#40534C",
        color: "#FFFFFF",
      };
    
      const titleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
      };
    
      const navStyle = {
        display: "flex",
        listStyleType: "none",
        padding: 0,
        margin: 0,
      };
    
      const navItemStyle = {
        marginRight: "20px",
      };
    
      const buttonStyle = {
        padding: "10px 15px",
        fontSize: "16px",
        color: "#FFFFFF",
        backgroundColor: "#677D6A",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      };
    
      const logoutButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#D9534F", // Different color for logout button
      };
    
      const buttonHoverStyle = {
        backgroundColor: "#5A7A61",
      };

      const navigateToClasses = () => {
        history("/classes"); // Adjust the path to match your routing
      };
    
      const navigateToUsers = () => {
        history("/users"); // Adjust the path to match your routing
      };

      const navigateToHome=()=>{
        history("/homeb")
      }

  return (
    <header style={headerStyle}>
        <div style={titleStyle}>School ERP/Student Admission</div>
        <nav>
          <ul style={navStyle}>
          <li style={navItemStyle}>
              <button 
                style={buttonStyle} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                onClick={navigateToHome}
              >
                Home
              </button>
            </li>
            <li style={navItemStyle}>
              <button 
                style={buttonStyle} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                onClick={navigateToClasses}
              >
                Classes
              </button>
            </li>
            <li style={navItemStyle}>
              <button 
                style={buttonStyle} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                onClick={navigateToUsers}
              >
               Students
              </button>
            </li>
          </ul>
        </nav>
        <button style={logoutButtonStyle} onClick={handleLogout}>Logout</button>
      </header>
  )
}

export default Header