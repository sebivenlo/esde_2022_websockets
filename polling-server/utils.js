const moment = require("moment");

const formatMessage = (username, msg) => {
  return {
    username: username,
    msg: msg,
    time: moment().format("h:mm a"),
  };
};

const usernameExists = (sockets, username, room) => {
  return sockets.some((socket) => {
    return socket.data.activeRoom == room && socket.data.username == username;
  });
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = {
  formatMessage,
  usernameExists,
  sleep,
};
