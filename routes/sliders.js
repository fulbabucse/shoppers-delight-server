// Import Router from Express
const router = require("express").Router();

const sliderController = require("../controllers/sliderController");
const tokenCheck = require("../middleware/tokenCheck");

router.get("/", sliderController.getSliders);
router.post("/", tokenCheck, sliderController.postSlider);
router.delete("/:id", tokenCheck, sliderController.deleteSingleSlider);

module.exports = router;
