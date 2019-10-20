const searchbot = require("../searchbot/searchbot");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("Welcome!");
  });

  // for text queries
  app.post("/api/df_text_query", async (req, res) => {
    let responses = await searchbot.textQuery(
      req.body.text,
      req.body.parameters
    );
    res.status(200).send(responses);
  });

  // for event queries
  app.post("/api/df_event_query", async (req, res) => {
    let responses = await searchbot.eventQuery(
      req.body.event,
      req.body.parameters
    );
    res.status(200).send(responses);
  });
};
