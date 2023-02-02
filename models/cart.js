const mongoose = require("mongoose");
const cartSchema = require("../schemas/cartSchema");

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
