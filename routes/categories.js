// Import Router from Express
const router = require("express").Router();

const categoriesController = require("../controllers/categoriesController");
const tokenCheck = require("../middleware/tokenCheck");

router.get("/", tokenCheck, categoriesController.getCategories);
router.post("/", tokenCheck, categoriesController.postCategory);
router.delete("/:id", tokenCheck, categoriesController.deleteSingleCategory);

module.exports = router;
