import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:8000");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState({});

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendDataToServer = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data);
    });
  }, [socket]);

  return (
    <div className="App">
      <input onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendDataToServer}>Send Message</button>
      <h1>{receivedMessage.message}</h1>
    </div>
  );
}

export default App;
