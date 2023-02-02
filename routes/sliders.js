// Import Router from Express
const router = require("express").Router();

const sliderController = require("../controllers/sliderController");

router.get("/", sliderController.getSliders);
router.post("/", sliderController.postSlider);
router.delete("/:id", sliderController.deleteSingleSlider);

module.exports = router;
