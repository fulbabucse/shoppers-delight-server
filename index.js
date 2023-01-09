const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Shopper's Delight Server");
});

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
  } finally {
  }
};

dbConnect().catch((err) => console.log(err.name, err, message));

app.listen(port, () => {
  console.log("Welcome to Shopper's Delight Server Port:", port);
});
