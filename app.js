require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const { connectDB } = require("./db/connect");
const mainRouter = require("./routes/main");
// const registerRouter = require("./routes/register")
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
  console.log("Hello world!");
});
app.use("/api/v1", mainRouter);
// app.use("/api/v1/signup", registerRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// const start = async () => {
//   try {
//     app.listen(port, console.log(`Server is listening on port ${port}...`));
//     connectDB();
//   } catch (error) {
//     console.log(error);
//   }
// };

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
  connectDB();
});

//start();
