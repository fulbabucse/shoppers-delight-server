const jwt = require("jsonwebtoken");

const tokenCheck = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authToken.split(" ")[1];
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = tokenCheck;
