import React, { useState, useEffect } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  let { productId } = useParams();
  const cookies = new Cookies();
  const destinations = [
    {
      id: 1,
      image: "/images/amritsar.png",
      city: "Amritsar",
      desc: "Amritsar, is famous for its Golden Temple and vibrant Sikh culture.",
      price: 6000,
    },
    {
      id: 2,
      image: "/images/leh.png",
      city: "Leh Ladakh",
      desc: "A Himalayan paradise for adventurous souls and nature enthusiasts.",
      price: 6500,
    },
    {
      id: 3,
      image: "/images/udaipur.png",
      city: "Udaipur",
      desc: `India's "City of Lakes" offers romance and stunning scenery.`,
      price: 7000,
    },
    {
      id: 4,
      image: "/images/agra.png",
      city: "Agra",
      desc: `Agra's beauty is epitomized by the stunning Taj Mahal.`,
      price: 6000,
    },
    {
      id: 5,
      image: "/images/delhi.png",
      city: "Delhi",
      desc: `India's historic capital, where past and present converge.`,
      price: 6500,
    },
    {
      id: 6,
      image: "/images/mumbai.png",
      city: "Mumbai",
      desc: `India's lively, cosmopolitan hub.`,
      price: 7000,
    },
  ];
  const productDetails =
    productId > 6 || productId === undefined
      ? destinations[1]
      : destinations[productId - 1];
  const price = productDetails.price;
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  const [u, setUser] = useState("");

  useEffect(() => {
    let user = cookies.get("user");
    if (!user) {
      navigate("/signin");
    } else {
      setUser(user);
    }
  }, []);

  const handleAddToCart = async () => {
    let response = await fetch("http://localhost:3003/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: value.$d,
        price: price,
        quantity: quantity,
        total: price * quantity,
        userId: u,
        city: productDetails.city,
        desc: productDetails.desc,
      }),
    })
      .then((data) => data.json())
      .then((data) => data);
    if (response.error) {
      alert(response.error);
      return;
    } else {
      cookies.set("noOfItems", response.noOfItems);
      alert("Cart Item Added");
    }
  };
  const [value, setValue] = React.useState(dayjs(Date.now()));
  const totalPrice = price * quantity;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Navbar user={u} />
        <div className="product-page">
          <div className="product-image">
            <img src={productDetails.image} alt="Product" />
          </div>
          <div className="right">
            <div className="product-details">
              <h1>{productDetails.city}</h1>
              <p>{productDetails.desc}</p>
            </div>
            <div className="product-actions">
              <DatePicker
                label="Start Date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
              <div className="quantity-input">
                <label htmlFor="quantity">Quantity :</label>
                <div className="controls">
                  <button
                    className="increment"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    <i class="fa-solid fa-chevron-up"></i>
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    disabled
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                  />
                  <button
                    className="decrement"
                    onClick={() => {
                      if (quantity - 1 > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <i class="fa-solid fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div className="total-price">
                Total Price : <span>{totalPrice}</span>
              </div>
              <button
                className="primary"
                style={{
                  width: "12rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={handleAddToCart}
              >
                Add to Cart{" "}
                <span className="black">
                  <i className="fa-solid fa-chevron-right"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </LocalizationProvider>
  );
};

export default ProductPage;
