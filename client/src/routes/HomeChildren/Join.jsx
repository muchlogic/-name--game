import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../../socket";

export default function Join() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const roomID = location.state.roomID;

  function handleJoin() {
    socket.emit("join_room", roomID, nickname);
    navigate(`/lobby/${roomID}`, { state: { roomID: roomID, host: false } });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white text-8xl font-serif py-10">One More Step!</h1>
      <div className="text-center bg-white py-4 px-6 rounded-md flex flex-col justify-center items-center shadow-md shadow-black">
        <form className="flex flex-col">
          <input
            type="text"
            id="item"
            className="p-4 rounded-md text-center border-[black] border-[1px]"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="What should we call you?"
          />
          <button
            onClick={() => handleJoin()}
            className="bg-gray-800 text-white text-lg mt-4 py-4 rounded-md hover:bg-slate-900"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}
