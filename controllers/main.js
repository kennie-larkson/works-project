require('dotenv').config()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../errors");
const { Staff } = require("../db/connect");

const basicRegister = async (req, res) => {
  const saltRounds = 10;
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    const passHash = bcrypt.hash(password, saltRounds, function (err, hash) {
      console.log(hash);
      return hash;
    });

    const staff = await Staff.create({ email: email, password: passHash });

    const id = staff._id
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
    res
      .status(201)
      .json({
        status: true,
        user_message: `Your registration is successful. An email has been sent to ${email}`,
        staff,
        token
      });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const fullRegister = async (req, res) => {
  const staff = await Staff.insertMany([
    username,
    firstname,
    lastname,
    unit,
    designation,
    intro,
    gender,
  ]);

  staff.save((err, staff) => {
    if (!staff) {
      throw new BadRequestError("Please provide your preferred username");
    }
  });
};

module.exports = {
  basicRegister,
  fullRegister,
};
