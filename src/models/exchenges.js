const mongoose = require("mongoose");
const moment = require("moment");
const { Schema, model } = mongoose;

const exchengeSchema = new Schema({
  empID: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  branch: { type: String, required: true },
  invoice: { type: String, required: true },
  fromCurr: { type: String, required: true, minlength: 3, maxlength: 3 },
  toCurr: { type: String, required: true, minlength: 3, maxlength: 3 },
  rate: { type: Number, required: true },
  docNum: String,
  cheque: String,
  amount: { type: Number, required: true },
  exchangeAmount: { type: Number, required: true },
  type: { type: String, enum: ["B", "S", "C"], required: true },
  paymentType: {
    type: mongoose.Types.ObjectId,
    ref: "PaymentType"
  },
  terminal: {
    type: mongoose.Types.ObjectId,
    ref: "Terminal" 
  },
  paymentTypeName: String,
  terminalName: String,
  toAmountWOround: String,
  cardNumber: String,
  fee: String,
  status: { type: Number, enum: [0, 1, 3], default: 1 },
  transactionID: String,
  parentInvoice: String,
  calday: {
    type: String,
    default: () => moment().format("YYYY-MM-DD")
  },
  createdAt: {
    type: Number,
    default: () => Date.now()
  },
  masterBranch: String,
  amountValue: String,
  amountUZS: String,
  buyRate: Number,
  sellRate: Number,
  conBuyRate: Number,
  difference: String,
  feruz: Object,
  feruzDelete: Object,
  feruzRetry: Object,
  internalClientID: String,
  physical: Object,
  populate: Object,
  transactionId: [String],
  redisMsgId: String,
  rabbitMQId: String
});

module.exports = model("Exchenge", exchengeSchema);
