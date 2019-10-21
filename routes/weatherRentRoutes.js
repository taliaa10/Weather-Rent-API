const weatherRentController = require("../controllers/weatherRentController");

module.exports = app => {
  app.get(
    `/api/weather-rent/${process.env.APP_API_KEY}`,
    weatherRentController.getAllInfo
  );
};
