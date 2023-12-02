import "./App.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState("");

  const cookies = new Cookies();

  const destinations = [
    {
      id: 1,
      image: "images/amritsar.png",
      city: "Amritsar",
      desc: "Amritsar, is famous for its Golden Temple and vibrant Sikh culture.",
      price: 6000,
    },
    {
      id: 2,
      image: "images/leh.png",
      city: "Leh Ladakh",
      desc: "A Himalayan paradise for adventurous souls and nature enthusiasts.",
      price: 6500,
    },
    {
      id: 3,
      image: "images/udaipur.png",
      city: "Udaipur",
      desc: `India's "City of Lakes" offers romance and stunning scenery.`,
      price: 7000,
    },
    {
      id: 4,
      image: "images/agra.png",
      city: "Agra",
      desc: `Agra's beauty is epitomized by the stunning Taj Mahal.`,
      price: 6000,
    },
    {
      id: 5,
      image: "images/delhi.png",
      city: "Delhi",
      desc: `India's historic capital, where past and present converge.`,
      price: 6500,
    },
    {
      id: 6,
      image: "images/mumbai.png",
      city: "Mumbai",
      desc: `India's lively, cosmopolitan hub.`,
      price: 7000,
    },
  ];

  useEffect(() => {
    let u = cookies.get("user");
    setUser(u);
  }, []);

  return (
    <div className="App">
      <Navbar user={user} />
      <div id="hero">
        <div className="left">
          <p className="subhead">
            the best deals on the world's best destinations
          </p>
          <p className="head">Best Travel And Destinations</p>
          <p className="desc">
            With Ghumi Ghumi you can experience new travel and the best tourist
            destinations that we have to offer
          </p>
          <Link to={"/destination"}>
            <button className="primary">
              Our destination{" "}
              <span className="black">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </button>
          </Link>
        </div>
        <div className="img">
          <img src="images/hero.png" alt="Hero" />
        </div>
      </div>
      <div id="feature">
        <div className="left">
          <p className="head">Get Experiences Which are fun</p>
          <p className="desc">
            With Ghumi Ghumi you can get the best experience on holiday travel,
            and we always update the latest and best destinations in India
          </p>
          <img src="images/intro.png" alt="" />
        </div>
        <div className="features">
          <div className="feature">
            <div className="icon">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <div className="content">
              <p className="head">Affordable Prices</p>
              <p className="desc">
                We provide some very affordable prices compared to others.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="icon" style={{ backgroundColor: "#F5B10016" }}>
              <i
                className="fa-solid fa-user-plus"
                style={{ color: "#F5B100" }}
              ></i>
            </div>
            <div className="content">
              <p className="head">Unforgettable experience</p>
              <p className="desc">
                We provide a vacation experience that will be unforgettable.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="icon">
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="content">
              <p className="head">Very Friendly Service</p>
              <p className="desc">
                We will provide excellent and friendly service for the sake of
                our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="destination-section">
        <p className="head">Destinations Most Popular</p>
        <div className="destinations">
          {destinations.map((destination, i) => {
            if (i < 3) {
              return (
                <Card
                  image={destination.image}
                  city={destination.city}
                  desc={destination.desc}
                  price={destination.price}
                  id={destination.id}
                />
              );
            }
          })}
        </div>
      </div>
      <div id="sales">
        <div className="left">
          <p className="head">We are ready to provide the best trip for you</p>
          <p className="desc">
            We have a variety of the world's best destinations that you can
            choose as your trip destination
          </p>
          <button className="primary">
            Contact Now{" "}
            <span className="black">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </button>
        </div>
        <div className="img">
          <img src="images/feature-hero.png" alt="" />
        </div>
      </div>
      <div id="testimonials">
        <div className="left">
          <div className="icons">
            <div className="icon">
              <i className="fa-solid fa-chevron-up"></i>
            </div>
            <div
              className="icon"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <i
                className="fa-solid fa-chevron-down"
                style={{ color: "black" }}
              ></i>
            </div>
          </div>
          <div className="testimonial">
            <p className="head">Wardell Curry</p>
            <div className="star-rating">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="desc">
              “A very pleasant experience, plus the service is very friendly,
              recommended for those who want to try!”
            </div>
            <div className="avatar">
              <img
                src="https://cdn.discordapp.com/avatars/721374991962079293/981f42c89df13080253e8fd635c012ed.webp?size=160"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="content">
          <p className="head">Testimonials of our Customers</p>
          <p className="desc">
            Here's what our customers have to say regarding our service
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
