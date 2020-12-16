const request = require('request');
const geocode = require('./geocode.js');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=7b7646529620398004a9eea246633df6&units=metric`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services..', undefined);
    } else if (response.body.messge) {
      callback('Unable to find location..');
    } else {
      callback(
        undefined,
        response.body.daily[0].weather[0].description +
          '. Max temp would be ' +
          response.body.daily[0].temp.max +
          ' degrees'
      );
    }
  });
};

module.exports = forecast;
