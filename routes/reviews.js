// Import Router from Express
const router = require("express").Router();

const reviewController = require("../controllers/reviewsController");

router.post("/", reviewController.postReview);
router.get("/:id", reviewController.getReviews);

module.exports = router;
