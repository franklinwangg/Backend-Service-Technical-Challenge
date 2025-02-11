require('dotenv').config();

const config = {
    db: {
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING || 'postgres://user:password@localhost:5432/mydb',
    },
    openWeather: {
        apiKey: process.env.OPENWEATHER_API_KEY || 'your-default-api-key', 
    },
    app: {
        port: process.env.PORT || 3000, 
    },
    logger: {
        level: process.env.LOG_LEVEL || 'info', 
    },
};

module.exports = config;
