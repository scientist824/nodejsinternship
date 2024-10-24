const express = require('express');
const { registerController, loginController } = require('../controller/authController');

const router = express.Router()

//router
//REGISTER || POST  
router.post(`/register`,registerController);

//LOGIN || PPOST
router.post(`/login`, loginController)


module.exports = router