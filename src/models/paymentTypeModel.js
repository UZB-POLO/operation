const { Schema, model } = require("mongoose");

const paymentTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      enum: ["cash", "non_cash"],
      required: true
    }
  },
  status: {
    type: Number,
    default: 1
  }
});

module.exports = model("PaymentType", paymentTypeSchema);
