const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: {
    type: String,
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
  image: {
    type: String,
    required: true,
  },
  joinDate: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  posted_date: {
    type: String,
    required: true,
  },
  createAt: {
    type: Number,
    default: new Date().getTime(),
  },
});

module.exports = reviewSchema;
