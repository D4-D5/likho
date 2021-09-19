import './App.css';
import { useState } from 'react';
import { io } from 'socket.io-client';
import ChatBox from './ChatBox';
import JoinRoom from './JoinRoom';

const socket = io("http://localhost:3001");

function App() {

  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="App">
      {!showChat ?
        <JoinRoom socket={socket} setShowChat={setShowChat} setUserName={setUserName} setRoom={setRoom} userName={userName} room={room}/>
        :
        <ChatBox socket={socket} userName={userName} room={room} />
      }
    </div>
  );
}

export default App;
