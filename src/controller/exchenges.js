const Exchenge = require('../models/exchenges');
const Terminal = require("../models/terminal");
const PaymentType = require("../models/paymentTypeModel");

exports.countAmount = async (req, res) => {
  try {
    const { masterBranch, branch } = req.query;


    const filter = {};
    if (masterBranch) {
      filter.masterBranch = masterBranch;
    }
    if (branch) {
      filter.branch = branch;
    }

    const exchange = await Exchenge.find(filter);

    const exchangeFind = {};

    for (const w of exchange) {
      if (!w.rate || !w.type || !w.paymentType || !w.fromCurr || !w.toCurr) continue;

      const key = `${w.rate}_${w.type}_${w.paymentType}_${w.fromCurr}_${w.toCurr}`;

      if (!exchangeFind[key]) {
        exchangeFind[key] = {
          rate: w.rate,
          type: w.type,
          paymentType: w.paymentType,
          fromCurr: w.fromCurr,
          toCurr: w.toCurr,
          Amount: 0,
          ExchangeAmount: 0,
          count: 0
        };
      }

      exchangeFind[key].Amount += Number(w.amount) || 0;
      exchangeFind[key].ExchangeAmount += Number(w.exchangeAmount) || 0;
      exchangeFind[key].count += 1;
    }

    const result = Object.values(exchangeFind);
    res.status(200).json({
      message: `Exchange count successfully`,
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error counting exchange",
      error: err.message
    });
  }
};


exports.getItems = async (req, res) => {
  try {

    const exchange = await Exchenge.find();
    const terminals = await Terminal.find();
    const paymentTypes = await PaymentType.find();

    const result = exchange.map(item => {
      const terminal = terminals.find(t => t._id.toString() === item.terminal?.toString());
      const payment = paymentTypes.find(p => p._id.toString() === item.paymentType?.toString());

      return {
        ...item.toObject(),
        populate: {
          terminalName: terminal?.name ,
          paymentTypeName: payment?.name 
        }
      };
    });

    res.status(200).json({
      message: "Success",
      data: result
    });

  } catch (err) {
    console.error("Error in getItems:", err);
    res.status(500).json({
      message: "Error loading exchange data",
      error: err.message
    });
  }
};



