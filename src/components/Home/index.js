import Header from "../Header";
import { Link } from "react-router-dom";
// import "./index.css";

const Home = () => (
  <div className="home-container">
    <Header className="home-header" />
    <div className="main-content">
      <Link to="/products" className="shop-now-button">
        Shop Now
      </Link>
    </div>
  </div>
);

export default Home;
