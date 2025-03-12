import express , {Request , Response} from 'express';
import {Server} from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';


const port = 3000;
const app = express();
const httpserver = createServer(app);
// reason to atach my httpserver from node js and app from express is to handle both HTTP requests and WebSocket connections using the same server.

app.use(
    cors(
        {
        origin : 'http://localhost:5173/'
        }
    )
)

// socket also need this cross origin resourse sharing
const io = new Server(httpserver, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true , 
    },
  });
  



// io is a whole circuit but the socket is a client for understanding 
io.on('connection' , (socket) => {
    // console.log("A user Connected with a socket id" , socket);

    console.log("user is connected" , socket.id);
    socket.on("message" , (data) => {
        io.emit("message" , data); // broadcasting to all the clients if you dont use the broadcast keyword
    })
    
    socket.on("sending-message" , (data) => {
        // socket.broadcast.emit("sending-message" , data);
        
        // socket.broadcast.emit("sending-message" , data.input); // entire circuit expcept the current socket
        socket.to(data.room).emit("sending-message" , data.input);
    })
   
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.emit("welcome" , `welcome to the server ${socket.id}`);
    
    // broadcast event will send this accept this socket id
    socket.broadcast.emit("welcome" , `welcome to the server this is a broadcasting event , ${socket.id}`);
    
    
})



app.get('/' , (req : Request , res : Response) => {
    res.send(`<h1>hello world </h1>`);
});

httpserver.listen(port, () => {
    console.log("server is connected successfully");
})


