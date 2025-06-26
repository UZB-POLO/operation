const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController.js');
const auth = require('../guards/authMiddleware.js');

router.post('/addAccount', auth, accountController.addAccount);
router.get('/getByEmpIdAccounts', auth, accountController.getByEmpIdAccounts);
router.get('/getAccounts', auth, accountController.getAccounts)

module.exports = router;
