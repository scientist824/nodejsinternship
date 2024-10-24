const express = require('express');
const { getUserController, updateUserController, resetPasswordController, deleteprofileController } = require('../controller/userController');
const authMiddlewares = require('../middlewares/authMiddlewares');


const router = express.Router()

//router
//GET User  || GET
router.get(`/getuser`,authMiddlewares, getUserController);

//UPDATE PROFILE
router.put(`/updateUser`,authMiddlewares,updateUserController);

// UPDATE Password
router.post(`/updatePassword`,authMiddlewares,updateUserController);

//RESET PASSWORD
router.post(`/resetPassword`, authMiddlewares, resetPasswordController);

//DELETE USER
router.delete(`/deleteprofile/:id`,authMiddlewares, deleteprofileController);

module.exports = router