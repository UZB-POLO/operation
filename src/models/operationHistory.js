const mongoose = require('mongoose');
const moment = require('moment');

const operationHistorySchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
    enum: ["00444", "01145"]
  },

  masterBranch: {
    type: String,
    required: true,
  },

  currency: {
    type: String,
    required: true,
    enum: ["000", "840"]
  },

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String
  },

  status: {
    type: Number,
    default: 1
  },

  empID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  paymentType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment_type",
    required: true
  },

  populate: {
    type: mongoose.Schema.Types.Mixed
  },

  account: {
    type: String 
  },

  calday: {
    type: String,
    default: moment().format("YYYY-MM-DD")
  },
}, { timestamps: true });

module.exports = mongoose.model('OperationHistory', operationHistorySchema);
