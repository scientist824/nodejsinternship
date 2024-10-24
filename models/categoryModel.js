const mongoose = require('mongoose');

//schema
const categorySchema = new mongoose.Schema(
    {
        title:{
            type:String,
            require:[true, 'category title is required']
        },
        imageUrl:{
            type:String,
            default: "https://www.google.com/imgres?q=food%20logo%20.png&imgurl=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F333%2F12%2Fpng-transparent-infinity-food-logo.png&imgrefurl=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dfood%2Blogo&docid=a-QwtCXdQUo-xM&tbnid=5_lj58U0F6RXjM&vet=12ahUKEwjti8OJ-OeGAxWfV2wGHathDQUQM3oECGwQAA..i&w=920&h=780&hcb=2&ved=2ahUKEwjti8OJ-OeGAxWfV2wGHathDQUQM3oECGwQAA"

        },

    
},{timestamps: true}
);

//export

module.exports = mongoose.model('category', categorySchema);