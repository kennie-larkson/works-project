const express = require("express");
const router = express.Router();

const { login, dashboard, basicRegister, fullRegister } = require("../controllers/main");

const authMiddleware = require("../middleware/auth");
const formValidation = require("../middleware/form-validation");

router.route("/register").post(basicRegister);
router.route("/complete-registration").post(formValidation, fullRegister);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
