const path = require("path");
const colors = require("colors");
const express = require("express");
const app = express();

const { formatMessage, sleep } = require("./utils.js");

// variable that stores all messages in memory & count

const messages = [];
let count = 0;

console.clear();

// public folder for assets

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// 2 endpoints for polling

app.get("/messages/long/:id", async (req, res) => {
  const { id } = req.params;

  let messagesToReturn = null;

  while (true) {
    messagesToReturn = messages.filter((message, index) => {
      return id < message.id;
    });

    if (messagesToReturn.length) {
      break;
    }

    await sleep(250);
  }

  return res.json({ success: true, messages: messagesToReturn, id: count });
});

app.get("/messages/short/:id", async (req, res) => {
  const { id } = req.params;

  const messagesToReturn = messages.filter((message, index) => {
    return id < message.id;
  });

  return res.json({ success: true, messages: messagesToReturn, id: count });
});

app.post("/message", async (req, res) => {
  if (req.body.message && req.body.username) {
    count++;
    const message = formatMessage(req.body.username, req.body.message);

    message.id = count;

    messages.push(message);

    return res.json({ success: true });
  }

  return res.json({ success: false });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`-> Listening on port ${PORT}`.brightGreen);
});
