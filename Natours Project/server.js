const dotenv=require('dotenv');
const mongoose=require('mongoose');

const app=require('./app')
dotenv.config({path: './config.env'})
console.log(process.env.DATABASE);

const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)
// mongoose.connect(process.env.DATABASE_LOCAL,{
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
    console.log(con.connections);
    console.log("DB connection successfull");

})

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

const testTour=new Tour({
    name:'The Forest Hiker',
    rating:4.7,
    price:497
})

testTour.save().then(doc=>{
    console.log(doc);
}).catch(err=>{
    console.log("ERR", err);
});

const port=process.env.port || 3000;
app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})
console.log(process.env.port);