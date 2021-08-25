const { BadRequestError } = require("../errors");

function fieldValidation(req, res, next) {
  const { username, firstname, lastname, unit, designation, intro, gender } =
    req.body;

  try {
    if (!username) {
        throw new BadRequestError("Please provide your preferred username");
      }
      if (!firstname) {
        throw new BadRequestError("Please provide your firstname");
      }
      if (!lastname) {
        throw new BadRequestError("Please provide your lastname");
      }
      if (!unit) {
        throw new BadRequestError("Please provide your unit");
      }
      if (!designation) {
        throw new BadRequestError("Please provide your designation");
      }
      if (!intro) {
        throw new BadRequestError(
          `Please say a warm introduction about ${username}`
        );
      }
      if (!gender) {
        throw new BadRequestError(
          `Please select a gender from the options`
        );
      }
  } catch (error) {
      res.status(400).json({status: false, message: error.message})
  }
  console.log(req.body);
  next();
}

module.exports = fieldValidation;
