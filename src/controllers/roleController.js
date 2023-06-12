const { default: axios } = require("axios");
const Role = require("../models/role");

exports.getRole = async (req, res) => {
  const role = await Role.find();
  res.status(200).send({ data: role });
};

exports.createRole = async (req, res) => {
  try {
    const role = await Role.insertMany(req.body);
    res.status(200).send({ data: role });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

exports.deleteRole = async (req, res) => {
  const id = req.params.id;
  await Role.findByIdAndDelete(id);
  res.status(200).send({ deletedRole: "Role Deleted SuccessFully" });
};

exports.updateRole = async (req, res) => {
  const id = req.params.id;
  await Role.findOneAndUpdate({ _id: id }, { $set: req.body });
  res.status(200).send({ updateRole: "Role updated SuccessFully" });
};
