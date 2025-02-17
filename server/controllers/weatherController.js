const client = require('../config/db');

const addWeatherData = async (weatherData) => {
    try {
        const { weather, date, temperature, lat, lon } = weatherData;

        const result = await client.query("INSERT INTO weather_data (weather, lat, lon, date, temperature) VALUES ($1, $2, $3, $4, $5)", [weather, lat, lon, date, temperature]);
        return result;
    }
    catch (error) {
        if (error.code === '23505') { // MongoDB Duplicate Key Error Code
            throw new Error("You've already inserted weather data for this time slot.");

        } else {
            throw new Error("Failed to add weather data : ", error.message);
        }
        return res.status(500);
    }
};
const getWeatherData = async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM weather_data");
        const allWeatherData = result.rows;
        res.status(200).json(allWeatherData);
    }
    catch (error) {
        res.status(500).json({ error: "getweatherdata failed" });
    }
};

module.exports = { addWeatherData, getWeatherData };