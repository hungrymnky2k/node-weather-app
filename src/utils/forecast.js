const request = require('request');
const geocode = require('./geocode.js');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=7b7646529620398004a9eea246633df6&units=metric`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services..', undefined);
    } else if (response.body.message) {
      callback('Unable to find location..');
    } else {
      callback(
        undefined,
        'Weather Today:- ' +
          response.body.weather[0].description +
          '.' +
          ' Current temperature is ' +
          response.body.main.temp +
          ' degrees. Feels like ' +
          response.body.main.feels_like +
          ' degrees. Maximum temperature will be ' +
          response.body.main.temp_max +
          ' degrees. Minimum temp will be ' +
          response.body.main.temp_min +
          ' degrees.'
      );
    }
  });
};

module.exports = forecast;
