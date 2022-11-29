const path = require("path");
const colors = require("colors");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const { formatMessage, usernameExists } = require("./utils.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// variable that stores all messages in memory

let messages = {};

console.clear();

// public folder for assets

app.use(express.static(path.join(__dirname, "public")));

// code that executes when a new client connects

io.on("connection", (socket) => {
  console.log(`-> A new client connected!`.brightGreen);

  socket.on("chat:join", async ({ username, room }, callback) => {
    if (!room || !username) {
      return;
    }

    socket.join(room);

    const sockets = await io.in(room).fetchSockets();

    const exists = usernameExists(sockets, username, room);

    if (exists) {
      return callback({
        success: false,
        messages: null,
        error: "Username already exists",
      });
    }

    socket.data.username = username;
    socket.data.activeRoom = room;

    callback({
      success: true,
      messages: messages[room],
    });

    // send message to everyone in the room of new user joining

    socket.broadcast
      .to(room)
      .emit(
        "chat:new-message",
        formatMessage("System", `${socket.data.username} has joined the room`)
      );
  });

  // listens for new messages and emits them to the correct room

  socket.on("chat:message", (payload) => {
    const { room, msg } = payload;

    const response = formatMessage(socket.data.username, msg);

    if (messages[room]) {
      messages[room].push(response);
    } else {
      messages[room] = [];
      messages[room].push(response);
    }

    io.to(room).emit("chat:new-message", response);
  });

  // triggers when client disconnects

  socket.on("disconnect", () => {
    const username = socket.data.username;
    const activeRoom = socket.data.activeRoom;

    io.to(activeRoom).emit(
      "chat:new-message",
      formatMessage("System", `${username} has left the room`)
    );
  });

  // implement typing indicator

  socket.on("chat:typing", (payload) => {});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`-> Listening on port ${PORT}`.brightGreen);
});
