const stripe = require("stripe")(process.env.STRIPE_SK);
const Billing = require("../models/billing");
const Payment = require("../models/payment");

// Get Billing Information
exports.getBillingInfo = async (req, res, next) => {
  const result = await Billing.findOne({ email: req.query.email });
  res.status(200).send(result);
  try {
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Post Billing Information
exports.postBilling = async (req, res, next) => {
  const billings = new Billing({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    street: req.body.street,
    zip_code: req.body.zip_code,
    city: req.body.city,
    country: req.body.country,
  });
  const result = await billings.save();
  res.status(200).send(result);
  try {
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create Payment Indent
exports.postPaymentsIndent = async (req, res, next) => {
  try {
    const orders = req.body;
    const amount = parseInt(orders.price) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount ? amount : 100,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Stripe Public Key sent to Client
exports.getConfig = (req, res, next) => {
  try {
    res.status(200).send({ publishableKey: process.env.STRIPE_PK });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Save payments info to mongoDb
exports.postPayments = async (req, res, next) => {
  try {
    const paymentStart = new Payment({
      products: req.body.products,
      name: req.body.name,
      email: req.body.email,
      payment_date: req.body.payment_date,
      price: req.body.price,
      transectionId: req.body.transectionId,
    });

    const result = await paymentStart.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get Invoice by Email
exports.getPaymentInvoice = async (req, res, next) => {
  try {
    const invoice = await Payment.find({ email: req.query.email });
    res.status(200).send(invoice);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get Invoice Details by Id
exports.getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await Payment.findOne({ _id: req.params.id });
    res.status(200).send(invoice);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all complete payment
exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({}).sort({ createAt: -1 });
    res.status(200).send(payments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
