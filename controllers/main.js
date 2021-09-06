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

    // const passHash = bcrypt.hash(password, saltRounds, function (err, hash) {
    //   return hash;
    // });

    const staff = await Staff.create({
      email: email,
      password: password,
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

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //to log a user in
    //1. check if a a user exists with the username
    const staff = await Staff.findOne({ username: username });
    //2. check if the password matches
    bcrypt.compare(password, staff.password, (err, isMatch) => {
      if (err) throw err;
      console.log(password + "," + isMatch);

      if (!isMatch) {
        console.log("not a match");
        res.status(400).json({ status: false, error: `${username}  cannot be found please try again` });
      }

      // 3.set the token and respond with it
      const id = staff._id;
      const username = staff.username;
      const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(201).json({ status: true, token });
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};

module.exports = {
  basicRegister,
  fullRegister,
  login,
};
