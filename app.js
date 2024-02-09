//Importing packages
const request = require('postman-request');
const chalk = require('chalk');
const express = require('express');

//Fetching weather data
const url = 'http://api.weatherapi.com/v1/current.json?key=83ea0460bee84aae82c224123240602&q=Cairo';
request({url: url} , (error , response)=>{
    const data = JSON.parse(response.body);
    if(data.error){
        console.log('ERROR: ' + data.error.message);
    }else{
        
        const current = data.current;
        const temp_in_celcius = current.feelslike_c;
        const humidity = current.humidity;
    
        console.log("The wheather is " + temp_in_celcius + "*C" );
        console.log("The humidity is " + humidity + "%");

    }


});


//Geocoding
const GeoUrl = 'https://geocode.maps.co/search?q=heliopolis&api_key=65c62d1724aef268305324dqi868a64';
request({ url: GeoUrl , rejectUnauthorized: false }, (error, response) => {
    if (error) {
        console.error('Error making the request:', error);
        return;
    }
    else if(response.body){

        const data = JSON.parse(response.body);

        if(data.length == 0){
            console.log('Error: Data empty due to invalid location')
        }else{

            const displayname = data[0].display_name;
            const lat = data[0].lat;
            const lon = data[0].lon;
    
            console.log("Name: " + displayname);
            console.log("Latitude: " + lat);
            console.log("Longitude: " + lon);

        }


        
    }


} );
