const weatherRentController = require("../controllers/weatherRentController");

module.exports = app => {
  app.get("/api/weather-rent", weatherRentController.getAllInfo);
};
