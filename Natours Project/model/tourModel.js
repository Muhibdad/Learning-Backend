const mongoose=require('mongoose')

const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must contain name']
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:[true,'A tour must contain price']
    }
})

const Tour=mongoose.model('Tour', tourSchema);

module.exports=Tour;