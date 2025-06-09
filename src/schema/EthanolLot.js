// server/models/EthanolLot.js
const mongoose = require('mongoose');

const ethanolLotSchema = new mongoose.Schema({
  factoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity: Number, // in liters
  pricePerLiter: Number,
  productionDate: Date,
  location: String,
  isSold: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('EthanolLot', ethanolLotSchema);
