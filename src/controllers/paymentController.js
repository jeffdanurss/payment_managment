const db = require('../config/db');
const PayPal = require('@paypal/checkout-server-sdk');
const connectRabbitMQ = require('../config/rabbitmq');

// paypal client 
const environment = new PayPal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new PayPal.core.PayPalHttpClient(environment);

const processPayment = async (req, res) => {
  const { amount, currency } = req.body;
  if (!amount || !currency) {
    return res.status(400).json({ error: "Faltan datos obligatorios: amount y currency" });
  }

  const request = new PayPal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{ amount: { currency_code: currency, value: amount } }],
  });

  try {
    const order = await client.execute(request);
    console.log('Respuesta de PayPal:', order.result);
    const orderId = order.result.id;

    // Guardar la transacción en MySQL
    db.query(
      'INSERT INTO transactions (orderId, amount, currency, status) VALUES (?, ?, ?, ?)',
      [orderId, amount, currency, 'PENDING'],
      async (err) => {
        if (err) {
          console.error('Error guardando transacción:', err);
          return res.status(500).json({ error: 'Error al guardar la transacción' });
        }

        // Publicar el orderId en RabbitMQ
        try {
          const { channel } = await connectRabbitMQ();
          const message = JSON.stringify({ orderId, amount, currency });
          channel.sendToQueue('notifications', Buffer.from(message));
          console.log('Message sent to RabbitMQ:', message);
        } catch (rabbitError) {
          console.error('Error publishing to RabbitMQ:', rabbitError.message);
          return res.status(500).json({ error: 'Error al publicar en RabbitMQ' });
        }

        // Responder al cliente con el orderId
        res.status(201).json({ orderId });
      }
    );
  } catch (error) {
    console.error('Error en el pago:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};

const capturePayment = async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ error: "Falta el orderId" });
  }

  const request = new PayPal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  try {
    const capture = await client.execute(request);
    db.query(
      'UPDATE transactions SET status = ? WHERE orderId = ?',
      ['COMPLETED', orderId],
      (err) => {
        if (err) {
          console.error('Error actualizando transacción:', err);
          return res.status(500).json({ error: 'Error al actualizar la transacción' });
        }
        res.status(200).json({ message: "Pago capturado con éxito", capture });
      }
    );
  } catch (error) {
    console.error('Error capturando pago:', error);
    res.status(500).json({ error: 'Error al capturar el pago' });
  }
};

module.exports = { processPayment, capturePayment };