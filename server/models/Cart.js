const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    default: Date.now(),
    type: Number,
  },
  items: [cartItemSchema],
  active: {
    type: Boolean,
    default: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
