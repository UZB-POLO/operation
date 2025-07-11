const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const terminalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  currency: {
    type: Array,
    required: true
  }
});

terminalSchema.pre('save', function (next) {
  next();
});

module.exports = model("terminal", terminalSchema, "terminal");
