const mongoose = require("mongoose");
const sliderSchema = require("../schemas/slidersSchema");

const Slider = mongoose.model("slider", sliderSchema);

module.exports = Slider;
