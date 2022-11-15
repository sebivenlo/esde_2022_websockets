const joinChatForm = document.getElementById("join-chat-form");
const chatRow = document.getElementById("chat-row");
const joinChatRow = document.getElementById("join-chat-row");
const usernameInput = document.getElementById("input-username");
const roomInput = document.getElementById("input-room");

const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const socket = io();

joinChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get username & room
  const username = usernameInput.value.trim();
  const room = roomInput.value.trim();

  console.log(username, room);

  if (!username || !room) {
    alert("Username or room cannot be empty");
    return false;
  }

  //hide the chat form
  joinChatRow.classList.toggle("d-none");

  //show the chat
  chatRow.classList.toggle("d-none");

  socket.emit("chat:join", { username, room });
  //   socket.on("roomUsers", ({ room, users }) => {
  //     outputRoomName(room);
  //     outputUsers(users);
  //   });
  //   socket.on("message", (message) => {
  //     outputMessage(message);

  //     // Scroll down
  //     chatMessages.scrollTop = chatMessages.scrollHeight;
  //   });
});

// chatForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   //hide the chat form
//   joinChatForm.classList.toggle("d-none");

//   //show the chat
//   chatRow.classList.toggle("d-none");

//   // Get message text
//   let msg = e.target.elements.msg.value;
//   msg = msg.trim();

//   if (!msg) {
//     return false;
//   }

//   // Emit message to server
//   socket.emit("chatMessage", msg);

//   // Clear input
//   e.target.elements.msg.value = "";
//   e.target.elements.msg.focus();
// });

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");

  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);

  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);

  document.querySelector(".chat-messages").appendChild(div);
}
function outputRoomName(room) {
  roomName.innerText = room;
}
// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");

  if (leaveRoom) {
    window.location = "../index.html";
  }
});
