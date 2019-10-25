const weatherController = require("../controllers/weatherController");
const City = require("../models/cityModel");
const { validationResult } = require("express-validator");
const APIFeatures = require("../utils/apiFeatures");

module.exports = {
  getInfo: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let query = req.query;
    let weatherResult;
    let city = req.query.city;
    let state = req.query.state;
    let weatherCondition = req.query.weatherCondition;
    let data;

    if (
      // AVG WEATHER OVER DATE PERIOD FOR ONE CITY
      req.query.hasOwnProperty("endDate") &&
      req.query.hasOwnProperty("startDate")
    ) {
      try {
        // GET START AND END DATES
        const endDate = `${req.query.endDate}T23:59:59-05:00`;
        const startDate = `${req.query.startDate}T00:00:00-05:00`;

        // GET ALL DATES IN BETWEEN START AND END DATE
        const dates = weatherController.getAllDates(startDate, endDate);
        // CONVERT ALL DATES TO SECONDS
        // const allDates = weatherController.datesEpoch(dates);

        const allDates = dates.map(date => weatherController.getEpoch(date));
        // GET THE NUMBER OF DAYS
        const days = allDates.length;

        // GET COORDS FOR CITY ENTERED
        const coords = await weatherController.fetchCoords(city, state);

        // GET WEATHER FOR EACH DATE IN THAT CITY
        const allWeathers = await Promise.all(
          allDates.map(date => weatherController.fetchWeather(coords, date))
        );

        //  DIVIDE SUM OF WEATHER CONDITIONS FROM EACH DATE BY NUMBER OF DAYS
        weatherResult = await weatherController.getAverage(
          allWeathers,
          weatherCondition,
          days
        );

        delete query.key;

        data = {
          weather: parseFloat(weatherResult),
          query
        };

        res.status(200).json({
          status: "success",
          results: data.length,
          data
        });
      } catch (error) {
        res.status(400).json({
          error: error.message
        });
      }
    } else if (
      // GET WEATHER AND RENT
      req.query.hasOwnProperty("date") &&
      req.query.hasOwnProperty("rent")
    ) {
      try {
        const years = weatherController.getYearRange(req.query.date);

        const allYears = years.map(year => weatherController.getEpoch(year));

        const days = allYears.length;

        let cityArray = [];

        // GETTING WEATHERS FOR ALL CIITES
        query = new APIFeatures(City.find(), req.query).filter().paginate();
        // console.log(query.query);

        // Awaiting queries from database
        let cities = await query.query;

        await weatherController.asyncForEach(cities, async city => {
          // Fetch coords for each city
          city.coords = await weatherController.fetchCoords(city);

          // Fetch weather for each year for each city
          let allWeathers = await Promise.all(
            allYears.map(year =>
              weatherController.fetchWeather(city.coords, year)
            )
          );

          // Get the average
          let averageWeather = await weatherController.getDailyAverage(
            allWeathers,
            weatherCondition,
            days
          );

          // Take a copy of the city obj from the db and build city and weather object
          let cityInfo = { ...city._doc };
          cityInfo.averageWeather = parseFloat(averageWeather);
          cityInfo.weatherType = weatherCondition;
          cityInfo.fiveYearAvgFrom = req.query.date;

          cityArray.push(cityInfo);
        });

        // Get weather key and value from req.query
        const w = Object.keys(req.query.weather)[0];
        const reqWeather = Object.values(req.query.weather)[0];

        // Filter cities for req weather
        filteredCities = cityArray.filter(city => {
          switch (w) {
            case "gt":
              return city.averageWeather > parseFloat(reqWeather);
            case "lt":
              return city.averageWeather < parseFloat(reqWeather);
          }
        });

        data = filteredCities;

        res.status(200).json({
          status: "success",
          results: data.length,
          data
        });
      } catch (error) {
        res.status(400).json({
          error: error.message
        });
      }
    } else if (req.query.hasOwnProperty("date")) {
      // Get weather for one city and one date
      try {
        // GET COORDS FOR CITY ENTERED
        const coords = await weatherController.fetchCoords(
          req.query.city,
          req.query.state
        );
        // GET DATE IN SECONDS
        const time = weatherController.getEpoch(
          `${req.query.date}T12:00:00-06:00`
        );
        // GETTING ONE WEATHER FOR ONE DATE
        let weather = await weatherController.fetchWeather(coords, time);
        weatherResult = parseFloat(weather.daily.data[0][weatherCondition]);

        delete query.key;

        data = {
          weather: parseFloat(weatherResult),
          query
        };

        res.status(200).json({
          status: "success",
          results: data.length,
          data
        });
      } catch (error) {
        res.status(400).json({
          error: error.message
        });
      }
    } else if (req.query.hasOwnProperty("rent")) {
      try {
        // RENT QUERY
        query = new APIFeatures(City.find(), req.query).filter();

        let rentResult = await query.query;

        data = rentResult;

        res.status(200).json({
          status: "success",
          results: data.length,
          data
        });
      } catch (error) {
        res.status(400).json({
          error: error.message
        });
      }
    } else {
      res.status(400).json({
        error: "poorly formatted request"
      });
    }
  }
};
