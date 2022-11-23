const EventEmitter=require('events')


class Sales extends EventEmitter{
    constructor(){
        super();
    }
}
const myEmitter=new Sales();

myEmitter.on('newSale',()=>{
    console.log("There was a new sale");
})
myEmitter.on('newSale',()=>{
    console.log("customer name:Muhib");
})

myEmitter.on('newSale',(stock)=>{
    console.log(`There are ${stock} items left`);
})
myEmitter.emit("newSale", 9);

//////////////////////
const http=require('http');
const server=http.createServer();

server.on('request',(req,res)=>{
    console.log("Request Recieved");
    res.end("Request Recieved")
})

server.on("request",(req,res)=>{
    console.log("Another Request")
})
server.on("Close",()=>{
    console.log("Server Closed")
})
server.listen(8000,"127.0.0.1",()=>{
    console.log("Waitong for request...")
})