import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import { socket } from "../socket";

export default function DeckModal({ deck, index }) {
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

  function handleHost(e) {
    e.preventDefault();
    socket.emit("create_room", "HOST");
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxHeight: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    overflowY: "scroll",
    boxShadow: 24,
    px: 4,
  };

  const testQuestions = [
    // will be part of the deck
    {
      question: "What is my name?",
      answers: [
        { text: "A1", correct: true },
        { text: "A2", correct: false },
        { text: "A3", correct: false },
        { text: "A4", correct: false },
      ],
    },
    {
      question: "What is my dog?",
      answers: [
        { text: "A1", correct: false },
        { text: "A2", correct: true },
        { text: "A3", correct: true },
        { text: "A4", correct: false },
      ],
    },
    {
      question: "What is my cat?",
      answers: [
        { text: "A1", correct: true },
        { text: "A2", correct: false },
        { text: "A3", correct: true },
        { text: "A4", correct: false },
      ],
    },
    {
      question: "What is my cat?",
      answers: [
        { text: "A1", correct: true },
        { text: "A2", correct: false },
        { text: "A3", correct: true },
        { text: "A4", correct: false },
      ],
    },
    {
      question: "What is my cat?",
      answers: [
        { text: "A1", correct: true },
        { text: "A2", correct: false },
        { text: "A3", correct: true },
        { text: "A4", correct: false },
      ],
    },
    {
      question: "What is my cat?",
      answers: [
        { text: "A1", correct: true },
        { text: "A2", correct: false },
        { text: "A3", correct: true },
        { text: "A4", correct: false },
      ],
    },
  ];

  return (
    <>
      <li
        data-test="deck-button"
        onClick={handleOpen}
        key={index}
        className="w-full h-[25vh] flex justify-center items-center bg-[red]"
      >
        <h1>{deck.name}</h1>
      </li>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Box className="flex justify-between top-0 sticky bg-white z-20 py-6">
            <Typography id="modal-modal-title" variant="h4">
              {deck.name}
            </Typography>
            <Button
              data-test="play-button"
              variant="contained"
              color="success"
              onClick={handleHost}
            >
              Play
            </Button>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Aspernatur laboriosam vero, debitis dolor provident tempora ipsam
              in illo deserunt unde enim architecto inventore ducimus iure non
              maxime aperiam aliquam nisi.
            </Typography>
          </Box>
          <Typography sx={{ mt: 2, fontWeight: "bold" }}>Questions:</Typography>
          <List sx={{}}>
            {testQuestions.map((question, index) => {
              const [expand, setExpand] = useState(false);
              const handleClick = () => {
                setExpand(!expand);
              };
              return (
                <>
                  <ListItemButton key={index} onClick={handleClick}>
                    <Box sx={{ py: 3 }}>
                      <Typography>
                        {index + 1} - {question.question}
                      </Typography>
                    </Box>
                  </ListItemButton>
                  <Collapse in={expand} unmountOnExit>
                    <List disablePadding>
                      {question.answers.map((answer, index) => {
                        return (
                          <>
                            <Divider />
                            <ListItem
                              key={index}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="h8">
                                {answer.text}
                              </Typography>
                              <Typography variant="h8">
                                {answer.correct ? "True" : "False"}
                              </Typography>
                            </ListItem>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                  <Divider />
                </>
              );
            })}
          </List>
        </Box>
      </Modal>
    </>
  );
}
