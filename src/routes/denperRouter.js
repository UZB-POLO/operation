const express = require('express');
const denperOperation = require('../controller/denperOperation');
const router = express.Router();

router.post('/addItem', denperOperation.addItem)


module.exports = router;