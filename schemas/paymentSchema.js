const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  payment_date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  transectionId: {
    type: String,
    required: true,
  },
  createAt: {
    type: Number,
    default: new Date().getTime(),
  },
});

module.exports = paymentSchema;
