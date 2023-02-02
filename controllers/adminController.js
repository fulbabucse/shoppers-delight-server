const User = require("../models/users");

exports.getAdmin = async (req, res, next) => {
  try {
    const adminRole = await User.findOne({ email: req.query.email });
    res.send({ isAdmin: adminRole.role === "admin" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.send(users);
};
