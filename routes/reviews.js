// Import Router from Express
const router = require("express").Router();

const reviewController = require("../controllers/reviewsController");
const tokenCheck = require("../middleware/tokenCheck");

router.post("/", tokenCheck, reviewController.postReview);
router.get("/:id", reviewController.getReviews);

module.exports = router;
