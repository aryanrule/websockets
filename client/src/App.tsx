import './App.css'

//  creating a simple chat app to understand websockets 

function App() {
  // how client works with websocket  

  return (
    <>
      <div> 
            <input placeholder='enter your message'/>
            <button>send</button>
            <p>here is the recived message below :</p>
            <p></p> 
      </div>
    </>
  )
}

export default App
