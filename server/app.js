// import fetchWeather from "./endpoints/fetchWeather";
// const fetchWeather = require('../OLD_CODE/fetchWeather');
const cors = require('cors'); // Import the cors package
const cli = require("./cli");
const weatherService = require("./services/weatherService");

const express = require("express");
// const { default: fetchWeather } = require("./endpoints/fetchWeather");
const app = express();
const PORT = 3001;

app.use(cors());

// app.use("/fetchWeather", fetchWeather);
app.use(express.json());

app.post('/fetch-weather', async (req, res) => {
    try {
        await weatherService.fetchWeather(req, res); // Call the weather service function
    } catch (error) {
        res.status(500).json({ error: '/fetch-weather endpoint failed' });
    }
});

app.get('/get-weather', async (req, res) => {
    try {
        await weatherService.getPreviousWeatherData(req, res); // Call the weather service function
    } catch (error) {
        res.status(500).json({ error: 'Failed to get weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
    cli.startCLI();
    
});