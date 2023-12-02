import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Cart/index.scss";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Orders = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);

  const getOrders = async (u) => {
    let response = await fetch("http://localhost:3003/getOrders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u }),
    })
      .then((data) => data.json())
      .then((data) => data);
    setOrders(response.orders);
  };

  useEffect(() => {
    let u = cookies.get("user");
    if (u) {
      setUser(u);
      getOrders(u);
    } else {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="c">
      <Navbar user={user} />
      <div className="cart">
        <div className="title">Your Previous Orders</div>
        <div className="cartItems">
          <div className="cartItem" style={{ backgroundColor: "#eee" }}>
            <p>Id</p>
            <p>Date</p>
            <p>No Of Destinations</p>
            <p>Total</p>
          </div>
          {orders.map((order) => {
            let d = new Date(order.date).toString().split("GMT")[0];
            let total = 0;
            order.items.forEach((item) => {
              total += item.total;
            });
            return (
              <div className="cartItem">
                <p>{order._id}</p>
                <p>{d}</p>
                <p>{order.items.length}</p>
                <p>{total}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
