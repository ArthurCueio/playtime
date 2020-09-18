const { Kayn } = require("kayn");
const moment = require("moment");

const { RIOT_API_KEY } = require("./config");

const kayn = Kayn(RIOT_API_KEY)({
  requestOptions: { burst: true },
});

const getBeginTime = () => moment().subtract(24, "h").valueOf();

const getHoursInLast24 = async (accountName, region) => {
  const parsedRegion = region.toLowerCase(); // Kayn only understands lowercase region strings

  return kayn.Summoner.by
    .name(accountName)
    .region(parsedRegion)
    .then(({ accountId }) => {
      return kayn.Matchlist.by
        .accountID(accountId)
        .region(parsedRegion)
        .query({ beginTime: getBeginTime() });
    })
    .then(({ matches }) => {
      const gameIds = matches.map((match) => match.gameId);
      const requests = gameIds.map((id) =>
        kayn.Match.get(id).region(parsedRegion)
      );
      return Promise.all(requests).then((values) => {
        const durations = values.map((value) => value.gameDuration);
        let total = durations.reduce((a, b) => a + b);

        const result = {};

        result.hours = Math.floor(total / 3600);
        total -= result.hours * 3600;

        result.minutes = Math.floor(total / 60);
        total -= result.minutes * 60;

        result.seconds = total;

        return result;
      });
    })
    .catch(console.error);
};

module.exports = getHoursInLast24;
