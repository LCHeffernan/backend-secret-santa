const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async () => {
  try {
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
          return console.error('Error executing query', err.stack);
        }
        console.log(result.rows);
      });
    });
    console.log('connected');
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

connectDb();
