const mongoose = require('mongoose');

const transparencyFactoryToFarmer = new mongoose.Schema({
    farmerId: { type: String },
    factoryId: { type: String },
    transactionHash: { type: String },
    blockNo: { type: String },
    amount: { type: Number },
    status: { type: String, default: 'Pending' },  // Example: "Successful", "Failed"
    paymentId: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('TransparencyFactoryToFarmer', transparencyFactoryToFarmer);
