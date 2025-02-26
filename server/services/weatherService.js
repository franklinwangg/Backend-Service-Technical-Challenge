const WeatherController = require('../controllers/weatherController');

// 1) periodically fetch from website
// 2) display database

const fetchWeather = async (req, res) => {
    const { lat, lon } = req.body;
    const cnt = 8;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${process.env.OPEN_WEATHER_API_KEY}`);

    const data = await response.json();

    for (let i = 0; i < data["list"].length; i++) {

        try {

            const date = new Date(data["list"][i]["dt"] * 1000);
    
            const hours = date.getUTCHours();
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();
            const year = date.getUTCFullYear();
    
            const formattedTime = `${hours}:${minutes}`;
            const formattedDate = `${month}/${day}/${year}`;
    
            const dateString = `${formattedTime}, ${formattedDate}`;
    
            const temperature = data["list"][i]["main"]["temp"];
            const weather = data.list[0].weather[0].main;
    
            const weatherData = {
                weather: weather,
                date: dateString,
                temperature: temperature,
                lat: lat,
                lon: lon,
            }
    
            const result = await WeatherController.addWeatherData(weatherData); // created_at?
            if(result == False) {
                break;
            }
        }
        catch(error) {
            return res.status(500).json({error : `Error : ${error}`});

        }
    }

    res.status(201);

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

module.exports = { fetchWeather, getPreviousWeatherData };