const LeagueJS = require('leaguejs');
const moment = require('moment');

const { RIOT_API_KEY } = require('./config');

const lolApi = new LeagueJS(RIOT_API_KEY, { limits: { allowBurst: true } });

const getBeginTime = () => moment().subtract(24, 'h').valueOf();

const getHoursInLast24 = async (accountName, region) => {
  const { accountId } = await lolApi.Summoner.gettingByName(accountName, region);
  const { matches } = await lolApi.Match.gettingListByAccount(
    accountId,
    region,
    { beginTime: getBeginTime() }
  );

  const promiseArray = [];

  matches.forEach((match) => {
    promiseArray.push(
      lolApi.Match.gettingById(match.gameId, region)
    );
  });

  return Promise.all(promiseArray).then((values) => {
    const durationArray = values.map(value => value.gameDuration);
    let total = durationArray.reduce((a, b) => a + b);

    const result = {};

    result.hours = Math.floor(total / 3600);
    total -= result.hours * 3600;

    result.minutes = Math.floor(total / 60);
    total -= result.minutes * 60;

    result.seconds = total;

    return result;
  });
};

module.exports = getHoursInLast24;
