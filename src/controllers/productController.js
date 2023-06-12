const Product = require("../models/product");

exports.getProduct = async (req, res) => {
  const product = await Product.find().populate("user");
  res.status(200).send({ product });
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).send({ product: product });
  } catch (error) {}
};
