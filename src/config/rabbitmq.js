const amqp = require('amqplib');

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('notifications');
    console.log('Connected to RabbitMQ');
    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
    process.exit(1);
  }
};

module.exports = connectRabbitMQ;