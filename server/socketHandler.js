const { Server } = require("socket.io");

let io;
const nicknames = {};

const initSocket = async (server) => {
  io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id + "has connected");

    socket.on("create_room", async (nickname) => {
      nicknames[socket.id] = nickname;
      // create 6 digit code to players to enter
      const room_id = String(Math.floor(10000 + Math.random() * 90000));

      // host joins room and emits room_id to client, and nickname
      await socket.join(room_id);

      io.to(room_id).emit("room_id", room_id);

      console.log(`${socket.id} joined room ${room_id}`);
    });

    socket.on("join_room", async (room_id, nickname) => {
      nicknames[socket.id] = nickname;

      await socket.join(room_id);

      io.to(room_id).emit("room_recieve", `${nickname} has joined the party!`);
      console.log(`${socket.id} joined room ${room_id}`);
    });

    socket.on("room_msg", (room_id, msg) => {
      console.log(room_id);
      io.to(room_id).emit("room_recieve", msg);
    });

    socket.on("leave_room", (room_id) => {
      delete nicknames[socket.id];
      socket.leave(room_id);
      console.log(`${socket.nickname} left room ${room_id}`);
    });

    socket.on("disconnect", () => {});
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
