import { useEffect, useState  , useMemo, useRef } from 'react';
import './App.css'
import {io} from 'socket.io-client';
//  creating a simple chat app to understand websockets 

function App() {
  // how client works with websocket
  const socket = useMemo(() =>io('http://localhost:3000'), []);
  const [input , setInput] = useState<String>("");
  const [reciveddata , setRecivedData] = useState<String>("");
  const [socketId , setSocketId] = useState<String | undefined>("");
  const [room , setRoom] = useState<string>("");
  

  const submitHandler = (event : any)=>{
      
        event?.preventDefault();
        socket.emit("sending-message" , {input , room});
        setInput("");
        setRoom("");

  }
  useEffect(() => {
    socket.on('connect' , ()=> {
       setSocketId(socket.id);
       console.log("connected with "  , socket.id);
    })

    socket.on("sending-message" , (data) => {
      console.log("recieved message" ,  data);
      setRecivedData(data);
    })
   
    socket.on("welcome" , (data) => {
        console.log(data);
    })
    console.log(input);
    console.log(room);
  } , [input , socket , room]);



  return (

    <>
      <div> 
            <h1>{socketId}</h1>
          
            <form onSubmit={submitHandler}>
                 <input 
                 
                required= {true}
                 onChange={(event)=>{setInput(event.target.value)}}
                 placeholder='enter the message'></input>

                 <input
                  placeholder='please give me room'
                  onChange={(event)=>{setRoom(event.target.value)}}
                  >
                    
                 </input>
                 <button type='submit'>send</button>
            </form>



            <p>here is the recived message</p>
            <p>{reciveddata}</p>
      </div>
    </>
  )
}

export default App
