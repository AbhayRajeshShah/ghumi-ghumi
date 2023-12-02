import "./index.scss";
import { useState } from "react";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3003/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((data) => data.json())
      .then((data) => data);
    if (response.error) {
      alert(response.error);
      return;
    }
    let maxDuration = Date.now() + 7 * 24 * 60 * 60 * 1000;
    cookies.set("user", response.user, { maxAge: maxDuration });
    navigate("/destination");
  };

  return (
    <div id="signin">
      <div className="left">
        <p className="text">Travel. Experience. Achieve</p>
        <img src="images/wave.svg" className="wave" alt="" />
      </div>
      <div className="circle"></div>
      <div className="form">
        <p className="title">Welcome Back</p>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <p>Email</p>
            <input
              type="text"
              name="email"
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="input">
            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
