const { Schema, model, Types } = require("mongoose");

const paymentTypeSchema = new Schema({
  name: {
    type: String,
    enum: ["наличные", "безналичный"],
    required: true
  }
});

module.exports = model("Payment_type", paymentTypeSchema); 
