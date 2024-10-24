const mongoose = require('mongoose');

//schema
const foodSchema = new mongoose.Schema(
    {
    title:{
        type:String,
        require:[true, 'Food Title is require']
    },
    description:{
        type:String,
        require:[true, 'food description is require']
    },
    price:{
        type:Number,
        require:[true,'Food price is require']
    },
    imageUrl:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcava.com%2Fmenu&psig=AOvVaw0P_tClBH5Hsqqa8133Utet&ust=1718966528576000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjrkef_6YYDFQAAAAAdAAAAABAE'

    },
    foodTags:{
        type:String
    },
    category:{
        type:String
    },
    code:{
        type:String,
    },
    isAvalable:{
        type:Boolean,
        default:true,
    },
    resturant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"resturant",
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String,
    },
},{timestamps: true}
);

//export

module.exports = mongoose.model('foods', foodSchema);