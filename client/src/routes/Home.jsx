import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [roomID, setroomID] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="min-h-screen bg-purple-700 flex flex-col justify-center items-center">
        <h1 className="text-white text-9xl font-serif">Cawhoot!</h1>
        <nav className="mb-4">
          <Link to="/lobby">
            <button className="bg-gray-800 text-white text-lg py-3 px-6 rounded-md">
              Host Game
            </button>
          </Link>
        </nav>

        <div className="text-center bg-white px-6 py-6 rounded-md border-2" >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="item"
              className="mb-4 p-2 rounded-md text-center border-2"
              value={roomID}
              onChange={(e) => setroomID(e.target.value)}
              placeholder="Enter Room ID"
            />
            <br />
            <button className="bg-gray-800 text-white text-lg py-3 px-6 rounded-md">
              Join Room
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
