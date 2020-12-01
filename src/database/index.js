const { Pool } = require('pg');

const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'my-wallet',
  password: '261218'
});

module.exports = connection;