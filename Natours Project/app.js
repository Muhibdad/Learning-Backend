const express=require('express');
const fs=require('fs')
const app=express();
app.use(express.json());  ////middleware
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next();
})


// app.get('/',(req,res)=>{
//     res.status(200).json({'messagge':'Hello from the server side'});
// })

// app.post('/',(req,res)=>{
//     res.send("Resonse messgae POST")
// })

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


const getAllTours=(req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:"Success",
        results:tours.length,
        data:{
            tours:tours
        }
    })
}

const getTour=(req,res)=>{

    console.log(req.params);
    const id=req.params.id*1; ////converting string to number
    
    const tour=tours.find(el=>{
       return el.id==id
    })
    if(id>tours.length || !tour){
        return res.status(404).json({
            status:"Fail",
            message:"Invalid ID"
        })
    }
    res.status(200).json({
        status:"Success",
        data:{
            tour
        }
    })

}
const addNewTour=(req,res)=>{
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
}
const updateTour= (req,res)=>{

    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:"Fail",
            message:"Invalid ID"
        })
    }
    res.status(200).json({
        status: "Success",
        data:{
            tour:"<updated Tour"
        } 
    })
}

const deleteTour=(req,res)=>{

    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:"Fail",
            message:"Invalid ID"
        })
    }
    res.status(204).json({
        status: "Success",
        data:null
    })
}


app.get('/api/v1/tours',getAllTours)

app.get('/api/v1/tours/:id',getTour)

app.post('/api/v1/tours', addNewTour)

app.patch('/api/v1/tours/:id',updateTour)

app.delete('/api/v1/tours/:id',deleteTour )

const getAllUsers=(req,res)=>{
    req.status(500).json({
        status:'error',
        message:'This route is not yet definded'
    })
}
const createUser=(req,res)=>{
    req.status(500).json({
        status:'error',
        message:'This route is not yet definded'
    })
}
const getUser=(req,res)=>{
    req.status(500).json({
        status:'error',
        message:'This route is not yet definded'
    })
}
const updateUser=(req,res)=>{
    req.status(500).json({
        status:'error',
        message:'This route is not yet definded'
    })
}
const deleteUser=(req,res)=>{
    req.status(500).json({
        status:'error',
        message:'This route is not yet definded'
    })
}

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

const port=3000;
app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})
