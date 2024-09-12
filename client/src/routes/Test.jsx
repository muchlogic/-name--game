import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const [roomID, setroomID] = useState("");
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room_id", (roomID) => {
      // setroomID(roomID);
      navigate(`/lobby/${roomID}`, { state: { roomID: roomID, host: true } });
    });

    return () => {
      socket.off("room_id");
    };
  }, []);

  function handleHost() {
    socket.emit("create_room", "HOST");
  }

  function handleJoin() {
    socket.emit("join_room", roomID, "PLAYER");
    navigate(`/lobby/${roomID}`, { state: { roomID: roomID, host: false } });
  }

  return (
    <>
      <nav>
        <button onClick={() => handleHost()}>Host Game</button>
        <button onClick={() => handleJoin()}>Join Room</button>
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
