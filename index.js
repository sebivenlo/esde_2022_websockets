const path = require("path");
const colors = require("colors");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const { formatMessage } = require("./utils.js");

const {
  getActiveUser,
  exitRoom,
  newUser,
  getIndividualRoomUsers,
} = require("./helpers/userHelper");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

console.clear();

// public folder for assets
app.use(express.static(path.join(__dirname, "public")));

// this block will run when the client connects
io.on("connection", (socket) => {
  console.log(`-> A new client connected!`.brightGreen);

  socket.on("chat:join", ({ username, room }) => {
    if (!room || !username) {
      return;
    }

    socket.join(room);

    socket.data.username = username;

    socket.join(room);

    // send message to everyone in the room of new user joining
    socket.broadcast
      .to(room)
      .emit(
        "chat:new-message",
        formatMessage("ESDE", `${socket.data.username} has joined the room`)
      );

    console.log("joined");

    // Current active users and room name
    // io.to(user.room).emit("roomUsers", {
    //   room: user.room,
    //   users: getIndividualRoomUsers(user.room),
    // });
  });

  // Listen for client message
  socket.on("chat:message", (payload) => {
    const { room, msg } = payload;

    io.to(room).emit(
      "chat:new-message",
      formatMessage(socket.data.username, msg)
    );
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const username = socket.data.username;
    const activeRoom = socket.data.activeRoom;

    io.to(activeRoom).emit(
      "chat:new-message",
      formatMessage("ESDE", `${username} has left the room`)
    );

    // Current active users and room name
    // io.to(user.room).emit("roomUsers", {
    //   room: user.room,
    //   users: getIndividualRoomUsers(user.room),
    // });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`-> Listening on port ${PORT}`.brightGreen);
});
