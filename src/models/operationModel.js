<<<<<<< HEAD
const { Schema, model, Types } = require("mongoose");
=======
const { Schema, model } = require("mongoose");
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
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
<<<<<<< HEAD
    masterBranch: {
        type: String,
        required: true
    },
=======
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
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
<<<<<<< HEAD
    type: {
        type: String,
    },
    status: {
        type: Number,
        default: 1
    },
    paymentType: {
        type: Schema.Types.ObjectId,
        ref: "Payment_type",
        required: true
      },
      
    populate: {
        type: Object
    },
    calday: {
        type: String,
        default: moment().format("YYYY-MM-DD")
=======
    calday:{
        type: String,
        default: moment ().format("YYYY-MM-DD")
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

<<<<<<< HEAD

=======
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
module.exports = model("Operation", operationModel);
