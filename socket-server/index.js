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

const messages = {};

console.clear();

// public folder for assets

app.use(express.static(path.join(__dirname, "public")));

// code that executes when a new client connects

io.on("connection", (socket) => {
  console.log(`-> A new client connected!`.brightGreen);

  socket.on("chat:join", async (payload, callback) => {
    const { username, room } = payload;

    if (!room || !username) {
      return;
    }


    // get all sockets in current room

    const sockets = await io.in(room).fetchSockets();


    // check if there is an user with that name already

    const exists = usernameExists(sockets, username, room);

    // if user with that name exists, return success false with error message

    if (exists) {
      return callback({
        success: false,
        messages: null,
        error: "Username already exists",
      });
    }

    // no user with that name exists in the room so join the room

    socket.join(room);

    // set the username & activeRoom in the socket data property

    socket.data.username = username;
    socket.data.activeRoom = room;

    // return the previous messages of that room

    callback({
      success: true,
      messages: messages[room],
    });

    // TODO: Exercise 1 implement new user joining the room message
  });

  // listens for new messages and emits them to the correct room

  socket.on("chat:message", (payload) => {
    const { room, msg } = payload;

    const formattedMessage = formatMessage(socket.data.username, msg);

    if (messages[room]) {
      messages[room].push(formattedMessage);
    } else {
      messages[room] = [];
      messages[room].push(formattedMessage);
    }

    io.to(room).emit("chat:new-message", formattedMessage);
  });

  // triggers when client disconnects

  socket.on("disconnect", () => {
    const username = socket.data.username || null;
    const activeRoom = socket.data.activeRoom || null;

    // only execute when user was actually in a room

    if (username && activeRoom) {
      // TODO: Exercise 2 implement user leaving the room message
    }

    console.log("-> A client has disconnected".red);
  });

  // TODO: Exercise 4 implement typing indicator

  // payload is what the client sends the server (its already an object)

  socket.on("chat:typing", (payload) => {
    // hint: emit the chat:typing event with a username variable to all users
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`-> Listening on port ${PORT}`.brightGreen);
});
