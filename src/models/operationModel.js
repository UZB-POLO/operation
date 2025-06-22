const { Schema, model } = require("mongoose");
const moment = require("moment");

const operationModel = new Schema({
    branch: {
        type: String,
        required: true,
        enum: [
            "00444", // Markaz,
            "01145" // Shayxontohur,
        ]
    },
    currency: {
        type: String,
        required: true,
        enum: [
            "000", // UZS,
            "840", // UZD,
        ]
    },
    amount: {
        type: Number,
        required: true
    },
    calday:{
        type: String,
        default: moment ().format("YYYY-MM-DD")
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = model("Operation", operationModel);
