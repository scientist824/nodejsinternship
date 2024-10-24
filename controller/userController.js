const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")

//GET User info
const getUserController = async(req,res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            });
        }
        //hinde password
        user.password = undefined;
        //resp
        res.status(200).send({
            success:true,
            message:'User GET Successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Get User API',
            error
        });
    }
};

// UPDATE USER
const updateUserController = async (req,res) => {
    try {
        //find user
        const user = await userModel.findById({_id: req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User Not Found"
            })
        }
        //Update 
        const {userName,address,phone,} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone
        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:'user Updated successfully'
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update user Api',
            error
        });
    }
};

// upadate user password
const updatePasswordController = async (req,res) => {

    try {
        //find user
        const user = await userModel.findById({_id:req.body.id});
        //validation
        if(user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            });
        }
        // get data from user

        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:' Please provide old or new password '
            })
        }
        //check user password | campare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid old password"
            });
        }
        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:'Password Updated!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Password update API',
            error
        })
    }
};

// RESET PASSWORD
const resetPasswordController = async(req,res) => {
    try {
        const {email, newPassword, answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"Please provide ALL fields"
            });
        }
        const user = await userModel.findOne({email,answer});
        if(!user){
            return res.status(500).send({
                success:false,
                message:"User Not Found or Invalid answer"
            })
        }
        //hashing
var salt = bcrypt.genSaltSync(10);
const hashedPassword = await bcrypt.hash(newPassword, salt);
user.password = hashedPassword
await user.save()
res.status(200).send({
    success:true,
    message:"Password Reset Successfull"
});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Password reset API",
            error
        });
    }
}

//DELETE USER
const deleteprofileController = async(req,res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"Your accont has been DELETE!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:" Error in Delete profile API", 
            error
        })
}
 
};
module.exports = {getUserController,
     updateUserController,
      updatePasswordController,
       resetPasswordController,
       deleteprofileController
    };