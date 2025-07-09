const mongoose = require("mongoose");
const moment = require('moment');

const { Schema, model } = require("mongoose");
const withdrawLogSchema = new Schema({
  transaction_id: {
    type: String,
    required: true,
  },
  empID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  action: {
    type: Number,
    default: () => Date.now(),
  },
  calday: {
    type: String,
    default: () => moment().format('YYYY-MM-DD')
  },
  masterBranch: {
    type: String,
  }
})

module.exports = model("withdrawLog", withdrawLogSchema)
