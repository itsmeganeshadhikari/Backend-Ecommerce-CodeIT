const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { generatePassword } = require("../lib/utils");
const { SUCCESS } = require("../constants/constant");

exports.getUser = async (req, res) => {
  const data = await User.find({}).populate("product role");
  res.status(200).send({ data: data });
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.password = await generatePassword(user.password);
    const insertedUser = await user.save();
    res.status(200).send({ status: SUCCESS, user: insertedUser });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.status(200).send({ deletedUser: "User Deleted SuccessFully" });
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  await User.findOneAndUpdate({ _id: id }, { $set: req.body });
  res.status(200).send({ deletedUser: "User Updated SuccessFully" });
};

exports.login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userLogin = await User.findOne({ email: email });
    const token = jwt.sign(
      { id: userLogin.id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    if (token && userLogin) {
      res.status(200).json({
        success: true,
        userId: userLogin.id,
        email: userLogin.email,
        token: token,
      });
      next();
    } else {
      res.status(500).json({ message: "Invalid Credential" });
    }
  } catch (error) {
    const err = new Error("Error Something!");
    console.log(err);
  }
};
