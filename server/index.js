const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

// user functions

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;
// require router
const router = require("./router");

// sockets are good for real-time

const app = express();

// init app
const server = http.createServer(app);

// pass server
const io = socketio(server);

app.use(cors());
app.use(router);

// specific socket that joins server
io.on("connect", socket => {
  socket.on("join", ({ name, room }, callback) => {
    // addUser can only return two arguments: error and user
    const { error, user } = addUser({ id: socket.id, name, room });
    // if there is an error, function will stop: the callback is returned immediately
    if (error) return callback(error);
    socket.join(user.room);

    // admin generated messages
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    // if no errors
    // user is finally in the room

    callback();
  });

  // backend is now expecting an event from frontend
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left.");
  });
});

app.use(router);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
