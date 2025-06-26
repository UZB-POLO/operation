const { Schema, model } = require("mongoose");
const moment = require("moment");

const operationModel = new Schema({
  branch: {
    type: String,
    required: true,
    enum: [
      "00444", // Markaz
      "01145"  // Shayxontohur
    ]
  },

  masterBranch: {
    type: String,
    required: true
  },

  currency: {
    type: String,
    required: true,
    enum: [
      "000", // UZS
      "840"  // USD (ehtimol bu USD bo‘lishi kerak, UZD emas)
    ]
  },

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
  },

  status: {
    type: Number,
    default: 1
  },

  paymentType: {
    type: Schema.Types.ObjectId,
    ref: "Payment_type",
    required: true
  },

  populate: {
    type: Object
  },

  calday: {
    type: String,
    default: moment().format("YYYY-MM-DD")
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Operation", operationModel);
