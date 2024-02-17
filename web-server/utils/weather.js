const request = require('postman-request');

const weather = (info) => {
    return new Promise((resolve, reject) => {
        const lat = encodeURIComponent(info.lat);
        const lon = encodeURIComponent(info.lon);
        const url = 'http://api.weatherapi.com/v1/current.json?key=83ea0460bee84aae82c224123240602&q=' + lat + ',' + lon;

        request({ url: url }, (error, response) => {
            if (error) {
                reject('Error');
            } else {
                const data = JSON.parse(response.body);
                const location = data.location;
                const country = location.country;
                const current = data.current;
                const temp_in_celcius = current.feelslike_c;
                const humidity = current.humidity;
                const windspeed = current.wind_kph;
                const windDirection = current.wind_dir;

                const returned_data = {
                    location: country,
                    temp: temp_in_celcius,
                    humidity: humidity,
                    windSpeed: windspeed,
                    windDirection: windDirection
                };

                resolve(returned_data);
            }
        });
    });
};

const weatherbylocation = (location) => {
    return new Promise((resolve, reject) => {
        const loc = encodeURIComponent(location.location);
        const url = 'http://api.weatherapi.com/v1/current.json?key=83ea0460bee84aae82c224123240602&q=' + loc;

        request({ url: url }, (error, response) => {
            if (error) {
                reject('Error');
            } else {
                const data = JSON.parse(response.body);
                if(data.error){
                    reject('Invalid Location')

                }else{
                    const location = data.location;
                    const country = location.country;
                    const current = data.current;
                    const temp_in_celcius = current.feelslike_c;
                    const humidity = current.humidity;
                    const windspeed = current.wind_kph;
                    const windDirection = current.wind_dir;
    
                    const returned_data = {
                        location: country,
                        temp: temp_in_celcius,
                        humidity: humidity,
                        windSpeed: windspeed,
                        windDirection: windDirection
                    };
    
                    resolve(returned_data);

                }

            }
        });
    });
};


module.exports = {
    weather,
    weatherbylocation,
}





/* 




const weather = (info, callback)=>{
    const lat = encodeURIComponent(info.lat);
    const lon = encodeURIComponent(info.lon);
    const url = 'http://api.weatherapi.com/v1/current.json?key=83ea0460bee84aae82c224123240602&q='+ lat + ',' + lon ;
    request({url: url } , (error , response)=>{
        const data = JSON.parse(response.body);
        if(error){
            callback('Error ', undefined);
        }else{
            const location = data.location;
            const country = location.country
            const current = data.current;
            const temp_in_celcius = current.feelslike_c;
            const humidity = current.humidity;
            const windspeed = current.wind_kph ;
            const windDirection = current.wind_dir;

            const returned_data ={
                location: country,
                temp: temp_in_celcius,
                humidity: humidity,
                windSpeed: windspeed,
                windDirection: windDirection
            }
            callback(undefined , returned_data);
        }
    });


}




*/