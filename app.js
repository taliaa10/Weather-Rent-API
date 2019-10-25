const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");

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
app.use(compression());

app.get("/", (req, res) => {
  res.send("Please see readme for instructions");
});
// ROUTES
require("./routes/weatherRentRoutes")(app);
// All user input will go through the dialogFlowRoutes
require("./routes/dialogFlowRoutes")(app);
// If the intent for user's input has fulfillment enabled it will also go through the fulfillmentRoutes
require("./routes/fulfillmentRoutes")(app);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.use((err, req, res, next) => {
  res.status;
});

module.exports = app;
