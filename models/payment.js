const mongoose = require("mongoose");
const paymentSchema = require("../schemas/paymentSchema");

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
