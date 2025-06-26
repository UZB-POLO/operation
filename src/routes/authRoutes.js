<<<<<<< HEAD
const { Router } = require("express");
const { register, login,  } = require('../controller/authController');
const authRouter = Router()

authRouter.post('/register', register);
authRouter.post('/login', login);

module.exports = authRouter;
=======
const express = require('express');
const { register, login } = require('../controller/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
