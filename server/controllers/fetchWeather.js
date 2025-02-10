require('dotenv').config();
const { Client } = require('pg'); // Import pg module

const client = new Client({
    connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
});

client.connect();
    
const fetchWeather = async (req, res) => {

    const {lat, lon} = req.query;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`)

    .then((response) => {
        return response.json();
    })
    .then(async (data) => {
        const {lat, lon} = data.coord;
        const weather = data.weather[0].main;
        const result = await client.query(`INSERT INTO weather (weather, lat, lon) VALUES ($1, $2, $3)`, [weather, lat, lon])
        // INSERT INTO weather (lat, lon) VALUES ($1, $2);

        res.json(result);
    })

};

module.exports = fetchWeather;
// export default fetchWeather