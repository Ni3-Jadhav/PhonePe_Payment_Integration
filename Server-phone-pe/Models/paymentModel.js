const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userName: String,

    mobile: String,

    product: String,

    amount: Number,

    transactionID: String,

    paymentStatus: String,

    paymentResponse: Object,


});

const PaymentDB = mongoose.model('paymentDB', paymentSchema);

module.exports = PaymentDB;
