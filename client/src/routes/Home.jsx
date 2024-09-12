import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import background from "../public/homeBG.jpg";

export default function Home() {
  const [roomID, setroomID] = useState("");

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
      <div
        className={`min-h-screen bg-[url(./public/homeBG.jpg)] flex flex-col justify-center items-center`}
      >
        <h1 className="text-white text-9xl font-serif">Cawhoot!</h1>
        <nav className="mb-4">
          <button
            onClick={() => handleHost()}
            className="bg-gray-800 text-white text-lg py-3 px-6 rounded-md"
          >
            Host Game
          </button>
        </nav>

        <div className="text-center bg-white px-6 py-6 rounded-md border-2">
          <form>
            <input
              type="text"
              id="item"
              className="mb-4 p-2 rounded-md text-center border-2"
              value={roomID}
              onChange={(e) => setroomID(e.target.value)}
              placeholder="Enter Room ID"
            />
            <br />
            <button
              onClick={() => handleJoin()}
              className="bg-gray-800 text-white text-lg py-3 px-6 rounded-md"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
