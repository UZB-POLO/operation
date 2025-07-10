const User = require('../models/userModel')
const Account = require('../models/accountModel');
const PaymentType = require('../models/paymentTypeModel');
const Operation = require('../models/denperOperation')
const OperationLog = require('../models/denperOperationLog');
const currenciesModel = require('../models/currenciesModel');


exports.addItem = async (req, res) => {
  try {

    const { id: userID } = req.user;
    const { amount, type, paymentType } = req.body;
    const latestAccount = await Account.findOne()

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
}