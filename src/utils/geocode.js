const request = require('request');

const geoCode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=abdb5c3608fa75b2c3f87a12e6362c6d&query=${encodeURIComponent(
    address
  )}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback('Unable to connect to geolocation service!', undefined);
    } else if (!body.data.length) {
      return callback(
        'Unable to find location! Try another search.',
        undefined
      );
    }

    const { latitude, longitude, label } = body.data[0];
    callback(undefined, {
      latitude,
      longitude,
      location: label,
    });
  });
};

module.exports = geoCode;
