const express = require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { createFoodController, getAllFoodController, getSingleFoodController, getidresFoodController,
     updateFoodController, deleteFoodController, placeOrderController, 
     orderStausController} = require('../controller/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');


const router = express.Router();

//router
//CREATE FOOD
router.post(`/create`,authMiddlewares,createFoodController);

//getALL Food
router.get(`/getAll`,getAllFoodController);

//GET SINGLE FOOD
router.get(`/get/:id`, getSingleFoodController);

//GET FOOD BY RESTAURANT
router.get(`/getByRestaurant/:id`, getidresFoodController);

//PLACE ORDER
router.post(`/placeorder`,authMiddlewares,placeOrderController);

// UPDATE FOOD
router.put(`/update/:id`,authMiddlewares,updateFoodController);

// DELETE FOOD
router.delete(`/delete/:id`,authMiddlewares,deleteFoodController);

//ORDER STATUS
router.post(`/orderStatus/:id`,adminMiddleware,authMiddlewares, orderStausController);

module.exports = router;