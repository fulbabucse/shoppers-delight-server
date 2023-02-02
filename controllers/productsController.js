const Product = require("../models/products");
const FeatureProduct = require("../models/featuresProducts");

exports.getAllProducts = async (req, res) => {
  try {
    const query = {};
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const products = await Product.find(query)
      .skip(page * size)
      .limit(size)
      .sort({ createAt: -1 });
    const count = await Product.estimatedDocumentCount();
    res.send({ products, count });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getFeaturesProducts = async (req, res) => {
  try {
    const products = await FeatureProduct.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const start = parseInt(req.query.start);
  const end = parseInt(req.query.end);
  const rating = parseFloat(req.query.rating);
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  const products = await Product.find({
    price: { $gt: start, $lt: end },
    rating: { $gt: rating },
  })
    .skip(page * size)
    .limit(size)
    .sort({ createAt: -1 });
  const count = await Product.estimatedDocumentCount();
  res.send({ products, count });
};

exports.getCategoryProducts = async (req, res) => {
  const start = parseInt(req.query.start);
  const end = parseInt(req.query.end);
  const name = req.params.name;
  const rating = parseFloat(req.query.rating);
  const newProducts = await Product.find({
    category: name,
    price: { $gt: start, $lt: end },
    rating: { $gt: rating },
  });
  res.send(newProducts);
};
