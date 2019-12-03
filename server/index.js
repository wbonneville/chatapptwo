const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

// require router

const router = require("./router");

// sockets are good for real-time

const app = express();

// init app
const server = http.createServer(app);

// pass server
const io = socketio(server);

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
