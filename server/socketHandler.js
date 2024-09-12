const { Server } = require("socket.io");

let io;
let nicknames = {};

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
      io.to(room_id).emit(
        "recieve_room_message",
        `${nicknames[socket.id]} has joined the party!`
      );
    });

    socket.on("join_room", async (room_id, nickname) => {
      nicknames[socket.id] = nickname;

      await socket.join(room_id);

      io.to(room_id).emit(
        "recieve_room_message",
        `${nicknames[socket.id]} has joined the party!`
      );
    });

    socket.on("send_room_message", (room_id, msg) => {
      io.to(room_id).emit("recieve_room_message", msg);
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
