const Slider = require("../models/sliders");

exports.deleteSingleSlider = async (req, res, next) => {
  try {
    const sliders = await Slider.deleteOne({ _id: req.params.id });
    res.send(sliders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.getSliders = async (req, res, next) => {
  try {
    const sliders = await Slider.find({});
    res.send(sliders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.postSlider = async (req, res, next) => {
  try {
    const sliders = new Slider({
      title: req.body.title,
      sub_title: req.body.sub_title,
      price: req.body.price,
      link: req.body.link,
      image: req.body.image,
    });
    const result = await sliders.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
