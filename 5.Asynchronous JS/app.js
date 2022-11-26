const superagent =require('superagent')
const fs=require('fs');

const readFilePro =file=>
{
    return new Promise ((res,rej)=>{
        fs.readFile(file, (err, data)=>{
            if(err) rej('Could not find file')
            res(data)
        })
    })
}
const writeFilePro=(file, data)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data, err=>{
            if(err) reject('Could nott write file')
            resolve('Success')
        })
    })
}
// readFilePro(`${__dirname}/Dog-breed.txt`)
// .then(data=>{
//     console.log(`Breed: ${data}`)
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// })
// .then(res=>{
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message)
// })
// .then(()=>{
//     console.log('Random dog image saved to file')
// })
// .catch(err=>{
//     console.log(err)
// });

/////////////using async await
const getDogPic=async ()=>{
    try {
        const data =await readFilePro(`${__dirname}/Dog-breed.txt`);
        console.log("Breed:",data.toString());
    
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        console.log(res.body.message);
        
        await writeFilePro('dog-img.txt', res.body.message)
        console.log("Written")
    }
    catch(err){
        console.log("error")
    }
   
}

getDogPic();