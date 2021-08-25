require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    return mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      () => console.log("Database connection successful...")
    );
  } catch (error) {
    console.log(error);
  }
};

const staffSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  username: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  gender: { type: String },
  unit: { type: String },
  designation: { type: String },
  intro: { type: String },
});

const Staff = mongoose.model("staff", staffSchema);

module.exports = { connectDB, Staff };
