require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../errors");
const { Staff } = require("../db/connect");

const basicRegister = async (req, res) => {
  const saltRounds = 10;
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      throw new BadRequestError("Please provide email and password");
    }

    const passHash = bcrypt.hash(password, saltRounds, function (err, hash) {
      return hash;
    });

    const staff = await Staff.create({
      email: email,
      password: passHash,
      username: username,
    });

    const id = staff._id;
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(201).json({
      status: true,
      user_message: `Your registration is successful. An email has been sent to ${email}`,
      staff,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const fullRegister = async (req, res) => {
  const { id, username } = req.user;
  const { firstname, lastname, designation, unit, gender, intro } = req.body;
  const update = {
    firstname,
    lastname,
    designation,
    unit,
    gender,
    intro,
  };
  const filter = { _id: id };
  try {
    const staff = await Staff.findOneAndUpdate(filter, update);
    staff.save();
    console.log(staff);

    res.status(201).json({
      status: true,
      staff,
    });
  } catch (error) {
    console.log(error.message);
    res.status(501).json({ status: false, message: error.message });
  }
};

module.exports = {
  basicRegister,
  fullRegister,
};
