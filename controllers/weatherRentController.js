const weatherController = require("../controllers/weatherController");
const City = require("../models/cityModel");

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
        "weatherCondition",
        "weather",
        "weather[gt]",
        "weather[lt]"
      ];
      excludedFields.forEach(el => delete queryObj[el]);

      //2) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      const weatherCondition = req.query.weatherCondition;

      // console.log(query);

      // // PAGINATION
      // const page = req.query.page * 1 || 1;
      // const limit = req.query.limit * 1 || 100;
      // const skip = (page - 1) * limit;

      // query = query.skip(skip).limit(limit);

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

        data = {
          weather: parseFloat(weatherResult),
          query
        };
      } else if (
        req.query.hasOwnProperty("date") &&
        req.query.hasOwnProperty("rent")
      ) {
        const years = weatherController.getYearRange(req.query.date);
        const allYears = weatherController.datesEpoch(years);
        const days = allYears.length;

        const w = Object.keys(req.query.weather)[0];
        const reqWeather = Object.values(req.query.weather)[0];

        let cityArray = [];
        try {
          // GETTING WEATHERS FOR ALL CIITES
          query = City.find(JSON.parse(queryStr));
        } catch (error) {
          console.log(error);
        }

        // MAKE A NEW PAGINATION THAT PAGINATES THE FILTERED CITY WEATHER RESULTS
        // INSTEAD OF JUST THE CITY RENT RESULTS FROM THE DATABASE.
        // MAYBE THROW A WHILE LOOP AROUND THE QUERY AND FILTERED ARRAY
        // THAT SAYS WHILE IT'S LESS THAN 20 + 1
        // QUERY AND ADD MORE CITIES TO IT UNTIL THERE ARE 20 RESULTS
        // ON THE NEXT PAGE GET THE QUERIED CITY RESULTS AND REPEAT

        // PAGINATION
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 20;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // GETTING QUERIES FROM DB
        let cities = await query;

        try {
          await weatherController.asyncForEach(cities, async city => {
            city.coords = await weatherController.fetchCoords(city);

            let allWeathers = await Promise.all(
              allYears.map(year =>
                weatherController.fetchWeather(city.coords, year)
              )
            );

            let averageWeather = await weatherController.getDailyAverage(
              allWeathers,
              weatherCondition,
              days
            );

            cityInfo = { ...city._doc };
            cityInfo.averageWeather = parseFloat(averageWeather);
            cityInfo.weatherType = weatherCondition;
            cityInfo.fiveYearAvgFrom = req.query.date;

            cityArray.push(cityInfo);
          });

          filteredCities = cityArray.filter(city => {
            switch (w) {
              case "gt":
                return city.averageWeather > parseFloat(reqWeather);
              case "lt":
                return city.averageWeather < parseFloat(reqWeather);
            }
          });

          data = filteredCities;
        } catch (error) {
          res.status(400).json({
            error: error.message
          });
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
        weatherResult = parseFloat(weather.daily.data[0][weatherCondition]);

        data = {
          weather: parseFloat(weatherResult),
          query
        };
      } else if (req.query.hasOwnProperty("rent")) {
        // RENT QUERY
        query = City.find(JSON.parse(queryStr));

        // PAGINATION
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        let rentResult = await query;

        data = rentResult;
      }

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
  }
};
