const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    factoryId: { type: String, required: true },
    farmerId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentId: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', TransactionSchema);

