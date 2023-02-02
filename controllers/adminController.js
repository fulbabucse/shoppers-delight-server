const User = require("../models/users");

exports.getAdmin = async (req, res, next) => {
  try {
    const adminRole = await User.findOne({ email: req.query.email });
    res.status(200).send({ isAdmin: adminRole.role === "admin" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
