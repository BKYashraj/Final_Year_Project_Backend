const mongoose = require('mongoose');

const transparencyDistributorToFactory = new mongoose.Schema({
    distributorId: { type: String, required: true },
    factoryId: { type: String, required: true },
    transactionHash: { type: String, required: true },
    blockNo: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('TransparencyDistributorToFactory', transparencyDistributorToFactory);