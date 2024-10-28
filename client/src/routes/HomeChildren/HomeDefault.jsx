import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function HomeDefault() {
  const [roomID, setroomID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("checkedRoom", (roomExists) => {
      if (roomExists) handleJoin();
      else {
        const invalidAlert = document.getElementById("Alert");
        invalidAlert.classList.replace("hidden", "visible");
      }
    });

    return () => {
      socket.off("checkedRoom");
    };
  }, [roomID]);

  function handleHost(e) {
    e.preventDefault();
    navigate(`/host`, { state: { roomID: roomID, host: true } });
  }

  function handleJoin() {
    navigate(`/join`, { state: { roomID: roomID, host: false } });
  }

  function checkRoom(e) {
    e.preventDefault();
    socket.emit("check-room-exists", roomID);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Box
        id="Alert"
        sx={{ position: "absolute", top: "10%" }}
        className="hidden"
      >
        <Alert severity="error" variant="outlined">
          ENTER A VALID ROOM ID
        </Alert>
      </Box>

      <h1 className="text-8xl font-serif py-10">Cawhoot!</h1>
      <div className="text-center bg-white py-4 px-6 rounded-md flex flex-col justify-center items-center shadow-sm shadow-black">
        <form className="flex flex-col">
          <TextField
            data-test="join-field"
            id="outlined-basic"
            label="Room ID"
            variant="outlined"
            value={roomID}
            onChange={(e) => setroomID(e.target.value)}
          />
          <button
            onClick={(e) => checkRoom(e)}
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
