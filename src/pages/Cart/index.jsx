import "./index.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cookies = new Cookies();
  const [u, setUser] = useState();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getData = async (user) => {
      let response = await fetch("http://localhost:3003/getItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user }),
      })
        .then((data) => data.json())
        .then((data) => data);
      if (response.error) {
        return;
      }
      console.log(response.items);
      setItems(response.items);
      setTotal(response.total);
      cookies.set("noOfItems", response.items.length);
    };
    let user = cookies.get("user");
    if (user) {
      setUser(user);
      getData(user);
    } else {
      navigate("/signup");
    }
  }, []);

  const update = async () => {
    let response = await fetch("http://localhost:3003/updateCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items, id: u }),
    })
      .then((data) => data.json())
      .then((data) => data);
    if (response.error) {
      return;
    }
  };

  const handleSubmit = async () => {
    let response = await fetch("http://localhost:3003/placeOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u }),
    })
      .then((data) => data.json())
      .then((data) => data);
    if (response.error) {
      alert(response.error);
      return;
    }
    alert(response.success);
  };

  useEffect(() => {
    update();
  }, [items]);

  const editVal = (increase, i) => {
    let t = total;
    t -= items[i].total;
    let temp = items;
    if (increase) {
      temp[i].quantity++;
    } else {
      if (temp[i].quantity - 1 > 0) {
        temp[i].quantity--;
      }
    }
    temp[i].total = temp[i].price * temp[i].quantity;
    t += temp[i].total;
    setItems([...temp]);
    setTotal(t);
  };

  return (
    <div className="c">
      <Navbar user={u} />
      <div className="cart">
        <p className="title">Your Destinations</p>
        <div className="cartItems">
          <div className="cartItem" style={{ backgroundColor: "#eee" }}>
            <p>City</p>
            <p>Quantity</p>
            <p>Date of Travel</p>
            <p>Total</p>
            <button style={{ opacity: "0" }}></button>
          </div>
          {items.length > 0 ? (
            items.map((item, i) => {
              return (
                <div className="cartItem">
                  <p>{item.city}</p>
                  <p>
                    <button
                      className="increment"
                      onClick={() => {
                        editVal(true, i);
                      }}
                    >
                      <i class="fa-solid fa-chevron-up"></i>
                    </button>
                    {item.quantity}
                    <button
                      className="decrement"
                      onClick={() => {
                        editVal(false, i);
                      }}
                    >
                      <i class="fa-solid fa-chevron-up"></i>
                    </button>
                  </p>
                  <p>{item.date.split("T")[0]}</p>
                  <p className="price">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {item.total}
                  </p>
                  <button
                    onClick={() => {
                      let temp = items;
                      let t = total;
                      t -= temp[i].total;
                      setTotal(t);
                      temp.splice(i, 1);
                      setItems([...temp]);
                    }}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              );
            })
          ) : (
            <p>No Items Found</p>
          )}
        </div>
        <div className="final">
          <p>Total : {total}</p>
          <button
            className="checkout"
            onClick={() => {
              handleSubmit();
            }}
          >
            Check Out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
