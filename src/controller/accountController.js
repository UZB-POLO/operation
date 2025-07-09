const Account = require('../models/accountModel');
const User = require('../models/userModel');


exports.addAccount = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const { currency } = req.body;

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    const accountCode = `${user.branch}:${currency}:${user.ID}`;


    const exists = await Account.findOne({ account: accountCode });
    if (exists) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const newAccount = await Account.create({
      branch: user.branch,
      masterBranch: user.masterBranch,
      currency,
      account: accountCode,
      empID: userID,
      in: 0,
      out: 0,
      out_tmp: 0,
      saldo: 0,
      status: 3
    });

    res.status(201).json({
      message: "Account created successfully",
      account: newAccount
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Account creation error",
      error: err.message
    });
  }
};


exports.getByEmpIdAccounts = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const accounts = await Account.find({ empID: userID });
    res.status(200).json({
      message: "Accounts fetched successfully",
      data: accounts
    });
  } catch (err) {
    res.status(500).json({ message: "Get accounts failed", error: err.message });
  }
};


exports.getAccounts = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const accounts = await Account.find();
    res.status(200).json({
      message: "Accounts fetched successfully",
      data: accounts
    });
  } catch (err) {
    res.status(500).json({ message: "Get accounts failed", error: err.message });
  }
};
