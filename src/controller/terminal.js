const Terminal = require("../models/terminal");
const PaymentType = require("../models/paymentTypeModel");

exports.getTerminal = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        const paymentTypes = await PaymentType.find(); 
        res.status(200).json({
            terminals,
            paymentTypes
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            message: "Error while fetching terminals and payment types",
            error: err.message
        });
    }
};
