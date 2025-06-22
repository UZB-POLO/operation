const express = require('express');
const router = express.Router();
const authMiddleware = require('../guards/authMiddleware');
const operationController = require('../controller/operationController');

router.use(authMiddleware);

router.get('/', operationController.getAll);
router.post('/', operationController.create);
router.put('/:id', operationController.update);
router.delete('/:id', operationController.remove);

module.exports = router;
