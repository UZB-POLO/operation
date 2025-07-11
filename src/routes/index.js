const { Router } = require("express");
const operationRouter = require("./operation");
const authRouter = require("./authRoutes");
const accountRouter = require("./accountRoutes");
const currencies = require("./currencies")
const denper = require("./denperRouter")
const fills = require("./fills")
const withdraw = require("./withdraw")
const exchange = require("./exchenges")
const terminal = require("./terminal")

const router = Router();

router.use("/auth", authRouter);
router.use("/operation", operationRouter);
router.use("/account", accountRouter);
router.use("/currency", currencies)
router.use("/denper", denper)
router.use("/fills", fills)
router.use("/withdraw", withdraw)
router.use("/exchange", exchange)
router.use("/terminal", terminal)

module.exports = router;
