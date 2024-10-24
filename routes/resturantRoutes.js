const express = require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { createResturantController, getAllResturantController, getResturantByIDController, deleteResturantController } = require('../controller/resturantController');


const router = express.Router();

//router

//CREATE RESTURANT || POST
router.post(`/create`, authMiddlewares,createResturantController);

//GET ALL RESTURANT || GET
router.get('/getALL', getAllResturantController);

// GET RESTURANT BY ID || GET
router.get(`/get/:id`,getResturantByIDController);

// DELETE RESTURANT
router.delete(`/delete/:id`,authMiddlewares, deleteResturantController);

module.exports = router;