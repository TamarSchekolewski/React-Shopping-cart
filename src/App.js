import Products from "../src/components/products/products";
import Cart from "../src/components/cart/cart";
import cartIcon from "../src/assets/cart.svg";
import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {

  const [countCart, setCount] = useState(
    localStorage.getItem('myCart') ? JSON.parse(localStorage.getItem('myCart')).length : 0
  );

  const updateCountCart = newVal => setCount(newVal);

  return (
    <Router>
      <div>
        <div className="navbar">
          <ul>
            <li>
              <Link to="/" className="link">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="link">
                <div>
                  <img src={cartIcon} alt="cart" className="cart-icon"></img>
                  ({countCart})
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route exact path="/" element={<Products updateCountCart={updateCountCart} />}>
          </Route>
          <Route path="/cart" element={<Cart updateCountCart={updateCountCart} />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

