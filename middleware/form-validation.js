const { BadRequestError } = require("../errors");

function fieldValidation(req, res, next) {
  const { firstname, lastname, unit, designation, intro, gender } = req.body;

  try {
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
        `Please say a warm introduction about yourself`
      );
    }
    if (!gender) {
      throw new BadRequestError(`Please select a gender from the options`);
    }

    // console.log(req.body);
    // req.body = user
    next();
    // return req.body
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
}

module.exports = fieldValidation;
