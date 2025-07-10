const Withdraw = require('../models/withdraw');
const User = require('../models/userModel');
const Account = require('../models/accountModel');
const WithdrawLog = require('../models/withdrawLog');


exports.addItem = async (req, res) => {
    try {
        const { id: userID } = req.user;
        const { terminal, currency, amount, receipt, invoice, purpose } = req.body;

        const user = await User.findById(userID);
        if (!user) return res.status(404).json({ message: "User not found" });

        const accountDoc = await Account.findOne({ empID: userID, currency });
        if (!accountDoc) return res.status(404).json({ message: "Account not found for this user and currency" });

        const newWithdraw = await Withdraw.create({
            terminal,
            masterBranch: user.masterBranch,
            currency,
            amount,
            receipt,
            invoice,
            empID: userID,
            purpose,
            branch: user.branch,
        });

        await WithdrawLog.create({
            transaction_id: newWithdraw._id,
            withdrawID: newWithdraw._id,
            empID: userID,
            status: newWithdraw.status,
        });

        res.status(201).json({
            message: "Withdraw created successfully",
            withdraw: newWithdraw
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error while creating withdraw", error: err.message });
    }
};


exports.getItems = async (req, res) => {
    try {
        const withdraws = await Withdraw.find();
        res.status(200).json({ message: "Withdraws fetched successfully", withdraws });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error while fetching withdraws", error: err.message });
    }
};


exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedWithdraw = await Withdraw.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        if (!updatedWithdraw) {
            return res.status(404).json({ message: "Withdraw not found" });
        }

        await WithdrawLog.create({
            transaction_id: updatedWithdraw._id,
            empID: req.user.id,
            status: updatedWithdraw.status,
            masterBranch: updatedWithdraw.masterBranch,
        });

        res.status(200).json({
            message: "Withdraw updated successfully",
            withdraw: updatedWithdraw
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error while updating withdraw",
            error: err.message
        });
    }
};


exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const oldWithdraw = await Withdraw.findById(id);
        const deletedWithdraw = await Withdraw.findByIdAndUpdate(id, { status: 0 }, {
            new: true,
            runValidators: true
        });

        if (!deletedWithdraw) return res.status(404).json({ message: "Withdraw not found" });


        await WithdrawLog.create({
            transaction_id: deletedWithdraw._id,
            empID: req.user.id,
            status: 0,
            masterBranch: deletedWithdraw.masterBranch,
        });

        res.status(200).json({
            message: "Withdraw deleted successfully (status set to 0)",
            withdraw: deletedWithdraw
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error while deleting withdraw", error: err.message });
    }
};


exports.groupedWithdrawStats = async (req, res) => {
    try {
        const withdraws = await Withdraw.find();

        const grouped = {};

        for (const w of withdraws) {
            if (!w.terminal || !w.currency) continue;

            const key = `${w.terminal}_${w.currency}`;

            if (!grouped[key]) {
                grouped[key] = {
                    terminal: w.terminal,
                    currency: w.currency,
                    totalAmount: 0,
                    count: 0
                };
            }

            grouped[key].totalAmount += Number(w.amount) || 0;
            grouped[key].count += 1;
        }

        const result = Object.values(grouped);

        res.status(200).json({
            message: "Withdraws count successfully",
            data: result
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error count withdraws",
            error: err.message
        });
    }
};


