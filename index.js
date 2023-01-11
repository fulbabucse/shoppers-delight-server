const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Shopper's Delight Server");
});

// const verifyToken = (req, res, next) => {};

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7ywptfp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const dbConnect = async () => {
  try {
    const Users = client.db(process.env.DB_USERNAME).collection("users");
    const Products = client.db(process.env.DB_USERNAME).collection("products");
    const Reviews = client.db(process.env.DB_USERNAME).collection("reviews");
    const Cart = client.db(process.env.DB_USERNAME).collection("cart");

    app.delete("/cart/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const deleted = await Cart.deleteOne(query);
      res.send(deleted);
    });

    app.get("/cart/:email", async (req, res) => {
      const query = { email: req.params.email };
      const cartProducts = await Cart.find(query).toArray();
      res.send(cartProducts);
    });

    app.post("/cart", async (req, res) => {
      const product = req.body;
      const result = await Cart.insertOne(product);
      res.send(result);
    });

    app.get("/reviews/:id", async (req, res) => {
      const query = { productId: req.params.id };
      const reviews = await Reviews.find(query).toArray();
      res.send(reviews);
    });

    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await Reviews.insertOne(review);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const query = {};
      const products = await Products.find(query).toArray();
      res.send(products);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await Products.findOne(query);
      res.send(product);
    });

    app.get("/products/category/:name", async (req, res) => {
      const name = req.params.name;
      const query = { category: name };
      const categoryProducts = await Products.find(query).toArray();
      res.send(categoryProducts);
    });

    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const token = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ accessToken: token });
      console.log(token);
    });
  } finally {
  }
};

dbConnect().catch((err) => console.log(err.name, err, message));

app.listen(port, () => {
  console.log("Welcome to Shopper's Delight Server Port:", port);
});
