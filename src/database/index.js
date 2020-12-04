const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = { connectionString: process.env.DATABASE_URL };
const connection = new Pool(dbConfig);

module.exports = connection;

// const connection = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   database: 'my-wallet',
//   password: '261218'
// });