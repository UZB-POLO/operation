const Operation = require('../models/operationModel')
const User = require('../models/userModel');
const Account = require('../models/accountModel');
const OperationLog = require('../models/operationLogModel');
const PaymentType = require('../models/paymentTypeModel');
const OperationHistory = require('../models/operationHistory');
const moment = require('moment');



exports.getItems = async (req, res) => {
  try {

    let operations = await Operation.find()

    let result = [];
    for (let i = 0; i < operations.length; i++) {
      const element = operations[i];
      const { name } = await PaymentType.findById(element.paymentType)
      result.push({
        ...element.toObject(),
        populate: {
          paymentName: name
        }
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getPrint = async (req, res) => {
  try {
    let operations = await Operation.findById(req.params.id);
    if (operations.status != 3) {
      throw new Error("Status 1 or 2");
    }
    let account = await Account.findOne({ empID: operations.empID, currency: operations.currency });
    const { id: userID } = req.user;
    const user = await User.findById(userID);
    const payload = { user, operations, account }
    const check = await require("../templates/zayavleniya")(payload)
    res.send(check)
  } catch (err) {
    res.status(500).json({ message: "Get accounts failed", error: err.message });
  }
};


exports.getByMasterBranch = async (req, res) => {
  try {
 
    const masterBranch = req.query.masterBranch;
    const calday = req.query.calday;

    if (!masterBranch || !calday) {
      return res.status(400).json({ message: "masterBranch or calday not found" });
    }

    const today = moment().format("YYYY-MM-DD");
    const query = { masterBranch, calday };


    const SourceModel = calday === today ? Operation : OperationHistory;

    const operations = await SourceModel.find(query);

    if (!operations || operations.length === 0) {
      return res.status(404).json({ message: "Operation not found", query });
    }
    if (calday === today) {
      await Promise.all(
        operations.map(async (op) => {
          const exists = await OperationHistory.findOne({ operationID: op._id });

          if (!exists) {

            await OperationHistory.create({
              ...op.toObject(),
              _id: undefined,
              operationID: op._id,
              changedBy: req.user.id,
              changeType: 'read'
            });


            await Operation.findByIdAndDelete(op._id);
          }
        })
      );
    }


    return res.status(200).json({ message: "Success", data: operations });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.createOperation = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const { currency, amount, type, paymentType } = req.body;
    const latestAccount = await Account.findOne({ empID: userID, currency })

    const latestAccountCode = latestAccount?.account || null;
   
    
    if (!latestAccountCode) {
      return res.status(404).json({ message: "No account found" });
    }
    const accountt = latestAccountCode

    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const paymentTypeDoc = await PaymentType.findById(paymentType);
      if (!paymentTypeDoc) {
        res.status(400).json({ message: "Invalid paymentType ID" });
      } else {

        const operation = await Operation.create({
          branch: user.branch,
          masterBranch: user.masterBranch,
          empID: userID,
          currency,
          amount,
          account: accountt,
          type,
          status: 1,
          paymentType: paymentTypeDoc._id,
        });

        const populatedOperation = await Operation.findById(operation._id)
          .populate({ path: 'paymentType', select: 'name -_id' })
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
      }
    }
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
      res.status(400).json({ message: "Invalid operation ID format" });
    } else {
      const operation = await Operation.findById(operationID);
      if (!operation) {
        res.status(404).json({ message: "Operation not found" });
      } else if (operation.status !== 1) {
        res.status(400).json({ message: "Only operations with status 1 can be approved" });
      } else {
        const account = await Account.findOne({
          empID: user.id,
          currency: operation.currency
        });

        if (!account) {
          res.status(404).json({ message: "Account not found" });
        } else if (operation.type === 'R' && account.saldo < operation.amount) {
          res.status(400).json({ message: "Not enough balance" });
        } else {
          if (operation.type === 'P') {
            account.in += operation.amount;
            account.saldo += operation.amount;
          } else if (operation.type === 'R') {
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
            data: { operation, account, operationLog }
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    const operation = await Operation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!operation) {
      res.status(404).json({ message: "Operation not found" });
    } else {
      res.json(operation);
    }
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    const { id: operationID } = req.params;
    const user = req.user;

    const operation = await Operation.findById(operationID).populate('paymentType');
    if (!operation) {
      res.status(404).json({ message: "Operation not found" });
    } else if (operation.status === 1) {
      operation.status = 0;
      await operation.save();
      res.json({ message: "Operation marked as deleted (status 0)" });
    } else if (operation.status === 3) {
      const paymentTypeName = operation.paymentType?.name?.toLowerCase();

      if (paymentTypeName === 'безналичный') {
        operation.status = 0;
        await operation.save();
        res.json({ message: "безналичный operation cancelled (status 0)" });
      } else if (paymentTypeName === 'наличные') {
        const account = await Account.findOne({
          empID: user.id,
          currency: operation.currency
        });

        if (!account) {
          res.status(404).json({ message: "Account not found" });

        }
        else if (operation.type === 'R' && account.saldo < operation.amount) {
          res.status(400).json({ message: "Not enough balance" });
        }
        else {
          if (operation.type === 'R') {
            account.out -= operation.amount;
            account.saldo += operation.amount;
          } else if (operation.type === 'P') {
            account.in -= operation.amount;
            account.saldo -= operation.amount;
          }

          operation.status = 0;

          await account.save();
          await operation.save();

          res.json({ message: "Cash operation reversed and marked as deleted (status 0)" });
        }
      } else {
        res.status(400).json({ message: "Unknown payment type" });
      }
    } else {
      res.status(400).json({ message: "Operation cannot be deleted in its current state" });
    }
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

