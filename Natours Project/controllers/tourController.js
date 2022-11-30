
const fs=require('fs')

const tours=JSON.parse
(fs.readFileSync(`${__dirname}/..//dev-data/data/tours-simple.json`))


exports.checkID=(req,res,next,val)=>{
    const id=req.params.id*1; ////converting string to number
    if(id>tours.length){
        return res.status(404).json({
            status:"Fail",
            message:"Invalid ID"
        })
    }
    next();
}

exports.checkBody=(req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:"Fail",
            message:"Missing name or price"
        })
    }
}

exports.getAllTours=(req,res)=>{
    // console.log(req.requestTime);
    res.status(200).json({
        status:"Success",
        results:tours.length,
        data:{
            tours:tours
        }
    })
}

exports.getTour=(req,res)=>{
    const id=req.params.id*1;
    const tour=tours.find(el=>el.id===id)
    // console.log(req.params);
    
    res.status(200).json({
        status:"Success",
        data:{
            tour
        }
    })

}
exports.addNewTour=(req,res)=>{
    // console.log(req.body);

    const newId=tours[tours.length-1].id+1;
    // eslint-disable-next-line prefer-object-spread
    const newTour=Object.assign({id:newId}, req.body)

    // tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err)=>{
        res.status(201).json({
            status:"success",
            data:{
                tour:newTour
            }
        })
        // eslint-disable-next-line no-console
        if(err) return console.log("Could not write");
    })

    // res.send('Done')
}
exports.updateTour= (req,res)=>{


    res.status(200).json({
        status: "Success",
        data:{
            tour:"<updated Tour"
        } 
    })
}

exports.deleteTour=(req,res)=>{

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
