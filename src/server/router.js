const express = require("express");
const getHoursInLast24 = require("./leagueApi");

const apiRouter = express.Router();

apiRouter.get("/getHours/:region/:accountName", (req, res) => {
  getHoursInLast24(req.params.accountName, req.params.region).then((result) => {
    res.json(result);
  });
});

module.exports = apiRouter;
