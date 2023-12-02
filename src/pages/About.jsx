import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.scss";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

const About = () => {
  const [user, setUser] = useState("");

  const cookies = new Cookies();

  useEffect(() => {
    let u = cookies.get("user");
    setUser(u);
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div id="about">
        <div className="row">
          <div className="left">
            <p className="head">About</p>
            <p className="desc">
              Welcome to Ghumi Ghumi, your passport to unforgettable travel
              experiences in the vibrant and diverse land of India! At Ghumi
              Ghumi, we are dedicated to promoting and enhancing tourism in
              India, the jewel of South Asia. Our mission is to help you
              discover the mesmerizing beauty, rich heritage, and cultural
              diversity of this incredible country while ensuring you have an
              authentic and seamless travel experience.
            </p>
          </div>
          <div className="img">
            <img src="images/india.png" alt="" />
          </div>
        </div>
        <div className="row right">
          <div className="left">
            <p className="head">Local Expertise</p>
            <p className="desc">
              Our commitment to responsible tourism and sustainable travel is
              reflected in our partnerships with local communities and
              businesses. We work closely with knowledgeable local guides and
              collaborate with eco-friendly accommodations to minimize our
              ecological footprint.
            </p>
          </div>
          <div className="img">
            <img src="images/camel.png" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
