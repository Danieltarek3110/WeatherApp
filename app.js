// Importing packages
const chalk = require('chalk');
const yargs = require('yargs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const address = process.argv[2];

// Use geocode with a callback
if(!address){
    console.log(chalk.red('Please provide an address'))
}else{
    geocode(address, (error, {Name , lat , lon}={}) => {
        if (error) {
            console.log(error);
        } else {
            
            // Call weather with the obtained information from geocode
            weather({lat ,lon}, (error, weatherData) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(chalk.bold.blue('Name:', Name));
                    console.log(chalk.bold.blue('Temperature:', weatherData.temp, '°C'));
                    console.log(chalk.bold.blue('Humidity:', weatherData.humidity));
                }
            });
        }
    });
    

}


