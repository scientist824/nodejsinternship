const resturantModels = require("../models/resturantModels");

// CREATE RESTURANT 
const createResturantController = async(req,res) => {
    try {
        const {title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
        // validation 
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message: ' Please Provide Title And Address',
            });
        }
        const newResturant = new resturantModels({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        })
    
        await newResturant.save()

        res.status(201).send({
            success:true,
            message:'New Resturant created Successfull !!!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in create resturant API',
            error
        });
        
    }
};

// GET ALL RESTURSNT 
const getAllResturantController = async (req, res) => {
    try {
        const resturants = await resturantModels.find({})
        if(!resturants){
            return req.status(404).send({
                success:false,
                message:'No Resturant Availble'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:resturants.length,
            resturants
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error is Get All Resturant API",
            error
        });
    }
};

// GET RESTURANT BY ID 
const getResturantByIDController = async(req,res) => {
    try {
        const resturantid = req.params.id
        if(!resturantid){
            return req.status(404).send({ 
                success:false,
                message: "Please provide restuirant ID"
            })
        }
        //find  resturant
        const resturant = await resturantModels.findById(resturantid)
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:"No resturant found"
            });
        }
        res.status(200).send({
            success:true,
            resturant
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get Resturant by id API",
            error
        })
    }
}

// DELETE RESTURANT
const deleteResturantController = async(req,res) => {
    try {
        const resturantid = req.params.id
        if(!resturantid){
            return res.status(404).send({
                success:false,
                message:"No Resturant OR Please Provide Resturant ID"
            })
        }
        await resturantModels.findByIdAndDelete(resturantid)
        res.status(200).send({
            success:true,
            message:"Resturant DELETE SUCCSSESSFULLY!"
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in DELETE Resturant API",
            error
        });
    }
} 

module.exports = {createResturantController, getAllResturantController, getResturantByIDController, deleteResturantController};