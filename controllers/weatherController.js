const axios = require("axios");
const config = require("../config/app-config");
const moment = require("moment");
const fs = require("fs-promise");

module.exports = {
  getEpoch: date => {
    const d = new Date(date).valueOf() / 1000;
    return d;
  },

  getDateRangeEpoch: (startDate, endDate) => {
    const startDateTime = new Date(startDate).valueOf() / 1000;
    const endDateTime = new Date(endDate).valueOf() / 1000;
    const dateDiff = Math.round((endDateTime - startDateTime) / 24 / 60 / 60);
    return dateDiff;
  },

  // GET IN BETWEEN DATES
  getAllDates: (startDate, endDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  },

  datesEpoch: dates => {
    let self = module.exports;
    return dates.map(date => self.getEpoch(date));
  },

  fetchEachDateWeather: async (coords, allDates) => {
    try {
      let self = module.exports;

      const promises = allDates.map(date => self.fetchWeather(coords, date));

      const dateWeathers = await Promise.all(promises);
      return dateWeathers;
    } catch (error) {
      console.log(error.message);
    }
  },

  getYearRange: date => {
    let yearArray = [];
    let currentDate = moment(date);
    let stopDate = moment(currentDate).subtract(4, "years");
    while (currentDate >= stopDate) {
      yearArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).subtract(1, "years");
    }
    return yearArray;
  },

  fetchEachCoordsWeather: async (allCoords, allDates) => {
    try {
      let self = module.exports;

      const promises = allCoords.map(coord => {
        const dates = allDates.map(date => self.fetchWeather(coord, date));
        const prom = Promise.all(dates);
        return prom;
      });

      const eachCoordsWeather = await Promise.all(promises);
      return eachCoordsWeather;
    } catch (error) {
      console.log(error);
    }
  },

  fetchEachCityCoords: async allCities => {
    try {
      let self = module.exports;

      const promises = allCities.map(address => self.fetchCoords(address));

      const allCoords = await Promise.all(promises);
      return allCoords;
    } catch (error) {
      console.log(error.message);
    }
  },

  // FETCH COORDINATES OF CITY FROM GOOGLE GEOCODE
  fetchCoords: async (city, state) => {
    let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${config.geocodeAPIKey}`;
    try {
      const geocode = await axios.get(geocodeURL);
      const coords = geocode.data.results[0].geometry.location;
      return coords;
    } catch (error) {
      console.log(error.message);
    }
  },

  // FETCH ALL WEATHER DATA FROM DARK SKY API
  fetchWeather: async (coords, time) => {
    try {
      let weatherURI = `https://api.darksky.net/forecast/${config.darkskyAPIKey}/${coords.lat},${coords.lng}`;

      time ? (weatherURI = weatherURI.concat(`,${time}`)) : weatherURI;
      const weather = await axios.get(weatherURI);
      return weather.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  getAverage: async (allWeathers, weatherCondition, days) => {
    try {
      // GETTING ALL OF THE WEATHERS FOR EACH DATE AND CONDITION SPECIFIED
      let weatherArray = [];

      const weatherData = allWeathers.forEach(weather => {
        weatherArray.push(weather.daily.data[0][weatherCondition]);
      });

      const result = (weatherArray.reduce((a, b) => a + b) / days).toFixed(4);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  },

  getDailyAverage: async (allWeathers, weatherCondition, days) => {
    try {
      // GETTING ALL OF THE WEATHERS FOR EACH DATE AND CONDITION SPECIFIED

      let weatherArray = [];

      allWeathers.forEach(weather => {
        weatherArray.push(weather.currently[weatherCondition]);
      });

      const result = (weatherArray.reduce((a, b) => a + b) / days).toFixed(4);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  },

  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
};
