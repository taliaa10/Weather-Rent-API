const weatherRentController = require("../controllers/weatherRentController");
// const express = require("express");
// const redis = require("redis"),
//   client = redis.createClient(null, null, { detect_buffers: true }),
//   router = express.Router();

module.exports = app => {
  app.get(`/api/${process.env.APP_API_KEY}`, weatherRentController.getAllInfo);
};
