// // require('dotenv').config();
// // const { Client } = require('pg'); // Import pg module

// // const client = new Client({
// //     connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
// // });

// // client.connect();

// // module.exports = client;

// require('dotenv').config(); // Load environment variables
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.POSTGRESQL_CONNECTION_STRING, {
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,  // Supabase requires SSL
//             rejectUnauthorized: false,
//         },
//     },
//     pool: {
//         max: 10, // Max connections in the pool
//         min: 2,  // Min connections in the pool
//         acquire: 30000, // Max time (ms) a connection can be idle before being released
//         idle: 10000,
//     },
//     logging: false,  // Disable logging SQL queries

// });

// module.exports = sequelize;


require('dotenv').config();
const { Client } = require('pg'); // Import pg module

const client = new Client({
    connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false, // Required for cloud-based databases like Supabase
    },
});

client.connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch(err => console.error("Database connection error:", err));

module.exports = client;
