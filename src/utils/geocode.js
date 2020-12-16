const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2h1YmhhbXNoYXJtYTJrIiwiYSI6ImNraWZpZWE5bTAyMGUycHFqbGI0aTJjbHAifQ._UbmT-q2CYhbk9tfuUWc8w&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services..', undefined);
    } else if (response.body.features.length === 0) {
      callback(
        'Incorrect/Incomplete parameters passed to retrieve coordinates..',
        undefined
      );
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
