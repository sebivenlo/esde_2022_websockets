const express = require("express");
const colors = require("colors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

var messages = [];

console.clear();

io.on("connection", (socket) => {
  console.log(`A new client connected!`.brightGreen);

  socket.emit("chat:messages", messages);

  io.on("chat:message", (payload) => {
    console.log(`Received event chat:message with payload ${payload}`.yellow);
    if (payload.message && typeof payload.message === "string") {
      //emits the events to all connected clients except for the sender
      socket.broadcast.emit(payload.message);

      //push to global array
      messages.push(payload.message);
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`.brightGreen);
});
