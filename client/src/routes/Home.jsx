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
        className={`min-h-screen bg-[url(./public/homeBG.jpg)] flex justify-center`}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-8xl font-serif py-10">Cawhoot!</h1>
          <div className="text-center bg-white py-4 px-6 rounded-md flex flex-col justify-center items-center shadow-md shadow-black">
            <form className="flex flex-col">
              <input
                type="text"
                id="item"
                className="p-4 rounded-md text-center border-[black] border-[1px]"
                value={roomID}
                onChange={(e) => setroomID(e.target.value)}
                placeholder="Enter Room ID"
              />
              <button
                onClick={() => handleJoin()}
                className="bg-gray-800 text-white text-lg mt-4 py-4 rounded-md hover:bg-slate-900"
              >
                Join Room
              </button>
              <button
                onClick={() => handleHost()}
                className="bg-gray-800 text-white text-lg rounded-md mt-4 py-4 hover:bg-slate-900"
              >
                Host Game
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
