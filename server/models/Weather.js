// const { Sequelize, DataTypes } = require('sequelize');
// const sequeliz = require('../config/db');  // Import the database connection


const { Sequelize, DataTypes } = require('sequelize');  // Import Sequelize (class)

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'your-username',
    password: 'your-password',
    database: 'your-database-name',
});

const Weather = sequelize.define('Weather', 
{
    weather: {
        type: DataTypes.text,
        allowNull: false,
    }, 
    lat: {
        type: DataTypes.float8,
        allowNull: false,
    }, 
    lon: {
        type: DataTypes.float8,
        allowNull: false,
    }, 
}

, {
    timestamps: true,
    tableName: 'weather_data',
});

Weather.sync()
    .then(() => console.log("Weather table created or already exists"))
    .catch((err) => console.error("Error syncing Weather model:", err));

module.exports = Weather;