const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:[true, 'user name is required']
    },
    email:{
        type:String,
        require:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'password is requred']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        require:[true,'phone number is required']
    },
    usertype:{
        type:String,
        require:[true,'user type is required'],
        default:'client',
        enum:['client','admin','vendor','driver'],
    },
    profile:{
        type:String,
        default:'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png'
    },
    answer:{
        type:String,
        required:[true, 'Answer in required'],
    },

},{timestamps:true}
);

//export

module.exports = mongoose.model('User', userSchema);