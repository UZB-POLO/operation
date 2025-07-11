const express = require('express');
const terminal = require('../controller/terminal')
const auth = require('../guards/authMiddleware'); 
const router = express.Router();



router.get('/terminal', terminal.getTerminal)

module.exports = router;
