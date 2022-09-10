const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather APP',
    name: 'Eli',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Eli',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is an example message',
    title: 'Help',
    name: 'Eli',
  });
});

app.get('/weather', (req, res) => {
  // query string lives in the request(res)
  // example url: http://localhost:3000/weather?address=pasay
  // after the question mark(?) is the query string i.e address=pasay
  if (!req.query.address) {
    return res.send({
      error: 'No address provided!',
    });
  }

  // TypeError: Cannot destructure property 'latitude' of 'undefined' as it is undefined.
  // This error will show if you didn't have an address passed
  // Solution: you have added a default value of empty object
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Eli',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Eli',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Listening to ', port);
});
