const express = require("express");
const router = express.Router();

const {
  login,
  dashboard,
  basicRegister,
  fullRegister,
} = require("../controllers/main");

const authMiddleware = require("../middleware/auth");
const {
  fieldValidation,
  loginValidation,
} = require("../middleware/form-validation");

router.route("/register").post(basicRegister);
router
  .route("/complete-registration")
  .post(authMiddleware, fieldValidation, fullRegister);
//router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(loginValidation, login);

module.exports = router;
