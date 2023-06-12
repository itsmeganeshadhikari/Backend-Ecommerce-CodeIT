const express = require("express");
const {
  getRole,
  createRole,
  deleteRole,
  updateRole,
} = require("../controllers/roleController");
const roleRoute = express.Router();

roleRoute.get("/role", getRole);
roleRoute.post("/createRole", createRole);
roleRoute.delete("/deleteRole/:id", deleteRole);
roleRoute.put("/updateRole/:id", updateRole);

module.exports = roleRoute;
