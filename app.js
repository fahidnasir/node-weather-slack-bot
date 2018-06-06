const slackBots = require('slackbots');

const messageHelper = require('./src/messageHelper');

const bot = new slackBots({
  token: 'xoxb-YOUR-OWN-TOKEN',
  name: 'Weather-Bot'
});

function onBotStart() {
  const params = {
    icon_emoji: ':snow_cloud:'
  };

  bot.postMessageToChannel(
    'general',
    'Weather Bot is started and ready to listen for your commands @weather-bot-fahid.',
    params,
    val => {
      console.log('message received.');
    }
  );
}

function onBotMessage(data) {
  if (data.type === 'message' && data.subtype !== 'bot_message') {
    messageHelper
      .handleMessage(data.text)
      .then(resp => {
        const location = resp.data.data.location;
        const temprature = resp.data.data.temperature;
        bot.postMessage(
          data.channel,
          `Temprature in ${location} is ${temprature} Feranheit`,
          { icon_emoji: ':cloud:' }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function onBotOpen() {
  console.log('onBotOpen');
}
function onBotClose() {
  console.log('onBotClose');
}

function onBotError(err) {
  console.log(err);
}

const botEvents = [
  { name: 'start', event: onBotStart },
  { name: 'message', event: onBotMessage },
  { name: 'open', event: onBotOpen },
  { name: 'close', event: onBotClose },
  { name: 'error', event: onBotError }
];

botEvents.forEach((val, index, arr) => {
  bot.on(val.name, val.event);
});
