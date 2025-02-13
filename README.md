---

### **Payment Microservice**

# Payment Microservice

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/your-username/payment_microservice/ci.yml?branch=main) ![Docker Image Size](https://img.shields.io/docker/image-size/jeffdanurss/payment_microservice/latest) ![License](https://img.shields.io/github/license/your-username/payment_microservice)

> A microservice for handling payment transactions and integrating with external payment gateways.

This microservice processes payments, tracks transactions in MongoDB, and consumes billing events from RabbitMQ to initiate payment workflows.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Deployment](#docker-deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Payment Processing**: Handles payment transactions via an external payment gateway.
- **Transaction Tracking**: Stores payment details in MongoDB for auditing and reporting.
- **RabbitMQ Integration**: Consumes billing events from RabbitMQ to process payments.
- **REST API**: Provides endpoints to initiate and track payments.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/payment_microservice.git
   cd payment_microservice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3002
MONGO_URI=mongodb://root:example@mongodb:27017/payments?authSource=admin
RABBITMQ_URI=amqp://guest:guest@rabbitmq:5672
PAYMENT_GATEWAY_API_KEY=your-payment-gateway-api-key
```

- `PORT`: The port on which the service will run.
- `MONGO_URI`: Connection string for MongoDB.
- `RABBITMQ_URI`: Connection string for RabbitMQ.
- `PAYMENT_GATEWAY_API_KEY`: API key for the external payment gateway.

---

## Usage

### Start the Service Locally

1. Start MongoDB and RabbitMQ (if not already running).
2. Run the service:
   ```bash
   npm start
   ```

The service will start listening on the specified port (default: `3002`).

---

## API Endpoints

### Process a Payment

- **POST** `/payments`
  - **Request Body**:
    ```json
    {
      "invoiceId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "paymentMethod": "credit_card",
      "amount": 100
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Payment processed successfully.",
      "transactionId": "txn_1234567890abcdef"
    }
    ```

---

## Docker Deployment

### Build and Run with Docker Compose

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. Access the service at `http://localhost:3002`.

### Push Docker Image to Docker Hub

1. Build the Docker image:
   ```bash
   docker build -t jeffdanurss/payment_microservice:latest .
   ```

2. Push the image to Docker Hub:
   ```bash
   docker push jeffdanurss/payment_microservice:latest
   ```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please follow the [code of conduct](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
