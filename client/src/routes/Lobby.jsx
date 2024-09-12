import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useLocation } from "react-router-dom";

export default function Lobby() {
  // chat box for all players
  // start game button for master
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const roomID = location.state.roomID;

  useEffect(() => {
    if (location.state.host)
      socket.emit("send_room_message", roomID, "HOST IS IN THE PARTY!");

    socket.on("recieve_room_message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

    return () => {
      socket.off("recieve_room_message");
    };
  }, []);

  function sendMsg() {
    socket.emit("send_room_message", roomID, message);
    setMessage("");
  }

  const handleMessage = (e) => {
    e.preventDefault();
    sendMsg();
    setMessage("");
  };

  function handleLeave() {
    socket.emit("leave_room", roomID);
    setroomID("");
  }

  return (
    <>
      <h1>Lobby</h1>
      <div className="">
        <h1 className="text-black">
          {location.state.host ? "HOST" : "PLAYER"}
        </h1>
        <div className="">
          <ul>
            {messages.map((msg, index) => {
              return <li key={index}>{msg}</li>;
            })}
          </ul>
          <form onSubmit={(e) => handleMessage(e)}>
            <input
              type="text"
              id="item"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button>ARROW</button> {/* replace with mui arrow*/}
          </form>
        </div>
      </div>
    </>
  );
}
