const express = require("express");
const {
  getProduct,
  createProduct,
} = require("../controllers/productController");
const { isLogin, checkRole } = require("../config/authtenticate");

const productRoute = express.Router();

productRoute.get("/product", isLogin, getProduct);
productRoute.post("/createProduct", isLogin, checkRole, createProduct);

module.exports = productRoute;
