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
const createTableQuery = `
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
console.log('Intentando crear la tabla `transactions`...');
connection.query(createTableQuery, (err) => {
if (err) {
  console.error('Error creando la tabla `transactions`:', err.message);
} else {
  console.log('Tabla `transactions` creada o ya existe');
}
});


module.exports = connection;
