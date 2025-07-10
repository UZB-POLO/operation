const express = require('express');
const withdraw = require('../controller/withdraw');
const auth = require('../guards/authMiddleware');
const router = express.Router();


router.post('/addItem', auth, withdraw.addItem);
router.get('/getItems', auth, withdraw.getItems)
router.put('/updateItem/:id', auth, withdraw.updateItem)
router.delete('/deleteItem/:id', auth, withdraw.deleteItem);
router.get('/count', withdraw.groupedWithdrawStats);



module.exports = router;
