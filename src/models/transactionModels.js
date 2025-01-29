const db = require('../config/db');

const TransactionModel = {
  createTransaction: (orderId, amount, currency, status, callback) => {
    const query = `INSERT INTO transactions (orderId, amount, currency, status) VALUES (?, ?, ?, ?)`;
    db.query(query, [orderId, amount, currency, status], callback);
  },

  updateTransactionStatus: (orderId, status, callback) => {
    const query = `UPDATE transactions SET status = ? WHERE orderId = ?`;
    db.query(query, [status, orderId], callback);
  },

  getTransactionByOrderId: (orderId, callback) => {
    const query = `SELECT * FROM transactions WHERE orderId = ?`;
    db.query(query, [orderId], callback);
  },

  getAllTransactions: (callback) => {
    const query = `SELECT * FROM transactions`;
    db.query(query, callback);
  },
};

module.exports = TransactionModel;
