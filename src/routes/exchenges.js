const express = require('express');
const exchange = require('../controller/exchenges')
const auth = require('../guards/authMiddleware'); 
const router = express.Router();



router.get('/countAmount', exchange.countAmount)

module.exports = router;
