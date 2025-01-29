const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
    process.exit(1); 
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
