const mongoose = require("mongoose");
const reviewSchema = require("../schemas/reviewsSchema");

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
