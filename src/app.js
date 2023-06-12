const express = require("express");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const roleRoute = require("./routes/roleRoute");
const dbConnection = require("./db/connection");

const app = express();
//Db connection
dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Routes
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", roleRoute);

//Api Demo
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/home", (req, res) => {
  res.send("Home Pages");
});

module.exports = app;
