const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY 
const createCategoryController = async(req,res) => {
    try {
        const {title, imageUrl} = req.body
        //Validation
        if(!title ){
            return res.status(500).send({
                success:false,
                message:'Please provide category title or image'
            })
        }
        const newCategory = new categoryModel({title,imageUrl})
        await newCategory.save()
        res.status(200).send({
            success: true,
            message:'Category CREATED!!',
            newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Create Cat API",
            error
        });
    }
}
//GET ALL CATEGORY
const getAllCategoryController = async(req,res) => {
    try {
        const categorys = await categoryModel.find({})
        if(!categorys){
            return res.status(404).send({
                success:false,
                message:'No category found'
            })
        }
        res.status(200).send({
            success:true,
            totalcat: categorys.length,
            categorys
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in get All category',
            error
        })
    }
}
// UPDATE CATEGORY ID

const updateCategoryController = async(req,res) => {
    try {
        const {id} = req.params
        const{title, imageUrl} = req.body
        if(!title){
            return res.status(500).send({
                success:false,
                message:'title is not found'
            })
        }
        const updateCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true})
        if(!updateCategory){
            return res.status(500).send({
                success:false,
                message:'No Category Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Category Updated SUCCESSFULLY!!!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update category API",
            error
        })
    }
}

//DELETE CATEGORY ID

const deletecatcategory = async(req,res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(500).send({
                success:false,
                message:'Please Provide Category ID'
            })
        }
        const categorys = await categoryModel.findById(id)
        if(!categorys){
            return res.status(500).send({
                success:false,
                message:'Category Not Found'
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"DELETE Category SUCCESSFULLY !!!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in DELETE category API',
            error
        })
    }
}



module.exports = { createCategoryController, getAllCategoryController, updateCategoryController, deletecatcategory};