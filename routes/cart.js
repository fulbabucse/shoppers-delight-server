// Import Router from Express
const router = require("express").Router();

const cartController = require("../controllers/cartController");

router.get("/", cartController.getALlCartItems);
router.post("/", cartController.postCart);
router.get("/:email", cartController.getCartByEmail);
router.delete("/:id", cartController.deleteCartItem);
router.delete(
  "/clear-after-payments/:email",
  cartController.deleteAfterPayment
);

module.exports = router;
