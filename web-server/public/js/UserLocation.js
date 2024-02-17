function getUserLocation() {
    return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition( (position)=> {
                const userLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                resolve(userLocation);
            },
            (error) => {
                reject('Error getting user location');
            }
        );
    } else {
        reject('Geolocation is not supported by your browser');
    }
});
}


// Function to get weather by user location
async function getWeatherByUserLocation() {
try {
    // Make an asynchronous GET request to your server for weather by user location
    const usersLocation = await getUserLocation();
    console.log(usersLocation);
    const response = await fetch(`/weather?lat=${usersLocation.lat}&lon=${usersLocation.lon}`);
    //const response = await fetch('/weatherbyuserlocation');
    const weatherData = await response.json();

    // Update the UI with the weather data
    document.getElementById('location').innerText = weatherData.location;
    document.getElementById('temperature').innerText = `${weatherData.temp}°C`;
    document.getElementById('windspeed').innerText = `${weatherData.windSpeed} km/h`;
    document.getElementById('winddirection').innerText = `${weatherData.windDirection}`;
} catch (error) {
    console.log(error);
    // Handle errors as needed
}
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', getWeatherByUserLocation);