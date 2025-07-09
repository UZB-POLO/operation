const Currency = require('../models/currenciesModel');


exports.addItem = async (req, res) => {
    try {
        const { currencies } = req.body;
    
        if (!Array.isArray(currencies) || currencies.length === 0) {
          return res.status(400).json({ message: "No currencies provided" });
        }
    
        const existingCodes = await Currency.find({
          code: { $in: currencies.map(c => c.code) }
        });
    
        const existingCodeSet = new Set(existingCodes.map(c => c.code));
        const filtered = currencies.filter(c => !existingCodeSet.has(c.code));
    
        if (filtered.length === 0) {
          return res.status(400).json({ message: "All currencies already exist" });
        }
    
        const inserted = await Currency.insertMany(filtered);
    
        res.status(201).json({
          message: "Currencies successfully added",
          data: inserted
        });
      } catch (err) {
        res.status(500).json({
          message: "Failed to add currencies",
          error: err.message
        });
      }
    };


    exports.getItems  = async (req, res) => {
      try {
        const currencies = await Currency.find();
    
        res.status(200).json({
          message: "Currencies fetched successfully",
          data: currencies
        });
      } catch (err) {
        res.status(500).json({
          message: "Failed to fetch currencies",
          error: err.message
        });
      }
    };
  
    
    exports.updateItem = async (req, res) => {
      try {
        const { code, buy, sell } = req.body;
    
        const currency = await Currency.findOne({ code });
        if (!currency) {
          return res.status(404).json({ message: "Currency not found" });
        }
    
        if (buy !== undefined) currency.buy = buy;
        if (sell !== undefined) currency.sell = sell;
    
        await currency.save();
    
        res.status(200).json({
          message: "Currency updated successfully",
          data: currency
        });
      } catch (err) {
        res.status(500).json({
          message: "Update failed",
          error: err.message
        });
      }
    };



