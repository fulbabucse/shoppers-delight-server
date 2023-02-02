const Category = require("../models/category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.postCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      link: req.body.link,
    });
    const result = await category.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteSingleCategory = async (req, res, next) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
