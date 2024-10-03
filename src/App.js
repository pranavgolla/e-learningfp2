import React from "react";
// ,{useState}
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected aliasing
// import LoginPage from './components/Login';
// import HomePage from "./components/Header";
// import RegisterForm from './components/Register';
// import RegisterFormb from './componentsb/Registerb';
// import LoginPageb from './componentsb/Loginb';
import HomePageb from "./componentsb/HomePageb";
import Fandbr from "./Fandb/Fandbr";
import Fandbl from "./Fandb/Fandbl";
import NotFound from "./components/NotFound";
import { DataProvider } from "./Context";
// import ProductList from "./components/Products";
// import Home from "./components/Home";
// import Cart from "./components/Cart";
// import ProductDetailView from "./components/ProductDetailView";
import Classes from "./componentsb/HomePageb/Classes";
import Users from "./componentsb/HomePageb/Users";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          {/* Changed from <Switch> to <Routes> */}
          <Route exact path="/" element={<Fandbr />} />
          <Route exact path="/login" element={<Fandbl />} />
          {/* <Route exact path="/" element={<RegisterFormb/>} />   */}
          {/* <Route exact path="/login" element={<LoginPageb/>} /> */}
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/homeb" element={<HomePageb />} />
          <Route path="/classes" element={<Classes/>}/>
          <Route path="/users" element={<Users/>}/>
          {/* <Route path="/products" element={<ProductList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetailView/>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>{" "}
        {/* Changed from </Switch> to </Routes> */}
      </Router>
    </DataProvider>
  );
};

export default App;
