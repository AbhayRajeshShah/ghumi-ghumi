import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "./Destination.scss";
import "../App.scss";

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

const Destination = () => {
  const [user, setUser] = useState("");

  const cookies = new Cookies();

  useEffect(() => {
    let u = cookies.get("user");
    setUser(u);
  }, []);

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

  return (
    <>
      <Navbar user={user} />
      <div className="destinations">
        {destinations.map((destination) => {
          return (
            <Card
              image={destination.image}
              city={destination.city}
              desc={destination.desc}
              price={destination.price}
              id={destination.id}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Destination;
