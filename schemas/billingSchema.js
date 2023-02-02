const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  createAt: {
    type: Number,
    default: new Date().getTime(),
  },
});

module.exports = billingSchema;
