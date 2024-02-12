//Importing Packages
const path = require('path');   
const express = require('express');
const chalk = require('chalk');

const weather = require('../../utils/weather');
const geocode = require('../../utils/geocode');

/* __________________________________________________________________________________________________________________ */
const app = express();
const PublicDirPath = path.join(__dirname , '../public');

app.use(express.static(PublicDirPath));



app.get('/' , (req , res)=>{

    res.send('Hello Express!')

});
    
app.get('/help' , (req , res)=>{
    res.send('HELP PAGE');
});

app.get('/about' , (req , res)=>{
    res.send('<h1>This is the about page</h1>');
});

app.get('/weather' , (req , res)=>{
    geocode('Cairo', (error, {Name , lat , lon}={}) => {
        if (error) {
            console.log(error);
        } else {
            
            // Call weather with the obtained information from geocode
            weather({lat ,lon}, (error, weatherData) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send({Name, weatherData});
                    console.log(chalk.bold.blue('Name:', Name));
                    console.log(chalk.bold.blue('Temperature:', weatherData.temp, '°C'));
                    console.log(chalk.bold.blue('Humidity:', weatherData.humidity));
                }
            });
        }
    });
});

app.listen(3000 , ()=>{
    console.log('Server is up on port 3000');
});