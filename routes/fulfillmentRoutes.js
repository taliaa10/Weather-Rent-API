const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const weatherController = require("../controllers/weatherController");
const fs = require("fs-promise");

module.exports = app => {
  app.post("/", async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    const city = agent.parameters.city;
    const date = agent.parameters.date;
    const startDate = agent.parameters.datePeriod.startDate;
    const endDate = agent.parameters.datePeriod.endDate;
    const time = weatherController.getEpoch(date);

    const dates = weatherController.getAllDates(startDate, endDate);
    const allDates = weatherController.datesEpoch(dates);
    const days = allDates.length;

    const stat = agent.parameters.stat;
    const weatherCondition = agent.parameters.weatherCondition;

    getAverageWeather = async agent => {
      console.log(req.query);
      try {
        const coords = await weatherController.fetchCoords(city);

        const allWeathers = await weatherController.fetchEachDateWeather(
          coords,
          allDates
        );

        let result = await weatherController.getAverage(
          allWeathers,
          weatherCondition,
          days
        );

        let responseText = `The ${stat} ${weatherCondition} in ${city} was ${result}`;

        console.log(agent.parameters);
        agent.add(responseText);
        // agent.add("responseText");
      } catch (error) {
        console.log(error.message);
      }
    };

    // INTENT FOR RENT COMPARISON

    // INTENT FOR RENT AND WEATHER INFO

    function fallback(agent) {
      agent.add(`WH I didn't understand`);
      agent.add(`WH I'm sorry, can you try again?`);
    }

    let intentMap = new Map();
    intentMap.set("Get Average Weather", getAverageWeather);
    intentMap.set("Default Fallback Intent", fallback);
    agent.handleRequest(intentMap);
  });
};
