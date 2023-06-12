const yup = require("yup");

const userValidationSchema = yup.object().shape({
  name: yup.string().required().lowercase(),
  email: yup.string().required().lowercase(),
  password: yup.string().min(6).max(20).required().trim(),
});

module.exports = userValidationSchema;
