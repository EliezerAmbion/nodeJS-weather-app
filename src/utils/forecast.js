const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=edf1450436d0af3e554de7c46b14e6a2&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    const { current, location, error: coordinateError } = body;
    const isMorning = current.is_day === 'yes' ? true : false;

    if (error) {
      return callback('Unable to connect to weather service!', undefined);
    } else if (coordinateError) {
      return callback('Unable to find location!', undefined);
    }

    callback(
      undefined,
      `${isMorning ? 'Morning' : 'Night'} sky. ${
        current.weather_descriptions
      }. It is currently ${
        current.temperature
      } degrees farenheit out. There is a ${current.precip}% chance of rain`
    );
  });
};

module.exports = forecast;
