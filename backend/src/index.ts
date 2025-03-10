import express  , {Request , Response} from 'express';

const httpServer = express();

httpServer.get('/',(req:Request , res:Response) => {
  res.send("helllo");  
})


httpServer.listen(3000 , ()=>{
    console.log("httpserver is connected");
}) 
