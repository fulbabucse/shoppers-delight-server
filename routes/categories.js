// Import Router from Express
const router = require("express").Router();

const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.getCategories);
router.post("/", categoriesController.postCategory);
router.delete("/:id", categoriesController.deleteSingleCategory);

module.exports = router;
