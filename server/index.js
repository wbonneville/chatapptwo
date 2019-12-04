const express = require("express");
const socketio = require("socket.io");
const http = require("http");

// user functions

const { addUser, removeUser, getUser, getUsersInRoom } = "./users.js";

const PORT = process.env.PORT || 5000;

// require router
const router = require("./router");

// sockets are good for real-time

const app = express();

// init app
const server = http.createServer(app);

// pass server
const io = socketio(server);

// specific socket that joins server
io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    // addUser can only return two arguments: error and user
    const { error, user } = addUser({ id: socket.id, name, room });

    // if there is an error, function will stop: the callback is returned immediately
    if (error) return callback(error);

    // if no errors
    // user is finally in the room
    socket.join(user.room);

    // trigger response immediately after socket.on event is emitted
  });

  socket.on("disconnect", () => {
    console.log("User has left.");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
