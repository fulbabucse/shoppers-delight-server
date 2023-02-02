// Import Router from Express
const router = require("express").Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.getProducts);
router.get("/all", productsController.getAllProducts);
router.get("/feature-products", productsController.getFeaturesProducts);
router.get("/category/:name", productsController.getCategoryProducts);

module.exports = router;
