const mongoose = require("mongoose");
const featureProductsSchema = require("../schemas/productsSchema");

const FeatureProduct = mongoose.model("Feature", featureProductsSchema);

module.exports = FeatureProduct;
