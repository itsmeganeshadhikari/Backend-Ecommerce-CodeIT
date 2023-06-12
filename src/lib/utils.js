const bcrypt = require("bcrypt");
const saltRounds = 8;
const debug = require("debug");

exports.generatePassword = async (password) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    debug("Cannot generated hashed password");
  }
};
