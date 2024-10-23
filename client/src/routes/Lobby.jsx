import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  ListItem,
  Typography,
  List,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Lobby() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roundTimer, setRoundTimer] = useState(10);

  const location = useLocation();
  const roomID = location.state.roomID;

  const [players, setPlayers] = useState([]);

  const [previousScrollHeight, setPreviousScrollHeight] = useState(0);

  useEffect(() => {
    if (location.state.host)
      socket.emit("send_room_message", roomID, "HOST IS IN THE PARTY!");
    socket.emit("update_player_list", roomID);

    socket.on("recieve_room_message", (msg) => {
      setPreviousScrollHeight(document.getElementById("chatbox").scrollHeight);
      setMessages((messages) => [...messages, msg]);
    });

    socket.on("round_timer", (time_left) => {
      console.log(time_left);
      setRoundTimer(time_left);
    });

    socket.on("round_over", () => {
      console.log("round is over");
    });

    socket.on("updated_player_list", (updatedPlayers) => {
      console.log(updatedPlayers);
      setPlayers(updatedPlayers);
    });

    socket.on("player_disconnected", () => {
      socket.emit("update_player_list", roomID);
    });

    return () => {
      socket.off("recieve_room_message");
      socket.off("round_timer");
      socket.off("round_over");
      socket.off("updated_player_list");
    };
  }, []);

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    // if chatbox is scrolled to bottom, then update scroll to include newly added message
    if (chatbox.scrollTop + chatbox.clientHeight == previousScrollHeight)
      chatbox.scrollTop = chatbox.scrollTop + 1000;
  }, [messages]);

  function sendMsg() {
    socket.emit("send_room_message", roomID, message);
    setMessage("");
  }

  const handleMessage = (e) => {
    e.preventDefault();
    sendMsg();
    setMessage("");
  };

  // function handleLeave() {
  //   socket.emit("leave_room", roomID);
  //   setroomID("");
  // }

  function startRound() {
    socket.emit("start_round", roomID);
  }

  return (
    <>
      <Container sx={{ height: "100vh", overflow: "hidden", bgcolor: "green" }}>
        <Typography variant="h4">Lobby</Typography>
        <Box
          sx={{
            // bgcolor: "red",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "25%" }}>
            {/* <Typography sx={{ textAlign: "center" }}>Players</Typography> */}
            <List
              id="playerList"
              sx={{ height: "60vh", overflow: "scroll", p: 0 }}
            >
              {players.map((player, index) => {
                return (
                  <ListItem
                    sx={{ bgcolor: "white", mb: 0.8, borderRadius: 1 }}
                    key={index}
                    // disablePadding
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {player[1].nickname}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box
            sx={{
              width: "50%",
              bgcolor: "white",
              mx: 1,
              p: 0.5,
              borderRadius: 1,
            }}
          ></Box>
          <Box sx={{ width: "25%", bgcolor: "white", p: 0.5, borderRadius: 1 }}>
            {/* <Typography sx={{ textAlign: "center" }}>Chat</Typography> */}
            <List
              id="chatbox"
              sx={{ height: "60vh", overflow: "scroll", overflowX: "hidden" }}
            >
              {messages.map((msg, index) => {
                return (
                  <ListItem
                    sx={{
                      ":nth-of-type(odd)": {
                        bgcolor: "lightgray",
                      },
                    }}
                    key={index}
                    disablePadding
                  >
                    {msg}
                  </ListItem>
                );
              })}
            </List>
            <form onSubmit={(e) => handleMessage(e)}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                sx={{ p: 0 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </Box>
        </Box>
      </Container>
      {/* <div className="">
        <h1 className="text-black">
          {location.state.host ? "HOST" : "PLAYER"}
        </h1>
      </div> */}
    </>
  );
}
