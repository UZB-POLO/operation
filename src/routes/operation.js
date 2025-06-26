const express = require('express');
const authMiddleware = require('../guards/authMiddleware');
const operationController = require('../controller/operationController');

const router = express.Router();


router.use(authMiddleware);

router.get('/', operationController.getItems);
router.post('/operation', operationController.createOperation);
router.post('/addApprove/:id', operationController.addApprove);
router.put('/:id', operationController.update);
router.delete('/:id', operationController.remove);



module.exports = router;
