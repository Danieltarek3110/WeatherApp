const request = require('postman-request');

/*___________________________________________________________________________________________________________________________________ */

const geocode = (address , callback)=>{
    const GeoUrl = 'https://geocode.maps.co/search?q='+ encodeURIComponent(address) + '&api_key=65c62d1724aef268305324dqi868a64';
    request({url: GeoUrl , rejectUnauthorized: false} , (error , response)=>{
        if(error){
            callback('Unable to connect to location services' , undefined);
        }else if(response.body){
            const data = JSON.parse(response.body);
            if(data.length === 0){
                callback('Data empty due to invalid location' , undefined);
            }else{
                const info = {
                    Name: data[0].display_name,
                    lat: data[0].lat,
                    lon: data[0].lon
                }
                callback(undefined , info);
            }
        }
    });
}

module.exports = geocode