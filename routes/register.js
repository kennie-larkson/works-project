const express = require("express");
const router = express.Router();
const { register } = require("../controllers/main");

router.route("/").post(register);

module.exports = router;
