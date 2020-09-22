const { Kayn } = require("kayn");
const moment = require("moment");

const { RIOT_API_KEY } = require("./config");

const kayn = Kayn(RIOT_API_KEY)({
  requestOptions: { burst: true },
});

// Error definitions. kayn doesn't have it's own error types so I have to do this

class SummonerNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "SummonerNotFoundError";
    this.stack = Error.captureStackTrace(this, SummonerNotFoundError);
  }
}

const getBeginTime = (timeOffset) => {
  const m = moment()
    // Moment.js expects the real offset, not the reverse offset from Date.prototype.getTimezoneOffset
    .utcOffset(timeOffset * -1)
    .startOf("day");

  return m.valueOf();
};

const getAccountId = (accountName, region) => {
  return kayn.Summoner.by
    .name(accountName)
    .region(region)
    .then((data) => data.accountId)
    .catch((err) => {
      if (err.statusCode === 404)
        return Promise.reject(
          new SummonerNotFoundError(`${region} ${accountName} not found`)
        );

      return Promise.reject(
        new Error(`Error fetching summoner info: ${err.error.message}`)
      );
    });
};

const getMatches = (region, beginTime) => {
  return (accountId) => {
    return kayn.Matchlist.by
      .accountID(accountId)
      .region(region)
      .query({ beginTime })
      .then((data) => data.matches)
      .catch((err) =>
        Promise.reject(
          new Error(`Error fetching matchlist: ${err.error.message}`)
        )
      );
  };
};

const getTimeFromMatchList = (region) => {
  return (matchList) => {
    const gameIds = matchList.map((match) => match.gameId);
    const requests = gameIds.map((id) => kayn.Match.get(id).region(region));

    return Promise.all(requests).then((values) => {
      const durations = values.map((value) => value.gameDuration);
      let total = durations.reduce((a, b) => a + b);

      const result = {};

      result.hours = Math.floor(total / 3600);
      total -= result.hours * 3600;

      result.minutes = Math.floor(total / 60);
      total -= result.minutes * 60;

      result.seconds = total;

      return { time: result };
    });
  };
};

const getPlaytime = async (accountName, region, timeOffset) => {
  const parsedRegion = region.toLowerCase(); // Kayn only understands lowercase region strings
  const beginTime = getBeginTime(timeOffset);

  return getAccountId(accountName, parsedRegion)
    .then(getMatches(parsedRegion, beginTime))
    .then(getTimeFromMatchList(parsedRegion))
    .catch((err) => {
      if (err instanceof SummonerNotFoundError)
        return {
          error: `Summoner ${accountName} not found on ${region} region`,
        };

      return err;
    });
};

module.exports = getPlaytime;
