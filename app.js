// Importing packages
const chalk = require('chalk');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

// Use geocode with a callback
geocode('Cairo', (error, geoData) => {
    if (error) {
        console.log(error);
    } else {
        
        // Call weather with the obtained information from geocode
        weather(geoData, (error, weatherData) => {
            if (error) {
                console.log(error);
            } else {
                console.log(chalk.bold.blue('Name:', geoData.Name));
                console.log(chalk.bold.blue('Temperature:', weatherData.temp, '°C'));
                console.log(chalk.bold.blue('Humidity:', weatherData.humidity));
            }
        });
    }
});