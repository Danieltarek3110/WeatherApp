//Importing Packages
const path = require('path');   
const express = require('express');
const chalk = require('chalk');
const hbs  = require('hbs');

const weather = require('../utils/weather');
const geocode = require('../utils/geocode');

/* __________________________________________________________________________________________________________________ */
const app = express();

//Define paths for Express config
const PublicDirPath = path.join(__dirname , '../public');
const ViewsPath = path.join(__dirname , '../templates/views');
const partialsPath = path.join(__dirname , '../templates/partials');


//Setup handlebars and views location
app.set('view engine' , 'hbs'); 
app.set('views' , ViewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(PublicDirPath));




app.get('' , (req , res)=>{
    res.render('index');

});
app.get('/news' , (req , res)=>{
    res.render('news');

});

app.get('/live' , (req , res)=>{
    res.render('live');

});

app.get('/aboutus' , (req , res)=>{
    res.render('aboutus');

});

app.get('/contact' , (req , res)=>{
    res.render('contact');

});


    
app.get('/help' , (req , res)=>{
    res.send('HELP PAGE');
});

app.get('/weather' , (req , res)=>{

    if(!req.query.search){
        return res.send({
            error: 'Please enter an address to search for'
        });
    }
    geocode( req.query.search , (error, {Name , lat , lon}={}) => {
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

app.get('/help/*' , (req , res) => {
    res.send('Help article not found');
})

app.get('*' , (req, res)=>{
        res.render('404');
})

app.listen(3000 , ()=>{
    console.log('Server is up on port 3000');
});




