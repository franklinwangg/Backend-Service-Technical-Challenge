// const {addWeatherData, getWeatherData} = require("../controllers/weatherController");
// // functionalities : 1) add data to database, 2) retrieve all the data from database
    
// const addWeatherData = async (req, res) => {

// };

// const getWeatherData = async (req, res) => {

// };

// module.exports = fetchWeather;








// import database
const Weather = require('../models/Weather');  // Import your Sequelize model

const addWeatherData = async(weatherData) => {
    try {
        const newWeatherEntry = await Weather.create({
            weather : weatherData.weather, 
            created_at : weatherData.created_at,
            lat : weatherData.lat, 
            lon : weatherData.lon, 
        })

        return newWeatherEntry;
    } catch (err) {
        throw err;
    }
};
const getWeatherData = async() => {
    try {
        const allWeatherData = await Weather.findAll();
        return allWeatherData;
    }
    catch(error) {
        throw error;
    }
};

module.exports = {addWeatherData, getWeatherData};