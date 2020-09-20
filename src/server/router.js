const express = require("express");
const getHoursInLast24 = require("./leagueApi");
const { REGIONS } = require("../shared/constants");

const apiRouter = express.Router();

apiRouter.get("/getPlaytime/:region/:accountName", (req, res) => {
  const { accountName, region } = req.params;
  const { timeOffset } = req.query;

  if (REGIONS.includes(region)) {
    getHoursInLast24(accountName, region, timeOffset).then((result) => {
      res.json(result);
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = apiRouter;
