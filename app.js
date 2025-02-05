const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const paymentRoutes = require('./src/routes/paymentRoutes');
const db = require('./src/config/db');


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use('/payments', paymentRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Servicio de pagos corriendo en el puerto ${PORT}`);
});

module.exports = app;
