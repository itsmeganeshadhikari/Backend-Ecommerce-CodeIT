const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    unique: true,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
