const Review = require("../models/reviews");

exports.postReview = async (req, res) => {
  try {
    const review = new Review({
      productId: req.body.productId,
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      joinDate: req.body.joinDate,
      rating: req.body.rating,
      message: req.body.message,
      posted_date: req.body.posted_date,
    });
    const result = await review.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id }).sort({
      createAt: -1,
    });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
