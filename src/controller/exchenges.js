const Exchenge = require('../models/exchenges')


exports.countAmount = async (req, res) => {
	try {
		const exchange = await Exchenge.find();
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
				}
			}
			exchangeFind[key].Amount += Number(w.amount) || 0;
			exchangeFind[key].ExchangeAmount += Number(w.exchangeAmount) || 0;
			exchangeFind[key].count += 1;
		}


		const result = Object.values(exchangeFind);
		res.status(200).json({
			message: "Exchenge count successfully",
			data: result
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Error count exchenge",
			error: err.message
		});
	}
}
