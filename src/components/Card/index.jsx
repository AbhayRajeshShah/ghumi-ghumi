import "./index.scss";
import { useNavigate } from "react-router-dom";

const Card = ({ image, city, desc, price, id }) => {
  const navigate = useNavigate();
  return (
    <div className="destination">
      <img src={image} alt="" />
      <div className="content">
        <p className="place">{city}</p>
        <p className="desc">{desc}</p>
      </div>
      <div className="booking">
        <div className="left">
          <p>Pricing</p>
          <p>
            <span>{price}</span> / Person
          </p>
        </div>
        <button
          className="ticket"
          onClick={() => {
            navigate(`/product/${id}`);
          }}
        >
          Ticket Booking
        </button>
      </div>
    </div>
  );
};

export default Card;
