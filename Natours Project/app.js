const express=require('express');
const fs=require('fs')
const app=express();
app.use(express.json());  ////middleware

// app.get('/',(req,res)=>{
//     res.status(200).json({'messagge':'Hello from the server side'});
// })

// app.post('/',(req,res)=>{
//     res.send("Resonse messgae POST")
// })

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours',(req,res)=>{

    res.status(200).json({
        status:"Success",
        results:tours.length,
        data:{
            tours:tours
        }
    })
})

app.post('/api/v1/tours', (req,res)=>{
    // console.log(req.body);

    const newId=tours[tours.length-1].id+1;
    newTour=Object.assign({id:newId}, req.body)

    // tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err)=>{
        res.status(201).json({
            status:"success",
            data:{
                tour:newTour
            }
        })
        if(err) return console.log("Could not write");
    })

    // res.send('Done')
})

const port=3000;
app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})

