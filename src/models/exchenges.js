const mongoose = require("mongoose");
const moment = require('moment');
const { Schema, model } = require("mongoose");

const exchengeSchema = new Schema({
    empID: {
        type: mongoose.Types.ObjectId
    },
    branch: {
        type: String,
        required: true
    },
    invoice: {
        type: String,
        required: true
    },
    fromCurr: {
        type: String,
        maxLength: 3,
        minLength: 3,
        required: true
    },
    toCurr: {
        type: String,
        maxLength: 3,
        minLength: 3,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    docNum: {
        type: String
    },
    cheque: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    exchangeAmount: {
        type: Number,
        required: true
    },
    // B - buy - покупка
    // S - sell - продажа
    // C - convertion - конвертация
    type: {
        type: String,
        enum: ["B", "S", "C"],
        required: true
    },
    paymentType: {
        type: mongoose.Types.ObjectId,
        // required: true
    },
    terminal: {
        type: mongoose.Types.ObjectId
    },
    paymentTypeName: String,
    terminalName: String,
    toAmountWOround: String,
    cardNumber: {
        type: String
    },
    fee: String,
    // 1 - новый
    // 3 - проведен
    status: {
        type: Number,
        enum: [1, 3,0],
        default: 1
    },
    // Parent_id проводок
    transactionID: String,
    parentInvoice: String,
    calday:{
        type:String,
        default: () => moment().format('YYYY-MM-DD')
       },
    createdAt: {
        type: Number,
        default: () => Date.now()
    },
    masterBranch : {
        type : String
    },
    amountValue: String,
    amountUZS: String,
    buyRate: Number,
    sellRate: Number,
    conBuyRate: Number,
    difference: String,
    feruz:Object,
    feruzDelete:Object,
    feruzRetry:Object,
    internalClientID:String,
    physical:Object,
    populate:Object,
    transactionId : Array,
    redisMsgId:String,
    rabbitMQId:String
});

module.exports = model("Exchenge", exchengeSchema)