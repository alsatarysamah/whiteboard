"use strict";
require("dotenv").config();
let express = require("express");
const { Socket } = require("socket.io");
let app = express();
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer);

let conn = [];
io.on("connection", (socket) => {
  console.log("connect");
console.log(socket.id)
socket.on("down",(data)=>{
    conn.forEach((so)=>{
        if (so.id !== socket.id){
            so.emit("ondown",{x:data.x,y:data.y})
        }
    })
})
  conn.push(socket);
  socket.on("draw", (data) => {
    conn.forEach((so) => {
      if (so.id !== socket.id) {
        // console.log("ifffffffff");
        so.emit("onDraw", { x: data.x, y: data.y });
      }
    });
  });
});

app.use(express.static("public"));
let PORT = process.env.PORT || 3030;
httpServer.listen(PORT, () => {
  console.log(`server listining on port ${PORT}`);
});
