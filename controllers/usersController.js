const User = require("../models/users");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.send(users);
};
