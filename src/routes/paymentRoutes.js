const express = require('express');
const { processPayment, capturePayment } = require('../controllers/paymentController');

const router = express.Router();
router.post('/', processPayment);
router.post('/capture', capturePayment);

module.exports = router;
