const mongoose = require("mongoose");
const moment = require('moment');

const { Schema, model } = require("mongoose");

const withdrawSchema = new Schema({
    terminal: {
        type: String,
        required: true,
    },
    masterBranch: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    receipt: {
        type: String,
        required: true,
    },
    invoice: String,
    empID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    parentInvoice: String,
    parentSumma: Number,
    status: {
        type: Number,
        default: 1,
    },
    calday: {
        type: String,
        default: () => moment().format('YYYY-MM-DD')
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    transaction: Array,
    redisMsgId: String,
    physical: Object,
    cardNumber: String,
    otherBankName: String
})

module.exports = model("Withdraw", withdrawSchema)