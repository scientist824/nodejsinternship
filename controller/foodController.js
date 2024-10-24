const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//CREATE FOOD
const createFoodController = async(req,res) => {
    try {
        const {title,description,price,imageUrl,foodTags,category,code,isAvalable,resturant,rating,ratingCount} = req.body

        if(!title || !description || !price || !resturant){
            return res.status(500).send({
                success:false,
                message:'Please Provide all Fields'
            })
        }
        const newFood = new foodModel({title,description,price,imageUrl,foodTags,category,code,isAvalable,resturant,rating,ratingCount})
        await newFood.save()
        res.status(201).send({
            success:true,
            message:'New Food Item Created',
            newFood
        })
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success:false,
            message:'Error in Create Food API',
            error
        })
    }
};

//GET ALL FOODS 
const getAllFoodController = async(req,res) => {
    try {
        const foods = await foodModel.find({});
        if(!foods){
            return res.status(404).send({
                success:false,
                message:"No Food Itam Was Found !"
            })
        }
        res.status(200).send({
            success:true,
            totalfoods:foods.length,
            foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Get Foods API',
            error
        });
    }
};

// GET SINGLE FOOD
const getSingleFoodController = async( req, res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(500).send({
                success:false,
                message:'Please Provide ID !'
        });
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(500).send({
                success:false,
                message:'No Food Found with This ID'
            });
        }
        res.status(200).send({
            success:true,
            food
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in GET SINGLE FOOD',
            error
        })
    }
}
// GET FOOD BY RESTAURANT 
const getidresFoodController = async( req, res) => {
    try {
        const resturantid = req.params.id;
        if(!resturantid){
            return res.status(500).send({
                success:false,
                message:'Please Provide ID !'
        });
        }
        const food = await foodModel.find({resturant:resturantid});
        if(!food){
            return res.status(500).send({
                success:false,
                message:'No Food Found with This ID'
            });
        }
        res.status(200).send({
            success:true,
            message:'Food Base On Restaurant',
            food
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in GET SINGLE FOOD',
            error
        })
    }
}

// UPDATE FOOD ITAM
const updateFoodController = async(req,res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Food ID not Found !'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'Food Not Found'
            })
        }
        const {title,description,price,imageUrl,foodTags,category,code,isAvalable,resturant,rating,ratingCount} = req.body
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {title,description,price,imageUrl,foodTags,category,code,isAvalable,resturant,rating,ratingCount} ,{new:true})

        res.status(200).send({
            success:true,
            message:"Food itam was Updated !"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Update Food Api',
            error
        })
    }
}

// DELETE FOOD
const deleteFoodController = async(req,res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(500).send({
                success:false,
                message:'Food Id Not Found !'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'Food Not Found !'
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success:false,
            message:'Food itam is DELETED !'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Delete Api'
        })
    }
}

// PLEASE ORDER

const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;

        if (!cart) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid Food Cart (array) and Payment Method",
            });
        }

        let total = 0;

        // Calculate the total price of items in the cart
        cart.map(i, ()=> {total += i.price;});

        const newOrder = new orderModel({
            foods:cart,
            payment,
            buyer:res.body.id
        })
        res.status(200).send({
            success:true,
            message:'Order Placed !',
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Place Order API',
            error
        });
    }
};

//CHANGE ORDER STAUS
const orderStausController = async(req,res) => {
    try {
        const orderID = req.params.id
        if(!orderID){
            return res.status(404).send({
                success:false,
                message:'Please Provide valid order ID'
            })  
        }
        const {status} = res.body
        const order = await orderModel.findByIdAndUpdate(orderID,{status}, {new:true})
        res.status(200).send({
            success:true,
            message:'Order Status Updated'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Status API",
            error
        })
    }
}



module.exports = {orderStausController, createFoodController,deleteFoodController,placeOrderController, getAllFoodController,getSingleFoodController,getidresFoodController,updateFoodController};