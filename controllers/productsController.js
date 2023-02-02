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

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getSimilarProducts = async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.category });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.postProduct = async (req, res, next) => {
  try {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: parseInt(req.body.price),
      discountPercentage: parseFloat(req.body.discountPercentage),
      rating: parseFloat(req.body.rating),
      stock: parseInt(req.body.stock),
      brand: req.body.brand,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      images: req.body.images,
    });
    const result = await product.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.params.id });
    res.send(deleteProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
