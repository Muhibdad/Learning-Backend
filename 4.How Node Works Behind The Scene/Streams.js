const fs =require('fs')
const server =require('http').createServer();

server.on("request", (req,res)=>{
//// Solution 1
// fs.readFile("testFile for Streams.txt",(err,data)=>{
//     if (err) console.log(err)
//     res.end(data);
//     //// this solution work in such a way that it load the file first fully and then sends it back to the server
// })

//// Solution 2
// const readAble=fs.createReadStream('testFile for Streams.txt')
// readAble.on('data',chunck=>{
//     res.write(chunck)
// })
// readAble.on('end',()=>{
//     res.end();
// })
////// This solution is also not feasable bcz the readable strams is faster than the response to teh server. Backpressure

//// Solution 3
const readAble=fs.createReadStream("testFile for Streams.txt");
readAble.pipe(res);
///// readableSource.pipe(writeableDestination)

})  

server.listen(8000,"127.0.0.1",()=>{
    console.log("Listening...")
})