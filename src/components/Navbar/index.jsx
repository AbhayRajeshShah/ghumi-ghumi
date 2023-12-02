import { Link } from "react-router-dom";
import "./index.scss";

const Navbar = ({ user }) => {
  return (
    <nav>
      <div className="brand">
        <div className="logo">GG</div>
        <p>Ghumi Ghumi</p>
      </div>
      <div className="links">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/destination"}>Destination</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
      <div className="actions">
        {user ? (
          <>
            <Link to={"/cart"}>
              <i class="fa-solid fa-cart-shopping"></i>
            </Link>
            <Link to={"/orders"}>
              <p style={{ margin: "0 0.5rem" }}>View Orders</p>{" "}
            </Link>
          </>
        ) : (
          <>
            <Link to={"/signup"}>Register</Link>
            <button className="white">
              <Link to={"/signin"}>Login</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
