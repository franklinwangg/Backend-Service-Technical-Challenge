const client = require('../config/db');

const addWeatherData = async (weatherData) => {
    try {
        // const { weather, lat, lon } = req.body;
        const { weather, lat, lon } = weatherData;  // Destructure lat and lon from the body of the request

        // console.log("req : ", req);
        // console.log("req.weather : ", req.weather);

        const result = await client.query("INSERT INTO weather_data (weather, lat, lon) VALUES ($1, $2, $3)", [weather, lat, lon]);
        console.log("result : ", result);
        
    }
    catch (error) {
        console.error('Error inserting weather data:', error.message);
    }
};
const getWeatherData = async (req, res) => {
    try {
        const res = await client.query("SELECT * FROM weather_data");
        const allWeatherData = res.rows;
        res.status(200).json(allWeatherData);
    }
    catch (error) {
        console.error("Error getting all previous weather data : ", error.message);
        res.status(500).json({ error: "Failed to retrieve weather data" });
    }
};

module.exports = { addWeatherData, getWeatherData };