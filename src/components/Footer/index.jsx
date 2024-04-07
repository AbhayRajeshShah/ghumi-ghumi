import "./index.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div>
        <div className="b">
          <div className="brand">GG</div>
          <p>Ghumi Ghumi</p>
        </div>
        <p className="desc">
          With ghumi ghumi you can experience new travel and the best tourist
          destinations that we have to offer
        </p>
      </div>
      <div>
        <Link to={"/destination"}>
          <p className="head">Destination</p>
        </Link>
        <Link to={"/product/1"}>
          <p>Amritsar</p>
        </Link>
        <Link to={"/product/3"}>
          <p>Udaipur</p>
        </Link>
        <Link to={"/product/2"}>
          <p>Leh Ladakh</p>
        </Link>
      </div>
      <div>
        <Link to={"/about"}>
          <p className="head">About</p>
        </Link>
        <Link to={"/contact"}>
          <p>Contact Us</p>
        </Link>
      </div>
      <div>
        <p className="head">Follow Us</p>
        <p>
          <i className="fa-brands fa-facebook-f"></i> Facebook
        </p>
        <p>
          <i className="fa-brands fa-twitter"></i> Twitter
        </p>
        <p>
          <i className="fa-brands fa-instagram"></i> Instagram
        </p>
      </div>
    </footer>
  );
};

export default Footer;
