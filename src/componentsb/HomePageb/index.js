import React, { useEffect } from "react";
import { useNavigate as useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import ProductForm from "../ProductsRegister";
import Header from "./Header";
// import "./index.css";

const HomePageb = () => {
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("swpjwtb");
    if (!token) {
      history("/loginb");
    }
  }, [history]);

  // const handleLogout = () => {
  //   Cookies.remove("swpjwtb");
  //   Cookies.remove("owner");
  //   history("/login");
  // };

  // const navigateToClasses = () => {
  //   history("/classes"); // Adjust the path to match your routing
  // };

  // const navigateToUsers = () => {
  //   history("/users"); // Adjust the path to match your routing
  // };

  // Style objects
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#F9F9F9",
    minHeight: "100vh",
    margin:"0px"
  };

  // const headerStyle = {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   width: "100%",
  //   padding: "10px 20px",
  //   backgroundColor: "#40534C",
  //   color: "#FFFFFF",
  // };

  // const titleStyle = {
  //   fontSize: "24px",
  //   fontWeight: "bold",
  // };

  // const navStyle = {
  //   display: "flex",
  //   listStyleType: "none",
  //   padding: 0,
  //   margin: 0,
  // };

  // const navItemStyle = {
  //   marginRight: "20px",
  // };

  // const buttonStyle = {
  //   padding: "10px 15px",
  //   fontSize: "16px",
  //   color: "#FFFFFF",
  //   backgroundColor: "#677D6A",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  //   transition: "background-color 0.3s",
  // };

  // const logoutButtonStyle = {
  //   ...buttonStyle,
  //   backgroundColor: "#D9534F", // Different color for logout button
  // };

  // const buttonHoverStyle = {
  //   backgroundColor: "#5A7A61",
  // };

  return (
    <div style={containerStyle}>
      <Header/>
      <ProductForm />
    </div>
  );
};

export default HomePageb;
