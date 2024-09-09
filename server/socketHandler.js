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

    socket.on("disconnect", () => {
      console.log("the user left");
    });
  });

  // Handle socket event using socket.on()
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
