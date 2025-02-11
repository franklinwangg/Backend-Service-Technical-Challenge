// import database
const Weather = require('../models/Weather');  // Import your Sequelize model
const WeatherRepo = require('../repositories/weatherRepo');

const addWeatherData = async(req, res) => {
    const { weather, created_at, lat, lon } = req.body;

    try {
        const newWeatherEntry = await WeatherRepo.addWeatherData({weather, created_at, lat, lon});
        res.status(201).json(newWeatherEntry); 
    } catch (err) {
        console.error('Error inserting weather data:', err.message);
        res.status(500).json({ error: 'Failed to insert weather data' });
    }
};
const getWeatherData = async(req, res) => {
    try {
        const allWeatherData = await WeatherRepo.getWeatherData();
        res.status(200).json(allWeatherData);
    }
    catch(error) {
        console.error("Error getting all previous weather data : ", error.message);
        res.status(500).json({ error: "Failed to retrieve weather data" });
    }
};

module.exports = {addWeatherData, getWeatherData};