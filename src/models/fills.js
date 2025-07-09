const mongoose = require("mongoose");
const moment = require('moment');
const { Schema, model } = require("mongoose");

const fillsSchema = new Schema({
  branch: {
    type: String,
    required: true,
  },
  masterBranch: {
    type: String,
    required: true
  },
  receiverBranch: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  tietoID: {
    type: String,
  },
  frontID: {
    type: String,
  },
  cashID: {
    type: String,
  },
  from: {
    type: String,
  },
  terminal: {
    type: String,
  },
  calday: {
    type: String,
    default: () => moment().format('YYYY-MM-DD')
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  checkLimit: String,
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  card_acct: {
    type: String,
  },
  redisMsgId: String,
  rabbitMQId: String,

})

module.exports = model("Fills", fillsSchema)