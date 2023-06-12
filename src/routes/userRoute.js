const express = require("express");
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  login,
} = require("../controllers/userController");
const { isLogin, checkRole } = require("../config/authtenticate");
const userValidationSchema = require("../validationSchema/userSchemaValidation");
const validateRequest = require("../validationSchema/validator");

const userRoute = express.Router();

userRoute.get("/user", isLogin, getUser);
userRoute.post(
  "/createUser",
  validateRequest(userValidationSchema),
  isLogin,
  checkRole,
  createUser
);
userRoute.delete("/deleteUser/:id", isLogin, checkRole, deleteUser);
userRoute.put("/updateUser/:id", isLogin, checkRole, updateUser);
userRoute.post("/login", login);

module.exports = userRoute;
