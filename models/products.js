const mongoose = require("mongoose");
const productSchema = require("../schemas/productsSchema");

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
