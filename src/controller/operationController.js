const Operation = require('../models/operationModel');
const User = require('../models/userModel');
const Account = require('../models/accountModel');
const OperationLog = require('../models/operationLogModel');
const PaymentType = require('../models/paymentTypeModel');

exports.getItems = async (req, res) => {
  try {
    let operations = await Operation.find()
      .populate('paymentType', 'name')
      .lean();
    operations = operations.map(op => {
      if (op?.paymentType?.name) {
        op.paymentType = op.paymentType.name;
      }
      return op;
    });

    res.json(operations);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.createOperation = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const { currency, amount, type, paymentType } = req.body;

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    const paymentTypeDoc = await PaymentType.findById(paymentType);
    if (!paymentTypeDoc) {
      return res.status(400).json({ message: "Invalid paymentType ID" });
    }

    const operation = await Operation.create({
      branch: user.branch,
      masterBranch: user.masterBranch,
      empID: userID,
      currency,
      amount,
      type,
      status: 1,
      paymentType: paymentTypeDoc._id,
    });

    const populatedOperation = await Operation.findById(operation._id)
  .populate('paymentType', 'name')
  .lean();

if (populatedOperation?.paymentType?.name) {
  populatedOperation.paymentType = populatedOperation.paymentType.name;
}


    const operationLog = await OperationLog.create({
      empID: userID,
      branch: operation.branch,
      masterBranch: operation.masterBranch,
      status: operation.status,
      transaction_id: operation._id,
    });

    res.status(201).json({
      message: "Operation created and processed successfully",
      data: { operation: populatedOperation, operationLog },
    });

  } catch (err) {
    res.status(500).json({
      message: "Operation failed",
      error: err.message,
    });
  }
};

exports.addApprove = async (req, res) => {
  try {
    const { id: operationID } = req.params;
    const user = req.user;

    if (!operationID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid operation ID format" });
    }

    const operation = await Operation.findById(operationID);
    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }

    if (operation.status !== 1) {
      return res.status(400).json({ message: "Only operations with status 1 can be approved" });
    }

    const account = await Account.findOne({
      empID: user.id,
      currency: operation.currency
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (operation.type === 'R' && account.saldo < operation.amount) {
      return res.status(400).json({ message: "Not enough balance" });
    }

    if (operation.type === 'P') {
      account.in += operation.amount;
      account.saldo += operation.amount;
    }

    if (operation.type === 'R') {
      account.out += operation.amount;
      account.saldo -= operation.amount;
    }

    operation.status = 3;

    await account.save();
    await operation.save();

    const operationLog = await OperationLog.create({
      empID: user.id,
      branch: operation.branch,
      masterBranch: operation.masterBranch,
      status: 3,
      transaction_id: String(operation._id),
    });

    res.status(200).json({
      message: "Operation approved successfully",
      data: {
        operation,
        account,
        operationLog
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const operation = await Operation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!operation) return res.status(404).json({ message: "Operation not found" });
    res.json(operation);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};



exports.remove = async (req, res) => {
  try {
    const { id: operationID } = req.params;
    const user = req.user;

    const operation = await Operation.findById(operationID).populate('paymentType');
    if (!operation) return res.status(404).json({ message: "Operation not found" });

   
    if (operation.status === 1) {
      operation.status = 0;
      await operation.save();
      return res.json({ message: "Operation marked as deleted (status 0)" });
    }

   
    if (operation.status === 3) {
      const paymentTypeName = operation.paymentType?.name?.toLowerCase();

      if (paymentTypeName === 'безналичный') {
        operation.status = 0;
        await operation.save();
        return res.json({ message: "безналичный operation cancelled (status 0)" });
      }

      if (paymentTypeName === 'наличные') {
        const account = await Account.findOne({
          empID: user.id,
          currency: operation.currency
        });

        if (!account) {
          return res.status(404).json({ message: "Account not found" });
        }

        if (operation.type === 'P') {
          account.out -= operation.amount;
          account.saldo += operation.amount;
        }

        if (operation.type === 'R') {
          account.in -= operation.amount;
          account.saldo -= operation.amount;
        }

        operation.status = 0;

        await account.save();
        await operation.save();

        return res.json({ message: "Cash operation reversed and marked as deleted (status 0)" });
      }

      return res.status(400).json({ message: "Unknown payment type" });
    }

    res.status(400).json({ message: "Operation cannot be deleted in its current state" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
