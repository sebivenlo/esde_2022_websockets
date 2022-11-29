const chatInput = document.getElementById("chat-input");
const chatForm = document.getElementById("chat-form");
const chatMessages = document.getElementById("chat-messages");

let currentId = 0;

const username = prompt("Choose a username");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get message & trim
  let msg = chatInput.value;
  msg = msg.trim();

  if (!msg) {
    alert("Message cannot be empty!");
    return false;
  }

  const response = await fetch("http://localhost:4000/message", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      message: msg,
      username: username,
    }),
  });

  const body = await response.json();

  chatInput.value = "";
  chatInput.focus();
});

function outputMessage(payload) {
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
}
function outputRoomName(room) {
  roomName.innerText = room;
}

// long poll server for messages

const getMessages = async () => {
  const response = await fetch(
    `http://localhost:4000/messages/long/${currentId}`,
    {
      method: "GET",
    }
  );

  const body = await response.json();

  currentId = body.id;

  console.log(`Server returned ${body.messages.length} messages`);

  if (body.messages) {
    body.messages.map((message) => {
      outputMessage(message);
    });
  }

  getMessages();
};

getMessages();
