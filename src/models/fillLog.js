const mongoose = require("mongoose");
const moment = require('moment');

const { Schema, model } = require("mongoose");
const fillLogSchema = new Schema({
  transaction_id: {
    type: mongoose.Types.ObjectId,
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

module.exports = model("FillLog", fillLogSchema)
