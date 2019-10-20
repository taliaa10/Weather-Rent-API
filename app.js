const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const paginate = require("express-paginate");

// 1) MIDDLEWARES
app.use(cors());
// Used to get the body info
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// SET SECURITY HTTP HEADERS
app.use(helmet());
// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());
// DATA SANITIZATION AGAINST XSS
app.use(xss());
app.all(function(req, res, next) {
  // set default or minimum is 10 (as it was prior to v0.2.0)
  if (req.query.limit <= 10) req.query.limit = 10;
  next();
});
// ROUTES
require("./routes/weatherRentRoutes")(app);
// All user input will go through the dialogFlowRoutes
require("./routes/dialogFlowRoutes")(app);
// If the intent for user's input has fulfillment enabled it will also go through the fulfillmentRoutes
require("./routes/fulfillmentRoutes")(app);

module.exports = app;
