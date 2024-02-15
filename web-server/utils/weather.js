const request = require('postman-request');

const weather = (info, callback)=>{
    const lat = encodeURIComponent(info.lat);
    const lon = encodeURIComponent(info.lon);
    const url = 'http://api.weatherapi.com/v1/current.json?key=83ea0460bee84aae82c224123240602&q='+ lat + ',' + lon ;
    request({url: url } , (error , response)=>{
        const data = JSON.parse(response.body);
        if(error){
            callback('Error ', undefined);
        }else{
            const current = data.current;
            const temp_in_celcius = current.feelslike_c;
            const humidity = current.humidity;

            const returned_data ={
                temp: temp_in_celcius,
                humidity: humidity
            }
            callback(undefined , returned_data);
        }
    });
}

module.exports = weather;