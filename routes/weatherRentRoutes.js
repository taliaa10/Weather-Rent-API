const weatherRentController = require("../controllers/weatherRentController");
const { check } = require("express-validator");

module.exports = app => {
  app.get(
    `/api`,
    [
      check("key", "Invalid key value").equals(process.env.APP_API_KEY),
      check(["startDate", "endDate"], "Invalid date format")
        .optional()
        .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
      check("city", "Invalid Location")
        .optional()
        .isString()
    ],

    weatherRentController.getInfo
  );
};
