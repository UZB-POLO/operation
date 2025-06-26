const express = require('express');
<<<<<<< HEAD
const authMiddleware = require('../guards/authMiddleware');
const operationController = require('../controller/operationController');

const router = express.Router();


router.use(authMiddleware);

router.get('/', operationController.getItems);
router.post('/operation', operationController.createOperation);
router.post('/addApprove/:id', operationController.addApprove);
router.put('/:id', operationController.update);
router.delete('/:id', operationController.remove);



=======
const router = express.Router();
const authMiddleware = require('../guards/authMiddleware');
const operationController = require('../controller/operationController');

router.use(authMiddleware);

router.get('/', operationController.getAll);
router.post('/', operationController.create);
router.put('/:id', operationController.update);
router.delete('/:id', operationController.remove);

>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
module.exports = router;
