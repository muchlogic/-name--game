import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function HomeDefault() {
  const [roomID, setroomID] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   socket.on("room_id", (roomID) => {
  //     // setroomID(roomID);
  //     navigate(`/lobby/${roomID}`, { state: { roomID: roomID, host: true } });
  //   });

  //   return () => {
  //     socket.off("room_id");
  //   };
  // }, []);

  // function handleHost(e) {
  //   e.preventDefault();
  //   socket.emit("create_room", "HOST");
  // }

  function handleHost(e) {
    e.preventDefault();
    navigate(`/host`, { state: { roomID: roomID, host: true } });
  }

  function handleJoin() {
    navigate(`/join`, { state: { roomID: roomID, host: false } });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-8xl font-serif py-10">Cawhoot!</h1>
      <div className="text-center bg-white py-4 px-6 rounded-md flex flex-col justify-center items-center shadow-sm shadow-black">
        <form className="flex flex-col">
          <TextField
            id="outlined-basic"
            label="Room ID"
            variant="outlined"
            value={roomID}
            onChange={(e) => setroomID(e.target.value)}
          />
          <button
            onClick={() => handleJoin()}
            className="bg-gray-800 text-white text-lg mt-4 py-4 rounded-md hover:bg-slate-900"
          >
            Join Room
          </button>
          <button
            onClick={(e) => handleHost(e)}
            className="bg-gray-800 text-white text-lg rounded-md mt-4 py-4 hover:bg-slate-900"
          >
            Host Game
          </button>
        </form>
      </div>
    </div>
  );
}
