// Import Router from Express
const router = require("express").Router();

// Controller
const paymentController = require("../controllers/paymentsController");
const tokenCheck = require("../middleware/tokenCheck");

// Billing Address
router.post("/billing", tokenCheck, paymentController.postBilling);
router.get("/billing", tokenCheck, paymentController.getBillingInfo);

// Stripe Configuration
router.get("/config", tokenCheck, paymentController.getConfig);

// Stripe Payments Intents
router.post(
  "/create-payment-intent",
  tokenCheck,
  paymentController.postPaymentsIndent
);

// Payments
router.post("/", tokenCheck, paymentController.postPayments);
router.get("/all", tokenCheck, paymentController.getAllPayments);

// Invoice
router.get("/invoice", tokenCheck, paymentController.getPaymentInvoice);
router.get("/invoice/:id", tokenCheck, paymentController.getInvoiceById);

module.exports = router;
