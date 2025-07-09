const { Schema, model, Types } = require("mongoose");

const accountSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  masterBranch: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true,
    unique: true
  },
  empID: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  in: {
    type: Number,
    default: 0
  },
  out: {
    type: Number,
    default: 0
  },
  out_tmp: {
    type: Number,
    default: 0
  },
  saldo: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 3
  }
});

module.exports = model("Account", accountSchema);
