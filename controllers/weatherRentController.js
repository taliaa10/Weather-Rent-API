const weatherController = require("../controllers/weatherController");
const City = require("../models/cityModel");
const fs = require("fs-promise");

module.exports = {
  getAllInfo: async (req, res, next) => {
    let query = req.query;
    let weatherResult;
    let rentResult;
    let data;

    try {
      // 1) Filtering
      const queryObj = { ...req.query };
      const excludedFields = [
        "page",
        "sort",
        "limit",
        "fields",
        "city",
        "date",
        "weatherCondition"
      ];
      excludedFields.forEach(el => delete queryObj[el]);

      //2) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      const stat = req.query.stat;
      const weatherCondition = req.query.weatherCondition;

      if (
        req.query.hasOwnProperty("endDate") &&
        req.query.hasOwnProperty("startDate")
      ) {
        // GET START AND END DATES
        const endDate = `${req.query.endDate}T23:59:59-05:00`;
        const startDate = `${req.query.startDate}T00:00:00-05:00`;

        // GET ALL DATES IN BETWEEN START AND END DATE
        const dates = weatherController.getAllDates(startDate, endDate);
        // CONVERT ALL DATES TO SECONDS
        const allDates = weatherController.datesEpoch(dates);
        // GET THE NUMBER OF DAYS
        const days = allDates.length;

        // GET COORDS FOR CITY ENTERED
        const coords = await weatherController.fetchCoords(
          req.query.city,
          req.query.state
        );

        //  GET ALL THE WEATHERS FOR EACH DAY
        const allWeathers = await weatherController.fetchEachDateWeather(
          coords,
          allDates
        );

        //  DIVIDE SUM OF WEATHER CONDITIONS FROM EACH DATE BY NUMBER OF DAYS
        weatherResult = await weatherController.getAverage(
          allWeathers,
          weatherCondition,
          days
        );

        // rent.weather = "hey";

        data = {
          results: weatherResult.length,
          weather: weatherResult,
          query
        };
      } else if (
        req.query.hasOwnProperty("date") &&
        req.query.hasOwnProperty("rent")
      ) {
        const years = weatherController.getYearRange(req.query.date);
        const allYears = weatherController.datesEpoch(years);
        const days = allYears.length;

        const page = req.query.page;
        const limit = req.query.limit;
        let cities;
        try {
          // GETTING WEATHERS FOR ALL CIITES
          cities = await City.find(JSON.parse(queryStr));
        } catch (error) {
          console.log(error);
        }

        try {
          await weatherController.asyncForEach(cities, async city => {
            city.coords = await weatherController.fetchCoords(city);

            let allWeathers = await Promise.all(
              allYears.map(year =>
                weatherController.fetchWeather(city.coords, year)
              )
            );

            let weatherResult = await weatherController.getDailyAverage(
              allWeathers,
              weatherCondition,
              days
            );

            city.weather = {
              weather: weatherResult,
              weatherCondition: weatherCondition
            };

            city = {
              city: city,
              weather: city.weather
            };
            // const startIndex = (page - 1) * limit;
            // const endIndex = page * limit;
            // const cityResults = city.slice(startIndex, endIndex);
            data = city;
          });
        } catch (error) {
          console.log(error.message);
        }
      } else if (req.query.hasOwnProperty("date")) {
        // GET COORDS FOR CITY ENTERED
        const coords = await weatherController.fetchCoords(
          req.query.city,
          req.query.state
        );
        // GET DATE IN SECONDS
        const time = weatherController.getEpoch(
          `${req.query.date}T12:00:00-06:00`
        );
        // GETTING ONE WEATHER FOR ON DATE
        let weather = await weatherController.fetchWeather(coords, time);
        weatherResult = weather.daily.data[0][weatherCondition];

        data = {
          weather: weatherResult,
          query
        };
      } else if (req.query.hasOwnProperty("rent")) {
        // RENT QUERY
        rentResult = await City.find(JSON.parse(queryStr));

        data = {
          results: rentResult.length,
          rent: rentResult,
          query
        };
      }

      res.status(200).json({
        status: "success",
        data: data
      });
    } catch (error) {
      res.status(400).json({
        error: error.message
      });
    }
  }
};
