import Navbar from "../../components/Navbar";
import Cookies from "universal-cookie";
import "./index.scss";

const Contact = () => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  return (
    <div className="d">
      <Navbar user={user} />
      <div className="contact">
        <form className="form">
          <p className="title">Contact Us</p>
          <div className="input">
            <p>Name</p>
            <input type="text" name="name" />
          </div>
          <div className="input">
            <p>Email</p>
            <input type="text" name="email" />
          </div>
          <div className="input">
            <p>Message</p>
            <textarea name="msg" id="" cols="30" rows="8"></textarea>
          </div>
          <button>Submit</button>
        </form>
        <img src="images/contact.jpg" alt="" />
      </div>
    </div>
  );
};

export default Contact;
