const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/User");
const Cart = require("./models/Cart");
const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.get("/", (req, res) => {
  res.send("Hello, this is your Express server!");
});

app.post("/getOrders", async (req, res) => {
  let { id } = req.body;
  let cart = await Cart.find({ user: id, active: false });
  if (cart) {
    res.json({ orders: cart });
  } else {
    res.json({ orders: [] });
  }
});

app.post("/placeOrder", async (req, res) => {
  let { id } = req.body;
  let cart = await Cart.findOne({ user: id, active: true });
  if (cart) {
    cart.date = Date.now();
    cart.active = false;
    cart.save();
    res.json({ success: "Placed Order Successfully" });
  } else {
    res.json({ error: "Could not place order" });
  }
});

app.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email, password });
  if (user) {
    res.json({ user: user._id });
  } else {
    res.json({ error: "User Not found" });
  }
});

app.post("/signup", async (req, res) => {
  let { name, password, email } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.json({ error: "User with email already exists" });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    newUser.save();
    res.json({ user: newUser._id });
  }
});

app.post("/cart", async (req, res) => {
  console.log("hi");
  let { userId, date, price, city, desc, quantity, total } = req.body;
  let cart = await Cart.findOne({ user: userId, active: true });
  let cartItems = {
    date: date,
    price: price,
    city: city,
    desc: desc,
    quantity: quantity,
    total: total,
  };
  if (cart) {
    cart.items.push(cartItems);
    cart.save();
  } else {
    cart = new Cart({ user: userId, items: [cartItems] });
    console.log(cart);
    cart.save();
  }
  res.json({
    success: "Item Added To Cart Successfully",
    noOfItems: cart.items.length,
  });
});

app.post("/updateCart", async (req, res) => {
  let { id, items } = req.body;
  let cart = await Cart.findOne({ user: id, active: true });
  if (items.length > 0) {
    cart.items = [];
    items.forEach((item) => {
      cart.items.push(item);
    });
    cart.save();
  }
  res.json({ success: "Successful" });
});

app.post("/getItems", async (req, res) => {
  let { id } = req.body;
  let cart = await Cart.findOne({ user: id, active: true });
  let total = 0;
  if (cart) {
    cart.items.forEach((item) => {
      total += item.total;
    });
    res.json({ items: cart.items, total: total });
  } else {
    res.json({ error: "No Items Found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
