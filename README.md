# ESDE 2022 websockets

# Run using Docker

* Start Docker
* To run the chat application simply pull this repository.
* CD to the cloned repository and then into ./socket-server
* Run ```docker build . -t chat```
* Run ```docker run -dp 3000:3000 chat```
* Visit http://localhost:3000 in your browser


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



## License

[MIT](https://choosealicense.com/licenses/mit/)