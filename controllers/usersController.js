const User = require("../models/users");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.send(users);
};

exports.updateUser = async (req, res) => {
  const user = req.body;
  // const filter = { email: req.query.email };
  const options = { upsert: true };
  const updateInfo = {
    $set: {
      name: user?.name,
      photoURL: user?.photoURL,
      email: user?.email,
    },
  };
  const updated = await User.updateOne(
    { email: req.query.email },
    updateInfo,
    options
  );
  res.send(updated);
};
