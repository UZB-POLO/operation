const { Router } = require("express");
const operationRouter = require("./operation");
const authRouter = require("./authRoutes");
const accountRouter = require("./accountRoutes")


const router = Router()

router.use("/auth", authRouter)
router.use("/operation", operationRouter)
router.use("/account", accountRouter)


module.exports = router