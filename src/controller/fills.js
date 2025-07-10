const Fills = require('../models/fills');
const User = require('../models/userModel');
const Account = require('../models/accountModel');
const FillLog = require('../models/fillLog');

exports.addItem = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const {
      card,
      invoice,
      tietoID,
      frontID,
      cashID,
      from,
      terminal,
      checkLimit,
      card_acct,
      redisMsgId,
      rabbitMQId,
      currency,
      amount
    } = req.body;

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    const accountDoc = await Account.findOne({ empID: userID, currency });
    if (!accountDoc) {
      return res.status(404).json({ message: "Account not found for this user and currency" });
    }

    const newFill = await Fills.create({
      branch: user.branch,
      masterBranch: user.masterBranch,
      name: user.fullName,
      receiverBranch: user.masterBranch,
      account: accountDoc.account,
      card,
      client: userID,
      currency,
      amount,
      invoice,
      tietoID,
      frontID,
      cashID,
      from,
      terminal,
      checkLimit,
      card_acct,
      redisMsgId,
      rabbitMQId
    });


    await FillLog.create({
      transaction_id: newFill._id,
      empID: userID,
      status: newFill.status,
      masterBranch: user.masterBranch,
    });

    res.status(201).json({
      message: "Fill added successfully",
      fill: newFill
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error while adding fill",
      error: err.message
    });
  }
};


exports.getItems = async (req, res) => {
  try {
    const fills = await Fills.find();

    res.status(200).json({
      message: "Fills fetched successfully",
      fills
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error while fetching fills",
      error: err.message
    });
  }
};


exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedFill = await Fills.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedFill) {
      return res.status(404).json({ message: "Fill not found" });
    }
    await FillLog.create({
      transaction_id: updatedFill._id,
      empID: req.user.id,
      status: updatedFill.status,
      masterBranch: updatedFill.masterBranch,

    });
    res.status(200).json({
      message: "Fill updated successfully",
      fill: updatedFill
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error while updating fill",
      error: err.message
    });
  }
};


exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFill = await Fills.findByIdAndUpdate(id, { status: 0 }, {
      new: true,
      runValidators: true
    });
    if (!deletedFill) {
      return res.status(404).json({ message: "Fill not found" });
    }
    await FillLog.create({
      transaction_id: deletedFill._id,
      empID: req.user.id,
      status: 0,
      masterBranch: deletedFill.masterBranch,
    });
    res.status(200).json({
      message: "Fill deleted successfully (status set to 0)",
      fill: deletedFill
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error while deleting fill",
      error: err.message
    });
  }
};
