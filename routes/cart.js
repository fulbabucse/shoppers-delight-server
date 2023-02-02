// Import Router from Express
const router = require("express").Router();

const cartController = require("../controllers/cartController");
const tokenCheck = require("../middleware/tokenCheck");

router.get("/", tokenCheck, cartController.getALlCartItems);
router.post("/", tokenCheck, cartController.postCart);
router.get("/:email", tokenCheck, cartController.getCartByEmail);
router.delete("/:id", tokenCheck, cartController.deleteCartItem);
router.delete(
  "/clear-after-payments/:email",
  tokenCheck,
  cartController.deleteAfterPayment
);

module.exports = router;
