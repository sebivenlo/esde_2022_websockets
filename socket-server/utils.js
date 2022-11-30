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

const getRoomsWithCount = async (io) => {
  const rooms = io.of("/").adapter.rooms;

  let realRooms = {};

  for (let [key, value] of rooms) {
    const [first] = value;

    if (key !== first) {
      realRooms[key] = value.size;
    }
  }

  return realRooms;
};

module.exports = {
  formatMessage,
  usernameExists,
  sleep,
  getRoomsWithCount,
};
