// Import Router from Express
const router = require("express").Router();

// Controller
const paymentController = require("../controllers/paymentsController");

// Billing Address
router.post("/billing", paymentController.postBilling);
router.get("/billing", paymentController.getBillingInfo);

// Stripe Configuration
router.get("/config", paymentController.getConfig);

// Stripe Payments Intents
router.post("/create-payment-intent", paymentController.postPaymentsIndent);

// Payments
router.post("/", paymentController.postPayments);
router.get("/all", paymentController.getAllPayments);

// Invoice
router.get("/invoice", paymentController.getPaymentInvoice);
router.get("/invoice/:id", paymentController.getInvoiceById);

module.exports = router;
