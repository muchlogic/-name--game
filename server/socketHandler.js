const { Server } = require("socket.io");

let io;
let rooms = new Map(); // for storing room = list of Users

class User {
  constructor(nickname) {
    this.nickname = nickname;
    this.score = 0;
  }
}

const initSocket = async (server) => {
  io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("create_room", async (nickname) => {
      // create 6 digit code to players to enter
      const room_id = String(Math.floor(10000 + Math.random() * 90000));

      const host = new User(nickname);
      let socketID = socket.id;
      let users = new Map();
      users.set(socketID, host);
      rooms.set(room_id, users);

      // host joins room and emits room_id to client, and nickname
      await socket.join(room_id);

      io.to(room_id).emit("room_id", room_id);
    });

    socket.on("join_room", async (room_id, nickname) => {
      const player = new User(nickname);
      let socketID = socket.id;

      let users = rooms.get(room_id);
      users.set(socketID, player);

      await socket.join(room_id);

      io.to(room_id).emit(
        "recieve_room_message",
        `${player.nickname} has joined the party!`
      );
    });

    socket.on("send_room_message", (room_id, msg) => {
      let sender = rooms.get(room_id).get(socket.id).nickname;
      io.to(room_id).emit("recieve_room_message", `${sender}: ${msg}`);
    });

    socket.on("update_player_list", (room_id) => {
      let users = rooms.get(room_id);
      updatedPlayerList = Array.from(users);
      io.to(room_id).emit("updated_player_list", updatedPlayerList);
    });

    socket.on("leave_room", (room_id) => {
      delete nicknames[socket.id];
      socket.leave(room_id);
    });

    socket.on("start_game_server", (room_id) => {
      // helper timer for game loop
      io.to(room_id).emit("start_game_client"); // start the game for all players
    });

    socket.on("start_round", (room_id) => {
      // helper timer for game loop

      const seconds = () => Math.floor(Date.now() / 1000);
      let then = seconds();
      const started = then;
      let roundTime = 10;
      const emitRoundOver = () => io.to(room_id).emit("round_over");
      const emitRoundTimer = () =>
        io.to(room_id).emit("round_timer", roundTime);

      function timer() {
        const now = seconds();
        if (then != now) {
          // We're in a new second.
          then = now;
          roundTime -= 1;
          emitRoundTimer();
          if (roundTime == 0) {
            clearInterval(interval);
            emitRoundOver();
          }
        }
      }
      // set interval at 10ms to probe when 1 second has passed
      const interval = setInterval(timer, 100);
    });

    // occurs before disconnect event
    socket.on("disconnecting", () => {
      // disconnect socket from room it was apart of (if any)
      // emit a new event to update all clients part of the room, to reflect disconnect

      const socketRooms = Array.from(socket.rooms);
      let roomID = null;
      if (socketRooms.length > 1) roomID = socketRooms[1]; // user is part of a room, get roomID

      if (roomID) {
        console.log(`Disconnecting user from room ${roomID}`);
        let disconnectName = rooms.get(roomID).get(socket.id).nickname;
        rooms.get(roomID).delete(socket.id);
        // clear room if empty, make space for new rooms
        if (rooms.get(roomID).size == 0) rooms.delete(roomID);
        io.to(roomID).emit("player_disconnected");
        io.to(roomID).emit(
          "recieve_room_message",
          `Server: ${disconnectName} has left the room.`
        );
      }
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
