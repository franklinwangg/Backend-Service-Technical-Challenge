require('dotenv').config();
const { Client } = require('pg'); // Import pg module

const client = new Client({
    connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
});

client.connect();
    
const fetchDatabase = async (req, res) => {

    const result = await client.query("SELECT * FROM weather");
    return result.rows;
};

module.exports = fetchDatabase;
