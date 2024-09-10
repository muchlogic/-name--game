const { Server } = require("socket.io");

let io;

const initSocket = async (server) => {
  io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log(`user ${socket.id} has connected`);

    socket.on("create_room", () => {
      // create 6 digit code to players to enter
      let room_id = Math.floor(100000 + Math.random() * 900000);

      // host joins room and emits room_id to client
      socket.join(room_id);
      io.emit("room_id", room_id);
    });

    socket.on("join_room", (room_id) => {
      socket.join(room_id);
      // access the socket.auth nickname object to msg to room
      io.to(room_id).emit("msg", "WIP");
    });

    socket.on("disconnect", () => {
      console.log("the user left");
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
};
