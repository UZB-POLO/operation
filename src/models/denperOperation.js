const mongoose = require('mongoose');
const moment = require('moment');

const denperOperationSChema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency'
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
  }

}, { timestamps: true });
module.exports = mongoose.model('DenperOperation', denperOperationSChema);
