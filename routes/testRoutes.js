const express = require('express');
const { testUserController } = require('../controller/testController');

//routers object
const router = express.Router()

//routre GET | POST | UPDATE | DELETE
router.get(`/test-user`,testUserController)

//export 
module.exports = router