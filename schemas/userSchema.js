const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  photoURL: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});

module.exports = userSchema;
