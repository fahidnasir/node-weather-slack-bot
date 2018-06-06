const weatherClient = require('./weatherHelper');

const params = {
  icon_emoji: ':sun_behind_rain_cloud:'
};

function runHelp() {}

module.exports.handleMessage = async text => {
  const message = text.split(' ')[1];
  if (message) {
    return weatherClient.getWeather(message);
  } else if (message === ' help') {
    runHelp();
  }
  console.log(text);
};
