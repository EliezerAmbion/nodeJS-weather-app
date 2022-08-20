const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=edf1450436d0af3e554de7c46b14e6a2&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    const { current, location, error: coordinateError } = body;
    const { temperature, weather_descriptions, precip } = current;

    if (error) {
      return callback('Unable to connect to weather service!', undefined);
    } else if (coordinateError) {
      return callback('Unable to find location!', undefined);
    }

    callback(
      undefined,
      `${location.region} forecast: ${weather_descriptions}. It is currently ${temperature} degrees farenheit out. There is a ${precip}% chance of rain`
    );
  });
};

module.exports = forecast;
