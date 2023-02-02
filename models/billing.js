const mongoose = require("mongoose");
const billingSchema = require("../schemas/billingSchema");

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;
