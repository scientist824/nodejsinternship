const express = require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { createCategoryController, getAllCategoryController, updateCategoryController, deletecatcategory } = require('../controller/categoryController');


const router = express.Router();

//router
// create category
router.post(`/create`, authMiddlewares,createCategoryController);

//GET ALL CATEGORY
router.get(`/getALL`,getAllCategoryController);

//UPDATE CATEGORY
router.put(`/update/:id`, authMiddlewares, updateCategoryController);

// DELETE CATEGORY
router.delete(`/delete/:id`,authMiddlewares,deletecatcategory);

module.exports = router;