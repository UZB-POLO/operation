const express = require('express');
const fills = require('../controller/fills');
const auth = require('../guards/authMiddleware'); 
const router = express.Router();


router.post('/addItem', auth, fills.addItem);
router.get('/getItems', auth, fills.getItems)
router.put('/updateItem/:id', auth, fills.updateItem)
router.delete('/deleteItem/:id', auth, fills.deleteItem);


module.exports = router;
