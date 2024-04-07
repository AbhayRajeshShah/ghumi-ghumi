import "../Signin/index.scss";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phno: "",
    password: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(process.env.REACT_APP_API_URL + "/signup", {
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
            <div className="input">
              <p>Name</p>
              <input
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                name="name"
                placeholder="Enter your Name"
              />
            </div>
            <p>Email</p>
            <input
              value={formData.email}
              onChange={handleInputChange}
              type="text"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="input">
            <p>Password</p>
            <input
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
