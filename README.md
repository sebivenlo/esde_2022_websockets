# ESDE 2022 websockets

# Run using Docker

- Start Docker
- To run the chat application simply pull this repository.
- CD to the cloned repository and then into ./socket-server
- Run `docker build . -t chat`
- Run `docker run -dp 3000:3000 chat`
- Visit http://localhost:3000 in your browser

## Exercices

Throughout the code (frontend & backend) you'll find TODO comments with exercise numbers (use CRTL + F on 'TODO' in your IDE to quickly jump around). You don't have to implement all functionality everywhere, sometimes just partial for simplicity and time purposes.

Docs:

[socket.io docs](https://socket.io/docs/v4/)

[emit cheatsheet](https://socket.io/docs/v4/emit-cheatsheet/)

### Exercise 1: new user joins the room

Implement '... has joined the room' message when a new user joins the room. You can use chat:new-message event and pretend its just a message being sent by System. Example: 'System: Mark has joined the room'

<details>
  <summary>Hint #1</summary>
  
  Make use of the socket.broadcast.to().emit(); function to emit an event to everyone in that room except the sender.
  
  ```javascript
  socket.broadcast.to("roomName").emit("eventName", { property: 123 }); 
  ```
  
</details>

<details>
  <summary>Hint #2</summary>
  
 Make use of the formatMessage function in utils.js to easily format your message with the correct time.
  
</details>

### Exercise 2: user leaves the room

Implement '... has left the room' message when a user leaves the room. You can use chat:new-message event and pretend its just a message being sent by System. Example: 'System: Mark has left the room'

<details>
  <summary>Hint #1</summary>
  
  Make use of the socket.broadcast.to().emit(); function to emit an event to everyone in that room except the sender.
  
  ```javascript
  socket.broadcast.to("roomName").emit("eventName", { property: 123 }); 
  ```
  
</details>

<details>
  <summary>Hint #2</summary>
  
 Make use of the formatMessage function in utils.js to easily format your message with the correct time.
  
</details>

### Exercise 3: Show if users are typing

Implement '... is typing' when a user starts typing

Note: The listener for the typing event has already been implemented in the frontend (CRTL + F for 'chat:typing' so you dont need to do this)

<details>
  <summary>Hint #1</summary>
  
  Use socket.emit("eventname") to emit a typing event to the backend, no payload is needed since the backend holds the username of the client
  
  ```javascript
  socket.emit("chat:typing")
  ```
  
</details>

<details>
  <summary>Hint #2</summary>
  
  Use the following function to emit an event to all users in that room except the sender
  socket.data.username & socket.data.activeRoom contain the room & username of the client that sends the typing event!
  
  ```javascript
   socket.broadcast
      .to('room')
      .emit("chat:typing", { username: "dataYouWishToSend" });
  ```
  
</details>

### Exercise 4: Show active rooms

Show all rooms with users on the front page

<details>
  <summary>Hint #1</summary>
  
  Use the getRoomsWithCount function in the utils.js file to get all the active rooms
  
  ```javascript
   const rooms = await getRoomsWithCount();
  ```
  
</details>

<details>
  <summary>Hint #2</summary>
  
  Use socket.emit() to emit the rooms to the client from the bakend
  
  ```javascript
  socket.emit("chat:rooms", {rooms: rooms })
  ```
  
</details>

<details>
  <summary>Hint #3</summary>
  
  Check the outputMessage function, it has a similair implementation of outputActiveRooms (the one you need to implement)

</details>

## License

[MIT](https://choosealicense.com/licenses/mit/)
