const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city: String,
  state: String,
  rent: Number
});

const City = mongoose.model("City", citySchema);

module.exports = City;
