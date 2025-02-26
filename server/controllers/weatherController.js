const client = require('../config/db');

// const addWeatherData = async (weatherData) => {
//     try {
//         const { weather, date, temperature, lat, lon } = weatherData;

//         const result = await client.query("INSERT INTO weather_data (weather, lat, lon, date, temperature) VALUES ($1, $2, $3, $4, $5)", [weather, lat, lon, date, temperature]);
//         return result;
//     }
//     catch (error) {
//         if (error.code === '23505') { // MongoDB Duplicate Key Error Code
//             return res.status(500).json({ error: `Error processing weather data: you've already inserted weather data for this time slot.` });

//         } else {
//             return res.status(500).json({error : `Error : ${error}`});
//         }
//     }
// };

const addWeatherData = async (weatherData) => {
    try {
        const { weather, date, temperature, lat, lon } = weatherData;
        const result = await client.query(
            "INSERT INTO weather_data (weather, lat, lon, date, temperature) VALUES ($1, $2, $3, $4, $5)",
            [weather, lat, lon, date, temperature]
        );
        return result;
    } catch (error) {

        if(error.code === "23505") {
            throw new Error("Duplicate entry: Weather data for this time slot already exists. Since this service only adds the current twenty four hours of data, you probably have to wait until tomorrow to collect data again.");
        }
        else {
            throw new Error(`Failed to add weather data: ${error.message}`); // Throw error instead of using res
        }
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