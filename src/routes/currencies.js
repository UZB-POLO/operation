const express = require('express');
const currenciesController = require('../controller/currenciesController');
const router = express.Router();

router.post('/addItem', currenciesController.addItem)
router.get('/getItems', currenciesController.getItems)
router.put('/updateItem', currenciesController.updateItem)



module.exports = router;