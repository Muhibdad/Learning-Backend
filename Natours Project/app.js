const express=require('express');
const app=express();
const morgan=require('morgan');

if(process.env.NODE_ENV==='development'){
app.use(morgan('dev'));
}

app.use(express.json());  ////middleware

app.use(express.static(`${__dirname}/public`))

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next();
})

//// ROutes
const tourRouter=require('./Route/tourRoutes.js')
const userRouter=require('./Route/userRoutes.js')
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users', userRouter)

/// Start Server
// const port=3000;
// app.listen(port,()=>{
//     console.log(`app running on port ${port}`)
// })

module.exports=app;