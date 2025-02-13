const WeatherController = require('../controllers/weatherController');

// 1) periodically fetch from website
// 2) display database

const queryAtRegularIntervals = async() => {
    const fetchDataFromWebsite = async(req, res) => {

        const {lat, lon} = req.body;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    
        const data = await response.json();
    
        const weatherData = {
            weather: data.weather[0].main,
            lat: data.coord.lat,
            lon: data.coord.lon,
        };
    
        await WeatherController.addWeatherData(weatherData); // created_at?
        res.status(201);
    };
    
    // Run immediately and then every 10 seconds (10,000ms)
    fetchDataFromWebsite();
    setInterval(fetchDataFromWebsite, 10000);
};


const getPreviousWeatherData = async (req, res) => {
    try {
        const result = await WeatherController.getWeatherData(req, res);
        res.status(200).json(result);
    } 
    catch (error) {
        console.error("Error retrieving weather data:", error.message);
        res.status(500).json({ error: "Failed to retrieve weather data" });
    }
};

module.exports = {fetchDataFromWebsite, getPreviousWeatherData};