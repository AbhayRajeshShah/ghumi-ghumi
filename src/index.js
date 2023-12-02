import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Destination from "./pages/Destination";
import ProductPage from "./pages/Product";
import SignUp from "./pages/Signup";
import Cart from "./pages/Cart";
import Orders from "./pages/Order";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/destination" element={<Destination />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:productId" element={<ProductPage />} />
    </Routes>
  </Router>
);
