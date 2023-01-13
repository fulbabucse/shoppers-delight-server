const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SK);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Shopper's Delight Server");
});

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authToken.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

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
    const FeatureProducts = client
      .db(process.env.DB_USERNAME)
      .collection("featureProducts");

    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const orders = req.body;
      const amount = parseInt(orders.price) * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount ? amount : 100,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    app.get("/config", verifyToken, (req, res) => {
      res.send({ publishableKey: process.env.STRIPE_PK });
    });

    app.get("/feature-products", async (req, res) => {
      const query = {};
      const products = await FeatureProducts.find(query).toArray();
      res.send(products);
    });

    app.delete("/cart/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const deleted = await Cart.deleteOne(query);
      res.send(deleted);
    });

    app.get("/cart/:email", verifyToken, async (req, res) => {
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

    app.get("/products/similar/:category", async (req, res) => {
      const query = { category: req.params.category };
      const similarProducts = await Products.find(query).toArray();
      res.send(similarProducts);
    });

    app.get("/products", async (req, res) => {
      const startPrice = req.query.start;
      const endPrice = req.query.end;
      const rating = req.query.rating;
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const query = {
        price: { $gt: parseInt(startPrice), $lt: parseInt(endPrice) },
        rating: { $gt: parseInt(rating) },
      };
      const products = await Products.find(query)
        .skip(page * size)
        .limit(size)
        .toArray();
      const count = await Products.estimatedDocumentCount();
      res.send({ products, count });
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await Products.findOne(query);
      res.send(product);
    });

    app.get("/products/category/:name", async (req, res) => {
      const startPrice = req.query.start;
      const endPrice = req.query.end;
      const name = req.params.name;
      const rating = req.query.rating;
      const query = {
        category: name,
        price: { $gt: parseInt(startPrice), $lt: parseInt(endPrice) },
        rating: { $gt: parseInt(rating) },
      };
      const categoryProducts = await Products.find(query).toArray();
      res.send(categoryProducts);
    });

    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const token = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ accessToken: token });
    });
  } finally {
  }
};

dbConnect().catch((err) => console.log(err.name, err, message));

app.listen(port, () => {
  console.log("Welcome to Shopper's Delight Server Port:", port);
});
