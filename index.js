const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const connectDatabase = require("./database/connectDatabase");
const port = process.env.PORT || 5000;

// Routes
const tokenRoutes = require("./routes/jwt");
const adminRoutes = require("./routes/admin");
const usersRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const reviewRoutes = require("./routes/reviews");
const cartRoutes = require("./routes/cart");
const paymentRoutes = require("./routes/payments");
const sliderRoutes = require("./routes/sliders");

// Express Build-in Middleware
app.use(cors());
app.use(express.json());

// Middleware
app.use("/jwt", tokenRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/cart", cartRoutes);
app.use("/payments", paymentRoutes);
app.use("/sliders", sliderRoutes);

// Home page Route
app.get("/", (req, res) => {
  res.send("Welcome to Shopper's Delight Server");
});
connectDatabase(process.env.DATABASE_URI);

// Listen Port
app.listen(port, () => {
  console.log("Welcome to Shopper's Delight Server Port:", port);
});
