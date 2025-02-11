require('dotenv').config();
const { Client } = require('pg'); // Import pg module

const client = new Client({
    connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
});

client.connect();

module.exports = client;