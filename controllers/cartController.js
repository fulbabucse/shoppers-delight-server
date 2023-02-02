const Cart = require("../models/cart");

exports.postCart = async (req, res, next) => {
  try {
    const order = new Cart({
      productId: req.body.productId,
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category,
      quantity: req.body.quantity,
      rating: req.body.rating,
      email: req.body.email,
    });
    const result = await order.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCartByEmail = async (req, res, next) => {
  const carts = await Cart.find({ email: req.params.email });
  res.send(carts);
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const deleteItems = await Cart.deleteOne({ _id: req.params.id });
    res.send(deleteItems);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.getALlCartItems = async (req, res, next) => {
  const carts = await Cart.find({});
  res.send(carts);
};

exports.deleteAfterPayment = async (req, res, next) => {
  try {
    const deleted = await Cart.deleteMany({ email: req.params.email });
    res.status(200).send(deleted);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
