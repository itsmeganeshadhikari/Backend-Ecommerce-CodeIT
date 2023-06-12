const jwt = require("jsonwebtoken");
const { SUPER_ADMIN, ADMIN, USER } = require("../constants/constant");
const Role = require("../models/role");
const User = require("../models/user");

exports.isLogin = (req, res, next) => {
  //Token verification
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.status(401).end();
      } else {
        const user = await User.findById(decoded.id).populate("role");
        if (!user) return res.status(404).send({ message: "No user found" });
        req.role = user.role;
        next();
      }
    });
  } else {
    res.status(500).send({ message: "Invalid Token" });
  }
};

exports.checkRole = async (req, res, next) => {
  if (req.role.name == SUPER_ADMIN || req.role.name == ADMIN) {
    next();
  } else {
    return res.status(401).send({ error: "Access Denied" });
  }
};
