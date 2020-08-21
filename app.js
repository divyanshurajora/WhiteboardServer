const express = require('express');
const app = express();
//  nodejs module
const http = require('http').createServer(app);
//  socket enbaled server
const io = require('socket.io')(http);
io.on("connection", function (socket) {
    console.log("New client connected");
    console.log(socket.id);
    socket.on("color", function (color) {
        // console.log(data);
        socket.broadcast.emit('colorchange', color);
    })
    socket.on("md", function (point) {
        socket.broadcast.emit("onmd", point);
    })
    socket.on("mm", function (point) {
        socket.broadcast.emit("onmm", point);
    })
})

app.get("/", function (req, res) {
    res.end("<h1>Server Started</h1>")
})


//  connection\
let port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log("Server started at port 3000");
})