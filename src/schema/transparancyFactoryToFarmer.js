const mongoose = require('mongoose');

const transparencyFactoryToFarmer = new mongoose.Schema({
    farmerId: { type: String, required: true },
    factoryId: { type: String, required: true },
    transactionHash: { type: String, required: true },
    blockNo: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('TransparencyFactoryToFarmer', transparencyFactoryToFarmer);
