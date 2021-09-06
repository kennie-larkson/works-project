require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const url = process.env.MONGO_URL;
const SALT_WORK_FACTOR = 10;

// const connectDB = async () => {
//   try {
//     return mongoose.connect(
//       url,
//       {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//       },
//       () => console.log("Database connection successful...")
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

function connectDB() {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
}

const staffSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  username: { type: String, unique: true },
  firstname: { type: String },
  lastname: { type: String },
  gender: { type: String },
  unit: { type: String },
  designation: { type: String },
  intro: { type: String },
});

staffSchema.pre("save", function (next) {
  const staff = this;

  // only hash the password if it has been modified (or is new)
  if (!staff.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(staff.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      staff.password = hash;
      next();
    });
  });
});

const Staff = mongoose.model("staff", staffSchema);

module.exports = { connectDB, Staff };
