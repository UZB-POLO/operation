const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const operationLogSchema = new Schema({
  empID: {
    type: Types.ObjectId,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  masterBranch: {
    type: String,
    required: true,
  },
  
  status: {
    type: Number,
    required: true,
  },
  transaction_id: {
    type: Types.ObjectId,
    required: true,
  }
});



module.exports = model("operationLog", operationLogSchema);
