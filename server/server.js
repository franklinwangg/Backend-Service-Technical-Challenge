// import fetchWeather from "./endpoints/fetchWeather";
const fetchWeather = require('./controllers/fetchWeather');
const cors = require('cors'); // Import the cors package

const express = require("express");
// const { default: fetchWeather } = require("./endpoints/fetchWeather");
const app = express();
const PORT = 3001;

app.use(cors());

app.use("/fetchWeather", fetchWeather);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})