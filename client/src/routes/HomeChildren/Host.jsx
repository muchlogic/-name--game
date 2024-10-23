import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import DeckModal from "../../components/DeckModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "@mui/material";

export default function Host() {
  const navigate = useNavigate();
  const testDecks = [
    { name: "cat" },
    { name: "dog" },
    { name: "racoon" },
    { name: "horse" },
    { name: "camal" },
    { name: "box" },
    { name: "triangle" },
    { name: "cat" },
    { name: "dog" },
  ];

  // useEffect(() => {
  //   socket.on("room_id", (roomID) => {
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

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ pb: 1 }}>
        Choose your deck
      </Typography>
      <div className="bg-white shadow-sm shadow-black flex flex-col items-center">
        <ul className="w-full grid grid-cols-1 gap-5 py-5 px-5 overflow-x-scroll overflow-scroll">
          {testDecks.map((deck, index) => {
            return <DeckModal deck={deck} index={index} />;
          })}
        </ul>
      </div>
    </Container>
  );
}
