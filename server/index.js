const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const https = require("https");
// const fs = require("fs");
const { initSocket, getIO } = require("./socketHandler");

app.use(bodyParser.json()); // to parse http bodies
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

const server = http.createServer(app);

// mount socket io server
initSocket(server);
const io = getIO();
io.listen(4000);

server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
