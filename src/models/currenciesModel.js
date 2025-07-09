const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  txt: {
    type: String,
    required: true
  },
  buy: {
    type: Number,
    default: 0
  },
  sell: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Currency', currencySchema);
