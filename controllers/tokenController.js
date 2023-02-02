const jwt = require("jsonwebtoken");

exports.getToken = (req, res) => {
  const email = req.query.email;
  const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
  res.send({ accessToken: token });
};
