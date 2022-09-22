const express = require("express");
const colors = require("colors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

var messages = [];

console.clear();

io.on("connection", () => {
  /* … */
  io.on("chat:message", (payload) => {
    console.log(`Received event chat:message with payload ${payload}`);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`.brightGreen);
});
