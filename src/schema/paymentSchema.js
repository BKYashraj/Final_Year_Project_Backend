const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farmer'   
    },
     factoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Factory' },
});

module.exports = model('Payment', PaymentSchema);
