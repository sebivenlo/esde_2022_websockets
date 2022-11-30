const joinChatForm = document.getElementById("join-chat-form");
const chatRow = document.getElementById("chat-row");
const joinChatRow = document.getElementById("join-chat-row");
const usernameInput = document.getElementById("input-username");
const roomInput = document.getElementById("input-room");
const chatInput = document.getElementById("chat-input");
const chatForm = document.getElementById("chat-form");
const chatMessages = document.getElementById("chat-messages");
const chatHeaderRoomSpan = document.getElementById("chat-header-room-span");
const chatLeaveButton = document.getElementById("chat-leave-button");
const typingSpan = document.getElementById("typing-span");
const activeRooms = document.getElementById("active-rooms");
const activeRoomsRow = document.getElementById("active-rooms-row");

const socket = io();

let room = null;
let username = null;
const typingUsers = {};

// function that updates the 'is typing' text span
const updateTypingUsers = () => {
  // TODO: Exercise 3.3 this function should update the typingSpan variable (DOM element) based on the typingUsers object that holds the users that are typing
  // EX: typingSpan.innerText = "Mark is typing...";
};

// update typingUsers every 2 seconds, no js framework so this ugly workaround :(

setInterval(() => {
  updateTypingUsers();
}, 2000);

// TODO: Exercise 3.1 Implement this chatInput eventListener and emit an event that the user is typing to the backend

chatInput.addEventListener("keydown", (e) => {});

joinChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get username & room

  username = usernameInput.value.trim();
  room = roomInput.value.trim();

  if (!username || !room) {
    alert("Username or room cannot be empty");
    return false;
  }

  // emits a join event to the server when the user submits the form

  socket.emit("chat:join", { username, room }, (response) => {
    if (response.success) {
      //hide the chat form
      joinChatRow.classList.toggle("d-none");

      //show the chat
      chatRow.classList.toggle("d-none");

      activeRoomsRow.classList.add("d-none");

      chatHeaderRoomSpan.innerText = `${room}`;

      if (response.messages) {
        response.messages.map((message) => {
          outputMessage(message);
        });
      }

      return;
    }

    if (response.error) {
      alert(response.error);
    }
  });
});

// triggers when the server sends a new message

socket.on("chat:new-message", (payload) => {
  // call outputMessage function with the received payload from the server to append the message to the div
  outputMessage(payload);

  // scroll down to bottom of the div on new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on("chat:typing", (payload) => {
  typingUsers[payload.username] = Date.now();

  updateTypingUsers();
});

// TODO: Exercise 4.3 catch the event sent from the backend that gives the active rooms and output those with the outputActiveRooms() function

// this function triggers when the users sends a message

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get message & trim
  let msg = chatInput.value;
  msg = msg.trim();

  if (!msg) {
    alert("Message cannot be empty!");
    return false;
  }

  // emit message to server

  socket.emit("chat:message", { room, msg });

  chatInput.value = "";
  chatInput.focus();
});

// outputs a received message to the DOM

const outputMessage = (payload) => {
  const div = document.createElement("div");

  const p = document.createElement("p");

  p.classList.add("message");

  p.innerText = `${payload.username}: ${payload.msg}`;

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("float-end");
  div.appendChild(timeSpan);
  timeSpan.innerText = payload.time;

  div.appendChild(p);
  p.appendChild(timeSpan);

  chatMessages.appendChild(div);
};

const outputActiveRooms = (payload) => {
  activeRooms.innerHTML = "";

  // loops over rooms
  for (const property in payload.rooms) {
    // TODO: Exercise 4.4 output the rooms to the DOM check above function for inspiration
  }
};

// leave the room when client desires

chatLeaveButton.addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave?");

  if (leaveRoom) {
    window.location = "../index.html";
  }
});
