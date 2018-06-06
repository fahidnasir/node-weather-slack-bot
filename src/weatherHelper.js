const urlByCity = 'https://5dayweather.org/api.php';
const axios = require('axios');

module.exports.getWeather = async city => {
  var url = urlByCity;
  try {
    var resp = await axios.get(url, {
      params: {
        city: city
      }
    });

    return Promise.resolve(resp);
  } catch (error) {
    return Promise.reject(error);
  }
};
