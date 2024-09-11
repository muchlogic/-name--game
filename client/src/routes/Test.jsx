import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../socket";

export default function Test() {
  const [roomID, setroomID] = useState("");
  const [players, setPlayers] = useState([]);

  socket.on("room_id", (roomID) => {
    setroomID(roomID);
  });

  socket.on("room_recieve", (msg) => {
    console.log(msg);
  });

  function handleHost() {
    socket.emit("create_room", "bob");
  }

  function sendMsg() {
    console.log(typeof roomID);
    socket.emit("room_msg", roomID, "hello I'm sending a message to the room");
  }

  function handleJoin() {
    socket.emit("join_room", roomID, "bill");
  }

  function handleLeave() {
    socket.emit("leave_room", roomID);
    setroomID("");
  }

  return (
    <>
      <nav>
        <button onClick={() => handleHost()}>Host Game</button>
        <button onClick={() => sendMsg()}>Send Msg</button>
        <button onClick={() => handleJoin()}>Join Room</button>
        <button onClick={() => handleLeave()}>Leave Room</button>
      </nav>

      <div>
        <form>
          <input
            type="text"
            id="item"
            value={roomID}
            onChange={(e) => {
              setroomID(e.target.value);
            }}
          />
        </form>
      </div>
      <h1>{roomID}</h1>
    </>
  );
}
