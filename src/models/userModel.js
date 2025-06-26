const mongoose = require('mongoose');
const moment = require("moment");

const userSchema = new mongoose.Schema({
  ID: {
    type: Number
  },
  branch: {
    type: String,
    required: true
  },
  masterBranch: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 1
  },
  calday: {
    type: String,
    default: moment().format("YYYY-MM-DD")
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  loginAt: {
    type: Date,
    default: Date.now
  }
});


userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const last = await this.constructor.findOne().sort({ ID: -1 }).lean();
    this.ID = last?.ID ? last.ID + 1 : 1;
  }
  next();
});
module.exports = mongoose.model('User', userSchema);
